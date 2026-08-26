export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSchemaProps {
  faqs: FaqItem[];
}

/**
 * Injects FAQPage JSON-LD structured data into the page <head>.
 * Place this component anywhere on the page to register the schema.
 */
export default function FaqSchema({ faqs }: FaqSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}