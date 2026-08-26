export type LengthUnit = 'm' | 'cm' | 'mm' | 'km' | 'in' | 'ft' | 'yd' | 'mi' | 'arm';

const conversionFactors: Record<LengthUnit, number> = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  arm: 0.58, // Arabic / Islamic Cubit (ذراع = ~58 cm)
};

export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  if (from === to) return value;
  const baseM = value * conversionFactors[from];
  const converted = baseM / conversionFactors[to];
  return Math.round(converted * 10000) / 10000;
}

export const lengthUnits: { value: LengthUnit; i18nKey: string }[] = [
  { value: 'm', i18nKey: 'm' },
  { value: 'cm', i18nKey: 'cm' },
  { value: 'mm', i18nKey: 'mm' },
  { value: 'km', i18nKey: 'km' },
  { value: 'in', i18nKey: 'in' },
  { value: 'ft', i18nKey: 'ft' },
  { value: 'yd', i18nKey: 'yd' },
  { value: 'mi', i18nKey: 'mi' },
  { value: 'arm', i18nKey: 'arm' },
];