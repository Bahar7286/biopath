'use client';

import { motion } from 'motion/react';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Users, Zap, Globe } from 'lucide-react';

const values = [
  { icon: Sparkles, title: 'Yapay Zeka Öncelikli', desc: 'Her özelliği yapay zekayla güçlendiriyoruz — daha akıllı, daha hızlı, daha iyi.' },
  { icon: Users, title: 'Topluluk Odaklı', desc: 'Kullanıcılarımızın geri bildirimleriyle büyüyoruz. Ürünümüz sizin için, sizinle şekilleniyor.' },
  { icon: Zap, title: 'Hız ve Basitlik', desc: 'Dakikalar içinde profesyonel bir profil oluşturun. Karmaşıklık yok, zaman kaybı yok.' },
  { icon: Globe, title: 'Herkese Açık', desc: 'Temel özelliklerimiz sonsuza kadar ücretsiz. Profesyonel bir kimlik herkesin hakkı.' },
];

export default function AboutPage() {
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
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Hakkımızda</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Profesyonel kimliğinizi yeniden tanımlıyoruz</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              BioPath Pro, geliştiricilerin, tasarımcıların ve profesyonellerin kendilerini en iyi şekilde ifade etmelerine yardımcı olmak için doğdu.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-16">
            <h2 className="text-2xl font-bold mb-4">Misyonumuz</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Yapay zeka teknolojisini herkes için erişilebilir kılmak ve her profesyonelin güçlü, etkileyici bir dijital kimliğe sahip olmasını sağlamak istiyoruz.
              Karmaşık araçlara, pahalı tasarımcılara ya da saatler süren uğraşlara gerek yok.
              BioPath Pro ile dakikalar içinde profesyonel bir profil oluşturabilirsiniz.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">Değerlerimiz</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                    <Card className="p-6 border-border/50 hover:border-primary/50 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-center p-10 rounded-2xl border border-border/50 bg-card">
            <h2 className="text-3xl font-bold mb-4">Bize katılın</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              1000'den fazla profesyonelin güvendiği BioPath Pro'yu ücretsiz deneyin.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/auth/signup">
                <Button className="bg-primary hover:bg-primary/90">Ücretsiz Başla</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">İletişime Geç</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
