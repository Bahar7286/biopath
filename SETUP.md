# BioPath Pro v2 - Setup Rehberi

## 🚀 Kurulum Adımları

### 1. Proje Dosyalarını Aç
```bash
unzip biopath-pro-v2.zip
cd web
```

### 2. Bağımlılıkları Yükle
```bash
npm install
```

### 3. Environment Variables Ayarla

`.env.example` dosyasını `.env.local` olarak kopyala:
```bash
cp .env.example .env.local
```

**DOLDURULACAK YERLERİ (4 tane):**

1. **`NEXT_PUBLIC_HF_API_KEY`** (Hugging Face)
   - Link: https://huggingface.co/settings/tokens
   - "Read" token oluştur
   - Kopyala ve `.env.local`'a yapıştır

2. **`NEXT_PUBLIC_GITHUB_TOKEN`** (GitHub - Opsiyonel)
   - Link: https://github.com/settings/tokens
   - "personal access token" oluştur
   - `public_repo` erişimi seç

3. **`NEXT_PUBLIC_APP_URL`** (Vercel'de doldurulacak)
   - Şimdilik: `http://localhost:3000`
   - Vercel deploy sonrası: `https://your-domain.vercel.app`

4. **Supabase** (Gelecek güncellemeler için - şu an boş bırakabilirsin)

### 4. Vercel'e Deploy Et

**Adım A: GitHub'a Push**
```bash
git add .
git commit -m "BioPath Pro v2 - Ready for Vercel"
git push origin main
```

**Adım B: Vercel Dashboard**
1. https://vercel.com/dashboard
2. "New Project" → GitHub repo'nu seç
3. "Deploy" tıkla

**Adım C: Environment Variables (Vercel Settings)**
1. Project → Settings → Environment Variables
2. `.env.example`'deki değerleri gir
3. Deploy yeniden başlat

---

## ✅ Tüm Sayfalar ve Linkler

✅ Tüm sayfalar **404 hatası vermez** - direkt açılabilir!

### Ana Sayfa ve Public Pages
- `/` - Ana Sayfa
- `/about` - Hakkında
- `/pricing` - Fiyatlandırma
- `/blog` - Blog
- `/blog/[yazı-adı]` - Blog Detayı
- `/contact` - İletişim
- `/faq` - Sıkça Sorulan
- `/terms` - Koşullar
- `/privacy` - Gizlilik
- `/security` - Güvenlik

### Giriş/Kayıt
- `/auth/login` - Giriş Yap
- `/auth/signup` - Kayıt Ol

### Dashboard (Giriş Yaptıktan Sonra)
- `/dashboard` - Dashboard
- `/dashboard/profile` - Profil
- `/dashboard/analytics` - Analitik
- `/dashboard/settings` - Ayarlar
- `/dashboard/ai-bio` - AI Bio
- `/dashboard/roadmap` - Yol Haritası

### Herkese Açık Profil
- `/profile/[kullanıcı-adı]` - Public Profil

---

## 🔧 Her Sayfada Var Olan Özellikler

✅ **Geri Dönüş Butonu** - Sol üstte
✅ **Tema Değiştirme** - Sağ üstte (Güneş/Ay)
✅ **Logout Butonu** - Dashboard'da sağ üstte
✅ **Footer** - Her sayfanın altında (About, FAQ, Blog, Contact, Privacy, Terms, Security)
✅ **Responsive Design** - Mobilde/Desktop'da çalışıyor
✅ **Smooth Animations** - Sayfa yüklenişinde

---

## 🎯 Önemli Noktalar

1. **Tema Değiştirme Çalışmıyor?**
   - Cache temizle: `Ctrl + Shift + Delete`
   - Sayfayı yenile: `F5`
   - Dev server yeniden başlat: `npm run dev`

2. **404 Hatası?**
   - Tüm sayfalar `src/app/[page]/page.tsx` formatında
   - Nested pages: `src/app/[parent]/[page]/page.tsx`
   - Dosyalar var - linkler çalışıyor

3. **API Key Hatası?**
   - `.env.local` dosyası var mı?
   - Hugging Face key format: `hf_...`
   - Dev server restart: `npm run dev`

---

## 📋 Deployment Checklist

- [ ] `.env.local` dolduruldu?
- [ ] `NEXT_PUBLIC_HF_API_KEY` doğru?
- [ ] GitHub'a push yaptım?
- [ ] Vercel'de proje oluştum?
- [ ] Environment variables Vercel'de ayarlandı?
- [ ] Deploy tamamlandı?
- [ ] Ana sayfa açılıyor?
- [ ] Tema değiştirme çalışıyor?

---

**Başarıyla deploy et! 🚀**
