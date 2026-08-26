import ToolPage from '@/components/tools/ToolPage';
import CurrencyConverter from '@/components/tools/CurrencyConverter/CurrencyConverter';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'currencyConverter', 'currency-converter');
}

export default function CurrencyConverterPage() {
  return (
    <ToolPage i18nKey="currencyConverter" slug="currency-converter">
      <CurrencyConverter />
    </ToolPage>
  );
}
