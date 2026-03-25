'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ArrowRight,
  BarChart3,
  Palette,
  GitBranch,
  Download,
  Zap,
} from 'lucide-react';
import { Footer } from '@/components/shared/footer';

export default function Home() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Bio Generator',
      description: 'Generate 3 unique professional bios with AI. Perfect for every platform.',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Track profile views, link clicks, and sharing metrics in real-time.',
    },
    {
      icon: Palette,
      title: '5+ Premium Themes',
      description: 'Choose from beautiful, professionally designed themes. Switch anytime.',
    },
    {
      icon: GitBranch,
      title: 'GitHub Integration',
      description: 'Showcase your best projects directly from your GitHub repositories.',
    },
    {
      icon: Zap,
      title: 'Roadmap Builder',
      description: 'AI-powered goal planning. Break objectives into actionable tasks.',
    },
    {
      icon: Download,
      title: 'Export Everything',
      description: 'Download as PDF, iCal, or VCF. Share your profile anywhere.',
    },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 flex-1">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6 mb-16"
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground">
                Build Your Professional{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Bio in Minutes
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Create stunning professional profiles with AI-powered bios, analytics, and integrations. Showcase who you are to the world.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="group">
                  <Link href="/auth/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/blog">Learn More</Link>
                </Button>
              </div>
            </motion.div>

            {/* Feature Cards - FIXED */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-lg border border-border/40 bg-card hover:border-primary/40 transition-all duration-300"
                  >
                    {/* Icon Box */}
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-foreground mb-2 text-base">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-12 px-4 sm:px-6 bg-primary/5 border-t border-border/40"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to stand out?
            </h2>
            <p className="text-muted-foreground">
              Join thousands of professionals building their perfect bio today.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/auth/signup">
                Create Your Profile
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}
