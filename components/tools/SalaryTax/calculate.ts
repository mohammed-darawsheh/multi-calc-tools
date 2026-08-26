import { taxConfig, CountryTaxConfig } from '@/config/tax-rates';

export interface SalaryResult {
  country: string;
  currency: string;
  period: 'monthly' | 'annual';
  gross: number;
  grossAnnual: number;
  tax: number;
  socialSecurity: number;
  net: number;
  effectiveRate: number;
  brackets: { upTo: number; rate: number; tax: number }[];
  notes?: { en: string; ar: string };
}

export function calculateSalary(
  country: string,
  enteredGross: number,
  period: 'monthly' | 'annual' = 'monthly'
): SalaryResult {
  const config: CountryTaxConfig = taxConfig[country];
  if (!config) throw new Error(`Unknown country: ${country}`);

  const grossMonthly = period === 'monthly' ? enteredGross : enteredGross / 12;
  const grossAnnual = period === 'annual' ? enteredGross : enteredGross * 12;

  // Personal exemption deduction on annual basis
  const exemption = config.personalExemption || 0;
  const taxableAnnual = Math.max(0, grossAnnual - exemption);

  let remaining = taxableAnnual;
  let totalAnnualTax = 0;
  const brackets: { upTo: number; rate: number; tax: number }[] = [];

  let prevCap = 0;
  for (const bracket of config.brackets) {
    if (remaining <= 0) {
      brackets.push({ upTo: bracket.upTo, rate: bracket.rate, tax: 0 });
      continue;
    }
    const bracketSpan = bracket.upTo === Infinity ? remaining : Math.max(0, bracket.upTo - prevCap);
    const taxableInBracket = Math.min(remaining, bracketSpan);
    const tax = taxableInBracket * bracket.rate;
    totalAnnualTax += tax;
    remaining -= taxableInBracket;

    brackets.push({
      upTo: bracket.upTo,
      rate: bracket.rate,
      tax: Math.round(tax * 100) / 100,
    });
    prevCap = bracket.upTo === Infinity ? prevCap : bracket.upTo;
  }

  // Social Security: computed monthly, capped if applicable
  const ssMonthlyBase = config.socialSecurityCap ? Math.min(grossMonthly, config.socialSecurityCap) : grossMonthly;
  const ssMonthly = ssMonthlyBase * config.socialSecurityRate;
  const ssAnnual = ssMonthly * 12;

  // Selected period outputs
  const taxForPeriod = period === 'monthly' ? totalAnnualTax / 12 : totalAnnualTax;
  const ssForPeriod = period === 'monthly' ? ssMonthly : ssAnnual;
  const grossForPeriod = enteredGross;
  const netForPeriod = grossForPeriod - taxForPeriod - ssForPeriod;
  const effectiveRate = grossForPeriod > 0 ? ((taxForPeriod + ssForPeriod) / grossForPeriod) * 100 : 0;

  return {
    country,
    currency: config.currency,
    period,
    gross: Math.round(grossForPeriod * 100) / 100,
    grossAnnual: Math.round(grossAnnual * 100) / 100,
    tax: Math.round(taxForPeriod * 100) / 100,
    socialSecurity: Math.round(ssForPeriod * 100) / 100,
    net: Math.round(netForPeriod * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    brackets,
    notes: config.notes,
  };
}

export const supportedCountries = Object.keys(taxConfig);
