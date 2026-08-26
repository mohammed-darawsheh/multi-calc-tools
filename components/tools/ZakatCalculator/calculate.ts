export interface ZakatInput {
  cash: number;
  goldGrams: number;
  silverGrams: number;
  businessValue: number;
  debts: number;
  goldPricePerGram?: number;
  silverPricePerGram?: number;
}

export interface ZakatResult {
  totalZakatable: number;
  zakatDue: number;
  nisabGold: number;
  nisabSilver: number;
  nisabThreshold: number;
  eligible: boolean;
}

export const DEFAULT_GOLD_PRICE = 85; // USD approx default or in local currency
export const DEFAULT_SILVER_PRICE = 1.1;
export const NISAB_GOLD_GRAMS = 85;
export const NISAB_SILVER_GRAMS = 595;
export const ZAKAT_RATE = 0.025; // 2.5%

export function calculateZakat(input: ZakatInput): ZakatResult {
  const goldPrice = (input.goldPricePerGram && input.goldPricePerGram > 0) ? input.goldPricePerGram : DEFAULT_GOLD_PRICE;
  const silverPrice = (input.silverPricePerGram && input.silverPricePerGram > 0) ? input.silverPricePerGram : DEFAULT_SILVER_PRICE;

  const goldValue = (input.goldGrams || 0) * goldPrice;
  const silverValue = (input.silverGrams || 0) * silverPrice;
  const cash = input.cash || 0;
  const business = input.businessValue || 0;
  const debts = input.debts || 0;

  const nisabGold = NISAB_GOLD_GRAMS * goldPrice;
  const nisabSilver = NISAB_SILVER_GRAMS * silverPrice;
  const nisabThreshold = nisabGold; // Gold standard is most common in modern jurisprudence

  const totalAssets = cash + goldValue + silverValue + business;
  const totalZakatable = Math.max(0, totalAssets - debts);
  const eligible = totalZakatable >= nisabThreshold;
  const zakatDue = eligible ? Math.round(totalZakatable * ZAKAT_RATE * 100) / 100 : 0;

  return {
    totalZakatable: Math.round(totalZakatable * 100) / 100,
    zakatDue,
    nisabGold: Math.round(nisabGold * 100) / 100,
    nisabSilver: Math.round(nisabSilver * 100) / 100,
    nisabThreshold: Math.round(nisabThreshold * 100) / 100,
    eligible,
  };
}