import { Employee, Position, Skill, Training, MobilityRecord } from '../types';

export const INITIAL_SKILLS: Skill[] = [
  // Analitik & Veri
  { id: 'sk-1', name: 'SQL Advanced', category: 'Analitik', level: 'İleri' },
  { id: 'sk-2', name: 'Python Advanced', category: 'Analitik', level: 'İleri' },
  { id: 'sk-3', name: 'Data Visualization & BI', category: 'Analitik', level: 'İleri' },
  { id: 'sk-4', name: 'Machine Learning Fundamentals', category: 'Analitik', level: 'Orta' },
  { id: 'sk-5', name: 'İstatiksel Modelleme', category: 'Analitik', level: 'İleri' },
  
  // Teknik & Yazılım
  { id: 'sk-6', name: 'React / TypeScript', category: 'Teknik', level: 'Uzman' },
  { id: 'sk-7', name: 'Node.js & API Architecture', category: 'Teknik', level: 'İleri' },
  { id: 'sk-8', name: 'Cloud & DevOps (Docker/K8s)', category: 'Teknik', level: 'İleri' },
  { id: 'sk-9', name: 'Sistem Mimarisi', category: 'Teknik', level: 'Uzman' },
  
  // Yönetim & Operasyon
  { id: 'sk-10', name: 'Agile & Scrum Yönetimi', category: 'Yönetim', level: 'İleri' },
  { id: 'sk-11', name: 'Kriz & Acil Durum Yönetimi', category: 'Yönetim', level: 'Uzman' },
  { id: 'sk-12', name: 'Operasyonel Mükemmellik', category: 'Yönetim', level: 'İleri' },
  { id: 'sk-13', name: 'Bütçe & Kaynak Planlama', category: 'Yönetim', level: 'Orta' },
  { id: 'sk-14', name: 'Süreç Optimizasyonu (Lean)', category: 'Yönetim', level: 'İleri' },

  // İnsan Kaynakları & İletişim
  { id: 'sk-15', name: 'Yetenek Yönetimi & İşe Alım', category: 'İletişim', level: 'İleri' },
  { id: 'sk-16', name: 'Çalışan Bağlılığı Stratejisi', category: 'İletişim', level: 'İleri' },
  { id: 'sk-17', name: 'İç İletişim & Değişim Yönetimi', category: 'İletişim', level: 'Orta' },
  { id: 'sk-18', name: 'Müzakere & Paydaş Yönetimi', category: 'İletişim', level: 'Uzman' },

  // Liderlik
  { id: 'sk-19', name: 'Stratejik Karar Alma', category: 'Liderlik', level: 'Uzman' },
  { id: 'sk-20', name: 'Ekip Mentorluğu & Koçluk', category: 'Liderlik', level: 'İleri' },
  { id: 'sk-21', name: 'Çapraz Fonksiyonel Liderlik', category: 'Liderlik', level: 'İleri' },

  // Pazarlama & Dijital
  { id: 'sk-22', name: 'Dijital Büyüme & SEO', category: 'Teknik', level: 'İleri' },
  { id: 'sk-23', name: 'Performans Pazarlaması', category: 'Analitik', level: 'İleri' },
  { id: 'sk-24', name: 'Kullanıcı Deneyimi (UX) Araştırması', category: 'İletişim', level: 'Orta' }
];

