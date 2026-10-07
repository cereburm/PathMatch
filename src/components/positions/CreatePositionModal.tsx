import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Briefcase, Plus } from 'lucide-react';
import { PositionLevel, PositionStatus, RequiredSkill, SkillLevel } from '../../types';

export const CreatePositionModal: React.FC = () => {
  const { 
    createPositionModalOpen, 
    setCreatePositionModalOpen, 
    createPosition,
    skills: existingSkills 
  } = useApp();

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Veri & Analitik');
  const [description, setDescription] = useState('');
  const [minExperienceYears, setMinExperienceYears] = useState(3);
  const [level, setLevel] = useState<PositionLevel>('Senior');
  const [status, setStatus] = useState<PositionStatus>('Yeni');
  
  const [priorityCriteriaInput, setPriorityCriteriaInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState<RequiredSkill[]>([
    { skillId: 'sk-1', skillName: 'SQL Advanced', minLevel: 'İleri', isPriority: true },
    { skillId: 'sk-2', skillName: 'Python Advanced', minLevel: 'İleri', isPriority: true }
  ]);

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('İleri');
  const [isPriority, setIsPriority] = useState(false);

  if (!createPositionModalOpen) return null;

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setRequiredSkills(prev => [
      ...prev,
      {
        skillId: `req-sk-${Date.now()}`,
        skillName: newSkillName.trim(),
        minLevel: newSkillLevel,
        isPriority
      }
    ]);
    setNewSkillName('');
    setIsPriority(false);
  };

  const handleRemoveSkill = (idx: number) => {
    setRequiredSkills(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const priorityCriteria = priorityCriteriaInput
      ? priorityCriteriaInput.split(',').map(s => s.trim()).filter(Boolean)
      : ['İlgili alanda tecrübe', 'Güçlü analitik düşünce', 'İç iletişim'];

    createPosition({
      title: title.trim(),
      department,
      description: description.trim(),
      minExperienceYears: Number(minExperienceYears),
      level,
      status,
      requiredSkills,
      priorityCriteria
    });

    setCreatePositionModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Yeni Pozisyon Oluştur</h2>
              <p className="text-xs text-slate-500">Şirket içinde açık bir pozisyon tanımlayın</p>
            </div>
          </div>
          <button
            onClick={() => setCreatePositionModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Pozisyon Adı *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Örn: Senior Data Analyst, İK Uzmanı"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Departman *</label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Veri & Analitik">Veri & Analitik</option>
                <option value="Yazılım Mühendisliği">Yazılım Mühendisliği</option>
                <option value="İnsan Kaynakları">İnsan Kaynakları</option>
                <option value="Operasyon & Süreç">Operasyon & Süreç</option>
                <option value="Pazarlama & Büyüme">Pazarlama & Büyüme</option>
                <option value="Sağlık & Saha Operasyonları">Sağlık & Saha Operasyonları</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Minimum Deneyim (Yıl)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={minExperienceYears}
                onChange={e => setMinExperienceYears(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kariyer Seviyesi</label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value as PositionLevel)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900"
              >
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Yönetici">Yönetici</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Pozisyon Durumu</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as PositionStatus)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900"
              >
                <option value="Yeni">Yeni</option>
                <option value="Eşleşme Bekliyor">Eşleşme Bekliyor</option>
                <option value="Mülakat">Mülakat</option>
                <option value="Atama">Atama</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Pozisyon Açıklaması *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Pozisyonun temel sorumlulukları, hedefleri ve beklentileri..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Required Skills Builder */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Gereken Yetkinlikler</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {requiredSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${
                    sk.isPriority 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' 
                      : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <span>{sk.skillName}</span>
                  <span className="text-slate-500">({sk.minLevel})</span>
                  {sk.isPriority && <span className="text-[10px] text-emerald-600 uppercase">★ Öncelikli</span>}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-slate-400 hover:text-rose-600 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                placeholder="Yetkinlik adı (örn: Python, Docker, Lean)..."
                className="flex-1 p-2 rounded-xl border border-slate-200 text-slate-900"
              />
              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value as SkillLevel)}
                className="p-2 rounded-xl border border-slate-200 text-slate-900"
              >
                <option value="Temel">Temel</option>
                <option value="Orta">Orta</option>
                <option value="İleri">İleri</option>
                <option value="Uzman">Uzman</option>
              </select>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer px-2">
                <input
                  type="checkbox"
                  checked={isPriority}
                  onChange={e => setIsPriority(e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>Öncelikli</span>
              </label>
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ekle</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Öncelikli Kriterler (Virgülle ayırın)</label>
            <input
              type="text"
              value={priorityCriteriaInput}
              onChange={e => setPriorityCriteriaInput(e.target.value)}
              placeholder="Örn: SQL derinliği, Ekip yönetimi, Hızlı analitik modelleme"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Submit buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setCreatePositionModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-800"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Pozisyon Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
