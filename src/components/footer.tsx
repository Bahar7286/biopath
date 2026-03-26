import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-sm mb-3">Ürün</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Fiyatlandırma</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">Hakkında</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Destek</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-foreground transition-colors">SSS</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">İletişim</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Yasal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Gizlilik</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Kullanım Şartları</Link></li>
              <li><Link href="/security" className="hover:text-foreground transition-colors">Güvenlik</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">BioPath Pro</h3>
            <p className="text-sm text-muted-foreground">
              Yapay zeka destekli profesyonel profil platformu.
            </p>
          </div>
        </div>
        <div className="border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BioPath Pro. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
