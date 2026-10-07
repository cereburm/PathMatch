import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, User, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    globalSearchOpen, 
    setGlobalSearchOpen, 
    employees, 
    positions, 
    skills,
    setActiveView,
    setSelectedEmployeeId,
    setSelectedPositionId
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (globalSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [globalSearchOpen]);

  // Global hotkey Ctrl+K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        setGlobalSearchOpen(true);
      }
      if (e.key === 'Escape' && globalSearchOpen) {
        setGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [globalSearchOpen, setGlobalSearchOpen]);

  if (!globalSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedEmployees = q
    ? employees.filter(e => 
        e.name.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        e.skills.some(s => s.skillName.toLowerCase().includes(q))
      ).slice(0, 5)
    : [];

  const matchedPositions = q
    ? positions.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.requiredSkills.some(s => s.skillName.toLowerCase().includes(q))
      ).slice(0, 5)
    : [];

  const matchedSkills = q
    ? skills.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  const handleSelectEmployee = (id: string) => {
    setSelectedEmployeeId(id);
    setActiveView('employees');
    setGlobalSearchOpen(false);
  };

  const handleSelectPosition = (id: string) => {
    setSelectedPositionId(id);
    setActiveView('matching');
    setGlobalSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Çalışan adı, pozisyon, departman veya yetkinlik ara (örn. Ahmet, Python, Data Analyst, İK)..."
            className="w-full text-slate-800 placeholder-slate-400 bg-transparent text-sm focus:outline-hidden"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[11px] font-mono text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
            ESC
          </span>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-slate-400 text-sm">
              <Sparkles className="w-8 h-8 mx-auto text-emerald-500 mb-2 opacity-80" />
              <p className="font-medium text-slate-700">Hızlı Arama</p>
              <p className="text-xs text-slate-400 mt-1">İsim, unvan veya yetkinlik yazarak kurum içi arama yapabilirsiniz.</p>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs">
                <span className="text-slate-400">Popüler:</span>
                {['Ahmet', 'Python', 'Senior Data Analyst', 'Operasyon'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && matchedEmployees.length === 0 && matchedPositions.length === 0 && matchedSkills.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              "{query}" ile eşleşen sonuç bulunamadı.
            </div>
          )}

          {/* Matched Positions */}
          {matchedPositions.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                Açık Pozisyonlar ({matchedPositions.length})
              </div>
              <div className="space-y-1.5">
                {matchedPositions.map(pos => (
                  <div
                    key={pos.id}
                    onClick={() => handleSelectPosition(pos.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {pos.title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {pos.department} · {pos.minExperienceYears}+ Yıl Deneyim
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                      <span>Eşleştirmeyi Gör</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Employees */}
          {matchedEmployees.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                Çalışanlar ({matchedEmployees.length})
              </div>
              <div className="space-y-1.5">
                {matchedEmployees.map(emp => (
                  <div
                    key={emp.id}
                    onClick={() => handleSelectEmployee(emp.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${emp.avatarBg}`}>
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {emp.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {emp.title} · {emp.department}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      {emp.experienceYears} yıl deneyim
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Aramak istediğiniz terimi yazın</span>
          <button 
            onClick={() => setGlobalSearchOpen(false)}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
