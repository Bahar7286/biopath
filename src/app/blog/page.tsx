'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Footer } from '@/components/shared/footer';
import { ArrowRight, Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    id: 'ai-bio-tips',
    slug: 'ai-bio-tips',
    title: 'Profesyonel Bio Yazmanın 5 İpucu',
    excerpt: 'AI yardımıyla etkileyici bir bio yazmanın sırlarını keşfedin.',
    date: '2024-03-20',
    author: 'BioPath Team',
    image: '📝',
  },
  {
    id: 'github-showcase',
    slug: 'github-showcase',
    title: 'GitHub Depo Sergileme - En İyi Uygulamalar',
    excerpt: 'Projelerinizi en iyi şekilde sergilemek için ipuçları ve stratejiler.',
    date: '2024-03-18',
    author: 'Teknoloji Editörü',
    image: '🚀',
  },
  {
    id: 'theme-customization',
    slug: 'theme-customization',
    title: 'Tema Özelleştirmesi - Kişiselleştirilmiş Stil Rehberi',
    excerpt: 'Profilinizi kendi tarzınıza göre özelleştirmenin tüm yollarını öğrenin.',
    date: '2024-03-15',
    author: 'Tasarım Uzmanı',
    image: '🎨',
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader 
        title="Blog"
        description="Profesyonel profil oluşturma hakkında ipuçları ve stratejiler"
        showBack={false}
      />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="h-full rounded-lg border border-border/40 bg-card hover:border-primary/40 overflow-hidden transition-all duration-300">
                  <div className="p-6 space-y-4">
                    <div className="text-4xl">{post.image}</div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/40">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Oku <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
