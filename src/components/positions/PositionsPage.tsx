import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Users, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { rankCandidatesForPosition } from '../../services/matchingAlgorithm';
import { CreatePositionModal } from './CreatePositionModal';

export const PositionsPage: React.FC = () => {
  const { 
    positions, 
    employees, 
    trainings, 
    algorithmWeights,
    setSelectedPositionId, 
    setActiveView,
    setCreatePositionModalOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const departments = Array.from(new Set(positions.map(p => p.department)));

  const filteredPositions = positions.filter(pos => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchTitle = pos.title.toLowerCase().includes(q);
      const matchDept = pos.department.toLowerCase().includes(q);
      const matchDesc = pos.description.toLowerCase().includes(q);
      const matchSkill = pos.requiredSkills.some(s => s.skillName.toLowerCase().includes(q));
      if (!matchTitle && !matchDept && !matchDesc && !matchSkill) return false;
    }

    if (departmentFilter !== 'ALL' && pos.department !== departmentFilter) return false;
    if (statusFilter !== 'ALL' && pos.status !== statusFilter) return false;

    return true;
  });

  const handleStartMatching = (posId: string) => {
    setSelectedPositionId(posId);
    setActiveView('matching');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Açık Pozisyonlar
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kurum içi aday eşleştirmesi bekleyen stratejik açık roller ve gereksinimleri
          </p>
        </div>

        <button
          onClick={() => setCreatePositionModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Pozisyon Aç</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Pozisyon adı, departman veya gereken yetkinlik ara..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-emerald-500"
          />
        </div>

        <select
          value={departmentFilter}
          onChange={e => setDepartmentFilter(e.target.value)}
          className="w-full md:w-48 py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-700"
        >
          <option value="ALL">Tüm Departmanlar</option>
          {departments.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full md:w-40 py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-700"
        >
          <option value="ALL">Tüm Durumlar</option>
          <option value="Yeni">Yeni</option>
          <option value="Eşleşme Bekliyor">Eşleşme Bekliyor</option>
          <option value="Mülakat">Mülakat</option>
          <option value="Atama">Atama</option>
          <option value="Kapatıldı">Kapatıldı</option>
        </select>
      </div>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPositions.map(pos => {
          const ranked = rankCandidatesForPosition(pos, employees, trainings, algorithmWeights);
          const topCandidate = ranked[0];
          const highMatchesCount = ranked.filter(r => r.scores.overallScore >= 80).length;

          let statusBadgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
          if (pos.status === 'Eşleşme Bekliyor') statusBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
          if (pos.status === 'Mülakat') statusBadgeClass = 'bg-violet-50 text-violet-700 border-violet-200';
          if (pos.status === 'Atama') statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';

          return (
            <div
              key={pos.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">{pos.department}</div>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{pos.title}</h3>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border shrink-0 ${statusBadgeClass}`}>
                    {pos.status}
                  </span>
                </div>

                {/* Sub info */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-mono">
                  <span>{pos.level} Seviye</span>
                  <span>·</span>
                  <span>Min {pos.minExperienceYears} Yıl Deneyim</span>
                  <span>·</span>
                  <span>Açılış: {pos.openSince}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {pos.description}
                </p>

                {/* Required Skills */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Gereken Yetkinlikler
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pos.requiredSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className={`text-[11px] px-2 py-0.5 rounded ${
                          sk.isPriority
                            ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {sk.skillName} {sk.isPriority && '★'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Top Internal Candidate Box */}
                {topCandidate && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 ${topCandidate.candidate.avatarBg}`}>
                        {topCandidate.candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {topCandidate.candidate.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {topCandidate.candidate.title}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs font-black text-emerald-600 tabular-nums">
                        %{topCandidate.scores.overallScore} Uyum
                      </span>
                      <div className="text-[10px] text-slate-400">
                        {highMatchesCount} uygun iç aday
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {ranked.length} çalışan tarandı
                </span>
                <button
                  onClick={() => handleStartMatching(pos.id)}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Akıllı Eşleştirmeyi İncele</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <CreatePositionModal />
    </div>
  );
};
