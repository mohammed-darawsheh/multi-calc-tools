const rateCache = new Map<string, { rates: Record<string, number>; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

// Common fallback rates in case API is offline
const fallbackRates: Record<string, Record<string, number>> = {
  USD: { USD: 1, EUR: 0.92, GBP: 0.79, SAR: 3.75, AED: 3.67, EGP: 48.5, JOD: 0.709, KWD: 0.307, QAR: 3.64, BHD: 0.376, OMR: 0.385, CAD: 1.36, AUD: 1.52, TRY: 33.5 },
  SAR: { USD: 0.267, SAR: 1, AED: 0.98, EGP: 12.93, JOD: 0.189, EUR: 0.245, GBP: 0.211 },
  EGP: { USD: 0.0206, SAR: 0.0773, EGP: 1, EUR: 0.019, AED: 0.0757, JOD: 0.0146 },
  JOD: { USD: 1.41, SAR: 5.29, JOD: 1, EGP: 68.4, EUR: 1.30, AED: 5.18 },
};

export async function getExchangeRate(from: string, to: string): Promise<number> {
  if (from === to) return 1;

  const now = Date.now();
  const cached = rateCache.get(from);

  if (cached && now - cached.timestamp < CACHE_TTL_MS && cached.rates[to]) {
    return cached.rates[to];
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${encodeURIComponent(from)}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) throw new Error(`API HTTP ${res.status}`);
    const data = await res.json();
    if (data && data.rates && typeof data.rates[to] === 'number') {
      rateCache.set(from, { rates: data.rates, timestamp: now });
      return data.rates[to];
    }
  } catch (e) {
    // API failed, check fallback
    if (fallbackRates[from]?.[to]) {
      return fallbackRates[from][to];
    }
    if (fallbackRates[to]?.[from]) {
      return 1 / fallbackRates[to][from];
    }
    // Calculate via USD fallback
    const fromToUsd = fallbackRates.USD[from] ? 1 / fallbackRates.USD[from] : 1;
    const usdToTo = fallbackRates.USD[to] || 1;
    return fromToUsd * usdToTo;
  }

  return 1;
}