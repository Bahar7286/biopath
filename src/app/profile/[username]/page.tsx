'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Github, Globe, Mail, Copy, Share2, ExternalLink,
  CheckCircle2, Code2, Star, GitFork, Calendar, Loader2, AlertCircle,
  Map, Circle, Target,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [resolvedParams.username]);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', resolvedParams.username.toLowerCase())
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setProfile(data);
      }
    } catch {
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const profileUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${profile?.full_name} Profili`, url: profileUrl });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  // Yükleniyor
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Profil bulunamadı
  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex p-4 rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Profil Bulunamadı</h1>
          <p className="text-muted-foreground mb-6">
            <strong>@{resolvedParams.username}</strong> kullanıcı adına sahip bir profil bulunamadı.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/"><Button variant="outline">Ana Sayfaya Dön</Button></Link>
            <Link href="/auth/signup"><Button className="bg-primary hover:bg-primary/90">Kendi Profilini Oluştur</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  const repos = profile.repositories || [];
  const joinDate = profile.created_at ? new Date(profile.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' }) : null;
  const initial = profile.full_name?.charAt(0)?.toUpperCase() || profile.username?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BioPath Pro
          </Link>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors">
              {copied ? <><CheckCircle2 className="w-4 h-4" />Kopyalandı!</> : <><Copy className="w-4 h-4" />Bağlantıyı Kopyala</>}
            </motion.button>
            <Button onClick={handleShare} variant="outline" size="icon" className="border-border/50">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex flex-col sm:flex-row items-start gap-8 mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white shadow-lg flex-shrink-0">
                {profile.avatar_url
                  ? <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full rounded-2xl object-cover" />
                  : initial
                }
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex-1">
              <h1 className="text-4xl font-bold mb-1">{profile.full_name || profile.username}</h1>
              <p className="text-xl text-primary font-semibold mb-4">@{profile.username}</p>

              {profile.bio && (
                <div className="mb-4 p-4 rounded-lg border border-border/50 bg-secondary/30">
                  <p className="text-foreground leading-relaxed">{profile.bio}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />{profile.location}
                  </div>
                )}
                {joinDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />Katılım: {joinDate}
                  </div>
                )}
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" />{profile.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {profile.github_username && (
                  <a href={`https://github.com/${profile.github_username}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Github className="w-4 h-4" />@{profile.github_username}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Yol Haritası */}
        {profile.roadmap && profile.roadmap.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Map className="w-7 h-7 text-accent" /> Yol Haritası
            </h2>
            <div className="space-y-3">
              {profile.roadmap.map((item: any, index: number) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                    item.completed
                      ? 'border-green-500/30 bg-green-500/5'
                      : 'border-border/50 bg-card'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      {item.priority && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.priority === 'high' ? 'bg-red-500/20 text-red-700 dark:text-red-400' :
                          item.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                          'bg-green-500/20 text-green-700 dark:text-green-400'
                        }`}>
                          {item.priority === 'high' ? 'Yüksek' : item.priority === 'medium' ? 'Orta' : 'Düşük'}
                        </span>
                      )}
                      {item.dueDate && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />{item.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {(() => {
              const completed = profile.roadmap.filter((r: any) => r.completed).length;
              const total = profile.roadmap.length;
              const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
              return (
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{pct}%</span>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* Projeler */}
        {repos.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Öne Çıkan Projeler</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {repos.map((repo: any, index: number) => (
                <a key={repo.id || index} href={repo.url} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-lg border border-border/50 bg-card hover:border-primary/50 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        <Code2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{repo.name}</h3>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    {repo.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{repo.description}</p>
                    )}
                    <div className="flex flex-wrap gap-3 items-center pt-4 border-t border-border/30">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="w-3 h-3" />{repo.stars}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground"><GitFork className="w-3 h-3" />{repo.forks}</div>
                      {repo.language && <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{repo.language}</span>}
                    </div>
                  </motion.div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
          <h2 className="text-2xl font-bold mb-2">Kendi profilinizi oluşturmak ister misiniz?</h2>
          <p className="text-muted-foreground mb-6">BioPath Pro ile dakikalar içinde profesyonel bir profil oluşturun.</p>
          <Link href="/auth/signup">
            <Button className="bg-primary hover:bg-primary/90">Ücretsiz Başla</Button>
          </Link>
        </motion.div>
      </main>

      <footer className="border-t border-border/50 mt-20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 BioPath Pro. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
