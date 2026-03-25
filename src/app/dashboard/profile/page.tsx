'use client';

import { useState, useEffect } from 'react';
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
  MapPin,
  Link as LinkIcon,
} from 'lucide-react';
import { fetchUserRepositories } from '@/lib/github';
import type { GitHubRepo } from '@/lib/github';

// Mock roadmap data - in production this would come from Supabase
const mockRoadmap = [
  { id: 1, title: 'Complete AI Bio Generator', status: 'completed', date: '2024-03-20' },
  { id: 2, title: 'Implement GitHub Integration', status: 'in-progress', date: '2024-03-25' },
  { id: 3, title: 'Add Analytics Dashboard', status: 'planned', date: '2024-04-10' },
  { id: 4, title: 'Launch Mobile App', status: 'planned', date: '2024-05-01' },
];

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: 'Mehmet Yılmaz',
    bio: 'Full-stack developer passionate about AI and open source.',
    location: 'Istanbul, Turkey',
    website: 'https://example.com',
    githubUsername: 'octocat',
  });

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [reposError, setReposError] = useState('');
  const [selectedRepos, setSelectedRepos] = useState<number[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFetchRepos = async () => {
    if (!formData.githubUsername) {
      setReposError('Please enter your GitHub username');
      return;
    }

    setIsLoadingRepos(true);
    setReposError('');
    try {
      const fetchedRepos = await fetchUserRepositories(formData.githubUsername);
      setRepos(fetchedRepos);
    } catch (error) {
      setReposError(`Failed to fetch repositories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const handleSaveProfile = () => {
    // Save profile data to localStorage (in production this would be Supabase)
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('selectedRepos', JSON.stringify(selectedRepos));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const toggleRepoSelection = (repoId: number) => {
    setSelectedRepos(prev =>
      prev.includes(repoId) ? prev.filter(id => id !== repoId) : [...prev, repoId]
    );
  };

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Profile Settings</h2>
            <p className="text-muted-foreground text-sm mt-1">Manage your public profile information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Location
                </span>
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="website">
                <span className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  Website
                </span>
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleFormChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleFormChange}
                placeholder="Tell us about yourself..."
                className="min-h-24"
              />
            </div>
          </div>

          <Button onClick={handleSaveProfile} className="w-full">
            {saveSuccess ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Saved Successfully
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </Card>
      </motion.div>

      {/* GitHub Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Github className="h-6 w-6" />
              GitHub Integration
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Connect your GitHub account and showcase your best projects</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="githubUsername">GitHub Username</Label>
              <div className="flex gap-2">
                <Input
                  id="githubUsername"
                  name="githubUsername"
                  value={formData.githubUsername}
                  onChange={handleFormChange}
                  placeholder="octocat"
                />
                <Button
                  onClick={handleFetchRepos}
                  disabled={isLoadingRepos || !formData.githubUsername}
                  variant="outline"
                >
                  {isLoadingRepos ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Fetch Repos
                    </>
                  )}
                </Button>
              </div>
            </div>

            {reposError && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-2">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm text-destructive">{reposError}</span>
              </div>
            )}

            {repos.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Select repositories to showcase:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {repos.map(repo => (
                    <div
                      key={repo.id}
                      onClick={() => toggleRepoSelection(repo.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedRepos.includes(repo.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border/40 hover:border-border/80'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <Code2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="font-medium text-sm truncate">{repo.name}</span>
                        </div>
                        {selectedRepos.includes(repo.id) && (
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {repo.description || 'No description'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Roadmap Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Roadmap</h2>
            <p className="text-muted-foreground text-sm mt-1">Showcase your goals and progress</p>
          </div>

          <div className="space-y-3">
            {mockRoadmap.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-4 rounded-lg border border-border/40 bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'completed' ? 'bg-green-500/20 text-green-700' :
                    item.status === 'in-progress' ? 'bg-blue-500/20 text-blue-700' :
                    'bg-gray-500/20 text-gray-700'
                  }`}>
                    {item.status.replace('-', ' ').toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
