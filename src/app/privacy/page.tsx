'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const sections = [
  { title: 'Topladığımız Bilgiler', content: 'Hesap oluştururken ad, e-posta adresi ve şifre gibi temel bilgileri toplarız. Profilinizi oluştururken eklediğiniz biyografi, konum, GitHub kullanıcı adı ve sosyal medya bağlantıları da sakladığımız bilgiler arasındadır. Platformumuzu kullanırken otomatik olarak log verileri, cihaz bilgileri ve çerezler aracılığıyla bazı teknik bilgiler de toplayabiliriz.' },
  { title: 'Bilgilerinizi Nasıl Kullanıyoruz', content: 'Topladığımız bilgileri yalnızca hizmetlerimizi sunmak, geliştirmek ve size daha iyi bir deneyim yaşatmak için kullanıyoruz. Profil analitiği, AI bio oluşturma ve yol haritası önerilerinde bu verilerden yararlanıyoruz. Verilerinizi hiçbir zaman üçüncü taraflara satmıyoruz.' },
  { title: 'Verilerinizin Güvenliği', content: 'Verilerinizi korumak için endüstri standardı şifreleme ve güvenlik protokolleri kullanıyoruz. Tüm veriler güvenli sunucularda saklanır ve düzenli olarak yedeklenir. Hesabınıza yetkisiz erişim girişimlerini sürekli izliyoruz.' },
  { title: 'Çerezler', content: 'Platformumuzun düzgün çalışması için zorunlu çerezler kullanıyoruz. Ayrıca site trafiğini analiz etmek için analitik çerezler kullanabiliriz. Çerez tercihlerinizi tarayıcı ayarlarınızdan yönetebilirsiniz; ancak bazı işlevler etkilenebilir.' },
  { title: 'Verilerinizi Silme', content: 'Hesabınızı ve tüm verilerinizi istediğiniz zaman silebilirsiniz. Hesap Ayarları sayfasından "Hesabı Sil" seçeneğini kullanabilir ya da destek@biopathpro.com adresine e-posta gönderebilirsiniz. Silme işlemi tamamlandıktan sonra verileriniz kalıcı olarak kaldırılır.' },
  { title: 'Değişiklikler', content: 'Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda kayıtlı e-posta adresinize bildirim göndeririz. Politikamızın güncel sürümü her zaman bu sayfada yayımlanır.' },
];

export default function PrivacyPage() {
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
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Gizlilik</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Gizlilik Politikası</h1>
            <p className="text-muted-foreground">Son güncelleme: 1 Mart 2026</p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <h2 className="text-xl font-bold mb-3 text-foreground">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                {i < sections.length - 1 && <div className="mt-8 border-t border-border/30" />}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-12 p-6 rounded-xl border border-border/50 bg-secondary/30 text-sm text-muted-foreground">
            Sorularınız için: <a href="mailto:destek@biopathpro.com" className="text-primary hover:underline">destek@biopathpro.com</a>
            {' '}adresine ulaşabilirsiniz.
          </motion.div>
        </div>
      </main>
    </div>
  );
}
