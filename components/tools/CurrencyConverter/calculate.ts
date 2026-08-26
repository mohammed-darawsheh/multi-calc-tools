export interface CurrencyResult {
  amount: number;
  from: string;
  to: string;
  rate: number;
  converted: number;
}

export function convertCurrency(amount: number, rate: number, from: string, to: string): CurrencyResult {
  const converted = amount * rate;
  return {
    amount,
    from,
    to,
    rate,
    converted: Math.round(converted * 100) / 100,
  };
}

export const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'JOD', 'AED', 'SAR', 'EGP', 'KWD', 'QAR', 'BHD', 'OMR', 'MAD', 'LBP', 'TRY', 'INR', 'PKR'];
