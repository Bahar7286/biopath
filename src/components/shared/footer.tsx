'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  const links = [
    { href: '/about', label: 'Hakkında' },
    { href: '/faq', label: 'Sıkça Sorulan' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'İletişim' },
    { href: '/privacy', label: 'Gizlilik' },
    { href: '/terms', label: 'Koşullar' },
    { href: '/security', label: 'Güvenlik' },
  ];

  return (
    <footer className="border-t border-border bg-background/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Hakkında */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">BioPath Pro</h3>
            <p className="text-sm text-muted-foreground">
              Yapay zeka ile profesyonel profilinizi güçlendirin.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              {links.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Diğer Linkler */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Yasal</h4>
            <ul className="space-y-2">
              {links.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosyal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Bağlantılar</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Yapımı
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              BioPath Pro Takımı tarafından
            </p>
            <p className="text-sm text-muted-foreground">
              © 2026 BioPath Pro. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
