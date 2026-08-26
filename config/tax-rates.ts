export interface TaxBracket {
  upTo: number;
  rate: number;
}

export interface CountryTaxConfig {
  currency: string;
  brackets: TaxBracket[];
  personalExemption?: number;
  socialSecurityRate: number;
  socialSecurityCap?: number;
  notes?: {
    en: string;
    ar: string;
  };
}

export const taxConfig: Record<string, CountryTaxConfig> = {
  jordan: {
    currency: 'JOD',
    brackets: [
      { upTo: 5000, rate: 0 },
      { upTo: 10000, rate: 0.05 },
      { upTo: 15000, rate: 0.1 },
      { upTo: Infinity, rate: 0.15 },
    ],
    socialSecurityRate: 0.0725,
    notes: {
      en: 'Social security is 7.25% employee share (employer pays additional 12.5%).',
      ar: 'الضمان الاجتماعي 7.25% حصة الموظف (صاحب العمل يدفع 12.5% إضافية).',
    },
  },
  uae: {
    currency: 'AED',
    brackets: [{ upTo: Infinity, rate: 0 }],
    socialSecurityRate: 0,
    notes: {
      en: 'No personal income tax in the UAE. 5% VAT applies to goods/services.',
      ar: 'لا توجد ضريبة دخل شخصية في الإمارات. ضريبة القيمة المضافة 5% على السلع والخدمات.',
    },
  },
  saudiArabia: {
    currency: 'SAR',
    brackets: [{ upTo: Infinity, rate: 0 }],
    socialSecurityRate: 0.095,
    socialSecurityCap: 45000,
    notes: {
      en: 'No personal income tax. Social security is 9.5% of salary up to 45,000 SAR/month.',
      ar: 'لا توجد ضريبة دخل. الضمان الاجتماعي 9.5% من الراتب حتى 45,000 ريال/شهر.',
    },
  },
  egypt: {
    currency: 'EGP',
    brackets: [
      { upTo: 15000, rate: 0 },
      { upTo: 30000, rate: 0.025 },
      { upTo: 45000, rate: 0.1 },
      { upTo: 60000, rate: 0.15 },
      { upTo: 200000, rate: 0.2 },
      { upTo: 400000, rate: 0.225 },
      { upTo: Infinity, rate: 0.25 },
    ],
    personalExemption: 15000,
    socialSecurityRate: 0.11,
    notes: {
      en: 'Social insurance is 11% of salary. Figures are approximate.',
      ar: 'التأمين الاجتماعي 11% من الراتب. الأرقام تقريبية.',
    },
  },
  kuwait: {
    currency: 'KWD',
    brackets: [{ upTo: Infinity, rate: 0 }],
    socialSecurityRate: 0.075,
    notes: {
      en: 'No personal income tax. Social security is 7.5% for Kuwaiti citizens only.',
      ar: 'لا توجد ضريبة دخل شخصية. الضمان الاجتماعي 7.5% للكويتيين فقط.',
    },
  },
  qatar: {
    currency: 'QAR',
    brackets: [{ upTo: Infinity, rate: 0 }],
    socialSecurityRate: 0,
    notes: {
      en: 'No personal income tax and no social security for most expatriate workers.',
      ar: 'لا توجد ضريبة دخل شخصية ولا ضمان اجتماعي لمعظم العمال الوافدين.',
    },
  },
  bahrain: {
    currency: 'BHD',
    brackets: [{ upTo: Infinity, rate: 0 }],
    socialSecurityRate: 0,
    notes: {
      en: 'No personal income tax. Social security applies to Bahraini citizens only.',
      ar: 'لا توجد ضريبة دخل شخصية. الضمان الاجتماعي للبحرينيين فقط.',
    },
  },
  oman: {
    currency: 'OMR',
    brackets: [{ upTo: Infinity, rate: 0 }],
    socialSecurityRate: 0,
    notes: {
      en: 'No personal income tax in Oman.',
      ar: 'لا توجد ضريبة دخل شخصية في عمان.',
    },
  },
  morocco: {
    currency: 'MAD',
    brackets: [
      { upTo: 30000, rate: 0 },
      { upTo: 50000, rate: 0.1 },
      { upTo: 60000, rate: 0.2 },
      { upTo: 80000, rate: 0.3 },
      { upTo: 180000, rate: 0.34 },
      { upTo: Infinity, rate: 0.37 },
    ],
    socialSecurityRate: 0.0429,
    notes: {
      en: 'Social security is 4.29%. Professional tax may also apply.',
      ar: 'الضمان الاجتماعي 4.29%. قد تطبق الضريبة المهنية أيضاً.',
    },
  },
  lebanon: {
    currency: 'LBP',
    brackets: [
      { upTo: 6000000, rate: 0 },
      { upTo: 15000000, rate: 0.02 },
      { upTo: 25000000, rate: 0.04 },
      { upTo: 35000000, rate: 0.07 },
      { upTo: 55000000, rate: 0.11 },
      { upTo: 75000000, rate: 0.15 },
      { upTo: Infinity, rate: 0.2 },
    ],
    personalExemption: 6000000,
    socialSecurityRate: 0.02,
    notes: {
      en: 'Social security is 2% of salary. NSSF contributions may vary. LBP values shown; effective rates may differ with USD-based salaries.',
      ar: 'الضمان الاجتماعي 2% من الراتب. قد تختلف مساهمات الضمان الوطني. القيم بالليرة اللبنانية.',
    },
  },
  unitedStates: {
    currency: 'USD',
    brackets: [
      { upTo: 11600, rate: 0.1 },
      { upTo: 47150, rate: 0.12 },
      { upTo: 100525, rate: 0.22 },
      { upTo: 191950, rate: 0.24 },
      { upTo: 243725, rate: 0.32 },
      { upTo: 609350, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
    personalExemption: 13850, // standard deduction single filer 2023
    socialSecurityRate: 0.062,
    socialSecurityCap: 160200,
    notes: {
      en: 'Federal tax only (no state tax). Standard deduction applied. Medicare (1.45%) not included.',
      ar: 'ضريبة فيدرالية فقط (بدون ضريبة ولاية). الخصم المعياري مطبق. ميديكير (1.45%) غير مضمن.',
    },
  },
  unitedKingdom: {
    currency: 'GBP',
    brackets: [
      { upTo: 12570, rate: 0 },
      { upTo: 50270, rate: 0.2 },
      { upTo: 125140, rate: 0.4 },
      { upTo: Infinity, rate: 0.45 },
    ],
    personalExemption: 12570,
    socialSecurityRate: 0.08,
    socialSecurityCap: 50270,
    notes: {
      en: 'National Insurance is 8% between £12,570 and £50,270, then 2% above. Personal Allowance is £12,570.',
      ar: 'التأمين الوطني 8% بين £12,570 و £50,270، ثم 2% فوق ذلك.',
    },
  },
};