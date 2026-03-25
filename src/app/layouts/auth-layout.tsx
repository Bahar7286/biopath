import { ReactNode } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Footer } from '@/components/shared/footer';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showBack?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  description,
  showBack = true 
}: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {showBack && <PageHeader title={title} description={description} showBack={showBack} />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
