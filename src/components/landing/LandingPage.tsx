import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Target, 
  BookOpen, 
  BarChart, 
  Building2,
  Clock,
  Coins
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800/80 sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <span className="text-lg tracking-tight">P</span>
              <span className="text-xs text-slate-950">M</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">PathMatch</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#problem" className="hover:text-white transition-colors">Çıkış Noktamız</a>
            <a href="#modules" className="hover:text-white transition-colors">Temel Modüller</a>
            <a href="#comparison" className="hover:text-white transition-colors">İç Mobilite vs Dış İşe Alım</a>
            <a href="#roi" className="hover:text-white transition-colors">ROI Değeri</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>Demo'yu Başlat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 px-4 sm:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Yapay Zeka Destekli İç Yetenek & Kariyer Eşleştirme</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Dışarıda Arama, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              İçeriden Yükselt.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Şirketinizin içindeki gizli yetenek potansiyelini açığa çıkaran akıllı kariyer eşleştirme platformu. Açık pozisyonları dış kaynak yerine şirket içi uzmanlarla saniyeler içinde buluşturun.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveView('dashboard')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Demo Platformunu Başlat</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveView('matching')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Akıllı Eşleştirme Motorunu Test Et</span>
            </button>
          </div>

          {/* Interactive Hero Network Visual Mockup */}
          <div className="mt-16 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl max-w-4xl mx-auto text-left">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-slate-300">Canlı Eşleştirme Simülasyonu</span>
              </div>
              <span>Hedef Pozisyon: Senior Data Analyst</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Çalışan Verisi</div>
                <div className="text-sm font-bold text-white">Ahmet Yılmaz</div>
                <div className="text-xs text-slate-400">Junior Data Analyst · 3 Yıl</div>
                <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-slate-400">
                  <span>SQL Advanced</span> · <span>Python</span> · <span>BI</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col justify-center items-center text-center">
                <div className="text-xs text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  PathMatch AI Motoru
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">%94</div>
                <div className="text-xs text-slate-300 mt-1">Yüksek Uyum Skoru</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Önerilen Aksiyon</div>
                <div className="text-sm font-bold text-emerald-300">Doğrudan İç Atama</div>
                <div className="text-xs text-slate-400 mt-1">Eksik: Python Pipelines</div>
                <div className="text-xs text-cyan-400 mt-2 font-medium">Öneri: 4 Hafta İleri Python Eğitimi</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section 1: Çıkış Noktamız (Slide 2) */}
      <section id="problem" className="py-20 px-4 sm:px-8 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Çıkış Noktamız</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">Mevcut İK Süreçlerinin Çıkmazı</h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3">
              Geleneksel işe alım yöntemleri hem bütçeleri tüketiyor hem de kurum içindeki yüksek potansiyeli görmezden geliyor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Yüksek İşe Alım Maliyeti</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Dışarıdan uzman transferi ve aracı kafa avcısı komisyonları şirket bütçelerini zorluyor. Her açık pozisyon ortalama 3-4 aylık maaş maliyeti doğuruyor.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gizli Kalan Yetenekler</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Kurum içi yüksek potansiyelli çalışanların yeni edindiği beceriler ve kariyer hedefleri manuel İK tabloları arasında kaybolup fark edilemiyor.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Düşen Bağlılık & Kayıp</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Kendi şirketinde net bir yükselme veya rotasyon yolu göremeyen kritik çalışanlar, dış piyasadaki teklifleri değerlendirerek şirketten ayrılıyor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Doğru Yetenek, Doğru Pozisyon, Sıfır İlan Maliyeti (Slide 3) */}
      <section className="py-20 px-4 sm:px-8 border-t border-slate-900 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-400 text-xs font-semibold mb-4">
                <span>Algoritmik Eşleştirme</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Doğru Yetenek. <br />
                Doğru Pozisyon. <br />
                <span className="text-emerald-400">Sıfır İlan Maliyeti.</span>
              </h2>
              <p className="mt-5 text-slate-300 text-base leading-relaxed">
                PathMatch, çalışanların hedefleri ile açık pozisyonların gereksinimlerini saniyeler içinde analiz eden yapay zeka destekli bir eşleştirme motorudur.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm">Ağırlıklı Çok Kriterli Skorlama:</strong>
                    <span className="text-slate-400 text-sm ml-1">Yetkinlik (%40), Deneyim (%20), Kariyer Hedefi (%20), Eğitim (%10) ve Profil Uyumu (%10).</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm">Eksik Yetkinlik & Eğitim Önerisi:</strong>
                    <span className="text-slate-400 text-sm ml-1">Sadece uyum yüzdesi vermekle kalmaz; pozisyona geçiş için tamamlanması gereken spesifik eğitimleri gösterir.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white text-sm">Görsel Kariyer Gelişim Rotası:</strong>
                    <span className="text-slate-400 text-sm ml-1">Mevcut unvandan hedef unvana somut adımlarla kariyer gelişim haritası çizer.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setActiveView('matching')}
                  className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Eşleştirme Motorunu Başlat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Architecture diagram from Slide 3 */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Çalışan Verisi</div>
                    <div className="text-xs text-slate-400">Yetkinlik, Deneyim, İlgi & Hedefler</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">Girdi 1</span>
              </div>

              <div className="flex justify-center -my-2 text-slate-600">
                <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-emerald-500" />
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/40 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-500/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-base font-extrabold text-white">PathMatch AI Motoru</div>
                <p className="text-xs text-slate-300 mt-1">Ağırlıklı Algoritmik Analiz & Uyum Hesaplama</p>
              </div>

              <div className="flex justify-center -my-2 text-slate-600">
                <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-500 to-cyan-500" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Açık Pozisyon Kriterleri</div>
                    <div className="text-xs text-slate-400">Gereken Yetkinlikler, Deneyim, Öncelikler</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-semibold">Girdi 2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Temel Modüller (Slide 4) */}
      <section id="modules" className="py-20 px-4 sm:px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Sistem Mimarisi</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">4 Temel Modül</h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3">
              Çalışandan İK direktörüne kadar tüm paydaşlar için entegre kariyer ekosistemi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Module 1 */}
            <div 
              onClick={() => setActiveView('employees')}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 group-hover:text-emerald-400 transition-colors">Modül 01</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">Çalışan Profili & Envanteri</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Kişiselleştirilmiş hedef, yetkinlik, tamamlanan eğitimler ve mobilite tercihi girişi. Çalışanların kendilerini geliştirmek istedikleri alanları görünür kılar.
              </p>
              <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span>Modülü Aç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Module 2 */}
            <div 
              onClick={() => setActiveView('matching')}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 group-hover:text-blue-400 transition-colors">Modül 02</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">Akıllı Eşleştirme Motoru</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Ağırlıklı algoritma ile yüzdelik uygunluk skoru üretir. Adayları sıraya dizerek mülakat ve iç atama adımlarını tek tıkla başlatmanızı sağlar.
              </p>
              <div className="mt-4 text-xs font-semibold text-blue-400 flex items-center gap-1">
                <span>Modülü Aç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Module 3 */}
            <div 
              onClick={() => setActiveView('career-map')}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 group-hover:text-violet-400 transition-colors">Modül 03</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">Kariyer Gelişim Haritası</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Mevcut rol ile hedef rol arasındaki yetkinlik farklarını tespit eder. Eksik yetkinlikler için otomatik eğitim programları ve süre planları önerir.
              </p>
              <div className="mt-4 text-xs font-semibold text-violet-400 flex items-center gap-1">
                <span>Modülü Aç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Module 4 */}
            <div 
              onClick={() => setActiveView('dashboard')}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <BarChart className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-500 group-hover:text-amber-400 transition-colors">Modül 04</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">İK Yönetici Paneli & Analitik</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Anlık yetenek havuzu raporlaması, departman yetkinlik matrisleri, iç mobilite akış takibi ve dolmaya hazır açık pozisyonların tek ekranda izlenmesi.
              </p>
              <div className="mt-4 text-xs font-semibold text-amber-400 flex items-center gap-1">
                <span>Modülü Aç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Dışarıdan İşe Alım vs PathMatch (Section 14) */}
      <section id="comparison" className="py-20 px-4 sm:px-8 border-t border-slate-900 bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Süreç Karşılaştırması</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">Dış İşe Alım vs. PathMatch İç Mobilite</h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3">
              Yeni yetenek aramak yerine mevcut çalışanlarınızın potansiyelini keşfedin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traditional Process */}
            <div className="p-8 rounded-3xl bg-slate-950 border border-rose-900/40">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Geleneksel Dış İşe Alım</span>
                </div>
                <span className="text-xs text-rose-400 font-mono">Ort. 65 Gün · Yüksek Risk</span>
              </div>

              <div className="space-y-4">
                {[
                  { step: '01', title: 'İlan Açma', desc: 'Kariyer portallarında pahalı ilan paketleri satın alınır.' },
                  { step: '02', title: 'Yüzlerce Başvuru', desc: 'İlgisiz yüzlerce CV arasında İK uzmanı günlerce boğulur.' },
                  { step: '03', title: 'CV Eleme & Ön Eleme', desc: 'Manuel ve subjektif kriterlerle yetenekler ıskalanır.' },
                  { step: '04', title: 'Mülakat & Teklif', desc: 'Aday teklifi reddedebilir, süreç baştan başlar.' },
                  { step: '05', title: 'Oryantasyon & Kültür Riski', desc: 'Dışarıdan gelen çalışanın kültüre uyumu 6 ay sürer.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-slate-900/50">
                    <span className="text-xs font-mono font-bold text-rose-400/80 mt-0.5">{item.step}</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PathMatch Process */}
            <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/50 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40 mb-6">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>PathMatch İç Mobilite</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono">Ort. 7 Gün · Sıfır İlan Maliyeti</span>
              </div>

              <div className="space-y-4">
                {[
                  { step: '01', title: 'Çalışan Verisi', desc: 'Mevcut çalışan yetkinlik ve hedef profilleri sisteme entegredir.' },
                  { step: '02', title: 'AI Eşleştirme', desc: 'Açık rol açıldığı saniye, ağırlıklı algoritma tüm havuzu tarar.' },
                  { step: '03', title: 'Uygunluk Skoru & Eksik Analizi', desc: 'Adayların %94, %87 gibi uyumları ve eksik eğitimleri anında çıkar.' },
                  { step: '04', title: 'Hedefli Kariyer Gelişimi', desc: 'Eksik yetkinlikler için 2-4 haftalık eğitim haritası tanımlanır.' },
                  { step: '05', title: 'İç Atama & Hızlı Verim', desc: 'Kültürü ve şirketi tanıyan çalışan hemen katma değer üretir.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30">
                    <span className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{item.step}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-xs text-slate-300">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Neden PathMatch? ROI (Slide 5) */}
      <section id="roi" className="py-20 px-4 sm:px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Yatırım Getirisi</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">Neden PathMatch? (ROI)</h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3">
              İç yetenek mobilizasyonu şirketlerin doğrudan bilançosuna ve bağlılığına yansır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-5xl font-extrabold text-emerald-400 font-mono tracking-tight">%45</div>
              <h3 className="text-lg font-bold text-white mt-4">Daha Hızlı Pozisyon Kapatma</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Dış kaynak süreçlerini beklemeden içeriden anında atama yaparak iş kayıplarını engeller.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-5xl font-extrabold text-cyan-400 font-mono tracking-tight">%60</div>
              <h3 className="text-lg font-bold text-white mt-4">Artan Çalışan Bağlılığı</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Görünür kariyer yolları ve adil yükselme fırsatları sayesinde yüksek potansiyelli yetenek kaybını önler.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-5xl font-extrabold text-amber-400 font-mono tracking-tight">SIFIR</div>
              <h3 className="text-lg font-bold text-white mt-4">Ajans ve İlan Maliyeti</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Kafa avcısı ve işe alım ajans komisyonlarından ve pahalı ilan paketlerinden doğrudan tasarruf sağlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6 Call To Action */}
      <section className="py-24 px-4 sm:px-8 border-t border-slate-900 bg-gradient-to-b from-slate-950 to-slate-900 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ekibinizdeki geleceğin liderlerini <br />
            keşfetmeye hazır mısınız?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Geleceğin İK altyapısına bugün geçiş yapın. Canlı çalışan verileri ve açık pozisyonlarla hemen test edin.
          </p>

          <div className="mt-8">
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-8 py-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-base transition-all shadow-xl shadow-emerald-500/25 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Platformu Canlı İncele</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-8 border-t border-slate-900 bg-slate-950 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">PathMatch</span>
            <span>·</span>
            <span>"Dışarıda Arama, İçeriden Yükselt."</span>
          </div>
          <div>
            <span>Üniversite Projesi & SaaS Ürün Demosu · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
