export interface FastingInput {
  missedDays: number;
  fastedDays: number;
  hasStartedMakeup: boolean;
  startDate: Date | null;
  locale?: string;
}

export interface FastingResult {
  makeupCompleted: number;
  remainingDays: number;
  estimatedEndDate: string;
  isAllCompleted: boolean;
}

export function calculateFastingMakeup(input: FastingInput): FastingResult {
  const { missedDays, fastedDays, hasStartedMakeup, startDate, locale = 'ar' } = input;

  const validMissed = Math.max(0, missedDays);
  const validFasted = Math.min(validMissed, Math.max(0, fastedDays));
  const remainingDays = Math.max(0, validMissed - validFasted);
  const isAllCompleted = validMissed > 0 && remainingDays === 0;

  // Estimate end date: assuming 1 fast per day starting from startDate or today
  const start = (startDate && hasStartedMakeup) ? new Date(startDate) : new Date();
  const estimatedEnd = new Date(start);
  
  if (remainingDays > 0) {
    estimatedEnd.setDate(estimatedEnd.getDate() + remainingDays - 1);
  }

  const dateLocale = locale.startsWith('ar') ? 'ar-EG' : 'en-US';
  const formattedEndDate = estimatedEnd.toLocaleDateString(dateLocale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    makeupCompleted: validFasted,
    remainingDays,
    estimatedEndDate: formattedEndDate,
    isAllCompleted,
  };
}