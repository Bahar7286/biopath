# Supabase Kurulum Rehberi

## 1. Supabase Projesi Oluştur

1. https://supabase.com adresine gidin
2. "Start your project" → GitHub ile giriş yapın
3. "New Project" → İsim verin → Şifre belirleyin → Bölge seçin (EU West önerilir)
4. Proje oluşturuluncaya kadar bekleyin (~2 dakika)

## 2. Veritabanı Tablosunu Oluştur

Supabase Dashboard → **SQL Editor** → **New query** → Aşağıdaki kodu yapıştırın ve çalıştırın:

```sql
-- Profiller tablosu
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  github_username TEXT,
  avatar_url TEXT,
  repositories JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Herkese açık okuma izni
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiller herkese açık" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Kullanıcı kendi profilini oluşturabilir" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi profilini güncelleyebilir" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi profilini silebilir" ON profiles
  FOR DELETE USING (auth.uid() = user_id);
```

## 3. API Anahtarlarını Al

Supabase Dashboard → **Project Settings** → **API**

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` olarak kopyala
- **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY` olarak kopyala

## 4. Vercel'e Environment Variables Ekle

Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | https://xxxxx.supabase.co |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | eyJhbGc... |

Ekledikten sonra **Redeploy** yapın.

## 5. E-posta Doğrulamasını Ayarla (İsteğe Bağlı)

Supabase Dashboard → **Authentication** → **Email Templates**

Türkçe e-posta şablonu ayarlayabilirsiniz.

E-posta doğrulamasını kapatmak için:
**Authentication** → **Providers** → **Email** → "Confirm email" seçeneğini kapatın.

## 6. Test Et

1. Sitenize gidin → Kayıt Ol
2. Profil sayfasında bilgileri doldurun → Kaydet
3. `/profile/kullanici-adiniz` adresini ziyaret edin

---

Sorun yaşarsanız Supabase Dashboard → **Logs** bölümünü kontrol edin.
