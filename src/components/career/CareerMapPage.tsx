import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Target, 
  Sparkles, 
  TrendingUp, 
  UserCheck, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { calculateMatch } from '../../services/matchingAlgorithm';

export const CareerMapPage: React.FC = () => {
  const { 
    employees, 
    positions, 
    trainings, 
    algorithmWeights,
    selectedEmployeeId, 
    setSelectedEmployeeId,
    updateCandidateStatus,
    setActiveView,
    addToast
  } = useApp();

  // Employee selector
  const currentEmployee = useMemo(() => {
    return employees.find(e => e.id === selectedEmployeeId) || employees[0];
  }, [employees, selectedEmployeeId]);

  // Target position state (default to targetRoleId or first open position)
  const [selectedTargetPositionId, setSelectedTargetPositionId] = useState<string>(
    currentEmployee?.targetRoleId || positions[0]?.id || ''
  );

  // Update target position if employee changes
  React.useEffect(() => {
    if (currentEmployee?.targetRoleId) {
      setSelectedTargetPositionId(currentEmployee.targetRoleId);
    }
  }, [currentEmployee]);

  const targetPosition = useMemo(() => {
    return positions.find(p => p.id === selectedTargetPositionId) || positions[0];
  }, [positions, selectedTargetPositionId]);

  // Match analysis
  const matchResult = useMemo(() => {
    if (!currentEmployee || !targetPosition) return null;
    return calculateMatch(currentEmployee, targetPosition, trainings, algorithmWeights);
  }, [currentEmployee, targetPosition, trainings, algorithmWeights]);

  // Completed checklist toggle for demo
  const [completedTrainingsLocal, setCompletedTrainingsLocal] = useState<Record<string, boolean>>({});

  const toggleTrainingCompletion = (trId: string) => {
    setCompletedTrainingsLocal(prev => {
      const nextVal = !prev[trId];
      if (nextVal) {
        addToast('Eğitim modülü tamamlandı olarak işaretlendi! Uyum skoru yükseliyor.', 'success');
      }
      return { ...prev, [trId]: nextVal };
    });
  };

  const completedCount = Object.values(completedTrainingsLocal).filter(Boolean).length;
  const totalTrainingCount = matchResult?.recommendedTrainings.length || 1;
  const progressRatio = Math.min(100, Math.round(((matchResult?.scores.overallScore || 70) + (completedCount * 4))));

  const handleStartAssignment = () => {
    if (currentEmployee && targetPosition) {
      updateCandidateStatus(currentEmployee.id, 'İç Atama Sürecinde', targetPosition.id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-md mb-1">
            <Compass className="w-3.5 h-3.5 text-violet-600" />
            <span>Kişiselleştirilmiş Gelişim Yolu</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Kariyer Gelişim Haritası
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mevcut pozisyondan hedef pozisyona yetkinlik açıkları, eğitim basamakları ve atama hazırlığı
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('matching')}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Eşleştirme Motoruna Dön
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Employee Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            1. Çalışanı Seçin:
          </label>
          <select
            value={currentEmployee?.id}
            onChange={e => setSelectedEmployeeId(e.target.value)}
            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-hidden focus:border-violet-500"
          >
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} — {emp.title} ({emp.department})
              </option>
            ))}
          </select>
        </div>

        {/* Target Position Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            2. Hedef Pozisyonu Seçin:
          </label>
          <select
            value={targetPosition?.id}
            onChange={e => setSelectedTargetPositionId(e.target.value)}
            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-500"
          >
            {positions.map(pos => (
              <option key={pos.id} value={pos.id}>
                {pos.title} — {pos.department} ({pos.level} Seviye)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Readiness & Progress Overview */}
      {matchResult && (
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-emerald-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Yapay Zeka Rota Analizi</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {currentEmployee.name} için {targetPosition.title} Hazırlık Durumu
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Bu kariyer geçişi için temel yetkinlik örtüşmesi yüksek. Belirlenen eğitimlerin tamamlanması ile iç atama tam verimlilikle gerçekleşecektir.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <div className="text-3xl font-black font-mono text-emerald-400 tabular-nums">
                %{progressRatio}
              </div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Hazır Oluş Skoru
              </div>
            </div>

            <button
              onClick={handleStartAssignment}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Atama Sürecini Başlat</span>
            </button>
          </div>
        </div>
      )}

      {/* 4-Step Interactive Visual Career Path Flow */}
      {matchResult && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1: Mevcut Pozisyon */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between relative">
              <div className="absolute -top-3 left-4 bg-slate-900 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                Aşama 1
              </div>

              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2 mb-1">
                  Mevcut Pozisyon
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {currentEmployee.title}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  {currentEmployee.department} · {currentEmployee.experienceYears} Yıl Deneyim
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-600 mb-2">Doğrulanmış Beceriler:</div>
                  <div className="flex flex-wrap gap-1">
                    {currentEmployee.skills.slice(0, 4).map((sk, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {sk.skillName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mevcut Durum Tamamlandı</span>
              </div>
            </div>

            {/* Step 2: Geliştirilmesi Gereken Yetkinlikler */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between relative">
              <div className="absolute -top-3 left-4 bg-amber-500 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                Aşama 2
              </div>

              <div>
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mt-2 mb-1">
                  Gelişim Alanları
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Yetkinlik Açıkları
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  {matchResult.missingSkills.length} öncelikli yetkinlik gelişim bekliyor
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  {matchResult.missingSkills.length === 0 ? (
                    <div className="text-xs text-emerald-600 font-medium">
                      ✓ Tüm kritik yetkinlikler mevcut!
                    </div>
                  ) : (
                    matchResult.missingSkills.map((gap, i) => (
                      <div key={i} className="text-[11px] p-2 rounded-lg bg-amber-50/70 border border-amber-100">
                        <div className="font-bold text-slate-900">{gap.skillName}</div>
                        <div className="text-amber-800 text-[10px] mt-0.5">
                          Hedef Seviye: {gap.requiredLevel}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Analiz Edildi</span>
              </div>
            </div>

            {/* Step 3: Önerilen Eğitimler */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between relative">
              <div className="absolute -top-3 left-4 bg-blue-600 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                Aşama 3
              </div>

              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-2 mb-1">
                  Eğitim Modülleri
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Önerilen Programlar
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  Tamamlandıkça hazırlık skoru artar
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  {matchResult.recommendedTrainings.map(t => {
                    const isDone = !!completedTrainingsLocal[t.id];

                    return (
                      <div 
                        key={t.id}
                        onClick={() => toggleTrainingCompletion(t.id)}
                        className={`p-2 rounded-xl border text-[11px] cursor-pointer transition-all ${
                          isDone 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                            : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-bold line-clamp-1">{t.title}</span>
                          <span className="font-mono text-[10px] shrink-0 font-semibold">
                            {isDone ? '✓ Tamam' : t.duration}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {isDone ? 'Modül başarıyla tamamlandı' : 'Tıklayarak tamamlandı işaretleyin'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-blue-700 font-semibold flex items-center justify-between">
                <span>{completedCount}/{totalTrainingCount} Tamamlandı</span>
                <BookOpen className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 4: Hedef Pozisyon */}
            <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-5 shadow-xs flex flex-col justify-between relative bg-emerald-50/10">
              <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
                Hedef
              </div>

              <div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mt-2 mb-1">
                  Hedef Pozisyon
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {targetPosition.title}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  {targetPosition.department} · {targetPosition.level} Seviye
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-200/40">
                  <div className="text-[11px] font-bold text-slate-700 mb-2">Pozisyon Öncelikleri:</div>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                    {targetPosition.priorityCriteria.map((crit, idx) => (
                      <li key={idx} className="line-clamp-1">{crit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-emerald-200/40">
                <button
                  onClick={handleStartAssignment}
                  className="w-full py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  <span>İç Atama Başlat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
