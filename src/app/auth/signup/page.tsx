'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Tüm alanlar zorunludur');
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError('Şifre en az 8 karakter olmalıdır');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.fullName },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin.');
        } else {
          setError(authError.message);
        }
        return;
      }

      // Eğer e-posta doğrulaması gerekmiyorsa direkt dashboard'a yönlendir
      if (data.session) {
        router.push('/dashboard');
        return;
      }

      // E-posta doğrulaması gerekiyor
      setSuccess(true);
    } catch (err: any) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center p-8 rounded-2xl border border-border/50 bg-card">
          <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3">E-postanızı doğrulayın</h2>
          <p className="text-muted-foreground mb-2">
            <strong>{formData.email}</strong> adresine doğrulama linki gönderdik.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Linke tıkladıktan sonra otomatik olarak giriş yapılacak.
          </p>
          <Link href="/auth/login">
            <Button variant="outline" className="w-full">Giriş Sayfasına Dön</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Profilinizi oluşturun</span>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Kayıt Ol</h1>
          <p className="text-muted-foreground">Binlerce profesyonele katılın</p>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="p-8 rounded-2xl border border-border/50 bg-card shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground font-medium">Ad Soyad</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="fullName" name="fullName" placeholder="Ahmet Yılmaz"
                  value={formData.fullName} onChange={handleChange}
                  className="pl-10 bg-background border-border/50" disabled={isLoading} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">E-posta Adresi</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="email" type="email" name="email" placeholder="siz@ornek.com"
                  value={formData.email} onChange={handleChange}
                  className="pl-10 bg-background border-border/50" disabled={isLoading} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="password" type="password" name="password" placeholder="En az 8 karakter"
                  value={formData.password} onChange={handleChange}
                  className="pl-10 bg-background border-border/50" disabled={isLoading} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">Şifre Tekrar</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="confirmPassword" type="password" name="confirmPassword" placeholder="••••••••"
                  value={formData.confirmPassword} onChange={handleChange}
                  className="pl-10 bg-background border-border/50" disabled={isLoading} />
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm">
                {error}
              </motion.div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-lg h-11 mt-2">
              {isLoading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
              {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/30" /></div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Veya şununla devam et</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-border/50" disabled={isLoading}
              onClick={async () => {
                await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: `${window.location.origin}/dashboard` } });
              }}>
              GitHub
            </Button>
            <Button variant="outline" className="border-border/50" disabled={isLoading}
              onClick={async () => {
                await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } });
              }}>
              Google
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-6 text-center text-muted-foreground">
          Zaten hesabınız var mı?{' '}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">Giriş yapın</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
