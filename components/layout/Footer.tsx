'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>{t('common.footerText')}</p>
        <p className="mt-2">
          {t('common.disclaimer')}
        </p>
      </div>
    </footer>
  );
}