import ToolPage from '@/components/tools/ToolPage';
import ZakatCalculator from '@/components/tools/ZakatCalculator/ZakatCalculator';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'zakatCalculator', 'zakat-calculator');
}

export default function ZakatCalculatorPage() {
  return (
    <ToolPage i18nKey="zakatCalculator" slug="zakat-calculator">
      <ZakatCalculator />
    </ToolPage>
  );
}
