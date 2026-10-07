import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  TrendingUp, 
  UserCheck, 
  Calendar, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { MatchResult, CandidateStatus } from '../../types';
import { requestDeepAiEvaluation, AiEvaluationResponse } from '../../services/aiService';

interface MatchDetailModalProps {
  matchResult: MatchResult;
  onClose: () => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ matchResult, onClose }) => {
  const { 
    updateCandidateStatus, 
    revertCandidateStatus, 
    setActiveView, 
    setSelectedEmployeeId 
  } = useApp();

  const { candidate, position, scores, missingSkills, recommendedTrainings, status } = matchResult;

  const [aiLoading, setAiLoading] = useState(false);
  const [aiReport, setAiReport] = useState<AiEvaluationResponse | null>(null);

  const handleDeepAiAnalyze = async () => {
    setAiLoading(true);
    try {
      const res = await requestDeepAiEvaluation(candidate, position, scores);
      setAiReport(res);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAction = (newStatus: CandidateStatus) => {
    updateCandidateStatus(candidate.id, newStatus, position.id);
  };

  const handleRevert = () => {
    revertCandidateStatus(candidate.id);
  };

  const handleGoToCareerMap = () => {
    setSelectedEmployeeId(candidate.id);
    setActiveView('career-map');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="p-6 bg-slate-950 text-white flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl text-white font-extrabold text-xl flex items-center justify-center shadow-lg ${candidate.avatarBg}`}>
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight text-white">{candidate.name}</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {candidate.currentStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Mevcut: <span className="text-slate-200 font-medium">{candidate.title}</span> ({candidate.department}) 
                <span className="mx-2">→</span> 
                Hedef: <span className="text-emerald-400 font-bold">{position.title}</span> ({position.department})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Main Score Badge */}
            <div className="text-right">
              <div className="font-mono text-3xl font-black text-emerald-400 tracking-tight tabular-nums">
                %{scores.overallScore}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                Genel Uyum Skoru
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Section 10: 5 Dairesel / Progress Bar Alt Skorları */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Ağırlıklı Uyum Faktörleri Kırılımı</span>
              <span className="text-[11px] text-slate-400 font-normal">Algoritmik Doğrulama</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { label: 'Yetkinlik Uyumu', score: scores.skillScore, weight: '%40 Ağırlık', color: 'bg-emerald-500' },
                { label: 'Deneyim Uyumu', score: scores.experienceScore, weight: '%20 Ağırlık', color: 'bg-blue-500' },
                { label: 'Kariyer Hedefi', score: scores.careerGoalScore, weight: '%20 Ağırlık', color: 'bg-violet-500' },
                { label: 'Eğitim Uyumu', score: scores.educationScore, weight: '%10 Ağırlık', color: 'bg-cyan-500' },
                { label: 'Profil & Kültür', score: scores.profileFitScore, weight: '%10 Ağırlık', color: 'bg-amber-500' },
              ].map(item => (
                <div key={item.label} className="p-3 bg-white rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-bold text-slate-600 truncate">{item.label}</div>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-1 tabular-nums">
                    %{item.score}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.weight}</div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 11: Eksik Yetkinlik Analizi & Önerilen Eğitimler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Eksik Yetkinlikler */}
            <div className="p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Eksik Yetkinlik Analizi
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  {missingSkills.length} Tespit Edilen Fark
                </span>
              </div>

              {missingSkills.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Pozisyonun tüm teknik ve yetkinlik gereksinimleri eksiksiz karşılanıyor!</span>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {missingSkills.map((gap, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{gap.skillName}</span>
                        <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          Hedef: {gap.requiredLevel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {gap.reason}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Önerilen Eğitimler */}
            <div className="p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  Önerilen Gelişim Programları
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  {recommendedTrainings.length} Eğitim
                </span>
              </div>

              {recommendedTrainings.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-xs">
                  Öncelikli eğitim gereksinimi bulunmuyor. Doğrudan oryantasyon süreci başlatılabilir.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {recommendedTrainings.map(t => (
                    <div key={t.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 line-clamp-1">{t.title}</span>
                        <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded shrink-0">
                          {t.duration}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                        <span>Sağlayıcı: {t.provider}</span>
                        <span className="font-medium text-slate-700">{t.level} Seviye</span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-medium mt-1">
                        ↳ Öneri Nedeni: {t.reason}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Executive Assessment Panel */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-slate-900/10 to-blue-950/20 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Yapay Zeka Karar Özeti & ROI Öngörüsü
                </h3>
              </div>

              {!aiReport && (
                <button
                  onClick={handleDeepAiAnalyze}
                  disabled={aiLoading}
                  className="px-3 py-1 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{aiLoading ? 'Analiz Ediliyor...' : 'Derin Rapor Üret'}</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mt-2">
              {matchResult.aiInsights}
            </p>

            {aiReport && (
              <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 leading-relaxed">
                  <strong className="text-emerald-800">Yönetim Özeti: </strong>
                  {aiReport.executiveSummary}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">Adayın Temel Güçlü Yanları</div>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      {aiReport.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">Tahmini Adaptasyon Süresi</div>
                    <div className="font-mono text-base font-extrabold text-blue-600">
                      {aiReport.estimatedRampUpWeeks} Hafta
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {aiReport.retentionImpact}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 15: Gerçek Çalışan Aksiyon Butonları */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoToCareerMap}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span>Kariyer Haritasını Gör</span>
            </button>

            {status !== 'Aktif' && (
              <button
                onClick={handleRevert}
                className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Eşleşmeyi Geri Al</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {status !== 'Mülakat Aşamasında' && status !== 'İç Atama Sürecinde' && status !== 'Atandı' && (
              <button
                onClick={() => handleAction('Mülakat Aşamasında')}
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Mülakata Çağır</span>
              </button>
            )}

            {status !== 'İç Atama Sürecinde' && status !== 'Atandı' && (
              <button
                onClick={() => handleAction('İç Atama Sürecinde')}
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Atamayı Başlat</span>
              </button>
            )}

            {status === 'İç Atama Sürecinde' && (
              <button
                onClick={() => handleAction('Atandı')}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Atamayı Onayla & Tamamla</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
