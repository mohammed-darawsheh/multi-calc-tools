import { describe, it, expect } from 'vitest';
import { calculateAge } from './calculate';

describe('calculateAge', () => {
  const base = new Date('2026-08-26');

  it('calculates age correctly', () => {
    // Mock "now" by passing birthdate 30 years before base
    const birth = new Date('1996-08-26');
    const result = calculateAge(birth);
    expect(result.years).toBeGreaterThanOrEqual(29);
    expect(result.totalDays).toBeGreaterThan(10000);
  });

  it('returns positive values', () => {
    const birth = new Date('2000-01-01');
    const result = calculateAge(birth);
    expect(result.years).toBeGreaterThan(0);
    expect(result.totalDays).toBeGreaterThan(0);
  });
});
