import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  RotateCcw, 
  Filter, 
  Settings2,
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { rankCandidatesForPosition } from '../../services/matchingAlgorithm';
import { MatchResult, CandidateStatus } from '../../types';
import { MatchDetailModal } from './MatchDetailModal';

export const SmartMatchingPage: React.FC = () => {
  const { 
    positions, 
    employees, 
    trainings, 
    algorithmWeights,
    selectedPositionId, 
    setSelectedPositionId,
    inspectingMatch,
    setInspectingMatch,
    updateCandidateStatus,
    revertCandidateStatus,
    setActiveView
  } = useApp();

  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);
  const [selectedResultForModal, setSelectedResultForModal] = useState<MatchResult | null>(null);

  // Selected position object
  const currentPosition = useMemo(() => {
    return positions.find(p => p.id === selectedPositionId) || positions[0];
  }, [positions, selectedPositionId]);

  // Rank all candidates for this position using live weighted engine
  const rankedResults = useMemo(() => {
    if (!currentPosition) return [];
    return rankCandidatesForPosition(currentPosition, employees, trainings, algorithmWeights);
  }, [currentPosition, employees, trainings, algorithmWeights]);

  // Filtered by min score
  const filteredResults = useMemo(() => {
    return rankedResults.filter(r => r.scores.overallScore >= minScoreFilter);
  }, [rankedResults, minScoreFilter]);

  // Auto-open modal if inspectingMatch is set from another page
  React.useEffect(() => {
    if (inspectingMatch && currentPosition && inspectingMatch.positionId === currentPosition.id) {
      const match = rankedResults.find(r => r.candidate.id === inspectingMatch.candidateId);
      if (match) {
        setSelectedResultForModal(match);
      }
      setInspectingMatch(null);
    }
  }, [inspectingMatch, currentPosition, rankedResults, setInspectingMatch]);

  const handleOpenDetail = (result: MatchResult) => {
    setSelectedResultForModal(result);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>5 Eksenli Ağırlıklı Skor Algoritması</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Akıllı Eşleştirme Motoru
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Açık pozisyonu seçin; yapay zeka kurum içindeki tüm çalışanları saniyeler içinde analiz edip sıralasın.
          </p>
        </div>

        <button
          onClick={() => setActiveView('settings')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Settings2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Ağırlıkları Ayarla (%40 Yetkinlik, %20 Deneyim...)</span>
        </button>
      </div>

      {/* Position Selector & Info Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Analiz Edilecek Açık Pozisyonu Seçin:
            </label>
            <select
              value={currentPosition?.id}
              onChange={e => setSelectedPositionId(e.target.value)}
              className="w-full text-sm font-bold p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-hidden focus:border-emerald-500"
            >
              {positions.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} — {p.department} ({p.level} Seviye)
                </option>
              ))}
            </select>
          </div>

          {/* Min Score Filter */}
          <div className="md:w-56 shrink-0">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Uyum Skoru Filtresi:
            </label>
            <select
              value={minScoreFilter}
              onChange={e => setMinScoreFilter(Number(e.target.value))}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white text-slate-700"
            >
              <option value={0}>Tüm Adaylar ({rankedResults.length})</option>
              <option value={85}>Yüksek Uyum ≥ %85</option>
              <option value={75}>Orta & Üstü ≥ %75</option>
              <option value={60}>Temel Uyum ≥ %60</option>
            </select>
          </div>
        </div>

        {/* Selected Position Details Brief */}
        {currentPosition && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="text-slate-500">
                <span className="font-bold text-slate-800">Gereksinimler: </span>
                {currentPosition.minExperienceYears}+ Yıl Deneyim · {currentPosition.level} Seviye
              </div>
              <div className="text-slate-500 flex flex-wrap gap-1.5 items-center">
                <span className="font-bold text-slate-800">Aranan Yetkinlikler:</span>
                {currentPosition.requiredSkills.map((sk, idx) => (
                  <span 
                    key={idx} 
                    className={`px-1.5 py-0.5 rounded text-[11px] ${
                      sk.isPriority ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {sk.skillName} {sk.isPriority && '★'}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 text-slate-400 font-mono text-[11px]">
              Taranan Havuz: {employees.length} Çalışan · {rankedResults.filter(r => r.scores.overallScore >= 80).length} Yüksek Uyumlu
            </div>
          </div>
        )}
      </div>

      {/* Ranked Candidate Results */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="font-bold text-slate-700 uppercase tracking-wider">
            Sıralı Aday Uyum Tablosu ({filteredResults.length} Çalışan)
          </span>
          <span>En Yüksek Uyumdan En Düşüğe Sıralandı</span>
        </div>

        {filteredResults.map((result, index) => {
          const { candidate, scores, missingSkills, status } = result;
          const isHigh = scores.overallScore >= 85;
          const isMedium = scores.overallScore >= 75 && scores.overallScore < 85;

          return (
            <div
              key={candidate.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
            >
              {/* Left: Candidate Info & Rank */}
              <div className="flex items-start sm:items-center gap-4 flex-1">
                {/* Ranking order number */}
                <div className={`w-8 h-8 rounded-xl font-mono text-xs font-black flex items-center justify-center shrink-0 ${
                  index === 0 
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                    : index === 1
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  #{index + 1}
                </div>

                {/* Avatar */}
                <div className={`w-12 h-12 rounded-xl text-white font-extrabold text-base flex items-center justify-center shrink-0 ${candidate.avatarBg}`}>
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {candidate.name}
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {candidate.currentStatus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5">
                    {candidate.title} · {candidate.department} · <span className="font-mono text-slate-600">{candidate.experienceYears} Yıl Deneyim</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px]">
                    <span className="text-slate-400">Yetkinlikler:</span>
                    {candidate.skills.slice(0, 3).map((sk, i) => (
                      <span key={i} className="text-slate-600 bg-slate-50 border border-slate-200 px-1.5 py-0.2 rounded">
                        {sk.skillName}
                      </span>
                    ))}
                    {missingSkills.length > 0 && (
                      <span className="text-amber-600 font-medium">
                        · {missingSkills.length} gelişim alanı var
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Center: Score Bars Overview */}
              <div className="lg:w-64 shrink-0 px-2 lg:px-4 lg:border-x lg:border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700">Uyum Skoru</span>
                  <span className={`font-mono text-lg font-black tabular-nums ${isHigh ? 'text-emerald-600' : isMedium ? 'text-blue-600' : 'text-slate-700'}`}>
                    %{scores.overallScore}
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full ${
                      isHigh ? 'bg-emerald-500' : isMedium ? 'bg-blue-500' : 'bg-slate-400'
                    }`}
                    style={{ width: `${scores.overallScore}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Yetkinlik: %{scores.skillScore}</span>
                  <span>Deneyim: %{scores.experienceScore}</span>
                  <span>Hedef: %{scores.careerGoalScore}</span>
                </div>
              </div>

              {/* Right: Real Interactive Actions */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenDetail(result)}
                  className="px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Eşleşmeyi İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {status !== 'Mülakat Aşamasında' && status !== 'İç Atama Sürecinde' && status !== 'Atandı' && (
                  <button
                    onClick={() => updateCandidateStatus(candidate.id, 'Mülakat Aşamasında', currentPosition.id)}
                    className="px-3 py-2 text-xs font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-violet-600" />
                    <span>Mülakata Çağır</span>
                  </button>
                )}

                {status !== 'İç Atama Sürecinde' && status !== 'Atandı' && (
                  <button
                    onClick={() => updateCandidateStatus(candidate.id, 'İç Atama Sürecinde', currentPosition.id)}
                    className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Atamayı Başlat</span>
                  </button>
                )}

                {status !== 'Aktif' && (
                  <button
                    onClick={() => revertCandidateStatus(candidate.id)}
                    title="Durumu Geri Al"
                    className="p-2 text-slate-400 hover:text-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedResultForModal && (
        <MatchDetailModal
          matchResult={selectedResultForModal}
          onClose={() => setSelectedResultForModal(null)}
        />
      )}
    </div>
  );
};
