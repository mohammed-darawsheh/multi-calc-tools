import { describe, it, expect } from 'vitest';
import { convertWeight } from './calculate';

describe('convertWeight', () => {
  it('converts kg to lb', () => {
    expect(convertWeight(1, 'kg', 'lb')).toBeCloseTo(2.20462, 4);
  });

  it('converts lb to kg', () => {
    expect(convertWeight(2.20462, 'lb', 'kg')).toBeCloseTo(1, 4);
  });

  it('same unit returns same value', () => {
    expect(convertWeight(5, 'kg', 'kg')).toBe(5);
  });

  it('converts kg to g', () => {
    expect(convertWeight(1, 'kg', 'g')).toBe(1000);
  });
});
