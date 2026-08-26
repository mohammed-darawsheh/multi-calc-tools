import { describe, it, expect } from 'vitest';
import { calculateLoan } from './calculate';

describe('calculateLoan', () => {
  it('calculates zero-interest loan correctly', () => {
    const result = calculateLoan(12000, 0, 1);
    expect(result.monthlyPayment).toBe(1000);
    expect(result.totalInterest).toBe(0);
    expect(result.totalPayment).toBe(12000);
    expect(result.amortizationSchedule).toHaveLength(12);
  });

  it('calculates interest-bearing loan', () => {
    const result = calculateLoan(100000, 5, 15);
    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.amortizationSchedule).toHaveLength(180);
    // Final balance should be ~0
    const last = result.amortizationSchedule[result.amortizationSchedule.length - 1];
    expect(Math.abs(last.balance)).toBeLessThan(1);
  });

  it('total payment ≈ monthly * months (rounding tolerance)', () => {
    const result = calculateLoan(50000, 4, 10);
    const expected = result.monthlyPayment * 120;
    expect(Math.abs(result.totalPayment - expected)).toBeLessThan(1);
  });
});
