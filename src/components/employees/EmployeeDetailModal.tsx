import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Target, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { calculateMatch } from '../../services/matchingAlgorithm';

export const EmployeeDetailModal: React.FC = () => {
  const { 
    selectedEmployeeId, 
    setSelectedEmployeeId, 
    employees, 
    positions, 
    trainings, 
    algorithmWeights,
    setActiveView,
    setSelectedPositionId,
    setInspectingMatch
  } = useApp();

  const employee = employees.find(e => e.id === selectedEmployeeId);

  if (!employee) return null;

  // Calculate matches for all open positions for this candidate
  const eligibleMatches = positions.map(pos => {
    const match = calculateMatch(employee, pos, trainings, algorithmWeights);
    return {
      position: pos,
      match
    };
  }).sort((a, b) => b.match.scores.overallScore - a.match.scores.overallScore);

  const bestMatch = eligibleMatches[0];

  const handleGoToCareerMap = () => {
    setActiveView('career-map');
    setSelectedEmployeeId(employee.id);
  };

  const handleInspectSpecificMatch = (posId: string) => {
    setSelectedPositionId(posId);
    setInspectingMatch({ positionId: posId, candidateId: employee.id });
    setActiveView('matching');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl text-white font-extrabold text-xl flex items-center justify-center shadow-md ${employee.avatarBg}`}>
              {employee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {employee.currentStatus}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {employee.potentialRating}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                {employee.title} · <span className="font-medium text-slate-700">{employee.department}</span>
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {employee.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {employee.location}
                </span>
                <span className="font-mono text-slate-600 font-medium">
                  {employee.experienceYears} Yıl Deneyim
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedEmployeeId('')}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Bio & Overview */}
          {employee.bio && (
            <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800">Profil Özeti: </span>
              {employee.bio}
            </div>
          )}

          {/* Top Matching Positions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>En Uygun Kurum İçi Pozisyonlar</span>
              </h3>
              <span className="text-xs text-slate-400">
                Toplam {eligibleMatches.length} pozisyon değerlendirildi
              </span>
            </div>

            <div className="space-y-2.5">
              {eligibleMatches.slice(0, 3).map(({ position: pos, match }) => {
                const score = match.scores.overallScore;
                const isHigh = score >= 80;

                return (
                  <div 
                    key={pos.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                  >
                    <div>
                      <div className="text-xs text-slate-400">{pos.department}</div>
                      <div className="text-sm font-bold text-slate-900">{pos.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {pos.minExperienceYears}+ Yıl Deneyim · {pos.level} Seviye
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className={`font-mono text-base font-extrabold tabular-nums ${isHigh ? 'text-emerald-600' : 'text-blue-600'}`}>
                          %{score}
                        </div>
                        <div className="text-[10px] text-slate-400">Genel Uyum</div>
                      </div>

                      <button
                        onClick={() => handleInspectSpecificMatch(pos.id)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Eşleşmeyi İncele</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Skills & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Skills */}
            <div className="p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                Mevcut Yetkinlikler ({employee.skills.length})
              </h4>
              <div className="space-y-2">
                {employee.skills.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                    <span className="font-medium text-slate-700">{s.skillName}</span>
                    <span className="font-mono text-[11px] font-semibold text-slate-500">
                      {s.level} · {s.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Goals & Missing Skills for Top Role */}
            <div className="p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                Kariyer Hedefleri & İlgi Alanları
              </h4>
              <div className="space-y-1.5 mb-4">
                {employee.careerGoals.map((goal, idx) => (
                  <div key={idx} className="text-xs font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>

              {bestMatch && bestMatch.match.missingSkills.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-amber-700 mb-1.5">
                    {bestMatch.position.title} İçin Geliştirilmeli:
                  </div>
                  <div className="space-y-1">
                    {bestMatch.match.missingSkills.map((gap, i) => (
                      <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{gap.skillName} ({gap.requiredLevel} hedefleniyor)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Education & Completed Trainings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-slate-600" />
                Eğitim Geçmişi
              </div>
              <div className="font-semibold text-slate-800">{employee.education.school}</div>
              <div className="text-slate-500">{employee.education.degree} · {employee.education.field} ({employee.education.graduationYear})</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-slate-600" />
                Tamamlanan Kurumsal Eğitimler
              </div>
              {employee.completedTrainings.length === 0 ? (
                <div className="text-slate-400">Henüz tamamlanan eğitim bulunmuyor.</div>
              ) : (
                <div className="space-y-1">
                  {employee.completedTrainings.map(trId => {
                    const tr = trainings.find(t => t.id === trId);
                    return (
                      <div key={trId} className="text-slate-700 font-medium">
                        ✓ {tr ? tr.title : trId}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
          <button
            onClick={() => setSelectedEmployeeId('')}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Kapat
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGoToCareerMap}
              className="px-4 py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span>Kariyer Haritasını Gör</span>
            </button>

            {bestMatch && (
              <button
                onClick={() => handleInspectSpecificMatch(bestMatch.position.id)}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>En Uygun Eşleşmeye Git</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
