import ToolPage from '@/components/tools/ToolPage';
import BmiCalculator from '@/components/tools/BmiCalculator/BmiCalculator';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'bmiCalculator', 'bmi-calculator');
}

export default function BmiCalculatorPage() {
  return (
    <ToolPage i18nKey="bmiCalculator" slug="bmi-calculator">
      <BmiCalculator />
    </ToolPage>
  );
}
