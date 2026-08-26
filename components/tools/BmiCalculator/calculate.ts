export interface BmiResult {
  bmi: number;
  category: string;
  idealRange: { min: number; max: number };
}

export function calculateBmi(weightKg: number, heightCm: number): BmiResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: string;
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 25) category = 'normal';
  else if (bmi < 30) category = 'overweight';
  else category = 'obese';

  const idealMin = 18.5 * heightM * heightM;
  const idealMax = 24.9 * heightM * heightM;

  return {
    bmi: Math.round(bmi * 100) / 100,
    category,
    idealRange: { min: Math.round(idealMin * 100) / 100, max: Math.round(idealMax * 100) / 100 },
  };
}
