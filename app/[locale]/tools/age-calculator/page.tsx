import ToolPage from '@/components/tools/ToolPage';
import AgeCalculator from '@/components/tools/AgeCalculator/AgeCalculator';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'ageCalculator', 'age-calculator');
}

export default function AgeCalculatorPage() {
  return (
    <ToolPage i18nKey="ageCalculator" slug="age-calculator">
      <AgeCalculator />
    </ToolPage>
  );
}
