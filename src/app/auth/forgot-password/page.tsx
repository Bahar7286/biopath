'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Şifremi Unuttum</h1>
            <p className="text-muted-foreground">
              E-posta adresinizi girin ve sıfırlama bağlantısı göndereceğiz.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center space-y-3">
              <Mail className="h-8 w-8 mx-auto text-primary" />
              <div>
                <p className="font-semibold text-sm">E-posta gönderildi!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Lütfen {email} adresine gelen talimatlara bakın.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-posta
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sıfırlama Bağlantısı Gönder
              </Button>
            </form>
          )}

          <div className="text-center text-sm text-muted-foreground">
            Parolanızı hatırladınız mı?{' '}
            <Link href="/auth/login" className="font-semibold hover:text-foreground transition-colors">
              Giriş yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
