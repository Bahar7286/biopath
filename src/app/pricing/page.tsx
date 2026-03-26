'use client';

import { motion } from 'motion/react';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Ücretsiz',
    price: '₺0',
    period: 'sonsuza kadar',
    description: 'Bireysel kullanıcılar için temel özellikler',
    features: [
      '1 Profesyonel Profil',
      'AI Bio Oluşturucu (3 bio)',
      '2 Tema seçeneği',
      'GitHub Entegrasyonu',
      'Temel Analitik',
      'Profil Bağlantısı',
    ],
    cta: 'Ücretsiz Başla',
    href: '/auth/signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₺99',
    period: 'aylık',
    description: 'Profesyoneller ve işletmeler için gelişmiş özellikler',
    features: [
      'Sınırsız Profil',
      'Sınırsız AI Bio',
      '8+ Premium Tema',
      'Gelişmiş Analitik',
      'Yol Haritası Oluşturucu',
      'PDF / VCF Dışa Aktarma',
      'Özel Alan Adı',
      'Öncelikli Destek',
    ],
    cta: "Pro'ya Geç",
    href: '/auth/signup',
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Geri
            </Link>
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BioPath Pro
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login"><Button variant="ghost" size="sm">Giriş Yap</Button></Link>
            <Link href="/auth/signup"><Button size="sm" className="bg-primary hover:bg-primary/90">Başla</Button></Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Şeffaf Fiyatlandırma</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Sizin için doğru planı seçin</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kredi kartı gerekmez. İstediğiniz zaman yükseltin veya iptal edin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card className={`p-8 border-2 relative ${plan.highlight ? 'border-primary bg-primary/5' : 'border-border/50'}`}>
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      En Popüler
                    </div>
                  )}
                  <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button className={`w-full ${plan.highlight ? 'bg-primary hover:bg-primary/90' : ''}`} variant={plan.highlight ? 'default' : 'outline'}>
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mt-12 text-muted-foreground text-sm">
            Sorularınız mı var?{' '}
            <Link href="/contact" className="text-primary hover:underline">Bize ulaşın</Link>
            {' '}veya{' '}
            <Link href="/faq" className="text-primary hover:underline">SSS sayfasına</Link>
            {' '}bakın.
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
