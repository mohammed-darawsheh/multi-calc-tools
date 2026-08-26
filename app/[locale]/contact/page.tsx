import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const t = useTranslations();
  return (
    <>
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">{t('pages.contact.heading')}</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">{t('pages.contact.body')}</p>
        <div className="p-4 rounded-lg bg-muted">
          <p className="font-medium">{siteConfig.email}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
