'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const sections = [
  { title: 'Hizmet Koşullarının Kabulü', content: 'BioPath Pro\'yu kullanarak bu Hizmet Koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız platformumuzu kullanmayınız.' },
  { title: 'Hesap Sorumluluğu', content: 'Hesabınızın güvenliğinden siz sorumlusunuz. Güçlü bir şifre kullanmanızı ve giriş bilgilerinizi kimseyle paylaşmamanızı öneririz. Hesabınızda gerçekleşen tüm işlemlerden siz sorumlusunuz.' },
  { title: 'Kabul Edilebilir Kullanım', content: 'Platformumuzu yasadışı, yanıltıcı veya zararlı amaçlarla kullanamazsınız. Başkalarının telif hakkı veya kişisel haklarını ihlal eden içerik paylaşamazsınız. Spam, kötü amaçlı yazılım veya platformun güvenliğini tehdit eden eylemler yasaktır.' },
  { title: 'İçerik ve Fikri Mülkiyet', content: 'Profilinizde yayımladığınız içeriklerin haklarına sahip olduğunuzu beyan etmiş olursunuz. BioPath Pro adı, logosu ve platformun tasarımı bize aittir. AI tarafından üretilen biyografi metinleri size aittir ve dilediğiniz gibi kullanabilirsiniz.' },
  { title: 'Hizmet Değişiklikleri', content: 'Platformumuzu geliştirmek adına özellikleri ekleme, değiştirme veya kaldırma hakkını saklı tutarız. Önemli değişlikler için kayıtlı kullanıcılara önceden bildirim göndeririz.' },
  { title: 'Hesap Sonlandırma', content: 'Bu Hizmet Koşullarını ihlal etmeniz durumunda hesabınızı askıya alma veya sonlandırma hakkımız saklıdır. Siz de istediğiniz zaman hesabınızı silebilirsiniz.' },
];

export default function TermsPage() {
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
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Yasal</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Kullanım Koşulları</h1>
            <p className="text-muted-foreground">Son güncelleme: 1 Mart 2026</p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                {i < sections.length - 1 && <div className="mt-8 border-t border-border/30" />}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-12 p-6 rounded-xl border border-border/50 bg-secondary/30 text-sm text-muted-foreground">
            Sorularınız için:{' '}
            <a href="mailto:destek@biopathpro.com" className="text-primary hover:underline">destek@biopathpro.com</a>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
