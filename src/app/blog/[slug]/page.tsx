'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { PageHeader } from '@/components/shared/page-header';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const blogPosts: Record<string, any> = {
  'ai-bio-tips': {
    title: 'Profesyonel Bio Yazmanın 5 İpucu',
    date: '2024-03-20',
    author: 'BioPath Team',
    image: '📝',
    content: `
# Profesyonel Bio Yazmanın 5 İpucu

Bir profesyonel bio yazmak, sizi çevrimiçi dünyada nasıl gösterecek olduğunu belirlemede önemli bir rol oynar.

## 1. Kişiselleştir ve Benzersiz Ol
Bio'nuzda kimsiniz, ne yapıyorsunuz ve neden önemlisiniz açıkça belirtin. Başkalarından sizi ayıran nitelikleri vurgulayın.

## 2. Kısa ve Özet Tut
Okuyucular hızlı tarama yaparlar. Bilgileri net ve anlaşılır şekilde sunun. Uzun cümleler yerine kısa ve etkili ifadeler kullanın.

## 3. Başarılarını Vurgulamak
Sizin başarılarınız, yetenekleriniz ve deneyiminizi gösterin. Rakamlar ve ölçülebilir sonuçlar kullanın.

## 4. Eyleme Çağrı Ekle
Bio'nun sonuna bir CTA (Call to Action) ekleyin. İnsanları bağlanmanız veya sizinle iletişime geçmeniz için teşvik edin.

## 5. AI Yardımı Kullanın
BioPath Pro ile AI-powered bio generator'ı kullanarak birkaç saniye içinde profesyonel bios oluşturun.
    `,
  },
  'github-showcase': {
    title: 'GitHub Depo Sergileme - En İyi Uygulamalar',
    date: '2024-03-18',
    author: 'Teknoloji Editörü',
    image: '🚀',
    content: `
# GitHub Depo Sergileme - En İyi Uygulamalar

Projelerinizi GitHub'da etkili şekilde sergilemek, potansiyel işverenler ve işbirlikçiler için önemlidir.

## İyi Bir README Yazın
README dosyası ilk izlenim oluşturur. Proje hakkında açık bilgi, kurulum talimatları ve kullanım örnekleri verin.

## Reponu Organize Edin
Dosyaları mantıksal bir yapıya göre düzenleyin. Clear directory structure insanları projenizin içinde yönlendirmeye yardımcı olur.

## Güncellemeleri Tutarlı Tutun
Repoyu canlı tutun. Düzenli commit'ler yapın ve issues'u yönetin.

## Badge ve Status Göstergesi Ekleyin
Build status, test coverage gibi badge'ler profesyonellik gösterir.

## BioPath Pro ile Entegrasyon
Projelerinizi BioPath Pro ile GitHub integration kullanarak, profilinizde en iyi projelerinizi sergileyebilirsiniz.
    `,
  },
  'theme-customization': {
    title: 'Tema Özelleştirmesi - Kişiselleştirilmiş Stil Rehberi',
    date: '2024-03-15',
    author: 'Tasarım Uzmanı',
    image: '🎨',
    content: `
# Tema Özelleştirmesi - Kişiselleştirilmiş Stil Rehberi

Profilinizin görünüşü, size verdiğiniz ilk izlenim olduğu için çok önemlidir.

## Renk Seçimi
Markanızı yansıtan renkleri seçin. Profil tasarımında tutarlı bir renk şeması kullanın.

## Tipografi
Okunabilir ve profesyonel fontlar kullanın. Başlıklar ve gövde metni için uygun kontrastı sağlayın.

## Layout ve Boşluk
Sayfayı aşırı yüklemekten kaçının. Boşluk ve temiz layout, profesyonellik gösterir.

## Responsive Tasarım
Profilinizin mobil cihazlarda da güzel görünüp görünmediğini kontrol edin.

## Tema Şablonlarını Kullanın
BioPath Pro'da sağlanan 5+ premium tema arasından seçim yapın ve anında kişiselleştirebilirsiniz.
    `,
  },
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <>
        <PageHeader title="Yazı Bulunamadı" showBack={true} />
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Bu blog yazısı bulunamadı.</p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Blog'a Dön
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageHeader title={post.title} showBack={true} backHref="/blog" />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-8 space-y-4">
            <div className="text-5xl mb-4">{post.image}</div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('tr-TR')}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
            </div>
          </div>

          <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
            {post.content.split('\n').map((line: string, idx: number) => {
              if (line.startsWith('#')) {
                const level = line.match(/^#+/)?.[0].length || 1;
                const text = line.replace(/^#+\s/, '');
                const HeadingTag = `h${level}` as any;
                return (
                  <HeadingTag key={idx} className="mt-6 mb-3 font-bold">
                    {text}
                  </HeadingTag>
                );
              }
              if (line.trim() === '') return null;
              return (
                <p key={idx} className="text-muted-foreground mb-4">
                  {line}
                </p>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-border/40">
            <Button asChild variant="outline">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Blog'a Dön
              </Link>
            </Button>
          </div>
        </motion.article>
      </main>
      <Footer />
    </>
  );
}
