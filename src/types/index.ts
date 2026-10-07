export type SkillCategory = 'Teknik' | 'Liderlik' | 'İletişim' | 'Yönetim' | 'Analitik';
export type SkillLevel = 'Temel' | 'Orta' | 'İleri' | 'Uzman';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export interface Training {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: SkillLevel;
  targetSkillIds: string[];
  description: string;
  category: SkillCategory;
}

export interface EmployeeSkill {
  skillId: string;
  skillName: string;
  level: SkillLevel;
  category: SkillCategory;
}

export type CandidateStatus = 'Aktif' | 'Mülakat Aşamasında' | 'İç Atama Sürecinde' | 'Atandı';

export interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  experienceYears: number;
  email: string;
  phone: string;
  location: string;
  avatarBg: string;
  skills: EmployeeSkill[];
  careerGoals: string[];
  education: {
    degree: string;
    field: string;
    school: string;
    graduationYear: number;
  };
  completedTrainings: string[];
  currentStatus: CandidateStatus;
  targetRoleId?: string;
  bio: string;
  performanceRating: number; // 1-5
  potentialRating: 'Yüksek' | 'Orta' | 'Kritik Yetenek';
  mobilityPreference: 'Departman İçi' | 'Departmanlar Arası' | 'Yönetim Yolunda' | 'Açık';
}

export type PositionLevel = 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Yönetici';
export type PositionStatus = 'Yeni' | 'Eşleşme Bekliyor' | 'Mülakat' | 'Atama' | 'Kapatıldı';

export interface RequiredSkill {
  skillId: string;
  skillName: string;
  minLevel: SkillLevel;
  isPriority: boolean;
}

export interface Position {
  id: string;
  title: string;
  department: string;
  description: string;
  minExperienceYears: number;
  level: PositionLevel;
  status: PositionStatus;
  requiredSkills: RequiredSkill[];
  priorityCriteria: string[];
  openSince: string;
  assignedCandidateId?: string;
  candidateInterviewsCount?: number;
}

export interface MatchScores {
  overallScore: number;
  skillScore: number;
  experienceScore: number;
  careerGoalScore: number;
  educationScore: number;
  profileFitScore: number;
}

export interface SkillGap {
  skillName: string;
  requiredLevel: SkillLevel;
  currentLevel?: SkillLevel;
  isMissing: boolean;
  reason: string;
}

export interface RecommendedTraining {
  id: string;
  title: string;
  duration: string;
  level: SkillLevel;
  reason: string;
  provider: string;
}

export interface MatchResult {
  candidate: Employee;
  position: Position;
  scores: MatchScores;
  matchedSkills: EmployeeSkill[];
  missingSkills: SkillGap[];
  recommendedTrainings: RecommendedTraining[];
  status: CandidateStatus;
  aiInsights?: string;
}

export interface AlgorithmWeights {
  skillWeight: number; // default 40
  experienceWeight: number; // default 20
  careerGoalWeight: number; // default 20
  educationWeight: number; // default 10
  profileFitWeight: number; // default 10
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'match' | 'interview' | 'assignment' | 'system';
  read: boolean;
}

export interface MobilityRecord {
  id: string;
  employeeName: string;
  fromDepartment: string;
  toDepartment: string;
  fromRole: string;
  toRole: string;
  date: string;
  matchScore: number;
}
