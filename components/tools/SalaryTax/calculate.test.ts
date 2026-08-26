import { describe, it, expect } from 'vitest';
import { calculateSalary } from './calculate';

describe('calculateSalary', () => {
  it('calculates tax for Jordan', () => {
    const result = calculateSalary('jordan', 1000);
    expect(result.currency).toBe('JOD');
    expect(result.gross).toBe(1000);
    expect(result.tax).toBeGreaterThanOrEqual(0);
    expect(result.net).toBeLessThanOrEqual(result.gross);
  });

  it('UAE has no income tax', () => {
    const result = calculateSalary('uae', 10000);
    expect(result.tax).toBe(0);
    expect(result.net).toBe(result.gross);
  });

  it('net is gross minus tax and SS', () => {
    const result = calculateSalary('egypt', 5000);
    expect(result.net).toBeCloseTo(result.gross - result.tax - result.socialSecurity, 1);
  });

  it('handles unknown country gracefully', () => {
    expect(() => calculateSalary('mars', 1000)).toThrow();
  });
});
