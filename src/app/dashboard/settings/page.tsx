'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Palette,
  Settings,
  Bell,
  Lock,
  Eye,
  CheckCircle2,
  Copy,
  Share2,
  Download,
} from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  isPremium: boolean;
}

const THEMES: Theme[] = [
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Clean and professional light theme',
    preview: 'bg-white',
    colors: {
      primary: '#5800d4',
      secondary: '#f0f0f0',
      accent: '#a855f7',
    },
    isPremium: false,
  },
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    description: 'Clean and professional dark theme',
    preview: 'bg-slate-900',
    colors: {
      primary: '#a855f7',
      secondary: '#1e293b',
      accent: '#d946ef',
    },
    isPremium: false,
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: 'Calm ocean-inspired theme',
    preview: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    colors: {
      primary: '#0369a1',
      secondary: '#e0f2fe',
      accent: '#06b6d4',
    },
    isPremium: true,
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    description: 'Warm and energetic sunset theme',
    preview: 'bg-gradient-to-br from-orange-50 to-red-50',
    colors: {
      primary: '#ea580c',
      secondary: '#fef3c7',
      accent: '#f97316',
    },
    isPremium: true,
  },
  {
    id: 'forest-sage',
    name: 'Forest Sage',
    description: 'Natural green theme for calm focus',
    preview: 'bg-gradient-to-br from-green-50 to-emerald-50',
    colors: {
      primary: '#15803d',
      secondary: '#f0fdf4',
      accent: '#22c55e',
    },
    isPremium: true,
  },
  {
    id: 'midnight-purple',
    name: 'Midnight Purple',
    description: 'Deep and sophisticated purple theme',
    preview: 'bg-gradient-to-br from-purple-900 to-indigo-900',
    colors: {
      primary: '#a855f7',
      secondary: '#312e81',
      accent: '#d946ef',
    },
    isPremium: true,
  },
  {
    id: 'rose-garden',
    name: 'Rose Garden',
    description: 'Elegant rose and pink theme',
    preview: 'bg-gradient-to-br from-rose-50 to-pink-50',
    colors: {
      primary: '#be185d',
      secondary: '#ffe4e6',
      accent: '#ec4899',
    },
    isPremium: true,
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Bold and modern neon theme',
    preview: 'bg-slate-950',
    colors: {
      primary: '#00ff00',
      secondary: '#0a0e27',
      accent: '#ff00ff',
    },
    isPremium: true,
  },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('minimal-light');
  const [profileUrl, setProfileUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  const currentTheme = THEMES.find(t => t.id === selectedTheme);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const handleCopyUrl = () => {
    const url = `${baseUrl || 'https://localhost:3000'}/profile/${profileUrl || 'your-username'}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Customize your profile appearance and manage your account
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="p-6 border-border/50 sticky top-24 space-y-6">
            {/* Theme Toggle */}
            <div className="space-y-4">
              <h3 className="font-semibold">Display</h3>
              <div className="space-y-2">
                {['light', 'dark', 'system'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      theme === t
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile URL */}
            <div className="space-y-3 pt-4 border-t border-border/50">
              <h3 className="font-semibold">Profile URL</h3>
              <div className="space-y-2">
                <Label htmlFor="profileUrl" className="text-xs">
                  Your username
                </Label>
                <Input
                  id="profileUrl"
                  placeholder="your-username"
                  value={profileUrl}
                  onChange={e => setProfileUrl(e.target.value)}
                  className="bg-background border-border/50 text-sm"
                />
              </div>
              <div className="p-2 rounded-lg bg-secondary/30 text-xs text-muted-foreground break-all">
                {baseUrl}/profile/{profileUrl || 'your-username'}
              </div>
              <Button
                onClick={handleCopyUrl}
                size="sm"
                variant="outline"
                className="w-full border-border/50"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>

            {/* Notifications */}
            <div className="space-y-3 pt-4 border-t border-border/50">
              <h3 className="font-semibold">Notifications</h3>
              <div className="space-y-2 text-sm">
                {['Views', 'Comments', 'Shares'].map(notif => (
                  <label key={notif} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-border/50"
                    />
                    <span className="text-foreground">{notif}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Column - Theme Selector */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="space-y-6">
            {/* Current Theme Preview */}
            {currentTheme && (
              <motion.div
                key={currentTheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-8 border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Current Theme</h3>
                  <div className={`p-12 rounded-xl ${currentTheme.preview} mb-4 border border-border/30`}>
                    <div className="space-y-2">
                      <div
                        className="w-16 h-16 rounded-lg"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                      />
                      <p className="text-sm text-muted-foreground">Primary Color</p>
                      <p className="text-xs font-mono">{currentTheme.colors.primary}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Primary</p>
                      <div className="w-full h-12 rounded-lg border border-border/30" style={{ backgroundColor: currentTheme.colors.primary }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Secondary</p>
                      <div className="w-full h-12 rounded-lg border border-border/30" style={{ backgroundColor: currentTheme.colors.secondary }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Accent</p>
                      <div className="w-full h-12 rounded-lg border border-border/30" style={{ backgroundColor: currentTheme.colors.accent }} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Theme Grid */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Available Themes</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {THEMES.map((themeOption, index) => (
                  <motion.div
                    key={themeOption.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handleThemeChange(themeOption.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left group ${
                        selectedTheme === themeOption.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border/30 hover:border-border/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-sm">{themeOption.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {themeOption.description}
                          </p>
                        </div>
                        {themeOption.isPremium && (
                          <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
                            Pro
                          </span>
                        )}
                      </div>

                      {/* Color Preview */}
                      <div className={`p-3 rounded-lg ${themeOption.preview} border border-border/30 mb-3`}>
                        <div className="flex gap-2">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: themeOption.colors.primary }}
                          />
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: themeOption.colors.secondary }}
                          />
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: themeOption.colors.accent }}
                          />
                        </div>
                      </div>

                      {/* Select Button */}
                      <Button
                        size="sm"
                        className="w-full"
                        variant={selectedTheme === themeOption.id ? 'default' : 'outline'}
                      >
                        {selectedTheme === themeOption.id ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          'Select Theme'
                        )}
                      </Button>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Export Settings */}
            <Card className="p-6 border-border/50">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Profile
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <Button variant="outline" className="border-border/50">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" className="border-border/50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link
                </Button>
                <Button variant="outline" className="border-border/50">
                  <Copy className="w-4 h-4 mr-2" />
                  VCF
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
