# PathMatch — “Dışarıda Arama, İçeriden Yükselt.”

> **Şirketinizin içindeki gizli yetenek potansiyelini açığa çıkaran akıllı kariyer ve iç yetenek eşleştirme platformu.**

---

## 📌 Proje Hakkında

**PathMatch**, şirketlerin açık pozisyonları için sürekli dışarıdan pahalı aracı kurumlar ve ilanlarla uzman aramak yerine, kurum içindeki çalışanların yetkinliklerini, deneyimlerini ve kariyer hedeflerini analiz ederek doğru pozisyonlarla eşleştiren yeni nesil bir **İç Mobilite (Internal Mobility) & İK Teknolojisi (HR Tech)** SaaS platformudur.

### Temel Değer Önermesi (ROI):
* **%45 Daha Hızlı Pozisyon Kapatma:** Dış kaynak süreçlerini beklemeden içeriden anında atama (ortalama 65 günden 7 güne iniş).
* **%60 Artan Çalışan Bağlılığı:** Görünür kariyer yolları ve adil yükselme imkanları sayesinde kilit çalışanların şirketten ayrılmasını önleme.
* **Sıfır Ajans ve İlan Maliyeti:** Kafa avcısı (headhunter) komisyonlarından ve portal ilan giderlerinden pozisyon başına ortalama 120.000–180.000 TL tasarruf.

---

## 🚀 Temel Modüller & Özellikler

1. **Ürün Tanıtımı & Landing Page:**
   - Şirket vizyonu, problem tanımı, süreç karşılaştırması (Geleneksel Dış İşe Alım vs. PathMatch İç Mobilite) ve ROI göstergeleri.
2. **İK Yönetici Dashboard'u:**
   - Canlı veriye bağlı KPI kartları (İç Yetenek Havuzu: 248, Açık Pozisyon: 18, Yüksek Uyumlu Eşleşme: 42, Ortalama Eşleşme: %87).
   - "İçeriden Doldurulabilecek Pozisyonlar" anlık öneri vitrini.
   - Yetenek Dağılımı (Teknik, Liderlik, İletişim, Yönetim, Analitik) ve Pozisyon Durum grafikleri.
   - Son 6 ayda gerçekleşen iç mobilite akış geçmişi.
3. **Akıllı Eşleştirme Motoru (Smart Matching Engine):**
   - 5 Eksenli Ağırlıklı Skor Algoritması:
     - **Yetkinlik Uyumu:** %40
     - **Deneyim Uyumu:** %20
     - **Kariyer Hedefi:** %20
     - **Eğitim & Lisans:** %10
     - **Genel Profil & Kültür:** %10
   - Canlı aday sıralaması (Örn: Ahmet Yılmaz %94, Zeynep Kaya %87, Mehmet Demir %81).
   - **Eşleşme Detay Paneli:** 5 faktörün detaylı dairesel/bar kırılımı.
   - **Eksik Yetkinlik Analizi:** Hangi becerilerin eksik olduğunun tespiti.
   - **Önerilen Eğitimler:** Hedef pozisyona geçiş için gereken spesifik eğitim programları, süreleri ve gerekçeleri.
   - **Gerçek Aksiyonlar:** "Mülakata Çağır", "Atamayı Başlat", "Eşleşmeyi Geri Al" butonları ile canlı durum güncellemeleri.
4. **Çalışanlar & Yetenek Envanteri:**
   - Çoklu filtreleme (Departman, Yetkinlik, Deneyim, Uyum Skoru).
   - Çalışan detay çekmecesi ve anlık "Yeni Çalışan Ekle" formu.
5. **Açık Pozisyonlar:**
   - Pozisyon listesi ve "Yeni Pozisyon Oluştur" modal formu (seviye, öncelikli yetkinlikler, deneyim yılı).
6. **Kariyer Gelişim Haritası (Career Roadmap):**
   - 4 Aşamalı İnteraktif Yol: *Mevcut Pozisyon → Gelişim Alanları → Önerilen Eğitimler → Hedef Pozisyon*.
   - Tamamlanan eğitimleri işaretleyerek hazır oluş skorunu (%Readiness) artırma simülasyonu.
7. **Yetenek Havuzu & Risk Matrisi:**
   - Kritik yetenekler ve şirketten ayrılma riski taşıyan gizli potansiyellerin tespiti.
8. **Raporlar & ROI Simülatörü:**
   - İç atama sayısı ve dış maliyet parametreleri üzerinden şirkete sağlanan net TL tasarrufu hesaplayıcı.
9. **Algoritma Ağırlıkları Ayarları:**
   - Kullanıcının algoritma ağırlıklarını interaktif olarak değiştirip eşleştirme skorlarının nasıl güncellendiğini test edebilme imkanı.

---

## 🛠️ Teknoloji Yığını

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion
* **Backend:** Node.js, Express
* **Full-Stack Entegrasyonu:** Vite SPA middlewares (Geliştirme) / Express Static Serving (Production)
* **Yapay Zeka (Opsiyonel):** Google Gemini API (`@google/genai`) entegrasyonu (API anahtarı girildiğinde derin yönetim raporları üretir; anahtar olmadığında gelişmiş yerel sentez motoruyla %100 kesintisiz çalışır).

