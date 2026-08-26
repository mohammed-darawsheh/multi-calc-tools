import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  const t = useTranslations();
  return (
    <>
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">{t('pages.privacy.heading')}</h1>
        <p className="text-muted-foreground leading-relaxed">{t('pages.privacy.body')}</p>
      </main>
      <Footer />
    </>
  );
}
