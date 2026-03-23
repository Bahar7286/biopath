'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  User,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Sparkles,
  Zap,
  Map,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/theme-switcher';

const navigationItems = [
  { label: 'Genel Bakış', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Profil', href: '/dashboard/profile', icon: User },
  { label: 'Analitik', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Ayarlar', href: '/dashboard/settings', icon: Settings },
];

const aiFeatures = [
  { label: 'AI Bio Oluşturucu', href: '/dashboard/ai-bio', icon: Sparkles },
  { label: 'Yol Haritası', href: '/dashboard/roadmap', icon: Map },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const handleSignOut = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline font-bold text-lg">BioPath Pro</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -256 }}
        animate={{ x: sidebarOpen ? 0 : -256 }}
        exit={{ x: -256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-16 bottom-0 w-64 border-r border-border/50 bg-card lg:translate-x-0 z-30 overflow-y-auto"
      >
        <div className="p-6 space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Ana Menü
            </p>
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.button
                      onClick={() => setSidebarOpen(false)}
                      whileHover={{ x: 4 }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                        />
                      )}
                    </motion.button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Yapay Zeka
            </p>
            <nav className="space-y-1">
              {aiFeatures.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.button
                      onClick={() => setSidebarOpen(false)}
                      whileHover={{ x: 4 }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        active ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:bg-secondary/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                        />
                      )}
                    </motion.button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-2 pt-4 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </motion.aside>

      <main className="lg:pl-64 pt-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
