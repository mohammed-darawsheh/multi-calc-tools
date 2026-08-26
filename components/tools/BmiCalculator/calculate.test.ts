import { describe, it, expect } from 'vitest';
import { calculateBmi } from './calculate';

describe('calculateBmi', () => {
  it('calculates normal BMI for 70kg, 170cm', () => {
    const result = calculateBmi(70, 170);
    expect(result.bmi).toBeCloseTo(24.22, 1);
    expect(result.category).toBe('normal');
  });

  it('identifies underweight', () => {
    const result = calculateBmi(45, 170);
    expect(result.category).toBe('underweight');
  });

  it('identifies overweight', () => {
    const result = calculateBmi(85, 170);
    expect(result.category).toBe('overweight');
  });

  it('identifies obese', () => {
    const result = calculateBmi(100, 170);
    expect(result.category).toBe('obese');
  });

  it('returns valid ideal range', () => {
    const result = calculateBmi(70, 170);
    expect(result.idealRange.min).toBeGreaterThan(0);
    expect(result.idealRange.max).toBeGreaterThan(result.idealRange.min);
  });
});
