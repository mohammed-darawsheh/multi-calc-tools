export type AreaUnit = 'm2' | 'km2' | 'ft2' | 'yd2' | 'acre' | 'hectare' | 'feddan' | 'dunum' | 'qirat' | 'sahm';

const conversionFactors: Record<AreaUnit, number> = {
  m2: 1,
  km2: 1_000_000,
  ft2: 0.092903,
  yd2: 0.836127,
  acre: 4046.86,
  hectare: 10_000,
  feddan: 4200.833, // Egyptian / Arab Feddan
  dunum: 1000, // Levant Dunum (1,000 m²)
  qirat: 175.035, // 1/24 of a feddan
  sahm: 7.293, // 1/24 of a qirat
};

export function convertArea(value: number, from: AreaUnit, to: AreaUnit): number {
  if (from === to) return value;
  const baseM2 = value * conversionFactors[from];
  const converted = baseM2 / conversionFactors[to];
  return Math.round(converted * 10000) / 10000;
}

export const areaUnits: { value: AreaUnit; i18nKey: string }[] = [
  { value: 'm2', i18nKey: 'm2' },
  { value: 'feddan', i18nKey: 'feddan' },
  { value: 'dunum', i18nKey: 'dunum' },
  { value: 'qirat', i18nKey: 'qirat' },
  { value: 'sahm', i18nKey: 'sahm' },
  { value: 'hectare', i18nKey: 'hectare' },
  { value: 'acre', i18nKey: 'acre' },
  { value: 'km2', i18nKey: 'km2' },
  { value: 'ft2', i18nKey: 'ft2' },
  { value: 'yd2', i18nKey: 'yd2' },
];