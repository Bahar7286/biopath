'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';
import { Footer } from '@/components/footer';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError('E-posta ve şifre zorunludur');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('E-posta veya şifre hatalı');
        } else if (authError.message.includes('Email not confirmed')) {
          setError('Lütfen önce e-postanızı doğrulayın');
        } else {
          setError(authError.message);
        }
        return;
      }

      if (data.user) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Ana Sayfa
          </Link>
        </div>
        <div className="mb-8 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Tekrar hoş geldiniz</span>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Giriş Yap</h1>
          <p className="text-muted-foreground">Profesyonel profilinize ve panonuza erişin</p>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="p-8 rounded-2xl border border-border/50 bg-card shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground font-medium">Şifre</Label>
                <Link href="/auth/reset-password" className="text-sm text-primary hover:underline">Unuttum?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input id="password" type="password" name="password" placeholder="••••••••"
                  value={formData.password} onChange={handleChange}
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
              {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
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
          Hesabınız yok mu?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline font-medium">Oluşturun</Link>
        </motion.div>
      </motion.div>
      </div>
      <Footer />
    </div>
  );
}
