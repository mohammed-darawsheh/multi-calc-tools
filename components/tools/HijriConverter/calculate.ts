// @ts-ignore - hijri-date has no type declarations
import HijriDate from 'hijri-date';

export interface HijriDateParts {
  day: number;
  month: number; // 1-based
  year: number;
  monthNameEn: string;
  monthNameAr: string;
}

export interface GregorianDateParts {
  day: number;
  month: number; // 1-based
  year: number;
  monthNameEn: string;
  monthNameAr: string;
}

export interface HijriResult {
  hijri: HijriDateParts;
  gregorian: GregorianDateParts;
}

export const hijriMonthsAr = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الثاني',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
];

export const hijriMonthsEn = [
  'Muharram',
  'Safar',
  'Rabi al-Awwal',
  'Rabi al-Thani',
  'Jumada al-Awwal',
  'Jumada al-Thani',
  'Rajab',
  'Shaban',
  'Ramadan',
  'Shawwal',
  'Dhu al-Qidah',
  'Dhu al-Hijjah',
];

export const gregMonthsAr = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export const gregMonthsEn = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Convert a Gregorian Date to Hijri */
export function convertToHijri(gregorianDate: Date): HijriResult {
  const h = new HijriDate(gregorianDate.getTime());
  const hMonth = h.getMonth(); // 1-based
  const gMonth = gregorianDate.getMonth(); // 0-based

  return {
    hijri: {
      day: h.getDate(),
      month: hMonth,
      year: h.getFullYear(),
      monthNameEn: hijriMonthsEn[hMonth - 1] ?? '',
      monthNameAr: hijriMonthsAr[hMonth - 1] ?? '',
    },
    gregorian: {
      day: gregorianDate.getDate(),
      month: gMonth + 1,
      year: gregorianDate.getFullYear(),
      monthNameEn: gregMonthsEn[gMonth] ?? '',
      monthNameAr: gregMonthsAr[gMonth] ?? '',
    },
  };
}

/** Convert Hijri (year, month, day) to Gregorian */
export function convertToGregorian(hDay: number, hMonth: number, hYear: number): HijriResult {
  const h = new HijriDate(hYear, hMonth, hDay);
  const g = h.toGregorian();
  const gMonth = g.getMonth(); // 0-based

  return {
    hijri: {
      day: hDay,
      month: hMonth,
      year: hYear,
      monthNameEn: hijriMonthsEn[hMonth - 1] ?? '',
      monthNameAr: hijriMonthsAr[hMonth - 1] ?? '',
    },
    gregorian: {
      day: g.getDate(),
      month: gMonth + 1,
      year: g.getFullYear(),
      monthNameEn: gregMonthsEn[gMonth] ?? '',
      monthNameAr: gregMonthsAr[gMonth] ?? '',
    },
  };
}
