/**
 * Merge class names, filtering out falsy values.
 * A lightweight alternative to clsx/twMerge for this project.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a number with locale-aware formatting (thousands separators, decimals).
 * Falls back to 'en-US' if no locale is provided.
 */
export function formatNumber(
  value: number,
  locale?: string,
  options?: Intl.NumberFormatOptions,
): string {
  try {
    return new Intl.NumberFormat(locale ?? 'en-US', {
      maximumFractionDigits: 10,
      ...options,
    }).format(value);
  } catch {
    // Fallback for invalid locale
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 10,
      ...options,
    }).format(value);
  }
}

/**
 * Round a number to a given number of decimal places.
 */
export function roundTo(value: number, decimals: number = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}