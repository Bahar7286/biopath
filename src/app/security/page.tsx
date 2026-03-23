'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, Shield, Eye, Server, Key, AlertTriangle } from 'lucide-react';

const measures = [
  { icon: Lock, title: 'Uçtan Uca Şifreleme', desc: 'Tüm verileriniz aktarım sırasında TLS 1.3 ile, depolamada ise AES-256 şifrelemeyle korunur.' },
  { icon: Shield, title: 'Güvenlik Duvarı', desc: 'Gelişmiş güvenlik duvarları ve DDoS koruma sistemleriyle platformumuzu sürekli izliyoruz.' },
  { icon: Eye, title: 'Gizlilik Öncelikli', desc: 'Verilerinizi asla üçüncü taraflara satmıyoruz. Yalnızca hizmetlerimizi sunmak için kullanıyoruz.' },
  { icon: Server, title: 'Güvenli Altyapı', desc: 'ISO 27001 sertifikalı veri merkezlerinde barındırma. Düzenli güvenlik denetimleri ve sızma testleri.' },
  { icon: Key, title: 'Kimlik Doğrulama', desc: 'Güçlü şifre gereksinimleri ve yakında eklenecek iki faktörlü kimlik doğrulama (2FA) desteği.' },
  { icon: AlertTriangle, title: 'Güvenlik Açığı Bildirimi', desc: 'Bir güvenlik açığı bulduysanız lütfen bize bildirin. Sorumlu açıklama programımız aracılığıyla birlikte çözelim.' },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BioPath Pro
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login"><Button variant="ghost" size="sm">Giriş Yap</Button></Link>
            <Link href="/auth/signup"><Button size="sm" className="bg-primary hover:bg-primary/90">Başla</Button></Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Güvenlik</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Güvenliğiniz önceliğimiz</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Verilerinizi korumak için en güncel güvenlik standartlarını uyguluyoruz.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {measures.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="p-6 border-border/50 hover:border-primary/50 transition-all h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{m.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
            <h2 className="text-2xl font-bold mb-3">Güvenlik açığı mı buldunuz?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Lütfen hemen bize bildirin. Sorumlu açıklama politikamız çerçevesinde birlikte çözelim.
            </p>
            <a href="mailto:guvenlik@biopathpro.com">
              <Button className="bg-primary hover:bg-primary/90">guvenlik@biopathpro.com</Button>
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
