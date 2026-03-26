'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  TrendingUp,
  Eye,
  MousePointer,
  Share2,
  Users,
  ArrowUpRight,
  Calendar,
  X,
  ChevronRight,
} from 'lucide-react';

interface AnalyticsData {
  views: number;
  clicks: number;
  shares: number;
  visitors: number;
  engagement: number;
}

interface StatDetail {
  key: string;
  label: string;
  value: number;
  change: string;
  icon: React.ElementType;
  color: string;
  description: string;
  weeklyData: { day: string; value: number }[];
  insights: string[];
  breakdown: { label: string; value: number; percent: number }[];
}

export default function AnalyticsPage() {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const analytics: AnalyticsData = {
    views: 1234,
    clicks: 589,
    shares: 128,
    visitors: 342,
    engagement: 47.8,
  };

  const statDetails: StatDetail[] = [
    {
      key: 'views',
      label: 'Profil Görüntüleme',
      value: analytics.views,
      change: '+%12',
      icon: Eye,
      color: 'from-blue-500/20 to-blue-600/20',
      description: 'Profilinizin toplam görüntülenme sayısı. Son 7 günün detaylı dağılımı aşağıda.',
      weeklyData: [
        { day: 'Pzt', value: 145 },
        { day: 'Sal', value: 198 },
        { day: 'Çar', value: 167 },
        { day: 'Per', value: 245 },
        { day: 'Cum', value: 189 },
        { day: 'Cmt', value: 156 },
        { day: 'Paz', value: 134 },
      ],
      insights: [
        'Perşembe günleri en yüksek görüntüleme alıyorsunuz',
        'Hafta sonu görüntülemeler %18 düşüyor',
        'Geçen haftaya göre %12 artış var',
      ],
      breakdown: [
        { label: 'Doğrudan Ziyaret', value: 456, percent: 37 },
        { label: 'Arama Motoru', value: 321, percent: 26 },
        { label: 'Sosyal Medya', value: 284, percent: 23 },
        { label: 'Referans Linkleri', value: 173, percent: 14 },
      ],
    },
    {
      key: 'clicks',
      label: 'Link Tıklamaları',
      value: analytics.clicks,
      change: '+%8',
      icon: MousePointer,
      color: 'from-purple-500/20 to-purple-600/20',
      description: 'Profilinizdeki linklere yapılan toplam tıklama. Hangi linklerin daha çok tıklandığını görün.',
      weeklyData: [
        { day: 'Pzt', value: 72 },
        { day: 'Sal', value: 95 },
        { day: 'Çar', value: 83 },
        { day: 'Per', value: 112 },
        { day: 'Cum', value: 88 },
        { day: 'Cmt', value: 76 },
        { day: 'Paz', value: 63 },
      ],
      insights: [
        'GitHub linkiniz en çok tıklanan link (%42)',
        'LinkedIn linkiniz ikinci sırada (%28)',
        'Ortalama tıklama oranı %47.8',
      ],
      breakdown: [
        { label: 'GitHub Profili', value: 247, percent: 42 },
        { label: 'LinkedIn', value: 165, percent: 28 },
        { label: 'Kişisel Website', value: 106, percent: 18 },
        { label: 'Diğer Linkler', value: 71, percent: 12 },
      ],
    },
    {
      key: 'shares',
      label: 'Profil Paylaşımları',
      value: analytics.shares,
      change: '+%24',
      icon: Share2,
      color: 'from-green-500/20 to-green-600/20',
      description: 'Profilinizin paylaşılma sayısı. Paylaşım kanallarını ve trendleri inceleyin.',
      weeklyData: [
        { day: 'Pzt', value: 15 },
        { day: 'Sal', value: 22 },
        { day: 'Çar', value: 18 },
        { day: 'Per', value: 28 },
        { day: 'Cum', value: 20 },
        { day: 'Cmt', value: 14 },
        { day: 'Paz', value: 11 },
      ],
      insights: [
        'Paylaşımlarınız geçen haftaya göre %24 arttı',
        'QR kod paylaşımları en hızlı büyüyen kanal',
        'Her paylaşım ortalama 3.2 yeni ziyaretçi getiriyor',
      ],
      breakdown: [
        { label: 'Bağlantı Kopyalama', value: 52, percent: 41 },
        { label: 'QR Kod', value: 38, percent: 30 },
        { label: 'Sosyal Medya', value: 25, percent: 19 },
        { label: 'E-posta', value: 13, percent: 10 },
      ],
    },
    {
      key: 'visitors',
      label: 'Tekil Ziyaretçi',
      value: analytics.visitors,
      change: '+%5',
      icon: Users,
      color: 'from-orange-500/20 to-orange-600/20',
      description: 'Profilinizi ziyaret eden benzersiz kişi sayısı. Geri dönen ve yeni ziyaretçi oranlarını görün.',
      weeklyData: [
        { day: 'Pzt', value: 42 },
        { day: 'Sal', value: 56 },
        { day: 'Çar', value: 48 },
        { day: 'Per', value: 67 },
        { day: 'Cum', value: 52 },
        { day: 'Cmt', value: 41 },
        { day: 'Paz', value: 36 },
      ],
      insights: [
        'Yeni ziyaretçi oranı %68, geri dönen %32',
        'Ortalama oturum süresi 2 dk 45 sn',
        'Mobil ziyaretçiler %62, masaüstü %38',
      ],
      breakdown: [
        { label: 'Yeni Ziyaretçi', value: 233, percent: 68 },
        { label: 'Geri Dönen', value: 109, percent: 32 },
      ],
    },
  ];

  const selectedDetail = statDetails.find(s => s.key === selectedStat);

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
              Profil performansınızı ve etkileşim metriklerini takip edin. Kartlara tıklayarak detaylı analiz görün.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-secondary/30 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Son 7 gün
          </div>
        </div>
      </motion.div>

      {/* Stat Kartları - Tıklanabilir */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statDetails.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <button
                onClick={() => setSelectedStat(selectedStat === stat.key ? null : stat.key)}
                className="w-full text-left"
              >
                <Card className={`p-6 border-border/50 bg-gradient-to-br ${stat.color} hover:shadow-lg transition-all cursor-pointer ${selectedStat === stat.key ? 'ring-2 ring-primary shadow-lg' : ''}`}>
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
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${selectedStat === stat.key ? 'rotate-90' : ''}`} />
                  </div>
                </Card>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Detay Paneli - Tıklanınca Açılır */}
      <AnimatePresence>
        {selectedDetail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <Card className="p-8 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    {(() => { const Icon = selectedDetail.icon; return <Icon className="w-6 h-6 text-primary" />; })()}
                    {selectedDetail.label} - Detaylı Analiz
                  </h2>
                  <p className="text-muted-foreground mt-1">{selectedDetail.description}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedStat(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Haftalık Grafik */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Haftalık Dağılım</h3>
                  <div className="space-y-3">
                    {selectedDetail.weeklyData.map((d, i) => {
                      const maxVal = Math.max(...selectedDetail.weeklyData.map(x => x.value));
                      const pct = maxVal > 0 ? (d.value / maxVal) * 100 : 0;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xs font-medium text-muted-foreground w-8">{d.day}</span>
                          <div className="flex-1 h-6 bg-secondary/30 rounded-lg overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ delay: i * 0.05, duration: 0.5 }}
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-lg"
                            />
                          </div>
                          <span className="text-sm font-bold w-10 text-right">{d.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kaynak Dağılımı + İçgörüler */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Kaynak Dağılımı</h3>
                    <div className="space-y-3">
                      {selectedDetail.breakdown.map((b, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-card">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-8 rounded-full bg-gradient-to-b from-primary to-accent" style={{ opacity: 1 - i * 0.2 }} />
                            <div>
                              <p className="text-sm font-medium">{b.label}</p>
                              <p className="text-xs text-muted-foreground">{b.value} ({b.percent}%)</p>
                            </div>
                          </div>
                          <div className="w-24 h-2 bg-secondary/30 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${b.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">İçgörüler</h3>
                    <ul className="space-y-2">
                      {selectedDetail.insights.map((insight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">&#x2713;</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Haftalık Trafik Grafiği */}
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
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
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
                <li>&#x2713; Profiliniz ortalama kullanıcılardan %28 daha iyi performans gösteriyor</li>
                <li>&#x2713; Perşembe en yüksek etkileşimi yaşadı — o gün daha fazla içerik paylaşmayı deneyin</li>
                <li>&#x2713; Bio&apos;nuz tüm tıklamaların %67&apos;sini oluşturuyor — daha da çekici hale getirin</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
