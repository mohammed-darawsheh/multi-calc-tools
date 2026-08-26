export type WeightUnit = 'kg' | 'g' | 'mg' | 'lb' | 'oz' | 'stone' | 'ton';

const conversionFactors: Record<WeightUnit, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,
  stone: 6.35029,
  ton: 1000,
};

export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  if (from === to) return value;
  const baseKg = value * conversionFactors[from];
  const converted = baseKg / conversionFactors[to];
  return Math.round(converted * 10000) / 10000;
}

export const weightUnits: { value: WeightUnit; i18nKey: string }[] = [
  { value: 'kg', i18nKey: 'kg' },
  { value: 'g', i18nKey: 'g' },
  { value: 'mg', i18nKey: 'mg' },
  { value: 'lb', i18nKey: 'lb' },
  { value: 'oz', i18nKey: 'oz' },
  { value: 'stone', i18nKey: 'stone' },
  { value: 'ton', i18nKey: 'ton' },
];