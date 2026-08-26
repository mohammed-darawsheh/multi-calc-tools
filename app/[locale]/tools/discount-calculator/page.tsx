import ToolPage from '@/components/tools/ToolPage';
import DiscountCalculator from '@/components/tools/DiscountCalculator/DiscountCalculator';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'discountCalculator', 'discount-calculator');
}

export default function DiscountCalculatorPage() {
  return (
    <ToolPage i18nKey="discountCalculator" slug="discount-calculator">
      <DiscountCalculator />
    </ToolPage>
  );
}
