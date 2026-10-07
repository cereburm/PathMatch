import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus, Plus } from 'lucide-react';
import { EmployeeSkill, SkillCategory, SkillLevel } from '../../types';

export const AddEmployeeModal: React.FC = () => {
  const { 
    addEmployeeModalOpen, 
    setAddEmployeeModalOpen, 
    addEmployee, 
    skills: existingSkills 
  } = useApp();

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Veri & Analitik');
  const [experienceYears, setExperienceYears] = useState(3);
  const [email, setEmail] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [degree, setDegree] = useState('Lisans');
  const [school, setSchool] = useState('');
  const [field, setField] = useState('');
  const [bio, setBio] = useState('');
  
  const [selectedSkills, setSelectedSkills] = useState<EmployeeSkill[]>([
    { skillId: 'sk-1', skillName: 'SQL Advanced', level: 'İleri', category: 'Analitik' }
  ]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Orta');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Teknik');

  if (!addEmployeeModalOpen) return null;

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setSelectedSkills(prev => [
      ...prev,
      {
        skillId: `custom-sk-${Date.now()}`,
        skillName: newSkillName.trim(),
        level: newSkillLevel,
        category: newSkillCategory
      }
    ]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (idx: number) => {
    setSelectedSkills(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;

    addEmployee({
      name: name.trim(),
      title: title.trim(),
      department,
      experienceYears: Number(experienceYears),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@sirket.com`,
      phone: '+90 532 555 00 00',
      location: 'İstanbul (Hibrit)',
      avatarBg: 'bg-emerald-600',
      skills: selectedSkills,
      careerGoals: careerGoal ? [careerGoal] : ['Kıdemli Uzman', 'Ekip Lideri'],
      education: {
        degree,
        school: school || 'İstanbul Üniversitesi',
        field: field || 'Mühendislik / İktisat',
        graduationYear: 2021
      },
      completedTrainings: [],
      currentStatus: 'Aktif',
      bio: bio || `${name}, ${department} bünyesinde ${title} olarak görev yapmaktadır.`,
      performanceRating: 4.6,
      potentialRating: 'Yüksek',
      mobilityPreference: 'Departmanlar Arası'
    });

    setAddEmployeeModalOpen(false);
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
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Yeni Çalışan Kaydet</h2>
              <p className="text-xs text-slate-500">Yetenek havuzuna yeni çalışan profili ekleyin</p>
            </div>
          </div>
          <button
            onClick={() => setAddEmployeeModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Ad Soyad *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Örn: Aslı Yılmaz"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mevcut Pozisyon / Unvan *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Örn: Veri Analisti, Operasyon Sorumlusu"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Departman</label>
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

            <div>
              <label className="block font-bold text-slate-700 mb-1">Deneyim (Yıl)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={experienceYears}
                onChange={e => setExperienceYears(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">E-Posta</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="asli.yilmaz@sirket.com"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Kariyer Hedefi / İlgi Alanı</label>
            <input
              type="text"
              value={careerGoal}
              onChange={e => setCareerGoal(e.target.value)}
              placeholder="Örn: Senior Data Analyst veya Proje Yöneticisi olmak istiyor"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Education */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Mezuniyet Derecesi</label>
              <select
                value={degree}
                onChange={e => setDegree(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-900"
              >
                <option value="Lisans">Lisans</option>
                <option value="Yüksek Lisans">Yüksek Lisans</option>
                <option value="Doktora">Doktora</option>
                <option value="Ön Lisans">Ön Lisans</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Üniversite</label>
              <input
                type="text"
                value={school}
                onChange={e => setSchool(e.target.value)}
                placeholder="Örn: İTÜ, Boğaziçi, ODTÜ"
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Bölüm</label>
              <input
                type="text"
                value={field}
                onChange={e => setField(e.target.value)}
                placeholder="Örn: Endüstri Mühendisliği"
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-900"
              />
            </div>
          </div>

          {/* Skills builder */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Yetkinlikler</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
                >
                  <span className="font-semibold">{sk.skillName}</span>
                  <span className="text-slate-400">({sk.level})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                placeholder="Yetkinlik adı (örn: Python, Agile, SQL)..."
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

          {/* Bio */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Kısa Biyografi / Notlar</label>
            <textarea
              rows={2}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Çalışanın tecrübeleri ve şirket içi geçmişi hakkında özet bilgi..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setAddEmployeeModalOpen(false)}
              className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-800"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-xs"
            >
              Çalışanı Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
