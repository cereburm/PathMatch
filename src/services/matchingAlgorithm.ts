import { 
  Employee, 
  Position, 
  MatchResult, 
  MatchScores, 
  SkillGap, 
  RecommendedTraining, 
  Training, 
  SkillLevel,
  AlgorithmWeights 
} from '../types';

export const DEFAULT_WEIGHTS: AlgorithmWeights = {
  skillWeight: 40,
  experienceWeight: 20,
  careerGoalWeight: 20,
  educationWeight: 10,
  profileFitWeight: 10
};

const LEVEL_RANKS: Record<SkillLevel, number> = {
  'Temel': 1,
  'Orta': 2,
  'İleri': 3,
  'Uzman': 4
};

/**
 * Calculates weighted match score for an employee against a position
 */
export function calculateMatch(
  candidate: Employee,
  position: Position,
  trainingsCatalog: Training[],
  weights: AlgorithmWeights = DEFAULT_WEIGHTS
): MatchResult {
  // 1. Skill Score (Weight 40%)
  let totalSkillPoints = 0;
  let maxPossibleSkillPoints = 0;
  const missingSkills: SkillGap[] = [];
  const matchedSkills = [...candidate.skills];

  for (const req of position.requiredSkills) {
    const weightMultiplier = req.isPriority ? 1.5 : 1.0;
    const requiredRank = LEVEL_RANKS[req.minLevel] || 3;
    maxPossibleSkillPoints += requiredRank * weightMultiplier;

    const candSkill = candidate.skills.find(
      s => s.skillId === req.skillId || s.skillName.toLowerCase() === req.skillName.toLowerCase()
    );

    if (candSkill) {
      const candRank = LEVEL_RANKS[candSkill.level] || 1;
      if (candRank >= requiredRank) {
        // Full match + bonus if expert
        totalSkillPoints += requiredRank * weightMultiplier;
      } else {
        // Partial match
        const partialRatio = candRank / requiredRank;
        totalSkillPoints += requiredRank * weightMultiplier * partialRatio;
        missingSkills.push({
          skillName: req.skillName,
          requiredLevel: req.minLevel,
          currentLevel: candSkill.level,
          isMissing: false,
          reason: `Mevcut seviye (${candSkill.level}), aranan seviyenin (${req.minLevel}) bir kademe altında.`
        });
      }
    } else {
      // Missing completely
      missingSkills.push({
        skillName: req.skillName,
        requiredLevel: req.minLevel,
        currentLevel: undefined,
        isMissing: true,
        reason: `Pozisyon için kritik olan '${req.skillName}' yetkinliği aday profilinde henüz tanımlı değil.`
      });
    }
  }

  const skillScore = maxPossibleSkillPoints > 0
    ? Math.min(100, Math.round((totalSkillPoints / maxPossibleSkillPoints) * 100))
    : 85;

  // 2. Experience Score (Weight 20%)
  let experienceScore = 70;
  const reqExp = position.minExperienceYears;
  const candExp = candidate.experienceYears;
  if (candExp >= reqExp + 1) {
    experienceScore = 96;
  } else if (candExp >= reqExp) {
    experienceScore = 90;
  } else if (candExp === reqExp - 1) {
    experienceScore = 78;
  } else {
    experienceScore = Math.max(45, Math.round((candExp / reqExp) * 75));
  }

  // 3. Career Goal Score (Weight 20%)
  let careerGoalScore = 60;
  const posTitleLower = position.title.toLowerCase();
  const posDeptLower = position.department.toLowerCase();

  const directGoalMatch = candidate.careerGoals.some(goal => {
    const gLower = goal.toLowerCase();
    return posTitleLower.includes(gLower) || gLower.includes(posTitleLower);
  });

  const departmentGoalMatch = candidate.careerGoals.some(goal => {
    const gLower = goal.toLowerCase();
    return posDeptLower.includes(gLower) || gLower.includes(posDeptLower);
  });

  if (candidate.targetRoleId === position.id || directGoalMatch) {
    careerGoalScore = 98;
  } else if (departmentGoalMatch) {
    careerGoalScore = 85;
  } else if (candidate.mobilityPreference === 'Açık' || candidate.mobilityPreference === 'Departmanlar Arası') {
    careerGoalScore = 75;
  }

  // 4. Education Score (Weight 10%)
  let educationScore = 75;
  const eduField = candidate.education.field.toLowerCase();
  if (
    (posDeptLower.includes('veri') && (eduField.includes('mühendis') || eduField.includes('bilişim') || eduField.includes('ekonometri') || eduField.includes('istatistik'))) ||
    (posDeptLower.includes('yazılım') && (eduField.includes('bilgisayar') || eduField.includes('yazılım') || eduField.includes('mühendis'))) ||
    (posDeptLower.includes('sağlık') && (eduField.includes('sağlık') || eduField.includes('yardım') || eduField.includes('acil'))) ||
    (posDeptLower.includes('ik') && (eduField.includes('psikoloji') || eduField.includes('çalışma') || eduField.includes('yönetim'))) ||
    (posDeptLower.includes('pazarlama') && (eduField.includes('iletişim') || eduField.includes('medya') || eduField.includes('pazarlama')))
  ) {
    educationScore = candidate.education.degree === 'Yüksek Lisans' ? 95 : 88;
  } else {
    educationScore = 72;
  }

  // 5. Profile Fit Score (Weight 10%)
  // Based on performance rating (1-5) and potential
  let profileFitScore = Math.round((candidate.performanceRating / 5.0) * 90);
  if (candidate.potentialRating === 'Kritik Yetenek') {
    profileFitScore += 8;
  } else if (candidate.potentialRating === 'Yüksek') {
    profileFitScore += 4;
  }
  profileFitScore = Math.min(99, Math.max(65, profileFitScore));

  // Compute Overall Weighted Score
  const totalWeight = weights.skillWeight + weights.experienceWeight + weights.careerGoalWeight + weights.educationWeight + weights.profileFitWeight;
  const overallScore = Math.round(
    (skillScore * weights.skillWeight +
     experienceScore * weights.experienceWeight +
     careerGoalScore * weights.careerGoalWeight +
     educationScore * weights.educationWeight +
     profileFitScore * weights.profileFitWeight) / (totalWeight || 100)
  );

  const scores: MatchScores = {
    overallScore,
    skillScore,
    experienceScore,
    careerGoalScore,
    educationScore,
    profileFitScore
  };

  // Find Recommended Trainings for missing skills
  const recommendedTrainings: RecommendedTraining[] = [];
  for (const gap of missingSkills) {
    const training = trainingsCatalog.find(t => 
      t.title.toLowerCase().includes(gap.skillName.toLowerCase().split(' ')[0]) ||
      t.targetSkillIds.some(skId => position.requiredSkills.some(req => req.skillId === skId && req.skillName === gap.skillName))
    );

    if (training && !recommendedTrainings.some(rt => rt.id === training.id)) {
      recommendedTrainings.push({
        id: training.id,
        title: training.title,
        duration: training.duration,
        level: training.level,
        provider: training.provider,
        reason: `'${gap.skillName}' yetkinliğindeki ${gap.isMissing ? 'eksikliği tamamlamak' : 'seviye farkını kapatmak'} için önerildi.`
      });
    }
  }

  // Fallback generic high-impact training if none found
  if (recommendedTrainings.length === 0 && missingSkills.length > 0) {
    const firstTraining = trainingsCatalog[0];
    if (firstTraining) {
      recommendedTrainings.push({
        id: firstTraining.id,
        title: firstTraining.title,
        duration: firstTraining.duration,
        level: firstTraining.level,
        provider: firstTraining.provider,
        reason: 'Hedef pozisyona geçişi hızlandıracak destekleyici gelişim programı.'
      });
    }
  }

  return {
    candidate,
    position,
    scores,
    matchedSkills,
    missingSkills,
    recommendedTrainings,
    status: candidate.currentStatus,
    aiInsights: generateAiInsights(candidate, position, scores, missingSkills)
  };
}

