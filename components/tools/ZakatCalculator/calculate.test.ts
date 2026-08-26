import { describe, it, expect } from 'vitest';
import { calculateZakat } from './calculate';

describe('calculateZakat', () => {
  it('calculates zakat when above nisab', () => {
    const result = calculateZakat({
      cash: 10000,
      goldGrams: 100,
      silverGrams: 0,
      businessValue: 0,
      debts: 0,
    });
    expect(result.eligible).toBe(true);
    expect(result.zakatDue).toBeGreaterThan(0);
  });

  it('no zakat when below nisab', () => {
    const result = calculateZakat({
      cash: 100,
      goldGrams: 0,
      silverGrams: 0,
      businessValue: 0,
      debts: 0,
    });
    expect(result.eligible).toBe(false);
    expect(result.zakatDue).toBe(0);
  });

  it('subtracts debts from zakatable amount', () => {
    const result = calculateZakat({
      cash: 10000,
      goldGrams: 0,
      silverGrams: 0,
      businessValue: 0,
      debts: 5000,
    });
    expect(result.totalZakatable).toBe(5000);
    expect(result.zakatDue).toBe(125); // 2.5% of 5000
  });
});
