'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Search,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { fetchUserRepositories } from '@/lib/github';
import type { GitHubRepo } from '@/lib/github';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    location: '',
    website: '',
    githubUsername: '',
  });

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [reposError, setReposError] = useState('');
  const [selectedRepos, setSelectedRepos] = useState<number[]>([]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFetchRepos = async () => {
    if (!formData.githubUsername) {
      setReposError('Lütfen GitHub kullanıcı adınızı girin');
      return;
    }

    setIsLoadingRepos(true);
    setReposError('');
    setRepos([]);

    try {
      const fetchedRepos = await fetchUserRepositories(formData.githubUsername, 30);
      setRepos(fetchedRepos);
    } catch (error) {
      setReposError('Depolar getirilemedi. Lütfen kullanıcı adını kontrol edip tekrar deneyin.');
      console.error(error);
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const toggleRepoSelection = (repoId: number) => {
    setSelectedRepos(prev =>
      prev.includes(repoId) ? prev.filter(id => id !== repoId) : [...prev, repoId]
    );
  };

  const handleSaveProfile = async () => {
    console.log('Profil kaydediliyor:', { formData, selectedRepos });
    alert('Profil kaydedildi! (Bu bir demo)');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profiliniz</h1>
        <p className="text-muted-foreground">
          Profesyonel profilinizi özelleştirin ve çalışmalarınızı sergileyin
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
          <Card className="p-8 border-border/50">
            <h2 className="text-2xl font-bold mb-6">Temel Bilgiler</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Ad Soyad</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Adınız ve soyadınız"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  className="bg-background border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biyografi</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Kendinizden bahsedin"
                  value={formData.bio}
                  onChange={handleFormChange}
                  className="bg-background border-border/50 resize-none h-24"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Konum</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Şehir, Ülke"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="bg-background border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Web Sitesi</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://siteniz.com"
                    value={formData.website}
                    onChange={handleFormChange}
                    className="bg-background border-border/50"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  GitHub Entegrasyonu
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubUsername">GitHub Kullanıcı Adı</Label>
                    <div className="flex gap-2">
                      <Input
                        id="githubUsername"
                        name="githubUsername"
                        placeholder="ör. torvalds"
                        value={formData.githubUsername}
                        onChange={handleFormChange}
                        className="flex-1 bg-background border-border/50"
                        disabled={isLoadingRepos}
                      />
                      <Button
                        onClick={handleFetchRepos}
                        disabled={isLoadingRepos || !formData.githubUsername}
                        variant="outline"
                        className="border-border/50"
                      >
                        {isLoadingRepos
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <Search className="w-4 h-4" />
                        }
                        <span className="ml-2 hidden sm:inline">Getir</span>
                      </Button>
                    </div>
                  </div>

                  {reposError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {reposError}
                    </motion.div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleSaveProfile}
                className="w-full bg-primary hover:bg-primary/90 text-lg h-11 mt-8"
              >
                Profili Kaydet
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="p-6 border-border/50 sticky top-24">
            <h3 className="font-semibold mb-4">Önizleme</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">İsim</p>
                <p className="text-lg font-semibold">{formData.fullName || 'Adınız'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Biyografi</p>
                <p className="text-sm text-foreground">
                  {formData.bio || 'Profesyonel biyografiniz burada görünecek'}
                </p>
              </div>
              {formData.location && (
                <div>
                  <p className="text-xs text-muted-foreground">Konum</p>
                  <p className="text-sm text-foreground">{formData.location}</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {repos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Card className="p-8 border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Depolarınız</h2>
              <span className="text-sm text-muted-foreground">
                {selectedRepos.length}/{repos.length} seçildi
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * Math.min(index, 5) }}
                  onClick={() => toggleRepoSelection(repo.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedRepos.includes(repo.id)
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border/30 hover:border-border/50 bg-background/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2 flex-1">
                      <Code2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-semibold truncate text-sm">{repo.name}</h3>
                        {repo.description && (
                          <p className="text-xs text-muted-foreground truncate mt-1">{repo.description}</p>
                        )}
                      </div>
                    </div>
                    {selectedRepos.includes(repo.id) && (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />{repo.stars}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <GitFork className="w-3 h-3" />{repo.forks}
                    </div>
                    {repo.language && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {repo.language}
                      </span>
                    )}
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="ml-auto text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedRepos.length > 0 && (
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                {selectedRepos.length} Depoyu Profile Ekle
              </Button>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
