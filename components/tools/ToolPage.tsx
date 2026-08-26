import { useTranslations } from 'next-intl';
import { ToolSchema } from '@/components/seo/ToolSchema';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdSlot from '@/components/ads/AdSlot';
import FaqSection from '@/components/tools/FaqSection';
import type { ReactNode } from 'react';

interface ToolPageProps {
  i18nKey: string;
  slug: string;
  children: ReactNode;
}

export default function ToolPage({ i18nKey, slug, children }: ToolPageProps) {
  const t = useTranslations();
  const toolName = t(`tools.${i18nKey}.name`);
  const toolDesc = t(`tools.${i18nKey}.desc`);
  const rawFaqs = t.raw(`tools.${i18nKey}.faqs`);
  const faqs = Array.isArray(rawFaqs) ? (rawFaqs as { question: string; answer: string }[]) : [];

  return (
    <>
      <Header />
      <ToolSchema name={toolName} description={toolDesc} url={`https://calctools.io/tools/${slug}`} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{toolName}</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">{toolDesc}</p>
        </div>

        <AdSlot slot="tool-top" className="mb-8" />

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          {children}
        </div>

        {faqs.length > 0 && <FaqSection faqs={faqs} />}

        <div className="mt-8 p-4 rounded-2xl bg-muted/40 border border-border/60 text-center text-xs text-muted-foreground leading-relaxed">
          {t('common.disclaimer')}
        </div>

        <AdSlot slot="tool-bottom" className="mt-8" />
      </main>
      <Footer />
    </>
  );
}
