import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Sparkles, 
  ArrowRight, 
  TrendingUp,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { calculateMatch } from '../../services/matchingAlgorithm';
import { EmployeeDetailModal } from './EmployeeDetailModal';
import { AddEmployeeModal } from './AddEmployeeModal';

export const EmployeesPage: React.FC = () => {
  const { 
    employees, 
    positions, 
    trainings, 
    algorithmWeights,
    selectedEmployeeId, 
    setSelectedEmployeeId,
    setAddEmployeeModalOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [experienceFilter, setExperienceFilter] = useState('ALL');
  const [matchScoreFilter, setMatchScoreFilter] = useState('ALL');

  // Pre-calculate match metrics for each employee across positions
  const employeeStats = useMemo(() => {
    const statsMap: Record<string, { topScore: number; matchCount: number; bestRole: string }> = {};

    employees.forEach(emp => {
      let topScore = 0;
      let matchCount = 0;
      let bestRole = '';

      positions.forEach(pos => {
        const match = calculateMatch(emp, pos, trainings, algorithmWeights);
        if (match.scores.overallScore >= 70) {
          matchCount++;
        }
        if (match.scores.overallScore > topScore) {
          topScore = match.scores.overallScore;
          bestRole = pos.title;
        }
      });

      statsMap[emp.id] = { topScore, matchCount, bestRole };
    });

    return statsMap;
  }, [employees, positions, trainings, algorithmWeights]);

  // Unique departments for filter dropdown
  const departments = useMemo(() => {
    return Array.from(new Set(employees.map(e => e.department)));
  }, [employees]);

  // Filtered list
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchName = emp.name.toLowerCase().includes(q);
        const matchTitle = emp.title.toLowerCase().includes(q);
        const matchDept = emp.department.toLowerCase().includes(q);
        const matchSkill = emp.skills.some(s => s.skillName.toLowerCase().includes(q));
        const matchGoal = emp.careerGoals.some(g => g.toLowerCase().includes(q));
        if (!matchName && !matchTitle && !matchDept && !matchSkill && !matchGoal) return false;
      }

      // Department
      if (departmentFilter !== 'ALL' && emp.department !== departmentFilter) {
        return false;
      }

      // Experience
      if (experienceFilter === '1-3' && (emp.experienceYears < 1 || emp.experienceYears > 3)) return false;
      if (experienceFilter === '4-6' && (emp.experienceYears < 4 || emp.experienceYears > 6)) return false;
      if (experienceFilter === '7+' && emp.experienceYears < 7) return false;

      // Match Score
      const stats = employeeStats[emp.id];
      if (matchScoreFilter === 'HIGH' && (!stats || stats.topScore < 85)) return false;
      if (matchScoreFilter === 'MEDIUM' && (!stats || stats.topScore < 70)) return false;

      return true;
    });
  }, [employees, searchQuery, departmentFilter, experienceFilter, matchScoreFilter, employeeStats]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Çalışanlar & Yetenek Envanteri
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kurum içi çalışanların yetkinlikleri, hedefleri ve açık pozisyonlara uygunluk analizi
          </p>
        </div>

        <button
          onClick={() => setAddEmployeeModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yeni Çalışan Ekle</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="İsim, unvan, yetkinlik veya kariyer hedefi ara (örn. Ahmet, Python, SQL)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Department Filter */}
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

          {/* Experience Filter */}
          <select
            value={experienceFilter}
            onChange={e => setExperienceFilter(e.target.value)}
            className="w-full md:w-36 py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-700"
          >
            <option value="ALL">Tüm Deneyimler</option>
            <option value="1-3">1 - 3 Yıl</option>
            <option value="4-6">4 - 6 Yıl</option>
            <option value="7+">7+ Yıl</option>
          </select>

          {/* Match Score Filter */}
          <select
            value={matchScoreFilter}
            onChange={e => setMatchScoreFilter(e.target.value)}
            className="w-full md:w-40 py-2 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-700"
          >
            <option value="ALL">Tüm Eşleşmeler</option>
            <option value="HIGH">Yüksek Uyum (≥%85)</option>
            <option value="MEDIUM">Orta & Üstü (≥%70)</option>
          </select>
        </div>

        {/* Quick count indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Toplam {filteredEmployees.length} çalışan listeleniyor</span>
          {(searchQuery || departmentFilter !== 'ALL' || experienceFilter !== 'ALL' || matchScoreFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setDepartmentFilter('ALL');
                setExperienceFilter('ALL');
                setMatchScoreFilter('ALL');
              }}
              className="text-emerald-600 font-semibold hover:underline"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      </div>

      {/* Employees Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-3 px-4">Çalışan</th>
                <th className="py-3 px-4">Departman / Unvan</th>
                <th className="py-3 px-4">Deneyim</th>
                <th className="py-3 px-4">Öne Çıkan Yetkinlikler</th>
                <th className="py-3 px-4">Kariyer Hedefi</th>
                <th className="py-3 px-4 text-center">Uygun Pozisyon</th>
                <th className="py-3 px-4 text-right">En Yüksek Uyum</th>
                <th className="py-3 px-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Kriterlere uygun çalışan bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map(emp => {
                  const stats = employeeStats[emp.id] || { topScore: 0, matchCount: 0, bestRole: '-' };
                  const isHigh = stats.topScore >= 85;

                  return (
                    <tr
                      key={emp.id}
                      onClick={() => setSelectedEmployeeId(emp.id)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                    >
                      {/* Name & Avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 ${emp.avatarBg}`}>
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              {emp.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {emp.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Department & Role */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{emp.title}</div>
                        <div className="text-[11px] text-slate-500">{emp.department}</div>
                      </td>

                      {/* Experience */}
                      <td className="py-3 px-4 font-mono text-slate-600 tabular-nums">
                        {emp.experienceYears} Yıl
                      </td>

                      {/* Skills tags (clean unboxed text or soft inline tokens) */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
                          {emp.skills.slice(0, 3).map((sk, idx) => (
                            <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                              {sk.skillName}
                            </span>
                          ))}
                          {emp.skills.length > 3 && (
                            <span className="text-slate-400">+{emp.skills.length - 3}</span>
                          )}
                        </div>
                      </td>

                      {/* Career Goal */}
                      <td className="py-3 px-4 text-slate-700 max-w-xs truncate">
                        {emp.careerGoals[0] || 'Genel Gelişim'}
                      </td>

                      {/* Matching Positions Count */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-700 tabular-nums">
                        {stats.matchCount} Pozisyon
                      </td>

                      {/* Top Match Score */}
                      <td className="py-3 px-4 text-right">
                        <span className={`font-mono font-extrabold text-sm tabular-nums ${isHigh ? 'text-emerald-600' : 'text-blue-600'}`}>
                          %{stats.topScore}
                        </span>
                        <div className="text-[10px] text-slate-400 truncate max-w-[120px] ml-auto">
                          {stats.bestRole}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEmployeeId(emp.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Profili Gör"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedEmployeeId && <EmployeeDetailModal />}
      <AddEmployeeModal />
    </div>
  );
};
