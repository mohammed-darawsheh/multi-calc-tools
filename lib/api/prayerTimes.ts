export type PrayerTimesResponse = {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  date: string;
};

export type PrayerTimesParams = {
  city: string;
  country: string;
  date?: string; // DD-MM-YYYY format
  method?: number; // Calculation method (4: Umm Al-Qura, 5: Egyptian, 3: Muslim World League)
};

const arabicToEnglishCity: Record<string, string> = {
  'مكة': 'Mecca',
  'مكه': 'Mecca',
  'مكة المكرمة': 'Mecca',
  'المدينة': 'Medina',
  'المدينة المنورة': 'Medina',
  'الرياض': 'Riyadh',
  'جدة': 'Jeddah',
  'الدمام': 'Dammam',
  'القاهرة': 'Cairo',
  'الإسكندرية': 'Alexandria',
  'الجيزة': 'Giza',
  'عمان': 'Amman',
  'إربد': 'Irbid',
  'الزرقاء': 'Zarqa',
  'دبي': 'Dubai',
  'أبوظبي': 'Abu Dhabi',
  'الشارقة': 'Sharjah',
  'الدوحة': 'Doha',
  'الكويت': 'Kuwait City',
  'المنامة': 'Manama',
  'مسقط': 'Muscat',
  'بغداد': 'Baghdad',
  'أربيل': 'Erbil',
  'بيروت': 'Beirut',
  'دمشق': 'Damascus',
  'القدس': 'Jerusalem',
  'غزة': 'Gaza',
  'صنعاء': 'Sanaa',
  'طرابلس': 'Tripoli',
  'تونس': 'Tunis',
  'الجزائر': 'Algiers',
  'الرباط': 'Rabat',
  'الدار البيضاء': 'Casablanca',
  'الخرطوم': 'Khartoum',
  'إسطنبول': 'Istanbul',
  'أنقرة': 'Ankara',
};

// Fallback timings in case API is offline
const fallbackTimings: Record<string, PrayerTimesResponse['timings']> = {
  SA: { Fajr: '04:55', Sunrise: '06:12', Dhuhr: '12:20', Asr: '15:45', Maghrib: '18:25', Isha: '19:55' },
  EG: { Fajr: '04:45', Sunrise: '06:05', Dhuhr: '12:00', Asr: '15:25', Maghrib: '17:55', Isha: '19:15' },
  JO: { Fajr: '04:50', Sunrise: '06:10', Dhuhr: '12:35', Asr: '16:05', Maghrib: '18:55', Isha: '20:15' },
  AE: { Fajr: '05:00', Sunrise: '06:15', Dhuhr: '12:30', Asr: '15:55', Maghrib: '18:40', Isha: '20:00' },
};

export async function getPrayerTimes({
  city,
  country,
  date,
  method = 4, // Default to Umm Al-Qura / Islamic standard
}: PrayerTimesParams): Promise<PrayerTimesResponse> {
  const normalizedCity = arabicToEnglishCity[city.trim()] || city.trim();

  try {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(normalizedCity)}&country=${encodeURIComponent(country)}&method=${method}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (data && data.data && data.data.timings) {
      return {
        timings: {
          Fajr: data.data.timings.Fajr?.slice(0, 5) || '05:00',
          Sunrise: data.data.timings.Sunrise?.slice(0, 5) || '06:20',
          Dhuhr: data.data.timings.Dhuhr?.slice(0, 5) || '12:25',
          Asr: data.data.timings.Asr?.slice(0, 5) || '15:50',
          Maghrib: data.data.timings.Maghrib?.slice(0, 5) || '18:30',
          Isha: data.data.timings.Isha?.slice(0, 5) || '20:00',
        },
        date: data.data.date?.readable || new Date().toDateString(),
      };
    }
  } catch (e) {
    // API failure fallback
    const timings = fallbackTimings[country] || fallbackTimings.SA;
    return {
      timings,
      date: new Date().toDateString(),
    };
  }

  return {
    timings: fallbackTimings.SA,
    date: new Date().toDateString(),
  };
}