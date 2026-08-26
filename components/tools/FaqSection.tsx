import { useTranslations } from 'next-intl';
import FaqSchema from '@/components/seo/FaqSchema';

interface Faq {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: Faq[];
  title?: string;
}

export default function FaqSection({ faqs, title }: FaqSectionProps) {
  const t = useTranslations();
  const sectionTitle = title ?? t('common.faq');

  return (
    <section className="mt-12 border-t border-border pt-8">
      <FaqSchema faqs={faqs} />
      <h2 className="text-2xl font-bold mb-6">{sectionTitle}</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-lg border border-border bg-card p-4 [&_summary]:cursor-pointer [&_summary]:font-medium"
          >
            <summary className="flex items-center justify-between">
              {faq.question}
              <span className="text-muted-foreground transition-transform group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
