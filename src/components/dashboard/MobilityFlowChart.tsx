import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

export const MobilityFlowChart: React.FC = () => {
  const { mobilityRecords } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>İç Mobilite Akışı</span>
            <span className="text-xs font-normal text-slate-500">(Son 6 Ayda Gerçekleşen Geçişler)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Çalışanların departmanlar arası yatay ve dikey yükselme geçmişi
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+6 Başarılı İç Transfer</span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {mobilityRecords.slice(0, 5).map(record => (
          <div key={record.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            {/* Person & Source */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px] shrink-0">
                {record.employeeName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-bold text-slate-900">{record.employeeName}</div>
                <div className="text-slate-500 text-[11px]">{record.fromRole} ({record.fromDepartment})</div>
              </div>
            </div>

            {/* Transition Arrow */}
            <div className="flex items-center gap-2 text-slate-400 self-center">
              <div className="h-px w-8 bg-slate-200 hidden sm:block" />
              <ArrowRight className="w-4 h-4 text-emerald-500" />
              <div className="h-px w-8 bg-slate-200 hidden sm:block" />
            </div>

            {/* Target Role & Department */}
            <div className="sm:text-right">
              <div className="font-bold text-emerald-700">{record.toRole}</div>
              <div className="text-slate-500 text-[11px]">{record.toDepartment} · {record.date}</div>
            </div>

            {/* Match score badge */}
            <div className="shrink-0 self-end sm:self-center">
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                %{record.matchScore} Uyum
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
