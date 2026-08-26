import { describe, it, expect } from 'vitest';
import { calculateGpa } from './calculate';

describe('calculateGpa', () => {
  it('calculates GPA for straight A', () => {
    const result = calculateGpa([
      { id: '1', grade: 'A', credits: 3 },
      { id: '2', grade: 'A', credits: 3 },
    ]);
    expect(result.gpa).toBe(4.0);
    expect(result.totalCredits).toBe(6);
  });

  it('calculates weighted GPA', () => {
    const result = calculateGpa([
      { id: '1', grade: 'A', credits: 3 },   // 12 points
      { id: '2', grade: 'B', credits: 4 },   // 12 points
    ]);
    // (4*3 + 3*4) / 7 = 24/7 = 3.43
    expect(result.gpa).toBeCloseTo(3.43, 1);
  });

  it('handles F grade', () => {
    const result = calculateGpa([{ id: '1', grade: 'F', credits: 3 }]);
    expect(result.gpa).toBe(0);
  });
});
