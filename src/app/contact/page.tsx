'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Geri
            </Link>
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">İletişim</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Bize Ulaşın</h1>
            <p className="text-xl text-muted-foreground">Sorularınız, geri bildirimleriniz veya iş birliği teklifleriniz için buradayız.</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 space-y-6">
              <Card className="p-6 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">E-posta</h3>
                </div>
                <p className="text-sm text-muted-foreground">destek@biopathpro.com</p>
                <p className="text-xs text-muted-foreground mt-1">24 saat içinde yanıt veririz</p>
              </Card>
              <Card className="p-6 border-border/50">
                <h3 className="font-semibold mb-2">Sık sorulan sorular</h3>
                <p className="text-sm text-muted-foreground mb-4">Cevabınızı SSS sayfamızda bulabilirsiniz.</p>
                <Link href="/faq">
                  <Button variant="outline" size="sm" className="w-full">SSS Sayfası</Button>
                </Link>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-3">
              {submitted ? (
                <Card className="p-10 border-border/50 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Mesajınız alındı!</h2>
                  <p className="text-muted-foreground mb-6">En kısa sürede size geri döneceğiz.</p>
                  <Link href="/">
                    <Button className="bg-primary hover:bg-primary/90">Ana Sayfaya Dön</Button>
                  </Link>
                </Card>
              ) : (
                <Card className="p-8 border-border/50">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input id="name" name="name" placeholder="Ahmet Yılmaz" value={form.name} onChange={handleChange} className="bg-background border-border/50" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta Adresi</Label>
                      <Input id="email" name="email" type="email" placeholder="siz@ornek.com" value={form.email} onChange={handleChange} className="bg-background border-border/50" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mesajınız</Label>
                      <Textarea id="message" name="message" placeholder="Nasıl yardımcı olabiliriz?" value={form.message} onChange={handleChange} className="bg-background border-border/50 resize-none h-36" required />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Gönder
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
