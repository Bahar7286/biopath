'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'BioPath Pro ücretsiz mi?', a: 'Evet! Temel özelliklerimiz sonsuza kadar ücretsizdir. AI bio oluşturucu, GitHub entegrasyonu, 2 tema ve temel analitik dahildir. Daha fazlası için Pro planımıza geçebilirsiniz.' },
  { q: 'AI bio oluşturucu nasıl çalışır?', a: 'Mesleğinizi, becerilerinizi ve deneyim seviyenizi girdikten sonra yapay zeka üç farklı tonda profesyonel bio metni oluşturur. Beğendiğinizi kopyalayıp profilinize ekleyebilirsiniz.' },
  { q: 'GitHub profilimi nasıl bağlarım?', a: 'Dashboard\'daki Profil sayfasına gidin, GitHub kullanıcı adınızı girin ve "Getir" butonuna tıklayın. Depolarınız otomatik olarak yüklenir, istediğiniz projeleri seçerek profilinizde sergileyebilirsiniz.' },
  { q: 'Profilimi kimler görebilir?', a: 'Profiliniz herkese açık bir bağlantı üzerinden paylaşılabilir. Bağlantıyı paylaşmadığınız sürece kimse profilinizi bulamaz. İstediğiniz zaman gizlilik ayarlarınızı değiştirebilirsiniz.' },
  { q: 'Temanızı istediğim zaman değiştirebilir miyim?', a: 'Evet, Ayarlar sayfasından istediğiniz zaman tema değiştirebilirsiniz. Ücretsiz planda 2, Pro planda 8+ tema seçeneği mevcuttur.' },
  { q: 'Verilerimi nasıl dışa aktarırım?', a: 'Ayarlar sayfasında PDF, VCF (kartvizit) ve bağlantı paylaşma seçenekleri mevcuttur. Pro kullanıcılar tüm dışa aktarma özelliklerine erişebilir.' },
  { q: "Pro'ya nasıl geçerim?", a: "Şu anda Pro planı geliştirme aşamasındadır. Bildirim almak için bize ulaşın, öncelikli erişim hakkı kazanın." },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sık Sorulan Sorular</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Merak ettikleriniz</h1>
            <p className="text-xl text-muted-foreground">Yanıt bulamazsanız <Link href="/contact" className="text-primary hover:underline">bize yazın</Link>.</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="border border-border/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-12 p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
            <h2 className="text-xl font-bold mb-2">Hâlâ sorunuz var mı?</h2>
            <p className="text-muted-foreground mb-4">Size yardımcı olmaktan memnuniyet duyarız.</p>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90">Bize Ulaşın</Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
