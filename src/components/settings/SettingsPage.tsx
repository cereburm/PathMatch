import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Sliders, RotateCcw, Check, Info } from 'lucide-react';
import { DEFAULT_WEIGHTS } from '../../services/matchingAlgorithm';

export const SettingsPage: React.FC = () => {
  const { algorithmWeights, updateAlgorithmWeights, resetToDefaults } = useApp();

  const [weights, setWeights] = useState(algorithmWeights);

  const total = weights.skillWeight + weights.experienceWeight + weights.careerGoalWeight + weights.educationWeight + weights.profileFitWeight;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAlgorithmWeights(weights);
  };

  const handleResetWeights = () => {
    setWeights(DEFAULT_WEIGHTS);
    updateAlgorithmWeights(DEFAULT_WEIGHTS);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md mb-1">
            <Sliders className="w-3.5 h-3.5 text-slate-600" />
            <span>Algoritma Parametreleri</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Eşleştirme Algoritması Ayarları
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            PathMatch yapay zeka motorunun çalışanları pozisyonlarla eşleştirirken kullandığı kriter ağırlıkları
          </p>
        </div>

        <button
          onClick={handleResetWeights}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Ağırlıkları Sıfırla (%40, %20, %20, %10, %10)</span>
        </button>
      </div>

      {/* Weights Config Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Kriter Ağırlıkları Yüzdeleri
          </h3>
          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${total === 100 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            Toplam: %{total} {total !== 100 && '(100 olması önerilir)'}
          </span>
        </div>

        <div className="space-y-4 text-xs">
          {/* Skill Weight */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>1. Yetkinlik Uyumu Ağırlığı:</span>
              <span className="font-mono text-emerald-600 font-black text-sm">%{weights.skillWeight}</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={weights.skillWeight}
              onChange={e => setWeights(prev => ({ ...prev, skillWeight: Number(e.target.value) }))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Çalışanın sahip olduğu teknik/operasyonel yetkinliklerin pozisyonun zorunlu yetkinlikleriyle eşleşme payı.
            </p>
          </div>

          {/* Experience Weight */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>2. Deneyim Süresi Uyumu Ağırlığı:</span>
              <span className="font-mono text-blue-600 font-black text-sm">%{weights.experienceWeight}</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={weights.experienceWeight}
              onChange={e => setWeights(prev => ({ ...prev, experienceWeight: Number(e.target.value) }))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Adayın toplam çalışma yılının pozisyonda aranan minimum deneyim süresine oranı.
            </p>
          </div>

          {/* Career Goal Weight */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>3. Kariyer Hedefi ve İlgi Uyumu Ağırlığı:</span>
              <span className="font-mono text-violet-600 font-black text-sm">%{weights.careerGoalWeight}</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={weights.careerGoalWeight}
              onChange={e => setWeights(prev => ({ ...prev, careerGoalWeight: Number(e.target.value) }))}
              className="w-full accent-violet-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Çalışanın şahsi kariyer hedeflerinin pozisyonun unvanı ve departmanıyla uyumu.
            </p>
          </div>

          {/* Education Weight */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>4. Eğitim ve Lisans Uyumu Ağırlığı:</span>
              <span className="font-mono text-cyan-600 font-black text-sm">%{weights.educationWeight}</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={weights.educationWeight}
              onChange={e => setWeights(prev => ({ ...prev, educationWeight: Number(e.target.value) }))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Mezuniyet alanı ve derecesinin rolün gerektirdiği akademik arka planla örtüşmesi.
            </p>
          </div>

          {/* Profile Fit Weight */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>5. Genel Profil & Kültür Uyumu Ağırlığı:</span>
              <span className="font-mono text-amber-600 font-black text-sm">%{weights.profileFitWeight}</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={weights.profileFitWeight}
              onChange={e => setWeights(prev => ({ ...prev, profileFitWeight: Number(e.target.value) }))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Geçmiş performans değerlendirmesi, kurum içi gelişim isteği ve kültürel bağlılık faktörü.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={resetToDefaults}
            className="text-xs text-rose-600 font-semibold hover:underline"
          >
            Tüm Demo Verilerini ve Ayarları Sıfırla
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Ağırlıkları Kaydet & Uygula</span>
          </button>
        </div>
      </form>
    </div>
  );
};
