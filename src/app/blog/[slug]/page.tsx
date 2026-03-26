'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Clock, Calendar, Tag, ArrowRight, Send, Trash2, MessageCircle } from 'lucide-react';
import { blogPosts, getBlogPost, categoryColors } from '@/lib/blog-posts';

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
}

function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`blog_comments_${slug}`);
      if (saved) setComments(JSON.parse(saved));
    } catch { /* ignore */ }
  }, [slug]);

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const comment: Comment = { id: Date.now(), name: name.trim(), text: text.trim(), date: new Date().toISOString() };
    const updated = [...comments, comment];
    setComments(updated);
    localStorage.setItem(`blog_comments_${slug}`, JSON.stringify(updated));
    setText('');
  };

  const deleteComment = (id: number) => {
    const updated = comments.filter(c => c.id !== id);
    setComments(updated);
    localStorage.setItem(`blog_comments_${slug}`, JSON.stringify(updated));
  };

  return (
    <div className="mt-16 pt-10 border-t border-border/30">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        Yorumlar ({comments.length})
      </h2>

      <form onSubmit={addComment} className="p-5 rounded-xl border border-border/50 bg-card mb-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Adınız</label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Adınızı girin..." required />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Yorumunuz</label>
          <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Düşüncelerinizi paylaşın..." rows={3} required />
        </div>
        <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
          <Send className="w-4 h-4 mr-2" /> Yorum Yap
        </Button>
      </form>

      {comments.length === 0 && (
        <p className="text-center text-muted-foreground py-8">Henüz yorum yok. İlk yorumu siz yapın!</p>
      )}

      <div className="space-y-4">
        {comments.map(c => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-border/50 bg-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(c.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <button onClick={() => deleteComment(c.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed ml-11">{c.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold mt-10 mb-4 text-foreground">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-lg font-bold mt-6 mb-3 text-foreground">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={key++} className="font-semibold text-foreground mt-4 mb-2">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-muted-foreground leading-relaxed ml-4 list-disc mb-1">
          {line.replace('- ', '')}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      // Handle inline bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.replace(/\*\*/g, '')}</strong>;
        }
        return part;
      });
      elements.push(
        <p key={key++} className="text-muted-foreground leading-relaxed mb-3">
          {rendered}
        </p>
      );
    }
  }

  return elements;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/blog" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Blog'a Dön
            </Link>
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:block">
              BioPath Pro
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login"><Button variant="ghost" size="sm">Giriş Yap</Button></Link>
            <Link href="/auth/signup"><Button size="sm" className="bg-primary hover:bg-primary/90">Başla</Button></Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${categoryColors[post.category] || 'bg-primary/10 text-primary'}`}>
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/40 pl-4">
              {post.excerpt}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-border/30 mb-10" />

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-sm max-w-none"
          >
            {renderContent(post.content)}
          </motion.article>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center"
          >
            <h2 className="text-xl font-bold mb-2">Hemen Deneyin</h2>
            <p className="text-muted-foreground mb-5 text-sm">
              BioPath Pro ile profesyonel profilinizi dakikalar içinde oluşturun.
            </p>
            <Link href="/auth/signup">
              <Button className="bg-primary hover:bg-primary/90">
                Ücretsiz Başla
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Yorumlar */}
          <CommentSection slug={post.slug} />

          {/* Other Posts */}
          {otherPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-16"
            >
              <h2 className="text-xl font-bold mb-6">Diğer Yazılar</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {otherPosts.map(other => (
                  <Link key={other.slug} href={`/blog/${other.slug}`}>
                    <div className="p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-all group cursor-pointer">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[other.category] || 'bg-primary/10 text-primary'} mb-3 inline-block`}>
                        {other.category}
                      </span>
                      <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors mb-2">
                        {other.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">{other.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
