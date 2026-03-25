'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  showLogout?: boolean;
}

export function PageHeader({ 
  title, 
  showBackButton = true, 
  showLogout = false 
}: PageHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Logout mantığı
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              title="Geri Dön"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {showLogout && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Çıkış Yap"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
