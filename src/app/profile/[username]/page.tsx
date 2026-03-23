'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Copy,
  Share2,
  ExternalLink,
  CheckCircle2,
  Code2,
  Star,
  GitFork,
  Calendar,
} from 'lucide-react';

const mockProfile = {
  username: 'alex-dev',
  fullName: 'Alex Geliştirici',
  bio: 'Full-stack geliştirici | Açık kaynak tutkunu | Sürekli öğreniyorum',
  location: 'İstanbul, Türkiye',
  website: 'https://alexdev.com',
  email: 'alex@example.com',
  joinDate: '2024-01-15',
  theme: 'minimal-light',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
    { platform: 'Twitter', url: 'https://twitter.com' },
  ],
  repositories: [
    { name: 'harika-proje', description: 'Herkes için harika bir proje', stars: 234, forks: 45, language: 'React', url: 'https://github.com/example/harika-proje' },
    { name: 'web-framework', description: 'Uygulama geliştirme için modern web çerçevesi', stars: 567, forks: 89, language: 'TypeScript', url: 'https://github.com/example/web-framework' },
    { name: 'tasarim-sistemi', description: 'Kapsamlı tasarım sistemi ve UI bileşenleri', stars: 345, forks: 67, language: 'Vue', url: 'https://github.com/example/tasarim-sistemi' },
  ],
  bio_variants: [
    'Full-stack geliştirici | Açık kaynak tutkunu | Sürekli öğreniyorum',
    'Karmaşık problemlere zarif çözümler üretme konusunda tutkuluyum',
    'React & Node.js uzmanı | Harika araçlar yaratıcısı | Kahve tutkunluğu',
  ],
  stats: {
    profileViews: 1234,
    linkClicks: 589,
    shares: 128,
  },
};

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const [copied, setCopied] = useState(false);
  const [activeBioIndex, setActiveBioIndex] = useState(0);

  const profileUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/profile/${params.username}`
      : `/profile/${params.username}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${mockProfile.fullName} Profili`,
          text: mockProfile.bio,
          url: profileUrl,
        });
      } catch (err) {
        console.error('Paylaşım başarısız:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            BioPath Pro
          </Link>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
            >
              {copied ? (
                <><CheckCircle2 className="w-4 h-4" />Kopyalandı!</>
              ) : (
                <><Copy className="w-4 h-4" />Bağlantıyı Kopyala</>
              )}
            </motion.button>
            <Button onClick={handleShare} variant="outline" size="icon" className="border-border/50">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex flex-col sm:flex-row items-start gap-8 mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {mockProfile.fullName.charAt(0)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{mockProfile.fullName}</h1>
              <p className="text-xl text-primary font-semibold mb-3">@{mockProfile.username}</p>

              <div className="mb-4 p-4 rounded-lg border border-border/50 bg-secondary/30">
                <motion.p
                  key={activeBioIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg text-foreground mb-2"
                >
                  {mockProfile.bio_variants[activeBioIndex]}
                </motion.p>
                <div className="flex items-center gap-2">
                  {mockProfile.bio_variants.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveBioIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${activeBioIndex === index ? 'bg-primary w-6' : 'bg-border/50'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {mockProfile.location && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {mockProfile.location}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Katılım: {new Date(mockProfile.joinDate).toLocaleDateString('tr-TR')}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {[
              { label: 'Profil Görüntüleme', value: mockProfile.stats.profileViews },
              { label: 'Link Tıklamaları', value: mockProfile.stats.linkClicks },
              { label: 'Paylaşımlar', value: mockProfile.stats.shares },
            ].map((stat, index) => (
              <Card key={index} className="p-4 border-border/50 text-center">
                <p className="text-xs text-muted-foreground font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-primary">{stat.value.toLocaleString('tr-TR')}</p>
              </Card>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-3">
            {mockProfile.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                {link.platform === 'GitHub' && <Github className="w-4 h-4" />}
                {link.platform === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
                {link.platform === 'Twitter' && <Twitter className="w-4 h-4" />}
                {link.platform}
              </a>
            ))}
            {mockProfile.email && (
              <a
                href={`mailto:${mockProfile.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <Mail className="w-4 h-4" />
                İletişim
              </a>
            )}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Öne Çıkan Projeler</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mockProfile.repositories.map((repo, index) => (
              <a key={index} href={repo.url} target="_blank" rel="noopener noreferrer">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-lg border border-border/50 bg-card hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      <Code2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{repo.name}</h3>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{repo.description}</p>
                  <div className="flex flex-wrap gap-3 items-center pt-4 border-t border-border/30">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />{repo.stars}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <GitFork className="w-3 h-3" />{repo.forks}
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{repo.language}</span>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Kendi profilinizi oluşturmak ister misiniz?</h2>
          <p className="text-muted-foreground mb-6">
            BioPath Pro ile varlığını oluşturan binlerce profesyonele katılın
          </p>
          <Link href="/auth/signup">
            <Button className="bg-primary hover:bg-primary/90">
              Ücretsiz Başla
            </Button>
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
