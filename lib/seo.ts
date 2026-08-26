import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateToolMetadata(
  locale: string,
  i18nKey: string,
  slug: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `tools.${i18nKey}` });
  const name = t('name');
  const desc = t('desc');

  return {
    title: name,
    description: desc,
    alternates: {
      canonical: `/${locale}/tools/${slug}`,
      languages: {
        ar: `/ar/tools/${slug}`,
        en: `/en/tools/${slug}`,
      },
    },
    openGraph: {
      title: name,
      description: desc,
      url: `https://calctools.io/${locale}/tools/${slug}`,
      type: 'website',
    },
  };
}
