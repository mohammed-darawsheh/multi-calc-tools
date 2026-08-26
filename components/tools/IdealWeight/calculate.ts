export interface IdealWeightResult {
  devine: number;
  robinson: number;
  miller: number;
  hamwi: number;
  average: number;
}

export function calculateIdealWeight(heightCm: number, gender: 'male' | 'female'): IdealWeightResult {
  const heightInInches = heightCm / 2.54;
  const baseMale = 50;
  const baseFemale = 45.5;
  // Handle heights under 5ft safely
  const inchOver5ft = Math.max(-10, heightInInches - 60);

  const devine = (gender === 'male' ? baseMale : baseFemale) + 2.3 * inchOver5ft;
  const robinson = (gender === 'male' ? 52 : 49) + 1.7 * inchOver5ft;
  const miller = (gender === 'male' ? 56.2 : 53.1) + 1.41 * inchOver5ft;
  const hamwi = (gender === 'male' ? 48 : 45.5) + 2.7 * inchOver5ft;

  const d = Math.max(30, Math.round(devine * 10) / 10);
  const r = Math.max(30, Math.round(robinson * 10) / 10);
  const m = Math.max(30, Math.round(miller * 10) / 10);
  const h = Math.max(30, Math.round(hamwi * 10) / 10);
  const avg = Math.round(((d + r + m + h) / 4) * 10) / 10;

  return {
    devine: d,
    robinson: r,
    miller: m,
    hamwi: h,
    average: avg,
  };
}
