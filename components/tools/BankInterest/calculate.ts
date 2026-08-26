export interface YearlyBreakdownRow {
  year: number;
  amount: number;
  interest: number;
}

export interface InterestResult {
  totalAmount: number;
  totalInterest: number;
  effectiveRate: number;
  yearlyBreakdown: YearlyBreakdownRow[];
}

export function calculateInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundFrequency: 'monthly' | 'quarterly' | 'yearly'
): InterestResult {
  const rate = annualRate / 100;
  const n =
    compoundFrequency === 'monthly' ? 12 :
    compoundFrequency === 'quarterly' ? 4 : 1;

  const totalAmount = principal * Math.pow(1 + rate / n, n * years);
  const totalInterest = totalAmount - principal;
  const effectiveRate = Math.pow(1 + rate / n, n) - 1;

  const breakdown: YearlyBreakdownRow[] = [];
  for (let y = 1; y <= years; y++) {
    const amountAtYearStart = principal * Math.pow(1 + rate / n, n * (y - 1));
    const amountAtYearEnd = principal * Math.pow(1 + rate / n, n * y);
    breakdown.push({
      year: y,
      amount: Math.round(amountAtYearEnd * 100) / 100,
      interest: Math.round((amountAtYearEnd - amountAtYearStart) * 100) / 100,
    });
  }

  return {
    totalAmount: Math.round(totalAmount * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 10000) / 100,
    yearlyBreakdown: breakdown,
  };
}