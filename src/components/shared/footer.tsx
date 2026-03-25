'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-sm mb-3">Product</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Resources</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/security" className="hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2024 BioPath Pro. All rights reserved.</p>
          <p>Co-created with <span className="font-semibold">Raccoon AI</span></p>
        </div>
      </div>
    </footer>
  );
}
