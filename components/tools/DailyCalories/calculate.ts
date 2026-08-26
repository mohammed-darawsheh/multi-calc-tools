export interface CalorieResult {
  bmr: number;
  tdee: number;
  maintenance: number;
  mildLoss: number;
  moderateLoss: number;
  gains: number;
}

const activityMultipliers: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export function calculateCalories(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: string
): CalorieResult {
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const multiplier = activityMultipliers[activityLevel] ?? 1.2;
  const tdee = bmr * multiplier;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    maintenance: Math.round(tdee),
    mildLoss: Math.round(tdee - 250),
    moderateLoss: Math.round(tdee - 500),
    gains: Math.round(tdee + 300),
  };
}

export const activityKeys = [
  'sedentary',
  'light',
  'moderate',
  'active',
  'veryActive',
] as const;
