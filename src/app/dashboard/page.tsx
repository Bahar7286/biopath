'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  ArrowRight,
  BarChart3,
  Link as LinkIcon,
  Map,
  Palette,
  Github,
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Profil Görüntüleme', value: '1.234', icon: BarChart3 },
    { label: 'Link Tıklamaları', value: '589', icon: LinkIcon },
    { label: 'Paylaşım Sayısı', value: '128', icon: Sparkles },
  ];

  const quickActions = [
    {
      title: 'AI Bio Oluştur',
      description: 'Yapay zeka ile profesyonel bio yaz',
      icon: Sparkles,
      href: '/dashboard/ai-bio',
      color: 'from-primary/20 to-accent/20',
    },
    {
      title: 'Yol Haritası Oluştur',
      description: 'Hedeflerini yapay zeka ile planla',
      icon: Map,
      href: '/dashboard/roadmap',
      color: 'from-accent/20 to-primary/20',
    },
    {
      title: 'Temayı Değiştir',
      description: '5+ tema arasından seç',
      icon: Palette,
      href: '/dashboard/settings',
      color: 'from-secondary/20 to-primary/20',
    },
    {
      title: 'GitHub Projeleri',
      description: 'Çalışmalarını sergile',
      icon: Github,
      href: '/dashboard/profile',
      color: 'from-primary/20 to-secondary/20',
    },
  ];

  const recentActivity = [
    { title: "Twitter'dan profil görüntüleme", time: '2 saat önce' },
    { title: 'Yeni takipçi: @devjohn', time: '5 saat önce' },
    { title: 'Bio başarıyla oluşturuldu', time: '1 gün önce' },
    { title: 'Profil 5 kez paylaşıldı', time: '2 gün önce' },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Tekrar hoş geldiniz!</h1>
        <p className="text-muted-foreground">
          Profesyonel profilinizi yönetin ve ilerlemenizi takip edin
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-6 border-border/50 bg-card hover:border-primary/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">Geçen haftaya göre +%12</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Hızlı İşlemler</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                  className={`p-6 rounded-xl border border-border/50 bg-gradient-to-br ${action.color} hover:border-primary/50 transition-all cursor-pointer group`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-background/50 group-hover:bg-background transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{action.description}</p>
                  <div className="flex items-center text-xs text-primary font-medium">
                    Başla
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 border-border/50">
            <h2 className="text-lg font-semibold mb-4">Son Aktiviteler</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 border-border/50 bg-gradient-to-br from-primary/10 to-accent/10">
            <h2 className="text-lg font-semibold mb-4">Başlangıç Rehberi</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">1</div>
                <div>
                  <p className="text-sm font-medium">Profilini Tamamla</p>
                  <p className="text-xs text-muted-foreground">Bio ve fotoğraf ekle</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">2</div>
                <div>
                  <p className="text-sm font-medium">AI Bio Oluştur</p>
                  <p className="text-xs text-muted-foreground">Yapay zeka bio'nı yazsın</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">3</div>
                <div>
                  <p className="text-sm font-medium">Profili Paylaş</p>
                  <p className="text-xs text-muted-foreground">Genel bağlantını al</p>
                </div>
              </div>
            </div>
            <Link href="/dashboard/profile">
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                Rehberi Başlat
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