export const INITIAL_TRAININGS: Training[] = [
  {
    id: 'tr-1',
    title: 'Python Advanced Training & Data Pipelines',
    provider: 'PathMatch Akademi',
    duration: '24 Saat (4 Hafta)',
    level: 'İleri',
    targetSkillIds: ['sk-2'],
    description: 'Büyük veri mimarilerinde nesne yönelimli Python, modüler kod yapıları ve ETL veri boru hatları tasarımı.',
    category: 'Analitik'
  },
  {
    id: 'tr-2',
    title: 'SQL for Enterprise Analytics & Window Functions',
    provider: 'PathMatch Akademi',
    duration: '18 Saat (3 Hafta)',
    level: 'İleri',
    targetSkillIds: ['sk-1'],
    description: 'Performanslı SQL sorguları, CTE, karmaşık window fonksiyonları ve veri ambarı optimizasyonları.',
    category: 'Analitik'
  },
  {
    id: 'tr-3',
    title: 'Power BI & Advanced Data Storytelling',
    provider: 'Global Tech Institute',
    duration: '16 Saat (2 Hafta)',
    level: 'İleri',
    targetSkillIds: ['sk-3'],
    description: 'Yönetim kurullarına özel interaktif dashboard mimarisi ve karar destek görselleri.',
    category: 'Analitik'
  },
  {
    id: 'tr-4',
    title: 'Acil Durum & Kriz Koordinasyonu Simülasyonu',
    provider: 'Operasyonel Liderlik Enstitüsü',
    duration: '30 Saat (5 Hafta)',
    level: 'Uzman',
    targetSkillIds: ['sk-11'],
    description: 'Hızlı karar alma protokolleri, triyaj yönetimi ve kriz esnasında çoklu birim koordinasyonu.',
    category: 'Yönetim'
  },
  {
    id: 'tr-5',
    title: 'Stratejik İK & Yeni Nesil Yetenek Analitiği',
    provider: 'İnsan Kaynakları Derneği',
    duration: '20 Saat (3 Hafta)',
    level: 'İleri',
    targetSkillIds: ['sk-15', 'sk-16'],
    description: 'İç mobilite tasarımı, yetkinlik matrisi kurgusu ve çalışan bağlılığını artıran modern İK yaklaşımları.',
    category: 'İletişim'
  },
  {
    id: 'tr-6',
    title: 'PMP Hazırlık & Agile Liderlik Sertifikasyonu',
    provider: 'Project Management Institute',
    duration: '35 Saat (6 Hafta)',
    level: 'İleri',
    targetSkillIds: ['sk-10', 'sk-18'],
    description: 'Scrum, Kanban ve hibrit proje yönetimi çerçeveleri ile bütçe ve risk yönetimi.',
    category: 'Yönetim'
  },
  {
    id: 'tr-7',
    title: 'Büyüme & Veri Odaklı Dijital Pazarlama',
    provider: 'Growth Institute',
    duration: '22 Saat (3 Hafta)',
    level: 'İleri',
    targetSkillIds: ['sk-22', 'sk-23'],
    description: 'Dönüşüm hunisi optimizasyonu, CAC/LTV analizleri ve çok kanallı performans pazarlaması.',
    category: 'Analitik'
  },
  {
    id: 'tr-8',
    title: 'Geleceğin Yöneticileri: Koçluk & Mentorluk',
    provider: 'Liderlik Akademisi',
    duration: '15 Saat (2 Hafta)',
    level: 'İleri',
    targetSkillIds: ['sk-20', 'sk-21'],
    description: 'Empatik liderlik, 1:1 gelişim seansları ve kurum içi yüksek potansiyelli çalışanların desteklenmesi.',
    category: 'Liderlik'
  },
  {
    id: 'tr-9',
    title: 'Bulut Mimarisi & Dağıtık Sistemler Uzmanlığı',
    provider: 'Cloud Native Foundation',
    duration: '28 Saat (4 Hafta)',
    level: 'Uzman',
    targetSkillIds: ['sk-8', 'sk-9'],
    description: 'Mikroservis tasarımı, CI/CD otomasyonları ve ölçeklenebilir bulut altyapıları.',
    category: 'Teknik'
  },
  {
    id: 'tr-10',
    title: 'Lean 6 Sigma: Süreç İyileştirme & İsraf Azaltma',
    provider: 'Operasyonel Mükemmellik Merkezi',
    duration: '20 Saat (3 Hafta)',
    level: 'İleri',
    targetSkillIds: ['sk-12', 'sk-14'],
    description: 'Süreç haritalama, kök neden analizi ve operasyonel verimlilik ölçümleri.',
    category: 'Yönetim'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Ahmet Yılmaz',
    title: 'Junior Data Analyst',
    department: 'Veri & Analitik',
    experienceYears: 3,
    email: 'ahmet.yilmaz@sirket.com',
    phone: '+90 532 101 20 30',
    location: 'İstanbul (Hibrit)',
    avatarBg: 'bg-blue-600',
    skills: [
      { skillId: 'sk-1', skillName: 'SQL Advanced', level: 'İleri', category: 'Analitik' },
      { skillId: 'sk-2', skillName: 'Python Advanced', level: 'Orta', category: 'Analitik' },
      { skillId: 'sk-3', skillName: 'Data Visualization & BI', level: 'İleri', category: 'Analitik' },
      { skillId: 'sk-5', skillName: 'İstatiksel Modelleme', level: 'Orta', category: 'Analitik' },
      { skillId: 'sk-10', skillName: 'Agile & Scrum Yönetimi', level: 'Temel', category: 'Yönetim' }
    ],
    careerGoals: ['Senior Data Analyst', 'Veri Bilimci', 'Analitik Ekip Lideri'],
    education: {
      degree: 'Lisans',
      field: 'Endüstri Mühendisliği',
      school: 'İstanbul Teknik Üniversitesi',
      graduationYear: 2021
    },
    completedTrainings: ['tr-2'],
    currentStatus: 'Aktif',
    targetRoleId: 'pos-1',
    bio: '3 yıldır iş zekası raporlaması ve müşteri davranışı analizleri yapmaktadır. Senior Data Analyst rolüne geçmek için ileri Python ve makine öğrenimi eğitimlerine devam etmektedir.',
    performanceRating: 4.8,
    potentialRating: 'Kritik Yetenek',
    mobilityPreference: 'Departman İçi'
  },
  {
    id: 'emp-2',
    name: 'Zeynep Kaya',
    title: 'İş Analisti',
    department: 'Operasyon & Süreç',
    experienceYears: 4,
    email: 'zeynep.kaya@sirket.com',
    phone: '+90 533 202 30 40',
    location: 'İstanbul (Ofis)',
    avatarBg: 'bg-emerald-600',
    skills: [
      { skillId: 'sk-1', skillName: 'SQL Advanced', level: 'İleri', category: 'Analitik' },
      { skillId: 'sk-3', skillName: 'Data Visualization & BI', level: 'İleri', category: 'Analitik' },
      { skillId: 'sk-14', skillName: 'Süreç Optimizasyonu (Lean)', level: 'İleri', category: 'Yönetim' },
      { skillId: 'sk-10', skillName: 'Agile & Scrum Yönetimi', level: 'İleri', category: 'Yönetim' },
      { skillId: 'sk-18', skillName: 'Müzakere & Paydaş Yönetimi', level: 'Orta', category: 'İletişim' }
    ],
    careerGoals: ['Senior Data Analyst', 'Ürün Yöneticisi', 'Operasyon Yöneticisi'],
    education: {
      degree: 'Lisans',
      field: 'Yönetim Bilişim Sistemleri',
      school: 'Boğaziçi Üniversitesi',
      graduationYear: 2020
    },
    completedTrainings: ['tr-3', 'tr-10'],
    currentStatus: 'Mülakat Aşamasında',
    targetRoleId: 'pos-1',
    bio: 'Operasyonel verimlilik ve KPI takip sistemleri kurmuş, departmanlar arası veri entegrasyonu projelerine liderlik etmiştir.',
    performanceRating: 4.7,
    potentialRating: 'Yüksek',
    mobilityPreference: 'Departmanlar Arası'
  },
  {
    id: 'emp-3',
    name: 'Mehmet Demir',
    title: 'Raporlama Uzmanı',
    department: 'Finans & Planlama',
    experienceYears: 5,
    email: 'mehmet.demir@sirket.com',
    phone: '+90 535 303 40 50',
    location: 'Ankara (Hibrit)',
    avatarBg: 'bg-indigo-600',
    skills: [
      { skillId: 'sk-1', skillName: 'SQL Advanced', level: 'Uzman', category: 'Analitik' },
      { skillId: 'sk-3', skillName: 'Data Visualization & BI', level: 'İleri', category: 'Analitik' },
      { skillId: 'sk-13', skillName: 'Bütçe & Kaynak Planlama', level: 'Uzman', category: 'Yönetim' },
      { skillId: 'sk-5', skillName: 'İstatiksel Modelleme', level: 'Temel', category: 'Analitik' }
    ],
    careerGoals: ['Senior Data Analyst', 'Finansal Analitik Müdürü'],
    education: {
      degree: 'Yüksek Lisans',
      field: 'Ekonometri',
      school: 'ODTÜ',
      graduationYear: 2019
    },
    completedTrainings: ['tr-2'],
    currentStatus: 'Aktif',
    bio: 'Finansal veri setlerinde SQL ve Power BI kullanarak nakit akışı ve gelir tahminleme modelleri inşa etmiştir.',
    performanceRating: 4.5,
    potentialRating: 'Yüksek',
    mobilityPreference: 'Departmanlar Arası'
  },
  {
    id: 'emp-4',
    name: 'Elif Şahin',
    title: 'Saha Operasyon Şefi',
    department: 'Sağlık & Saha Operasyonları',
    experienceYears: 6,
    email: 'elif.sahin@sirket.com',
    phone: '+90 536 404 50 60',
    location: 'İzmir',
    avatarBg: 'bg-rose-600',
    skills: [
      { skillId: 'sk-11', skillName: 'Kriz & Acil Durum Yönetimi', level: 'Uzman', category: 'Yönetim' },
      { skillId: 'sk-12', skillName: 'Operasyonel Mükemmellik', level: 'İleri', category: 'Yönetim' },
      { skillId: 'sk-18', skillName: 'Müzakere & Paydaş Yönetimi', level: 'İleri', category: 'İletişim' },
      { skillId: 'sk-20', skillName: 'Ekip Mentorluğu & Koçluk', level: 'İleri', category: 'Liderlik' },
      { skillId: 'sk-13', skillName: 'Bütçe & Kaynak Planlama', level: 'Orta', category: 'Yönetim' }
    ],
    careerGoals: ['Acil Servis Koordinatörü', 'Operasyon Direktörü'],
    education: {
      degree: 'Lisans',
      field: 'Sağlık Yönetimi',
      school: 'Hacettepe Üniversitesi',
      graduationYear: 2018
    },
    completedTrainings: ['tr-4'],
    currentStatus: 'İç Atama Sürecinde',
    targetRoleId: 'pos-2',
    bio: 'Saha sağlık ve afet müdahale ekiplerini 6 yıl başarıyla koordine etti. 25 kişilik ekibi kriz protokollerinde sıfır aksamayla yönetmiştir.',
    performanceRating: 4.9,
    potentialRating: 'Kritik Yetenek',
    mobilityPreference: 'Yönetim Yolunda'
  },
  {
    id: 'emp-5',
    name: 'Can Ertekin',
    title: 'İç İletişim & Yetenek Uzmanı',
    department: 'İnsan Kaynakları',
    experienceYears: 4,
    email: 'can.ertekin@sirket.com',
    phone: '+90 537 505 60 70',
    location: 'İstanbul',
    avatarBg: 'bg-violet-600',
    skills: [
      { skillId: 'sk-15', skillName: 'Yetenek Yönetimi & İşe Alım', level: 'İleri', category: 'İletişim' },
      { skillId: 'sk-16', skillName: 'Çalışan Bağlılığı Stratejisi', level: 'İleri', category: 'İletişim' },
      { skillId: 'sk-17', skillName: 'İç İletişim & Değişim Yönetimi', level: 'İleri', category: 'İletişim' },
      { skillId: 'sk-20', skillName: 'Ekip Mentorluğu & Koçluk', level: 'Orta', category: 'Liderlik' }
    ],
    careerGoals: ['İK Uzmanı', 'İK İş Ortağı (HRBP)', 'Yetenek Direktörü'],
    education: {
      degree: 'Lisans',
      field: 'Psikoloji & İK',
      school: 'Koç Üniversitesi',
      graduationYear: 2020
    },
    completedTrainings: ['tr-5', 'tr-8'],
    currentStatus: 'Aktif',
    targetRoleId: 'pos-3',
    bio: 'Çalışan bağlılığı anketleri, onboarding süreçlerinin dijitalleştirilmesi ve kariyer basamakları sisteminin kurulmasında aktif rol oynadı.',
    performanceRating: 4.6,
    potentialRating: 'Yüksek',
    mobilityPreference: 'Departman İçi'
  },
  {
    id: 'emp-6',
    name: 'Burak Öztürk',
    title: 'Scrum Master / Agile Koç',
    department: 'Yazılım Mühendisliği',
    experienceYears: 5,
    email: 'burak.ozturk@sirket.com',
    phone: '+90 538 606 70 80',
    location: 'İstanbul (Hibrit)',
    avatarBg: 'bg-cyan-600',
    skills: [
      { skillId: 'sk-10', skillName: 'Agile & Scrum Yönetimi', level: 'Uzman', category: 'Yönetim' },
      { skillId: 'sk-18', skillName: 'Müzakere & Paydaş Yönetimi', level: 'İleri', category: 'İletişim' },
      { skillId: 'sk-21', skillName: 'Çapraz Fonksiyonel Liderlik', level: 'İleri', category: 'Liderlik' },
      { skillId: 'sk-14', skillName: 'Süreç Optimizasyonu (Lean)', level: 'İleri', category: 'Yönetim' },
      { skillId: 'sk-6', skillName: 'React / TypeScript', level: 'Orta', category: 'Teknik' }
    ],
    careerGoals: ['Proje Yöneticisi', 'Teknik Program Yöneticisi (TPM)', 'Mühendislik Müdürü'],
    education: {
      degree: 'Lisans',
      field: 'Bilgisayar Mühendisliği',
      school: 'Yıldız Teknik Üniversitesi',
      graduationYear: 2019
    },
    completedTrainings: ['tr-6'],
    currentStatus: 'Aktif',
    targetRoleId: 'pos-4',
    bio: '4 farklı sprint takımının teslimat hızını %35 artırdı. Ürün ve mühendislik birimleri arasındaki köprüyü kusursuz yönetmektedir.',
    performanceRating: 4.8,
    potentialRating: 'Kritik Yetenek',
    mobilityPreference: 'Yönetim Yolunda'
  },
  {
    id: 'emp-7',
    name: 'Selin Koçak',
    title: 'İçerik & Sosyal Medya Lideri',
    department: 'Pazarlama & Büyüme',
    experienceYears: 4,
    email: 'selin.kocak@sirket.com',
    phone: '+90 539 707 80 90',
    location: 'İstanbul',
    avatarBg: 'bg-amber-600',
    skills: [
      { skillId: 'sk-22', skillName: 'Dijital Büyüme & SEO', level: 'İleri', category: 'Teknik' },
      { skillId: 'sk-23', skillName: 'Performans Pazarlaması', level: 'Orta', category: 'Analitik' },
      { skillId: 'sk-17', skillName: 'İç İletişim & Değişim Yönetimi', level: 'İleri', category: 'İletişim' },
      { skillId: 'sk-24', skillName: 'Kullanıcı Deneyimi (UX) Araştırması', level: 'Orta', category: 'İletişim' }
    ],
    careerGoals: ['Dijital Pazarlama Uzmanı', 'Büyüme Yöneticisi (Growth Lead)'],
    education: {
      degree: 'Lisans',
      field: 'İletişim & Medya',
      school: 'Galatasaray Üniversitesi',
      graduationYear: 2020
    },
    completedTrainings: ['tr-7'],
    currentStatus: 'Aktif',
    targetRoleId: 'pos-5',
    bio: 'Organik web trafiğini 12 ayda %180 artırdı. B2B SaaS dönüşüm hunilerinde derinlemesine SEO ve performans optimizasyonu yürütmektedir.',
    performanceRating: 4.6,
    potentialRating: 'Yüksek',
    mobilityPreference: 'Departman İçi'
  },
  {
    id: 'emp-8',
    name: 'Deniz Aydın',
    title: 'Frontend Geliştirici',
    department: 'Yazılım Mühendisliği',
    experienceYears: 4,
    email: 'deniz.aydin@sirket.com',
    phone: '+90 530 808 90 01',
    location: 'İzmir (Uzaktan)',
    avatarBg: 'bg-teal-600',
    skills: [
      { skillId: 'sk-6', skillName: 'React / TypeScript', level: 'Uzman', category: 'Teknik' },
      { skillId: 'sk-7', skillName: 'Node.js & API Architecture', level: 'İleri', category: 'Teknik' },
      { skillId: 'sk-9', skillName: 'Sistem Mimarisi', level: 'Orta', category: 'Teknik' },
      { skillId: 'sk-10', skillName: 'Agile & Scrum Yönetimi', level: 'İleri', category: 'Yönetim' }
    ],
    careerGoals: ['Lead Frontend Architect', 'Mühendislik Takım Lideri'],
    education: {
      degree: 'Lisans',
      field: 'Yazılım Mühendisliği',
      school: 'Ege Üniversitesi',
      graduationYear: 2020
    },
    completedTrainings: ['tr-9'],
    currentStatus: 'Aktif',
    targetRoleId: 'pos-6',
    bio: 'Micro-frontend mimarileri ve yüksek erişilebilirlikli kurumsal UI kütüphaneleri geliştirme konusunda uzmanlaşmıştır.',
    performanceRating: 4.7,
    potentialRating: 'Yüksek',
    mobilityPreference: 'Departman İçi'
  },
  {
    id: 'emp-9',
    name: 'Kaan Aksoy',
    title: 'Operasyon Destek Uzmanı',
    department: 'Sağlık & Saha Operasyonları',
    experienceYears: 3,
    email: 'kaan.aksoy@sirket.com',
    phone: '+90 531 909 01 12',
    location: 'Ankara',
    avatarBg: 'bg-slate-700',
    skills: [
      { skillId: 'sk-11', skillName: 'Kriz & Acil Durum Yönetimi', level: 'Orta', category: 'Yönetim' },
      { skillId: 'sk-12', skillName: 'Operasyonel Mükemmellik', level: 'Orta', category: 'Yönetim' },
      { skillId: 'sk-18', skillName: 'Müzakere & Paydaş Yönetimi', level: 'Orta', category: 'İletişim' }
    ],
    careerGoals: ['Acil Servis Koordinatörü', 'Saha Operasyon Lideri'],
    education: {
      degree: 'Ön Lisans',
      field: 'Acil Yardım ve Afet Yönetimi',
      school: 'Ankara Üniversitesi',
      graduationYear: 2021
    },
    completedTrainings: [],
    currentStatus: 'Aktif',
    bio: 'Saha ambulans ve lojistik koordinasyonunda 3 yıllık deneyime sahip, kriz yönetimi eğitimleri almaktadır.',
    performanceRating: 4.2,
    potentialRating: 'Orta',
    mobilityPreference: 'Departman İçi'
  },
  {
    id: 'emp-10',
    name: 'Gözde Yıldız',
    title: 'Müşteri Başarı Yöneticisi',
    department: 'Müşteri Deneyimi',
    experienceYears: 5,
    email: 'gozde.yildiz@sirket.com',
    phone: '+90 534 010 12 23',
    location: 'İstanbul',
    avatarBg: 'bg-pink-600',
    skills: [
      { skillId: 'sk-18', skillName: 'Müzakere & Paydaş Yönetimi', level: 'Uzman', category: 'İletişim' },
      { skillId: 'sk-10', skillName: 'Agile & Scrum Yönetimi', level: 'İleri', category: 'Yönetim' },
      { skillId: 'sk-3', skillName: 'Data Visualization & BI', level: 'Orta', category: 'Analitik' },
      { skillId: 'sk-20', skillName: 'Ekip Mentorluğu & Koçluk', level: 'İleri', category: 'Liderlik' }
    ],
    careerGoals: ['Proje Yöneticisi', 'Operasyon Yöneticisi'],
    education: {
      degree: 'Lisans',
      field: 'Uluslararası İlişkiler',
      school: 'Bilkent Üniversitesi',
      graduationYear: 2019
    },
    completedTrainings: ['tr-6', 'tr-8'],
    currentStatus: 'Aktif',
    targetRoleId: 'pos-4',
    bio: 'Kurumsal enterprise müşteriler ile ürün geliştirme takımları arasındaki iletişimi yöneterek müşteri terk oranını %40 düşürdü.',
    performanceRating: 4.7,
    potentialRating: 'Yüksek',
    mobilityPreference: 'Departmanlar Arası'
  },
  {
    id: 'emp-11',
    name: 'Onur Varol',
    title: 'Kıdemsiz İK Asistanı',
    department: 'İnsan Kaynakları',
    experienceYears: 2,
    email: 'onur.varol@sirket.com',
    phone: '+90 532 111 22 33',
    location: 'İstanbul',
    avatarBg: 'bg-emerald-700',
    skills: [
      { skillId: 'sk-15', skillName: 'Yetenek Yönetimi & İşe Alım', level: 'Orta', category: 'İletişim' },
      { skillId: 'sk-16', skillName: 'Çalışan Bağlılığı Stratejisi', level: 'Temel', category: 'İletişim' }
    ],
    careerGoals: ['İK Uzmanı'],
    education: {
      degree: 'Lisans',
      field: 'Çalışma Ekonomisi ve Endüstri İlişkileri',
      school: 'Marmara Üniversitesi',
      graduationYear: 2022
    },
    completedTrainings: [],
    currentStatus: 'Aktif',
    bio: 'Stajyer ve yeni mezun işe alım kamplarını koordine etti. Yetenek yönetimi sistemleri üzerinde çalışmaktadır.',
    performanceRating: 4.1,
    potentialRating: 'Orta',
    mobilityPreference: 'Departman İçi'
  },
  {
    id: 'emp-12',
    name: 'Merve Tan',
    title: 'Veri Mühendisi',
    department: 'Veri & Analitik',
    experienceYears: 4,
    email: 'merve.tan@sirket.com',
    phone: '+90 533 222 33 44',
    location: 'İstanbul (Hibrit)',
    avatarBg: 'bg-cyan-700',
    skills: [
      { skillId: 'sk-1', skillName: 'SQL Advanced', level: 'Uzman', category: 'Analitik' },
      { skillId: 'sk-2', skillName: 'Python Advanced', level: 'İleri', category: 'Analitik' },
      { skillId: 'sk-8', skillName: 'Cloud & DevOps (Docker/K8s)', level: 'İleri', category: 'Teknik' },
      { skillId: 'sk-3', skillName: 'Data Visualization & BI', level: 'Orta', category: 'Analitik' }
    ],
    careerGoals: ['Senior Data Analyst', 'Veri Mimarisi Lideri'],
    education: {
      degree: 'Lisans',
      field: 'Bilgisayar Mühendisliği',
      school: 'ODTÜ',
      graduationYear: 2020
    },
    completedTrainings: ['tr-1', 'tr-2'],
    currentStatus: 'Aktif',
    targetRoleId: 'pos-1',
    bio: 'Büyük ölçekli veri akışları (Kafka, Snowflake) kurmuş, analitik ekiplerine veri hazırlama altyapıları sunmaktadır.',
    performanceRating: 4.6,
    potentialRating: 'Yüksek',
    mobilityPreference: 'Departman İçi'
  }
];

