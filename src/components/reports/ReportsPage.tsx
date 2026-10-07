import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Coins, 
  Clock, 
  HeartHandshake, 
  Download, 
  CheckCircle2,
  FileText
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { positions, employees, mobilityRecords, addToast } = useApp();

  const [internalHiresCount, setInternalHiresCount] = useState<number>(6);
  const [costPerExternalHire, setCostPerExternalHire] = useState<number>(140000); // 140,000 TL avg headhunter & agency cost

  const totalSavedCost = internalHiresCount * costPerExternalHire;
  const daysSavedPerHire = 58; // 65 days down to 7 days
  const totalDaysSaved = internalHiresCount * daysSavedPerHire;

  const handleExportReport = () => {
    addToast('İç Mobilite & Maliyet Tasarrufu Raporu (PDF) oluşturuldu.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1">
            <Coins className="w-3.5 h-3.5 text-emerald-600" />
            <span>Finansal & Süreçsel Verimlilik</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Raporlar & Yatırım Getirisi (ROI)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dış işe alım maliyet tasarrufu simülatörü, pozisyon kapatma süreleri ve çalışan bağlılığı kazanımları
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Raporu Dışa Aktar</span>
        </button>
      </div>

      {/* ROI 3-Stat Banner from Slide 5 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-4xl font-black text-emerald-600 font-mono tracking-tight">%45</div>
          <h3 className="text-sm font-bold text-slate-900 mt-2">Daha Hızlı Pozisyon Kapatma</h3>
          <p className="text-xs text-slate-500 mt-1">
            Dış kaynak süreçlerini beklemeden içeriden ortalama 7 günde anında atama.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-4xl font-black text-blue-600 font-mono tracking-tight">%60</div>
          <h3 className="text-sm font-bold text-slate-900 mt-2">Artan Çalışan Bağlılığı</h3>
          <p className="text-xs text-slate-500 mt-1">
            Görünür kariyer yolları sayesinde şirket içi yetenek kaybını engelleme.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-4xl font-black text-amber-500 font-mono tracking-tight">SIFIR</div>
          <h3 className="text-sm font-bold text-slate-900 mt-2">Ajans ve İlan Maliyeti</h3>
          <p className="text-xs text-slate-500 mt-1">
            İşe alım bütçesinden ve headhunter aracılık komisyonlarından doğrudan tasarruf.
          </p>
        </div>
      </div>

      {/* Interactive Savings Simulator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            İç Mobilite Maliyet Tasarrufu Hesaplayıcı
          </h3>
          <p className="text-xs text-slate-500">
            Dışarıdan işe almak yerine PathMatch ile içeriden kapatılan pozisyonların net finansal etkisi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4 p-5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <div className="flex items-center justify-between font-bold text-slate-700 mb-1">
                <span>İçeriden Doldurulan Pozisyon Sayısı:</span>
                <span className="font-mono text-emerald-600 text-sm font-black">{internalHiresCount} Pozisyon</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={internalHiresCount}
                onChange={e => setInternalHiresCount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>1 Pozisyon</span>
                <span>30 Pozisyon</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between font-bold text-slate-700 mb-1">
                <span>Pozisyon Başına Tahmini Dış İşe Alım Maliyeti:</span>
                <span className="font-mono text-blue-600 text-sm font-black">{costPerExternalHire.toLocaleString('tr-TR')} TL</span>
              </div>
              <input
                type="range"
                min="50000"
                max="300000"
                step="10000"
                value={costPerExternalHire}
                onChange={e => setCostPerExternalHire(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>50.000 TL</span>
                <span>300.000 TL</span>
              </div>
            </div>
          </div>

          {/* Outcome card */}
          <div className="p-6 rounded-xl bg-gradient-to-tr from-emerald-950 via-slate-900 to-teal-950 text-white flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400">Şirketinize Sağlanan Net Tasarruf</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-2 tracking-tight">
                {totalSavedCost.toLocaleString('tr-TR')} TL
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Dış aracı şirket komisyonları ve kariyer portalı ilan harcamalarından sağlanan net tasarruf.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-slate-400">Kazanılan Zaman</div>
                <div className="font-mono font-bold text-emerald-300 text-base">
                  +{totalDaysSaved} İş Günü
                </div>
              </div>
              <div>
                <div className="text-slate-400">Kültürel Adaptasyon</div>
                <div className="font-mono font-bold text-cyan-300 text-base">
                  %100 Uyum
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
