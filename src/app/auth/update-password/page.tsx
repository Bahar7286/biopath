'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, CheckCircle2, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function UpdatePasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // URL'den email parametresini oku
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Lütfen yeni şifrenizi girin');
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);
      // 3 saniye sonra giris sayfasina yonlendir
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center space-y-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>

          <h1 className="text-2xl font-bold text-foreground">Şifreniz Güncellendi!</h1>

          <p className="text-muted-foreground">
            Yeni şifreniz başarıyla belirlendi. Şimdi giriş yapabilirsiniz.
          </p>

          <div className="pt-4">
            <Link href="/auth/login">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Giriş Yap
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            3 saniye içinde otomatik yönlendirileceksiniz...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Yeni Şifre Belirle</h1>
          <p className="text-muted-foreground">
            {email ? (
              <>
                <span className="font-semibold text-foreground">{email}</span> hesabı için yeni şifrenizi belirleyin.
              </>
            ) : (
              'Hesabınız için yeni bir şifre belirleyin.'
            )}
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-border/50 bg-card shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {email && (
              <div className="space-y-2">
                <Label className="text-foreground font-medium">E-posta</Label>
                <div className="px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-sm text-muted-foreground">
                  {email}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Yeni Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="En az 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-background border-border/50"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">Şifre Tekrar</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Şifrenizi tekrar girin"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-background border-border/50"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-lg h-11"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Güncelleniyor...
                </>
              ) : (
                'Şifreyi Güncelle'
              )}
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Giriş sayfasına geri dön
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <UpdatePasswordContent />
    </Suspense>
  );
}
