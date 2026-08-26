export interface DiscountInput {
  originalPrice?: number;
  discountPercent?: number;
  finalPrice?: number;
}

export interface DiscountResult {
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  savings: number;
}

export function calculateDiscount(input: DiscountInput): DiscountResult {
  let originalPrice: number;
  let discountPercent: number;
  let finalPrice: number;

  // Case 1: original + discountPercent provided → calculate finalPrice
  if (input.originalPrice !== undefined && input.discountPercent !== undefined) {
    originalPrice = input.originalPrice;
    discountPercent = input.discountPercent;
    const discountAmount = originalPrice * (discountPercent / 100);
    finalPrice = originalPrice - discountAmount;
  }
  // Case 2: original + finalPrice provided → calculate discountPercent
  else if (input.originalPrice !== undefined && input.finalPrice !== undefined) {
    originalPrice = input.originalPrice;
    finalPrice = input.finalPrice;
    discountPercent = ((originalPrice - finalPrice) / originalPrice) * 100;
  }
  // Case 3: discountPercent + finalPrice provided → calculate originalPrice
  else if (input.discountPercent !== undefined && input.finalPrice !== undefined) {
    discountPercent = input.discountPercent;
    finalPrice = input.finalPrice;
    originalPrice = finalPrice / (1 - discountPercent / 100);
  }
  // Default fallback (shouldn't happen if UI validates)
  else {
    originalPrice = input.originalPrice ?? 0;
    discountPercent = input.discountPercent ?? 0;
    finalPrice = input.finalPrice ?? 0;
  }

  const discountAmount = originalPrice - finalPrice;

  return {
    originalPrice: Math.round(originalPrice * 100) / 100,
    discountPercent: Math.round(discountPercent * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    savings: Math.round(discountAmount * 100) / 100,
  };
}