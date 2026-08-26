export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  totalWeeks: number;
  totalHours: number;
  nextBirthdayDays: number;
  dayOfWeekAr: string;
  dayOfWeekEn: string;
}

const daysOfWeekAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const daysOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function calculateAge(birthDate: Date): AgeResult {
  const now = new Date();
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = Math.max(0, now.getTime() - birthDate.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

  // Next birthday calculation
  const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday.getTime() < now.getTime()) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const nextBdayMs = nextBirthday.getTime() - now.getTime();
  const nextBirthdayDays = Math.ceil(nextBdayMs / (1000 * 60 * 60 * 24));

  const dayIndex = birthDate.getDay();

  return {
    years,
    months,
    days,
    totalDays,
    totalMonths,
    totalWeeks,
    totalHours,
    nextBirthdayDays,
    dayOfWeekAr: daysOfWeekAr[dayIndex] ?? '',
    dayOfWeekEn: daysOfWeekEn[dayIndex] ?? '',
  };
}
