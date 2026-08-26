export type ToolCategory = 'health' | 'financial' | 'dates' | 'converters' | 'text' | 'religious';

export interface ToolEntry {
  slug: string;
  icon: string; // emoji or icon name
  category: ToolCategory;
  i18nKey: string;
  comingSoon?: boolean;
}

export const toolsRegistry: ToolEntry[] = [
  // Health
  { slug: 'age-calculator', icon: '🎂', category: 'health', i18nKey: 'tools.ageCalculator' },
  { slug: 'bmi-calculator', icon: '⚖️', category: 'health', i18nKey: 'tools.bmiCalculator' },
  { slug: 'ideal-weight', icon: '📏', category: 'health', i18nKey: 'tools.idealWeight' },
  { slug: 'daily-calories', icon: '🔥', category: 'health', i18nKey: 'tools.dailyCalories' },
  { slug: 'due-date', icon: '👶', category: 'health', i18nKey: 'tools.dueDate' },
  { slug: 'ovulation', icon: '🌸', category: 'health', i18nKey: 'tools.ovulation' },

  // Financial
  { slug: 'loan-calculator', icon: '🏦', category: 'financial', i18nKey: 'tools.loanCalculator' },
  { slug: 'zakat-calculator', icon: '☪️', category: 'financial', i18nKey: 'tools.zakatCalculator' },
  { slug: 'bank-interest', icon: '💹', category: 'financial', i18nKey: 'tools.bankInterest' },
  { slug: 'discount-calculator', icon: '🏷️', category: 'financial', i18nKey: 'tools.discountCalculator' },
  { slug: 'gpa-calculator', icon: '🎓', category: 'financial', i18nKey: 'tools.gpaCalculator' },
  { slug: 'salary-tax', icon: '💰', category: 'financial', i18nKey: 'tools.salaryTax' },
  { slug: 'currency-converter', icon: '💱', category: 'financial', i18nKey: 'tools.currencyConverter' },

  // Dates
  { slug: 'date-difference', icon: '📅', category: 'dates', i18nKey: 'tools.dateDifference' },
  { slug: 'countdown', icon: '⏳', category: 'dates', i18nKey: 'tools.countdown' },
  { slug: 'iddah-calculator', icon: '🧕', category: 'dates', i18nKey: 'tools.iddahCalculator' },
  { slug: 'hijri-converter', icon: '🌙', category: 'dates', i18nKey: 'tools.hijriConverter' },

  // Unit Converters
  { slug: 'weight-converter', icon: '🏋️', category: 'converters', i18nKey: 'tools.weightConverter' },
  { slug: 'length-converter', icon: '📐', category: 'converters', i18nKey: 'tools.lengthConverter' },
  { slug: 'temperature-converter', icon: '🌡️', category: 'converters', i18nKey: 'tools.temperatureConverter' },
  { slug: 'area-converter', icon: '📏', category: 'converters', i18nKey: 'tools.areaConverter' },

  // Text Utilities
  { slug: 'word-counter', icon: '📝', category: 'text', i18nKey: 'tools.wordCounter' },
  { slug: 'password-generator', icon: '🔐', category: 'text', i18nKey: 'tools.passwordGenerator' },
  { slug: 'image-compressor', icon: '🖼️', category: 'text', i18nKey: 'tools.imageCompressor' },

  // Religious
  { slug: 'prayer-times', icon: '🕌', category: 'religious', i18nKey: 'tools.prayerTimes' },
  { slug: 'qibla-direction', icon: '🧭', category: 'religious', i18nKey: 'tools.qiblaDirection' },
  { slug: 'fasting-makeup-days', icon: '☪️', category: 'religious', i18nKey: 'tools.fastingMakeupDays' },
];

export function getToolsByCategory(category: ToolCategory): ToolEntry[] {
  return toolsRegistry.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string): ToolEntry | undefined {
  return toolsRegistry.find((t) => t.slug === slug);
}