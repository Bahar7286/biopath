'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'AI ile Mükemmel Bir Profesyonel Bio Nasıl Yazılır?',
    excerpt: 'Yapay zeka destekli bio oluşturucumuzu kullanarak her platform için özel, etkileyici biyografiler oluşturmanın ipuçları.',
    date: '15 Mart 2026',
    readTime: '5 dk okuma',
    category: 'Rehber',
  },
  {
    title: 'GitHub Profilini Öne Çıkarmanın 7 Yolu',
    excerpt: 'GitHub depolarınızı profesyonel profilinizle entegre ederek işverenlerin ve iş ortaklarının dikkatini çekin.',
    date: '10 Mart 2026',
    readTime: '4 dk okuma',
    category: 'İpuçları',
  },
  {
    title: 'Dijital Kimliğiniz Kariyerinizi Nasıl Etkiler?',
    excerpt: 'Güçlü bir çevrimiçi varlık, kariyer fırsatlarınızı nasıl artırır? Veriler ve gerçek hikayeler ile anlattık.',
    date: '5 Mart 2026',
    readTime: '6 dk okuma',
    category: 'Analiz',
  },
  {
    title: 'Yol Haritası Planlaması: Hedeflerinizi Gerçeğe Dönüştürün',
    excerpt: 'AI destekli yol haritası oluşturucumuzla büyük hedeflerinizi küçük, ulaşılabilir adımlara bölün.',
    date: '28 Şubat 2026',
    readTime: '3 dk okuma',
    category: 'Rehber',
  },
];

const categoryColors: Record<string, string> = {
  'Rehber': 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  'İpuçları': 'bg-green-500/20 text-green-700 dark:text-green-400',
  'Analiz': 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
};

export default function BlogPage() {
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
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Blog</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Son Yazılar</h1>
            <p className="text-xl text-muted-foreground">Kariyer, teknoloji ve profesyonel kimlik üzerine içerikler.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 border-border/50 hover:border-primary/50 transition-all group cursor-pointer h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[post.category] || 'bg-primary/10 text-primary'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Devamını Oku <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
