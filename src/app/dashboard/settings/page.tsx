'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Settings, Bell, Lock, Eye, CheckCircle2, Copy, Share2, Download } from 'lucide-react';


interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: { primary: string; secondary: string; accent: string };
  isPremium: boolean;
}

const THEMES: Theme[] = [
  { id: 'minimal-light', name: 'Minimal Açık', description: 'Temiz ve profesyonel açık tema', preview: 'bg-white', colors: { primary: '#5800d4', secondary: '#f0f0f0', accent: '#a855f7' }, isPremium: false },
  { id: 'minimal-dark', name: 'Minimal Koyu', description: 'Temiz ve profesyonel koyu tema', preview: 'bg-slate-900', colors: { primary: '#a855f7', secondary: '#1e293b', accent: '#d946ef' }, isPremium: false },
  { id: 'ocean-breeze', name: 'Okyanus Esintisi', description: 'Sakin okyanus ilhamlı tema', preview: 'bg-gradient-to-br from-blue-50 to-cyan-50', colors: { primary: '#0369a1', secondary: '#e0f2fe', accent: '#06b6d4' }, isPremium: true },
  { id: 'sunset-glow', name: 'Gün Batımı Parıltısı', description: 'Sıcak ve enerjik gün batımı teması', preview: 'bg-gradient-to-br from-orange-50 to-red-50', colors: { primary: '#ea580c', secondary: '#fef3c7', accent: '#f97316' }, isPremium: true },
  { id: 'forest-sage', name: 'Orman Yeşili', description: 'Sakin odaklanma için doğal yeşil tema', preview: 'bg-gradient-to-br from-green-50 to-emerald-50', colors: { primary: '#16a34a', secondary: '#d1fae5', accent: '#10b981' }, isPremium: true },
  { id: 'midnight-purple', name: 'Gece Yarısı Moru', description: 'Derin ve sofistike mor tema', preview: 'bg-gradient-to-br from-purple-950 to-indigo-950', colors: { primary: '#a855f7', secondary: '#1e1b4b', accent: '#818cf8' }, isPremium: true },
  { id: 'rose-garden', name: 'Gül Bahçesi', description: 'Zarif gül ve pembe tema', preview: 'bg-gradient-to-br from-rose-50 to-pink-50', colors: { primary: '#e11d48', secondary: '#ffe4e6', accent: '#f43f5e' }, isPremium: true },
  { id: 'cyber-neon', name: 'Siber Neon', description: 'Cesur ve modern neon teması', preview: 'bg-gradient-to-br from-gray-950 to-slate-900', colors: { primary: '#00ff88', secondary: '#0a0a0a', accent: '#ff00ff' }, isPremium: true },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('minimal-light');
  const [profileUrl, setProfileUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  const currentTheme = THEMES.find(t => t.id === selectedTheme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
      // Kaydedilmiş renk temasını yükle
      const savedColorTheme = localStorage.getItem('biopath_color_theme');
      if (savedColorTheme) {
        try {
          const parsed = JSON.parse(savedColorTheme);
          const idx = THEMES.findIndex(t => t.id === parsed.id);
          if (idx >= 0) setSelectedTheme(THEMES[idx].id);
        } catch { /* ignore */ }
      }
    }
  }, []);

  // Renk teması seçildiğinde GERÇEK CSS değişkenlerini güncelle
  const applyColorTheme = (themeOption: Theme) => {
    setSelectedTheme(themeOption.id);
    const root = document.documentElement;
    const { primary, secondary, accent } = themeOption.colors;

    // Hex degerleri dogrudan CSS custom properties olarak yaz
    // CSS custom properties her renk formatini destekler (hex, rgb, oklch, hsl)
    root.style.setProperty('--primary', primary);
    root.style.setProperty('--primary-foreground', '#ffffff');
    root.style.setProperty('--ring', primary);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-foreground', '#ffffff');
    root.style.setProperty('--chart-1', primary);
    root.style.setProperty('--chart-2', accent);
    root.style.setProperty('--chart-5', accent);
    root.style.setProperty('--sidebar-primary', primary);
    root.style.setProperty('--sidebar-primary-foreground', '#ffffff');
    root.style.setProperty('--sidebar-accent', accent);
    root.style.setProperty('--sidebar-accent-foreground', '#ffffff');
    root.style.setProperty('--sidebar-ring', primary);
    root.style.setProperty('--secondary', secondary);

    // localStorage'a kaydet
    localStorage.setItem('biopath_color_theme', JSON.stringify({
      id: themeOption.id,
      primary, secondary, accent,
    }));
  };

  const handleCopyUrl = () => {
    const url = `${baseUrl || 'https://localhost:3000'}/profile/${profileUrl || 'kullanici-adi'}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const THEME_LABELS: Record<string, string> = { light: 'Açık', dark: 'Koyu', system: 'Sistem' };

  // Gercek profil verisini oku
  const getProfileData = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
        if (profile) {
          return {
            fullName: profile.full_name || 'Kullanici',
            bio: profile.bio || '',
            location: profile.location || '',
            website: profile.website || '',
            email: user.email || '',
            username: profile.username || profileUrl || 'kullanici',
            repositories: (profile.repositories || []).map((r: any) => ({ name: r.name, url: r.url, description: r.description })),
          };
        }
      }
    } catch { /* fallback */ }
    // Fallback: localStorage'dan oku
    try {
      const saved = localStorage.getItem('biopath_profile');
      if (saved) {
        const p = JSON.parse(saved);
        return { fullName: p.fullName || 'Kullanici', bio: p.bio || '', location: p.location || '', website: p.website || '', email: p.email || '', username: profileUrl || 'kullanici', repositories: [] };
      }
    } catch { /* ignore */ }
    return { fullName: 'Kullanici Adi', bio: 'BioPath Pro kullanicisi', location: '', website: '', email: '', username: profileUrl || 'kullanici', repositories: [] };
  };

  const handleExportPDF = async () => {
    const { exportToPDF } = await import('@/lib/export');
    const profileData = await getProfileData();
    await exportToPDF(profileData, `${profileData.fullName.replace(/\s+/g, '-')}-profil.pdf`);
  };

  const handleExportVCF = async () => {
    const { exportToVCF } = await import('@/lib/export');
    const profileData = await getProfileData();
    exportToVCF(profileData, `${profileData.fullName.replace(/\s+/g, '-')}.vcf`);
  };

  const handleShareLink = () => {
    const url = `${baseUrl || window.location.origin}/profile/${profileUrl || 'kullanici-adi'}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Ayarlar</h1>
        </div>
        <p className="text-muted-foreground">
          Profil görünümünüzü özelleştirin ve hesabınızı yönetin
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
          <Card className="p-6 border-border/50 sticky top-24 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Görünüm</h3>
              <div className="space-y-2">
                {['light', 'dark', 'system'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      theme === t ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    {THEME_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/50">
              <h3 className="font-semibold">Profil URL'si</h3>
              <div className="space-y-2">
                <Label htmlFor="profileUrl" className="text-xs">Kullanıcı adınız</Label>
                <Input
                  id="profileUrl"
                  placeholder="kullanici-adi"
                  value={profileUrl}
                  onChange={e => setProfileUrl(e.target.value)}
                  className="bg-background border-border/50 text-sm"
                />
              </div>
              <div className="p-2 rounded-lg bg-secondary/30 text-xs text-muted-foreground break-all">
                {baseUrl}/profile/{profileUrl || 'kullanici-adi'}
              </div>
              <Button onClick={handleCopyUrl} size="sm" variant="outline" className="w-full border-border/50">
                {copied ? (
                  <><CheckCircle2 className="w-4 h-4 mr-2" />Kopyalandı!</>
                ) : (
                  <><Copy className="w-4 h-4 mr-2" />Bağlantıyı Kopyala</>
                )}
              </Button>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/50">
              <h3 className="font-semibold">Bildirimler</h3>
              <div className="space-y-2 text-sm">
                {['Görüntülemeler', 'Yorumlar', 'Paylaşımlar'].map(notif => (
                  <label key={notif} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border/50" />
                    <span className="text-foreground">{notif}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
          <div className="space-y-6">
            {currentTheme && (
              <motion.div key={currentTheme.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8 border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Mevcut Tema</h3>
                  <div className={`p-12 rounded-xl ${currentTheme.preview} mb-4 border border-border/30`}>
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: currentTheme.colors.primary }} />
                      <p className="text-sm text-muted-foreground">Ana Renk</p>
                      <p className="text-xs font-mono">{currentTheme.colors.primary}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Ana</p>
                      <div className="w-full h-12 rounded-lg border border-border/30" style={{ backgroundColor: currentTheme.colors.primary }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">İkincil</p>
                      <div className="w-full h-12 rounded-lg border border-border/30" style={{ backgroundColor: currentTheme.colors.secondary }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Vurgu</p>
                      <div className="w-full h-12 rounded-lg border border-border/30" style={{ backgroundColor: currentTheme.colors.accent }} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4">Mevcut Temalar</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {THEMES.map((themeOption, index) => (
                  <motion.div key={themeOption.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <button
                      onClick={() => applyColorTheme(themeOption)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left group ${
                        selectedTheme === themeOption.id ? 'border-primary bg-primary/5' : 'border-border/30 hover:border-border/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-sm">{themeOption.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{themeOption.description}</p>
                        </div>
                        {themeOption.isPremium && (
                          <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">Pro</span>
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${themeOption.preview} border border-border/30 mb-3`}>
                        <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: themeOption.colors.primary }} />
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: themeOption.colors.secondary }} />
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: themeOption.colors.accent }} />
                        </div>
                      </div>
                      <Button size="sm" className="w-full" variant={selectedTheme === themeOption.id ? 'default' : 'outline'}>
                        {selectedTheme === themeOption.id ? (
                          <><CheckCircle2 className="w-4 h-4 mr-2" />Seçildi</>
                        ) : 'Temayı Seç'}
                      </Button>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* QR Kod */}
            <Card className="p-6 border-border/50">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Profil QR Kodu
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Bu QR kodu profilinize yonlendirir. Profil bilgileriniz degistikce otomatik guncellenir.
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-white rounded-xl border border-border/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      `${baseUrl || 'https://biopathpro.com'}/profile/${profileUrl || 'kullanici-adi'}`
                    )}&color=5800d4`}
                    alt="Profil QR Kodu"
                    width={200}
                    height={200}
                    className="rounded"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center break-all max-w-[250px]">
                  {baseUrl || 'https://biopathpro.com'}/profile/{profileUrl || 'kullanici-adi'}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-border/50"
                    onClick={() => {
                      const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(`${baseUrl || 'https://biopathpro.com'}/profile/${profileUrl || 'kullanici-adi'}`)}&color=5800d4`;
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'biopath-qr.png';
                      a.target = '_blank';
                      a.click();
                    }}>
                    <Download className="w-4 h-4 mr-2" />QR İndir
                  </Button>
                  <Button size="sm" variant="outline" className="border-border/50" onClick={handleCopyUrl}>
                    {copied ? <><CheckCircle2 className="w-4 h-4 mr-2" />Kopyalandı!</> : <><Copy className="w-4 h-4 mr-2" />Link Kopyala</>}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Disa Aktar */}
            <Card className="p-6 border-border/50">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Profili Dışa Aktar
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <Button variant="outline" className="border-border/50" onClick={handleExportPDF}>
                  <Download className="w-4 h-4 mr-2" />PDF
                </Button>
                <Button variant="outline" className="border-border/50" onClick={handleShareLink}>
                  <Share2 className="w-4 h-4 mr-2" />Bağlantı Paylaş
                </Button>
                <Button variant="outline" className="border-border/50" onClick={handleExportVCF}>
                  <Copy className="w-4 h-4 mr-2" />VCF
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
