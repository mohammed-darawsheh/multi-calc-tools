'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getPrayerTimes, type PrayerTimesResponse } from '@/lib/api/prayerTimes';

const countries = [
  { value: 'SA', ar: 'المملكة العربية السعودية', en: 'Saudi Arabia', defaultCity: 'مكة' },
  { value: 'EG', ar: 'مصر', en: 'Egypt', defaultCity: 'القاهرة' },
  { value: 'AE', ar: 'الإمارات العربية المتحدة', en: 'UAE', defaultCity: 'دبي' },
  { value: 'JO', ar: 'الأردن', en: 'Jordan', defaultCity: 'عمان' },
  { value: 'KW', ar: 'الكويت', en: 'Kuwait', defaultCity: 'الكويت' },
  { value: 'QA', ar: 'قطر', en: 'Qatar', defaultCity: 'الدوحة' },
  { value: 'BH', ar: 'البحرين', en: 'Bahrain', defaultCity: 'المنامة' },
  { value: 'OM', ar: 'سلطنة عمان', en: 'Oman', defaultCity: 'مسقط' },
  { value: 'IQ', ar: 'العراق', en: 'Iraq', defaultCity: 'بغداد' },
  { value: 'PS', ar: 'فلسطين', en: 'Palestine', defaultCity: 'القدس' },
  { value: 'MA', ar: 'المغرب', en: 'Morocco', defaultCity: 'الرباط' },
  { value: 'DZ', ar: 'الجزائر', en: 'Algeria', defaultCity: 'الجزائر' },
  { value: 'TN', ar: 'تونس', en: 'Tunisia', defaultCity: 'تونس' },
  { value: 'TR', ar: 'تركيا', en: 'Turkey', defaultCity: 'إسطنبول' },
  { value: 'US', ar: 'الولايات المتحدة', en: 'United States', defaultCity: 'New York' },
  { value: 'UK', ar: 'المملكة المتحدة', en: 'United Kingdom', defaultCity: 'London' },
];

export default function PrayerTimes() {
  const t = useTranslations('tools.prayerTimes.ui');
  const locale = useLocale();
  const isAr = locale.startsWith('ar');

  const [country, setCountry] = useState('SA');
  const [city, setCity] = useState('مكة');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prayerData, setPrayerData] = useState<PrayerTimesResponse | null>(null);

  const fetchTimes = async (targetCity: string, targetCountry: string) => {
    if (!targetCity.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await getPrayerTimes({
        city: targetCity.trim(),
        country: targetCountry,
      });
      setPrayerData(data);
    } catch (err) {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimes(city, country);
  }, []);

  const handleCountryChange = (c: string) => {
    setCountry(c);
    const defaultC = countries.find((item) => item.value === c)?.defaultCity || '';
    setCity(defaultC);
    fetchTimes(defaultC, c);
  };

  const prayers = [
    { key: 'Fajr', label: t('fajr'), icon: '🌄' },
    { key: 'Sunrise', label: t('sunrise'), icon: '🌅' },
    { key: 'Dhuhr', label: t('dhuhr'), icon: '☀️' },
    { key: 'Asr', label: t('asr'), icon: '🌤️' },
    { key: 'Maghrib', label: t('maghrib'), icon: '🌇' },
    { key: 'Isha', label: t('isha'), icon: '🌙' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('country')}</label>
          <select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background"
          >
            {countries.map((c) => (
              <option key={c.value} value={c.value}>
                {isAr ? c.ar : c.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">{t('city')}</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t('cityPlaceholder')}
            className="w-full p-3.5 rounded-xl border border-border bg-background"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => fetchTimes(city, country)}
        disabled={loading || !city.trim()}
        className="w-full bg-accent text-accent-foreground py-3.5 px-6 rounded-xl font-bold hover:opacity-95 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
      >
        {loading ? t('loading') : t('getTimes')}
      </button>

      {error && (
        <div className="p-3.5 rounded-xl bg-destructive/10 text-destructive text-sm text-center">
          {error}
        </div>
      )}

      {prayerData && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {prayers.map((p) => {
              const time = prayerData.timings[p.key as keyof typeof prayerData.timings];
              return (
                <div
                  key={p.key}
                  className="p-4 rounded-xl border border-border bg-card text-center space-y-1 hover:border-accent/50 transition-colors"
                >
                  <span className="text-2xl block">{p.icon}</span>
                  <p className="text-xs font-semibold text-muted-foreground">{p.label}</p>
                  <p className="text-xl font-black text-accent">{time}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-muted-foreground pt-2">
            📍 {city} — {isAr ? countries.find((c) => c.value === country)?.ar : country}
          </p>
        </div>
      )}
    </div>
  );
}