'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Github, ExternalLink, Star, GitFork, Code2,
  Search, Loader2, CheckCircle2, AlertCircle, Copy,
} from 'lucide-react';
import { fetchUserRepositories } from '@/lib/github';
import type { GitHubRepo } from '@/lib/github';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '', bio: '', location: '', website: '',
    githubUsername: '', username: '',
  });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [reposError, setReposError] = useState('');
  const [selectedRepos, setSelectedRepos] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [urlCopied, setUrlCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth/login'); return; }
      setUser(user);

      // Mevcut profili yükle
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setFormData({
          fullName: profile.full_name || user.user_metadata?.full_name || '',
          bio: profile.bio || '',
          location: profile.location || '',
          website: profile.website || '',
          githubUsername: profile.github_username || '',
          username: profile.username || '',
        });
        if (profile.repositories) {
          const repoIds = profile.repositories.map((r: any) => r.id);
          setSelectedRepos(repoIds);
        }
        if (profile.username) {
          setProfileUrl(`${window.location.origin}/profile/${profile.username}`);
        }
      } else {
        // İlk kayıt - kullanıcı adını e-postadan türet
        const defaultUsername = user.email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
        setFormData(prev => ({
          ...prev,
          fullName: user.user_metadata?.full_name || '',
          username: defaultUsername,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFetchRepos = async () => {
    if (!formData.githubUsername) { setReposError('Lütfen GitHub kullanıcı adınızı girin'); return; }
    setIsLoadingRepos(true); setReposError(''); setRepos([]);
    try {
      const fetched = await fetchUserRepositories(formData.githubUsername, 30);
      setRepos(fetched);
    } catch {
      setReposError('Depolar getirilemedi. Lütfen kullanıcı adını kontrol edip tekrar deneyin.');
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const toggleRepoSelection = (repoId: number) => {
    setSelectedRepos(prev => prev.includes(repoId) ? prev.filter(id => id !== repoId) : [...prev, repoId]);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    if (!formData.username) { setSaveError('Kullanıcı adı zorunludur'); return; }
    if (!/^[a-z0-9-]+$/.test(formData.username)) {
      setSaveError('Kullanıcı adı sadece küçük harf, rakam ve tire içerebilir');
      return;
    }

    setIsSaving(true); setSaveError(''); setSaveSuccess(false);

    try {
      const selectedRepoData = repos.filter(r => selectedRepos.includes(r.id)).map(r => ({
        id: r.id, name: r.name, description: r.description,
        url: r.url, stars: r.stars, forks: r.forks, language: r.language,
      }));

      const profileData = {
        user_id: user.id,
        username: formData.username.toLowerCase(),
        full_name: formData.fullName,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        github_username: formData.githubUsername,
        repositories: selectedRepoData,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) {
        if (error.message.includes('unique') || error.code === '23505') {
          setSaveError('Bu kullanıcı adı zaten alınmış. Farklı bir tane deneyin.');
        } else {
          setSaveError('Kaydetme sırasında hata oluştu: ' + error.message);
        }
        return;
      }

      setSaveSuccess(true);
      const url = `${window.location.origin}/profile/${formData.username}`;
      setProfileUrl(url);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError('Beklenmeyen bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profiliniz</h1>
        <p className="text-muted-foreground">Profesyonel profilinizi düzenleyin ve herkese açık bağlantınızı paylaşın</p>
      </motion.div>

      {/* Profil URL Göster */}
      {profileUrl && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Herkese açık profil bağlantınız</p>
            <a href={profileUrl} target="_blank" rel="noopener noreferrer"
              className="text-primary font-medium hover:underline text-sm break-all">
              {profileUrl}
            </a>
          </div>
          <Button size="sm" variant="outline" onClick={handleCopyUrl} className="flex-shrink-0">
            {urlCopied ? <><CheckCircle2 className="w-4 h-4 mr-1" />Kopyalandı</> : <><Copy className="w-4 h-4 mr-1" />Kopyala</>}
          </Button>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
          <Card className="p-8 border-border/50">
            <h2 className="text-2xl font-bold mb-6">Temel Bilgiler</h2>
            <div className="space-y-6">

              {/* Kullanıcı Adı */}
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı * <span className="text-xs text-muted-foreground">(profilinizin URL'si olacak)</span></Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">/profile/</span>
                  <Input id="username" name="username" placeholder="kullanici-adi"
                    value={formData.username} onChange={handleFormChange}
                    className="bg-background border-border/50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Ad Soyad</Label>
                <Input id="fullName" name="fullName" placeholder="Ahmet Yılmaz"
                  value={formData.fullName} onChange={handleFormChange}
                  className="bg-background border-border/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biyografi</Label>
                <Textarea id="bio" name="bio" placeholder="Kendinizden bahsedin"
                  value={formData.bio} onChange={handleFormChange}
                  className="bg-background border-border/50 resize-none h-24" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Konum</Label>
                  <Input id="location" name="location" placeholder="İstanbul, Türkiye"
                    value={formData.location} onChange={handleFormChange}
                    className="bg-background border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Web Sitesi</Label>
                  <Input id="website" name="website" placeholder="https://siteniz.com"
                    value={formData.website} onChange={handleFormChange}
                    className="bg-background border-border/50" />
                </div>
              </div>

              {/* GitHub */}
              <div className="pt-6 border-t border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Github className="w-5 h-5" /> GitHub Entegrasyonu
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="githubUsername">GitHub Kullanıcı Adı</Label>
                  <div className="flex gap-2">
                    <Input id="githubUsername" name="githubUsername" placeholder="ör. torvalds"
                      value={formData.githubUsername} onChange={handleFormChange}
                      className="flex-1 bg-background border-border/50" disabled={isLoadingRepos} />
                    <Button onClick={handleFetchRepos} disabled={isLoadingRepos || !formData.githubUsername}
                      variant="outline" className="border-border/50">
                      {isLoadingRepos ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      <span className="ml-2 hidden sm:inline">Getir</span>
                    </Button>
                  </div>
                </div>
                {reposError && (
                  <div className="mt-3 p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />{reposError}
                  </div>
                )}
              </div>

              {/* Hata / Başarı */}
              {saveError && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm">
                  {saveError}
                </div>
              )}
              {saveSuccess && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Profil başarıyla kaydedildi!
                </motion.div>
              )}

              <Button onClick={handleSaveProfile} disabled={isSaving}
                className="w-full bg-primary hover:bg-primary/90 text-lg h-11 mt-8">
                {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Kaydediliyor...</> : 'Profili Kaydet'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Önizleme */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="p-6 border-border/50 sticky top-24">
            <h3 className="font-semibold mb-4">Önizleme</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">İsim</p>
                <p className="text-lg font-semibold">{formData.fullName || 'Adınız'}</p>
              </div>
              {formData.username && (
                <div>
                  <p className="text-xs text-muted-foreground">Kullanıcı Adı</p>
                  <p className="text-sm text-primary">@{formData.username}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground">Biyografi</p>
                <p className="text-sm text-foreground">{formData.bio || 'Profesyonel biyografiniz burada görünecek'}</p>
              </div>
              {formData.location && (
                <div>
                  <p className="text-xs text-muted-foreground">Konum</p>
                  <p className="text-sm text-foreground">{formData.location}</p>
                </div>
              )}
              {selectedRepos.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">{selectedRepos.length} depo seçili</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Depolar */}
      {repos.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
          <Card className="p-8 border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Depolarınız</h2>
              <span className="text-sm text-muted-foreground">{selectedRepos.length}/{repos.length} seçildi</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {repos.map((repo, index) => (
                <motion.div key={repo.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * Math.min(index, 8) }}
                  onClick={() => toggleRepoSelection(repo.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedRepos.includes(repo.id) ? 'border-primary/50 bg-primary/5' : 'border-border/30 hover:border-border/50 bg-background/50'
                  }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2 flex-1">
                      <Code2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-semibold truncate text-sm">{repo.name}</h3>
                        {repo.description && <p className="text-xs text-muted-foreground truncate mt-1">{repo.description}</p>}
                      </div>
                    </div>
                    {selectedRepos.includes(repo.id) && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="w-3 h-3" />{repo.stars}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground"><GitFork className="w-3 h-3" />{repo.forks}</div>
                    {repo.language && <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{repo.language}</span>}
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="ml-auto text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            {selectedRepos.length > 0 && (
              <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full mt-6 bg-primary hover:bg-primary/90">
                {isSaving ? 'Kaydediliyor...' : `${selectedRepos.length} Depoyla Profili Kaydet`}
              </Button>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