function generateAiInsights(
  candidate: Employee, 
  position: Position, 
  scores: MatchScores, 
  missingSkills: SkillGap[]
): string {
  if (scores.overallScore >= 90) {
    return `${candidate.name}, ${position.title} pozisyonu için çok yüksek uyuma (%${scores.overallScore}) sahiptir. ${candidate.experienceYears} yıllık deneyimi ve kariyer hedefleri rol ile mükemmel örtüşmektedir. Dışarıdan ilan açılmasına gerek kalmadan doğrudan iç atama sürecine alınması önerilir.`;
  } else if (scores.overallScore >= 80) {
    const gapNames = missingSkills.map(m => m.skillName).join(', ');
    return `${candidate.name}, güçlü bir potansiyel adayıdır (%${scores.overallScore} uyum). Rolün temel sorumluluklarını rahatça üstlenebilir; ancak ${gapNames || 'bazı ileri düzey konularda'} kısa süreli bir gelişim programı ile desteklenmesi pozisyona adaptasyon süresini kısaltacaktır.`;
  } else {
    return `${candidate.name}, bu rol için orta düzey uyum göstermektedir (%${scores.overallScore}). Mevcut departmanındaki katkısı yüksek olmakla birlikte, bu pozisyona atanmadan önce belirlenen eğitim haritasını tamamlaması tavsiye edilir.`;
  }
}

/**
 * Ranks all employees for a given position
 */
export function rankCandidatesForPosition(
  position: Position,
  employees: Employee[],
  trainingsCatalog: Training[],
  weights: AlgorithmWeights = DEFAULT_WEIGHTS
): MatchResult[] {
  return employees
    .map(emp => calculateMatch(emp, position, trainingsCatalog, weights))
    .sort((a, b) => b.scores.overallScore - a.scores.overallScore);
}