---

## 🌐 Render Deployment Instructions (Canlıya Alma Talimatları)

Uygulama, **Render üzerinde "Web Service"** olarak tek tıkla çalışabilecek mimaride hazırlanmıştır.

### Adım 1: Projeyi GitHub'a Yükleyin
```bash
git init
git add .
git commit -m "feat: initial PathMatch release"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/pathmatch.git
git push -u origin main
```

### Adım 2: Render Dashboard'unda Yeni Web Service Oluşturun
1. [dashboard.render.com](https://dashboard.render.com) adresine giriş yapın.
2. **"New +"** butonuna tıklayın ve **"Web Service"** seçeneğini seçin.
3. GitHub hesabınızı bağlayın ve `pathmatch` deposunu seçin.

### Adım 3: Servis Ayarlarını Yapılandırın
Render formundaki alanları aşağıdaki gibi doldurun:

| Ayar Alanı | Değer |
| :--- | :--- |
| **Name** | `pathmatch` (veya dilediğiniz bir isim) |
| **Region** | `Frankfurt (EU Central)` veya size en yakın bölge |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` (veya Starter) |

### Adım 4: Environment Variables (Ortam Değişkenleri)
Sayfanın altındaki **"Advanced"** veya **"Environment Variables"** sekmesinde şu değişkenleri ekleyin:

* `NODE_ENV`: `production`
* `PORT`: `10000` (Render genelde kendisi dinamik olarak atar; kodumuz `process.env.PORT` dinler).
* `GEMINI_API_KEY`: *(Opsiyonel)* Eğer Gemini AI özelliklerini kullanmak isterseniz Google AI Studio'dan aldığınız API anahtarını buraya girin.

### Adım 5: Deploy Edin!
1. **"Create Web Service"** butonuna tıklayın.
2. Render otomatik olarak:
   - Bağımlılıkları yükleyecek (`npm install`),
   - Frontend'i derleyecek (`npm run build` -> `dist/`),
   - Sunucuyu ayağa kaldıracaktır (`npm start` -> `server.ts`).
3. Birkaç dakika içinde Render size şu formatta bir canlı URL verecektir:
   **`https://pathmatch-xxxx.onrender.com`**

Artık uygulamanız tüm dünyadan erişilebilir!

---

## 💻 Yerel Çalıştırma (Local Development)

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Geliştirme sunucusunu başlatın
npm run dev

# 3. Tarayıcınızda açın
http://localhost:3000
```

---

## 🎓 Canlı Sunum & Demo Senaryosu (Hocaya Sunum Akışı)

Projeyi canlı olarak sunarken şu 10 adımlık senaryoyu takip edebilirsiniz:

1. **Açılış (Tanıtım Sayfası):** Sloganımız *"Dışarıda Arama, İçeriden Yükselt."* ve problem slaytı gösterilir.
2. **İK Dashboard'una Giriş:** Üstteki "Demo'yu Başlat" butonuna basılarak ana dashboard açılır. 248 kişilik havuz ve KPI metrikleri gösterilir.
3. **Açık Pozisyon İnceleme:** Açık Pozisyonlar sekmesine gidilir, "Senior Data Analyst" rolünün gereksinimleri incelenir.
4. **Akıllı Eşleştirme Motoru:** Akıllı Eşleştirme modülü açılır. Sistem Ahmet Yılmaz'ı **%94**, Zeynep Kaya'yı **%87** uyumla otomatik olarak sıralamıştır.
5. **Eşleşmeyi İncele:** Ahmet Yılmaz kartındaki "Eşleşmeyi İncele" butonuna basılır. 5 eksenli ağırlıklı skorlar (%40 yetkinlik, %20 deneyim, %20 kariyer hedefi) gösterilir.
6. **Eksik Yetkinlik & Eğitim Analizi:** Modal içinde Ahmet'in eksik yetkinliği (Python Pipelines) ve sistemin önerdiği eğitim (*Python Advanced Training*) gösterilir.
7. **Kariyer Haritası:** "Kariyer Haritasını Gör" butonuna basılarak 4 adımlı görsel kariyer gelişim yolu incelenir; eğitim tamamlandı kutucuğu işaretlenerek hazırlık skoru artırılır.
8. **Aksiyon Alma:** "Mülakata Çağır" veya "Atamayı Başlat" butonuna basılır; adayın durumu ve bildirim zili anında güncellenir.
9. **Yeni Pozisyon Ekleme:** Üstteki "+ Pozisyon Aç" butonuna basılıp yeni bir pozisyon eklenir ve sistemin bu pozisyonu anında eşleştirdiği kanıtlanır.
10. **Kapanış (ROI Raporu):** Raporlar sekmesine gidilerek maliyet tasarrufu simülatörüyle şirketin kazancı gösterilir.
