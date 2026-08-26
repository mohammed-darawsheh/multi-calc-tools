import { describe, it, expect } from 'vitest';
import { calculateDiscount } from './calculate';

describe('calculateDiscount', () => {
  it('calculates final price from original + percent', () => {
    const result = calculateDiscount({ originalPrice: 100, discountPercent: 20 });
    expect(result.finalPrice).toBe(80);
    expect(result.discountAmount).toBe(20);
  });

  it('calculates percent from original + final', () => {
    const result = calculateDiscount({ originalPrice: 100, finalPrice: 75 });
    expect(result.discountPercent).toBe(25);
  });

  it('calculates original from percent + final', () => {
    const result = calculateDiscount({ discountPercent: 20, finalPrice: 80 });
    expect(result.originalPrice).toBe(100);
  });
});
