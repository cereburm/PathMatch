import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Award
} from 'lucide-react';

export const TalentPoolPage: React.FC = () => {
  const { employees, positions, setSelectedEmployeeId, setActiveView } = useApp();

  const criticalTalents = employees.filter(e => e.potentialRating === 'Kritik Yetenek');
  const highTalents = employees.filter(e => e.potentialRating === 'Yüksek');
  
  // At-risk employees: High potential but not currently in interview or promotion
  const atRiskEmployees = employees.filter(
    e => (e.potentialRating === 'Kritik Yetenek' || e.potentialRating === 'Yüksek') && e.currentStatus === 'Aktif'
  );

  const handleInspectEmployee = (id: string) => {
    setSelectedEmployeeId(id);
    setActiveView('employees');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md mb-1">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Stratejik İK Analitiği</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Yetenek Havuzu & Risk Matrisi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kritik yetenek segmentasyonu, ayrılma riski taşıyan gizli potansiyeller ve kariyer rotasyon hazırlığı
          </p>
        </div>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Kritik Yetenekler (Yıldız Oyuncular)</div>
          <div className="text-3xl font-black text-emerald-600 font-mono mt-2 tabular-nums">
            {criticalTalents.length} Çalışan
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Yüksek performans & liderlik potansiyeli</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Yüksek Potansiyelli Uzmanlar</div>
          <div className="text-3xl font-black text-blue-600 font-mono mt-2 tabular-nums">
            {highTalents.length} Çalışan
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Hızlı öğrenen, bir üst role aday profiller</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Ayrılma Riski Olan Yetenekler</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 font-mono mt-2 tabular-nums">
            {atRiskEmployees.length} Çalışan
          </div>
          <div className="text-[11px] text-amber-700 mt-1">Kariyer yolu çizilmezse kayıp riski var</div>
        </div>
      </div>

      {/* Risk Alert Box: Retention Danger Zone */}
      <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-6 shadow-xs">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>İç Mobilite Bekleyen Riskli Yetenekler</span>
            </h3>
            <p className="text-xs text-amber-800 mt-0.5">
              Bu çalışanlar yüksek yetkinliğe sahip olmasına rağmen henüz aktif bir terfi/atama sürecinde değiller. Dış pazara kaptırılmamaları için iç açık rollerle eşleştirilmeleri önerilir.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {atRiskEmployees.map(emp => (
            <div 
              key={emp.id}
              onClick={() => handleInspectEmployee(emp.id)}
              className="p-3.5 rounded-xl bg-white border border-amber-200/80 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 ${emp.avatarBg}`}>
                  {emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{emp.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{emp.title}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{emp.department}</div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  Hemen Eşleştir
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Talent Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4">
          Departman Bazlı Yetenek Dağılımı
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {Array.from(new Set(employees.map(e => e.department))).map(dept => {
            const deptEmps = employees.filter(e => e.department === dept);
            const avgExp = Math.round((deptEmps.reduce((acc, cur) => acc + cur.experienceYears, 0) / deptEmps.length) * 10) / 10;
            const criticalCount = deptEmps.filter(e => e.potentialRating === 'Kritik Yetenek').length;

            return (
              <div key={dept} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900">{dept}</div>
                  <div className="text-slate-500 text-[11px]">{deptEmps.length} Çalışan · Ort. {avgExp} Yıl Deneyim</div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-emerald-700 font-medium">
                    ★ {criticalCount} Kritik Yetenek
                  </span>
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {deptEmps.map(e => (
                      <div
                        key={e.id}
                        title={e.name}
                        className={`inline-block h-6 w-6 rounded-full text-white text-[10px] font-bold text-center leading-6 ring-2 ring-white ${e.avatarBg}`}
                      >
                        {e.name[0]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
