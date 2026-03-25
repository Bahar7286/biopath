'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Copy, ThumbsUp, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';

const TONE_OPTIONS = [
  { value: 'professional', label: 'Profesyonel' },
  { value: 'casual', label: 'Samimi & Dostane' },
  { value: 'creative', label: 'Yaratıcı & Özgün' },
];

interface GeneratedBio {
  id: string;
  text: string;
  tone: string;
  timestamp: Date;
  liked: boolean;
}

export default function AiBioPage() {
  const [formData, setFormData] = useState({
    profession: '',
    skills: '',
    experience: '5 yıl',
    tone: 'professional' as const,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bios, setBios] = useState<GeneratedBio[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToneChange = (value: string) => {
    setFormData(prev => ({ ...prev, tone: value as any }));
  };

  const handleGenerate = async () => {
    if (!formData.profession) {
      alert('Lütfen mesleğinizi girin');
      return;
    }

    setIsLoading(true);

    try {
      const mockBios = [
        `${formData.experience} deneyime sahip tutkulu bir ${formData.profession}. Yenilikçi çözümler üretme konusunda uzmanlaşmış.${formData.skills ? ` ${formData.skills} alanlarında uzmanlık.` : ''}`,
        `Mükemmelliğe ve sürekli gelişime adanmış deneyimli bir ${formData.profession}.${formData.skills ? ` ${formData.skills} konusunda güçlü bir altyapıya sahip.` : ''} Yeni zorluklarla yüzleşmeye her zaman hazır.`,
        `Teknik uzmanlığı stratejik düşünceyle birleştiren yaratıcı bir ${formData.profession}.${formData.skills ? ` ${formData.skills} konusunda yetkin.` : ''} Olağanüstü sonuçlar üretme konusunda tutkulu.`,
      ];

      await new Promise(resolve => setTimeout(resolve, 1500));

      const newBios = mockBios.map((text, index) => ({
        id: `${Date.now()}-${index}`,
        text,
        tone: formData.tone,
        timestamp: new Date(),
        liked: false,
      }));

      setBios([...newBios, ...bios]);
    } catch (error) {
      console.error('Bio oluşturma hatası:', error);
      alert('Bio oluşturulamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id: string) => {
    setBios(prevBios => prevBios.map(bio => bio.id === id ? { ...bio, liked: !bio.liked } : bio));
  };

  const toneLabel = (tone: string) => {
    const found = TONE_OPTIONS.find(o => o.value === tone);
    return found ? found.label : tone;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-accent/10">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl font-bold">AI Bio Oluşturucu</h1>
        </div>
        <p className="text-muted-foreground">
          Yapay zeka ile 3 benzersiz profesyonel bio oluşturun. Her platform için mükemmel.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
          <Card className="p-6 border-border/50 sticky top-24">
            <h2 className="text-lg font-semibold mb-6">Kendinizi Tanıtın</h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="profession">Meslek *</Label>
                <Input
                  id="profession"
                  name="profession"
                  placeholder="ör. Yazılım Mühendisi"
                  value={formData.profession}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-background border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Beceriler (virgülle ayırın)</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  placeholder="ör. React, Node.js, Python"
                  value={formData.skills}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-background border-border/50 resize-none h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Deneyim Seviyesi</Label>
                <Input
                  id="experience"
                  name="experience"
                  placeholder="ör. 5 yıl"
                  value={formData.experience}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="bg-background border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Ton</Label>
                <Select value={formData.tone} onValueChange={handleToneChange}>
                  <SelectTrigger className="bg-background border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 mt-6"
              >
                {isLoading ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />Oluşturuluyor...</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" />Bio Oluştur</>
                )}
              </Button>

              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground">
                  💡 Farklı tonlarda 3 benzersiz bio oluşturacağız. İstediğinizi profilinize kopyalayabilirsiniz!
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
          {bios.length === 0 ? (
            <Card className="p-12 border-border/50 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4 inline-flex p-4 rounded-full bg-primary/10">
                <Zap className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">Henüz bio oluşturulmadı</h3>
              <p className="text-muted-foreground">
                Bilgilerinizi doldurun ve başlamak için "Bio Oluştur"a tıklayın
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {bios.map((bio, index) => (
                <motion.div
                  key={bio.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 border-border/50 hover:border-accent/50 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-accent">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{toneLabel(bio.tone)}</p>
                          <p className="text-xs text-muted-foreground">{bio.timestamp.toLocaleTimeString('tr-TR')}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLike(bio.id)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <ThumbsUp className={`w-5 h-5 ${bio.liked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                      </motion.button>
                    </div>

                    <p className="text-foreground mb-4 leading-relaxed">{bio.text}</p>

                    <div className="flex items-center gap-2 pt-4 border-t border-border/30">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(bio.text, bio.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
                      >
                        {copiedId === bio.id ? (
                          <><CheckCircle2 className="w-4 h-4" />Kopyalandı!</>
                        ) : (
                          <><Copy className="w-4 h-4" />Kopyala</>
                        )}
                      </motion.button>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {bio.text.length} karakter
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
