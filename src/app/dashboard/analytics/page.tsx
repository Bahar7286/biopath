'use client';

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import {
  BarChart3,
  TrendingUp,
  Eye,
  MousePointer,
  Share2,
  Users,
  ArrowUpRight,
  Calendar,
} from 'lucide-react';

interface AnalyticsData {
  views: number;
  clicks: number;
  shares: number;
  visitors: number;
  engagement: number;
}

export default function AnalyticsPage() {
  const analytics: AnalyticsData = {
    views: 1234,
    clicks: 589,
    shares: 128,
    visitors: 342,
    engagement: 47.8,
  };

  const stats = [
    { label: 'Profil Görüntüleme', value: analytics.views, change: '+%12', icon: Eye, color: 'from-blue-500/20 to-blue-600/20' },
    { label: 'Link Tıklamaları', value: analytics.clicks, change: '+%8', icon: MousePointer, color: 'from-purple-500/20 to-purple-600/20' },
    { label: 'Profil Paylaşımları', value: analytics.shares, change: '+%24', icon: Share2, color: 'from-green-500/20 to-green-600/20' },
    { label: 'Tekil Ziyaretçi', value: analytics.visitors, change: '+%5', icon: Users, color: 'from-orange-500/20 to-orange-600/20' },
  ];

  const chartData = [
    { day: 'Pzt', views: 120, clicks: 95 },
    { day: 'Sal', views: 240, clicks: 120 },
    { day: 'Çar', views: 180, clicks: 98 },
    { day: 'Per', views: 280, clicks: 200 },
    { day: 'Cum', views: 190, clicks: 130 },
    { day: 'Cmt', views: 220, clicks: 110 },
    { day: 'Paz', views: 150, clicks: 80 },
  ];

  const recentActivity = [
    { action: 'Profil görüntülendi', count: 123, time: 'Son 24 saat' },
    { action: 'Bio tıklandı', count: 45, time: 'Son 24 saat' },
    { action: 'Profil paylaşıldı', count: 12, time: 'Son 24 saat' },
    { action: 'Yeni takipçi', count: 8, time: 'Son 24 saat' },
  ];

  const maxValue = Math.max(...chartData.map(d => d.views));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Analitik</h1>
            </div>
            <p className="text-muted-foreground">
              Profil performansınızı ve etkileşim metriklerini takip edin
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-secondary/30 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Son 7 gün
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className={`p-6 border-border/50 bg-gradient-to-br ${stat.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-background/50">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card className="p-8 border-border/50">
            <h2 className="text-lg font-semibold mb-6">Haftalık Trafik</h2>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-muted-foreground">Profil Görüntüleme</p>
                  <p className="text-2xl font-bold text-primary">{analytics.views}</p>
                </div>
                <div className="flex items-end justify-between gap-2 h-32">
                  {chartData.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.views / maxValue) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-lg hover:shadow-lg transition-shadow group cursor-pointer relative"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-foreground text-background px-2 py-1 rounded whitespace-nowrap">
                        {data.views}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                  {chartData.map((data, index) => <span key={index}>{data.day}</span>)}
                </div>
              </div>

              <div className="pt-4 border-t border-border/30">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-muted-foreground">Link Tıklamaları</p>
                  <p className="text-2xl font-bold text-accent">{analytics.clicks}</p>
                </div>
                <div className="flex items-end justify-between gap-2 h-32">
                  {chartData.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.clicks / 200) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="flex-1 bg-gradient-to-t from-accent to-primary rounded-t-lg hover:shadow-lg transition-shadow group cursor-pointer relative"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-foreground text-background px-2 py-1 rounded whitespace-nowrap">
                        {data.clicks}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                  {chartData.map((data, index) => <span key={index}>{data.day}</span>)}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-1">
          <Card className="p-6 border-border/50 h-full">
            <h2 className="text-lg font-semibold mb-6">Son Aktiviteler</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <span className="text-lg font-bold text-primary">{activity.count}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border/30">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">Etkileşim Oranı</p>
                <span className="text-2xl font-bold text-primary">{analytics.engagement}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary/50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analytics.engagement}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Harika etkileşim! Böyle devam edin 🎉
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
        <Card className="p-6 border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Performans Öngörüleri</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Profiliniz ortalama kullanıcılardan %28 daha iyi performans gösteriyor</li>
                <li>✓ Perşembe en yüksek etkileşimi yaşadı — o gün daha fazla içerik paylaşmayı deneyin</li>
                <li>✓ Bio'nuz tüm tıklamaların %67'sini oluşturuyor — daha da çekici hale getirin</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