export const INITIAL_POSITIONS: Position[] = [
  {
    id: 'pos-1',
    title: 'Senior Data Analyst',
    department: 'Veri & Analitik',
    description: 'Şirket genelinde stratejik iş kararlarını destekleyecek derinlemesine veri analizleri, makine öğrenmesi destekli tahminleme modelleri ve üst yönetim dashboardları tasarlamak.',
    minExperienceYears: 3,
    level: 'Senior',
    status: 'Eşleşme Bekliyor',
    requiredSkills: [
      { skillId: 'sk-1', skillName: 'SQL Advanced', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-2', skillName: 'Python Advanced', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-3', skillName: 'Data Visualization & BI', minLevel: 'İleri', isPriority: false },
      { skillId: 'sk-5', skillName: 'İstatiksel Modelleme', minLevel: 'Orta', isPriority: false }
    ],
    priorityCriteria: ['SQL ve Python derinliği', 'Görselleştirme deneyimi', 'Endüstri/Mühendislik altyapısı'],
    openSince: '2026-09-15',
    candidateInterviewsCount: 2
  },
  {
    id: 'pos-2',
    title: 'Acil Servis Koordinatörü',
    department: 'Sağlık & Saha Operasyonları',
    description: 'Bölgesel acil durum müdahale operasyonlarını, lojistik triyaj yönetimini ve 7/24 saha ekiplerinin kriz protokollerine tam uyumunu koordine etmek.',
    minExperienceYears: 4,
    level: 'Lead',
    status: 'Mülakat',
    requiredSkills: [
      { skillId: 'sk-11', skillName: 'Kriz & Acil Durum Yönetimi', minLevel: 'Uzman', isPriority: true },
      { skillId: 'sk-12', skillName: 'Operasyonel Mükemmellik', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-18', skillName: 'Müzakere & Paydaş Yönetimi', minLevel: 'İleri', isPriority: false },
      { skillId: 'sk-20', skillName: 'Ekip Mentorluğu & Koçluk', minLevel: 'Orta', isPriority: false }
    ],
    priorityCriteria: ['Kriz tecrübesi', 'Ekip yönetimi kabiliyeti', 'Sağlık regülasyonları hakimiyeti'],
    openSince: '2026-09-20',
    candidateInterviewsCount: 1
  },
  {
    id: 'pos-3',
    title: 'İK Uzmanı',
    department: 'İnsan Kaynakları',
    description: 'İç yetenek havuzunun optimizasyonu, çalışan bağlılığı stratejilerinin yürütülmesi ve şirket içi kariyer rotasyon süreçlerinin yönetilmesi.',
    minExperienceYears: 3,
    level: 'Mid',
    status: 'Yeni',
    requiredSkills: [
      { skillId: 'sk-15', skillName: 'Yetenek Yönetimi & İşe Alım', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-16', skillName: 'Çalışan Bağlılığı Stratejisi', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-17', skillName: 'İç İletişim & Değişim Yönetimi', minLevel: 'Orta', isPriority: false }
    ],
    priorityCriteria: ['İç yetenek yönetimi tecrübesi', 'İletişim becerisi', 'Gelişim programları tasarımı'],
    openSince: '2026-10-01',
    candidateInterviewsCount: 0
  },
  {
    id: 'pos-4',
    title: 'Proje Yöneticisi',
    department: 'Operasyon & Süreç',
    description: 'Çok fonksiyonlu stratejik projelerin takvime, bütçeye ve kalite standartlarına uygun teslimatını sağlamak; paydaş iletişimini yönetmek.',
    minExperienceYears: 4,
    level: 'Senior',
    status: 'Eşleşme Bekliyor',
    requiredSkills: [
      { skillId: 'sk-10', skillName: 'Agile & Scrum Yönetimi', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-18', skillName: 'Müzakere & Paydaş Yönetimi', minLevel: 'Uzman', isPriority: true },
      { skillId: 'sk-21', skillName: 'Çapraz Fonksiyonel Liderlik', minLevel: 'İleri', isPriority: false },
      { skillId: 'sk-13', skillName: 'Bütçe & Kaynak Planlama', minLevel: 'Orta', isPriority: false }
    ],
    priorityCriteria: ['Agile metodolojileri sertifikası', 'Paydaş yönetimi', 'Teslimat disiplini'],
    openSince: '2026-09-18',
    candidateInterviewsCount: 1
  },
  {
    id: 'pos-5',
    title: 'Dijital Pazarlama Uzmanı',
    department: 'Pazarlama & Büyüme',
    description: 'SaaS müşteri edinim kanallarını yönetmek, performans kampanyalarını optimize etmek ve içerik stratejisiyle organik büyümeyi ivmelendirmek.',
    minExperienceYears: 3,
    level: 'Mid',
    status: 'Yeni',
    requiredSkills: [
      { skillId: 'sk-22', skillName: 'Dijital Büyüme & SEO', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-23', skillName: 'Performans Pazarlaması', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-3', skillName: 'Data Visualization & BI', minLevel: 'Orta', isPriority: false }
    ],
    priorityCriteria: ['CAC & ROAS optimizasyonu', 'Teknik SEO', 'Veri odaklı A/B test kültürü'],
    openSince: '2026-10-02',
    candidateInterviewsCount: 0
  },
  {
    id: 'pos-6',
    title: 'Lead Frontend Architect',
    department: 'Yazılım Mühendisliği',
    description: 'Kurumsal SaaS web uygulamalarının mikro-mimarisini belirlemek, performans ve erişilebilirlik standartlarını yönetmek, teknik takıma mentorluk yapmak.',
    minExperienceYears: 5,
    level: 'Lead',
    status: 'Eşleşme Bekliyor',
    requiredSkills: [
      { skillId: 'sk-6', skillName: 'React / TypeScript', minLevel: 'Uzman', isPriority: true },
      { skillId: 'sk-9', skillName: 'Sistem Mimarisi', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-7', skillName: 'Node.js & API Architecture', minLevel: 'İleri', isPriority: false },
      { skillId: 'sk-20', skillName: 'Ekip Mentorluğu & Koçluk', minLevel: 'İleri', isPriority: false }
    ],
    priorityCriteria: ['Modern React mimarisi', 'Tasarım sistemleri deneyimi', 'Teknik liderlik'],
    openSince: '2026-09-10',
    candidateInterviewsCount: 1
  },
  {
    id: 'pos-7',
    title: 'Süreç Optimizasyon Lideri',
    department: 'Operasyon & Süreç',
    description: 'İş akışlarındaki darboğazları tespit ederek Lean Six Sigma prensipleriyle operasyon maliyetlerini düşürmek ve dijitalleşmeyi hızlandırmak.',
    minExperienceYears: 4,
    level: 'Senior',
    status: 'Atama',
    requiredSkills: [
      { skillId: 'sk-14', skillName: 'Süreç Optimizasyonu (Lean)', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-12', skillName: 'Operasyonel Mükemmellik', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-1', skillName: 'SQL Advanced', minLevel: 'Orta', isPriority: false }
    ],
    priorityCriteria: ['Yalın üretim / hizmet deneyimi', 'Veri temelli kök neden analizi'],
    openSince: '2026-08-28',
    candidateInterviewsCount: 3
  },
  {
    id: 'pos-8',
    title: 'DevOps & Bulut Güvenliği Mühendisi',
    department: 'Yazılım Mühendisliği',
    description: 'Kubernetes ortamlarını yönetmek, CI/CD güvenliğini otomatize etmek ve bulut altyapı maliyetlerini optimize etmek.',
    minExperienceYears: 4,
    level: 'Senior',
    status: 'Yeni',
    requiredSkills: [
      { skillId: 'sk-8', skillName: 'Cloud & DevOps (Docker/K8s)', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-9', skillName: 'Sistem Mimarisi', minLevel: 'İleri', isPriority: true },
      { skillId: 'sk-7', skillName: 'Node.js & API Architecture', minLevel: 'Orta', isPriority: false }
    ],
    priorityCriteria: ['K8s tecrübesi', 'Infrastructure as Code (IaC)'],
    openSince: '2026-10-04',
    candidateInterviewsCount: 0
  }
];

export const INITIAL_MOBILITY_RECORDS: MobilityRecord[] = [
  {
    id: 'mob-1',
    employeeName: 'Mert Akın',
    fromDepartment: 'Müşteri Destek',
    toDepartment: 'Ürün Yönetimi',
    fromRole: 'Kıdemli Destek Uzmanı',
    toRole: 'Junior Ürün Yöneticisi',
    date: '2026-04-12',
    matchScore: 92
  },
  {
    id: 'mob-2',
    employeeName: 'Ayşe Güven',
    fromDepartment: 'Satış Operasyonları',
    toDepartment: 'Veri & Analitik',
    fromRole: 'Satış Analisti',
    toRole: 'BI Analisti',
    date: '2026-05-20',
    matchScore: 89
  },
  {
    id: 'mob-3',
    employeeName: 'Kerem Yurt',
    fromDepartment: 'Yazılım Mühendisliği',
    toDepartment: 'Yazılım Mühendisliği',
    fromRole: 'Backend Developer',
    toRole: 'Bulut Platform Mühendisi',
    date: '2026-06-15',
    matchScore: 95
  },
  {
    id: 'mob-4',
    employeeName: 'Büşra Çelik',
    fromDepartment: 'Pazarlama',
    toDepartment: 'İnsan Kaynakları',
    fromRole: 'Sosyal Medya Uzmanı',
    toRole: 'İşveren Markası & Yetenek Uzmanı',
    date: '2026-07-02',
    matchScore: 91
  },
  {
    id: 'mob-5',
    employeeName: 'Oğuzhan Kaya',
    fromDepartment: 'Saha Operasyon',
    toDepartment: 'Operasyon & Süreç',
    fromRole: 'Bölge Sorumlusu',
    toRole: 'Operasyonel Süreç Yöneticisi',
    date: '2026-08-18',
    matchScore: 88
  },
  {
    id: 'mob-6',
    employeeName: 'Seda Korkmaz',
    fromDepartment: 'Finans',
    toDepartment: 'Veri & Analitik',
    fromRole: 'Finansal Kontrolör',
    toRole: 'Finansal Analitik Uzmanı',
    date: '2026-09-05',
    matchScore: 94
  }
];
