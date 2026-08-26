'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1.5 rounded-lg border border-border text-sm hover:bg-muted transition-colors"
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}