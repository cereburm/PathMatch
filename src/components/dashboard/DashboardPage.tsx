import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  TrendingUp, 
  ShieldCheck, 
  Building2,
  Clock,
  Compass
} from 'lucide-react';
import { MobilityFlowChart } from './MobilityFlowChart';
import { rankCandidatesForPosition } from '../../services/matchingAlgorithm';

export const DashboardPage: React.FC = () => {
  const { 
    employees, 
    positions, 
    trainings, 
    algorithmWeights,
    setActiveView, 
    setSelectedPositionId,
    setInspectingMatch,
    setCreatePositionModalOpen,
    setAddEmployeeModalOpen
  } = useApp();

  // Compute live metrics
  const totalEmployees = 248; // Total corporate pool (demo context)
  const activeEmployeeProfiles = employees.length;
  const openPositionsCount = positions.filter(p => p.status !== 'Kapatıldı').length;

  // Calculate matches for all open positions to get high matches & average
  let totalMatchSum = 0;
  let matchCount = 0;
  let highMatchCount = 0;

  const positionsWithBestCandidates = positions.slice(0, 4).map(pos => {
    const ranked = rankCandidatesForPosition(pos, employees, trainings, algorithmWeights);
    const top = ranked[0];

    if (top) {
      totalMatchSum += top.scores.overallScore;
      matchCount++;
      if (top.scores.overallScore >= 80) {
        highMatchCount++;
      }
    }

    return {
      position: pos,
      bestMatch: top
    };
  });

  const averageMatchPercent = matchCount > 0 ? Math.round(totalMatchSum / matchCount) : 87;

  // Skill category counts
  const categoryCounts: Record<string, number> = {
    'Teknik Yetkinlik': 0,
    'Liderlik': 0,
    'İletişim': 0,
    'Yönetim': 0,
    'Analitik': 0
  };

  employees.forEach(emp => {
    emp.skills.forEach(s => {
      if (s.category === 'Teknik') categoryCounts['Teknik Yetkinlik'] += 1;
      else if (s.category === 'Liderlik') categoryCounts['Liderlik'] += 1;
      else if (s.category === 'İletişim') categoryCounts['İletişim'] += 1;
      else if (s.category === 'Yönetim') categoryCounts['Yönetim'] += 1;
      else if (s.category === 'Analitik') categoryCounts['Analitik'] += 1;
    });
  });

  const totalSkillTags = Object.values(categoryCounts).reduce((a, b) => a + b, 0) || 1;

  // Position status counts
  const positionStatusCounts = {
    'Yeni': positions.filter(p => p.status === 'Yeni').length,
    'Eşleşme Bekliyor': positions.filter(p => p.status === 'Eşleşme Bekliyor').length,
    'Mülakat': positions.filter(p => p.status === 'Mülakat').length,
    'Atama': positions.filter(p => p.status === 'Atama').length,
  };

  const handleInspectMatch = (posId: string, candId: string) => {
    setSelectedPositionId(posId);
    setInspectingMatch({ positionId: posId, candidateId: candId });
    setActiveView('matching');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Banner / Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            İK Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Kurumunuzdaki yetenekleri doğru pozisyonlarla eşleştirin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCreatePositionModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Pozisyon Aç</span>
          </button>
          <button
            onClick={() => setActiveView('matching')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Akıllı Eşleştirmeyi Başlat</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1 */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>İç Yetenek Havuzu</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
              {totalEmployees}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {activeEmployeeProfiles} aktif detaylı profil · 6 departman
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Açık Pozisyon</span>
            <Briefcase className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono tracking-tight tabular-nums">
              {openPositionsCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              İç aday öncelikli stratejik roller
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Yüksek Uyumlu Eşleşme</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono tracking-tight tabular-nums">
              {42}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              ≥ %80 uyum skoru yakalayan adaylar
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Ortalama Eşleşme</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
              %{averageMatchPercent}
            </div>
            <div className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Dış ilana gerek kalmadan hazır</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spotlight: İçeriden Doldurulabilecek Pozisyonlar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Yapay Zeka Taraması</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              İçeriden Doldurulabilecek Pozisyonlar
            </h3>
            <p className="text-xs text-slate-500">
              Açık pozisyonlar için şirket içinden en yüksek uyum skoruna sahip çalışanlar
            </p>
          </div>

          <button
            onClick={() => setActiveView('matching')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Tüm Pozisyonları Eşleştir</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {positionsWithBestCandidates.map(({ position: pos, bestMatch }) => {
            if (!bestMatch) return null;
            const score = bestMatch.scores.overallScore;

            return (
              <div 
                key={pos.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all bg-slate-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-slate-500">{pos.department}</div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">{pos.title}</h4>

                  {/* Best candidate block */}
                  <div className="mt-4 pt-3 border-t border-slate-200/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-slate-500">En Uygun Çalışan:</span>
                      <span className="font-mono text-xs font-extrabold text-emerald-600 tabular-nums">
                        %{score} Uyum
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 ${bestMatch.candidate.avatarBg}`}>
                        {bestMatch.candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {bestMatch.candidate.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {bestMatch.candidate.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <button
                    onClick={() => handleInspectMatch(pos.id, bestMatch.candidate.id)}
                    className="w-full py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Eşleşmeyi İncele</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Grid: Yetenek Dağılımı + Açık Pozisyon Durumu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yetenek Dağılımı */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Yetenek Dağılımı</h3>
              <p className="text-xs text-slate-500">Kurum içi yetkinlik kategorilerinin ağırlığı</p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {totalSkillTags} Kayıtlı Yetkinlik
            </span>
          </div>

          <div className="space-y-3.5 mt-2">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / totalSkillTags) * 100);
              let barColor = 'bg-blue-500';
              if (cat.includes('Liderlik')) barColor = 'bg-emerald-500';
              if (cat.includes('İletişim')) barColor = 'bg-violet-500';
              if (cat.includes('Yönetim')) barColor = 'bg-amber-500';
              if (cat.includes('Analitik')) barColor = 'bg-cyan-500';

              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700">{cat}</span>
                    <span className="font-mono text-slate-500 tabular-nums">%{pct} ({count})</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${barColor}`} 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Açık Pozisyon Durumu */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Açık Pozisyon Durumu</h3>
              <p className="text-xs text-slate-500">Pozisyonların iç eşleşme ve atama fazları</p>
            </div>
            <button 
              onClick={() => setActiveView('positions')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Tümünü Gör
            </button>
          </div>

          <div className="space-y-3.5 mt-2">
            {[
              { label: 'Yeni', count: positionStatusCounts['Yeni'], color: 'bg-blue-500' },
              { label: 'Eşleşme Bekliyor', count: positionStatusCounts['Eşleşme Bekliyor'], color: 'bg-amber-500' },
              { label: 'Mülakat', count: positionStatusCounts['Mülakat'], color: 'bg-violet-500' },
              { label: 'Atama', count: positionStatusCounts['Atama'], color: 'bg-emerald-500' }
            ].map(item => {
              const total = positions.length || 1;
              const pct = Math.round((item.count / total) * 100);

              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="font-mono text-slate-500 tabular-nums">{item.count} Pozisyon (%{pct})</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color}`} 
                      style={{ width: `${Math.max(8, pct)}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* İç Mobilite Akışı Grafiği (Son 6 Ayda Departmanlar Arası Geçişler) */}
      <MobilityFlowChart />
    </div>
  );
};
