import ToolPage from '@/components/tools/ToolPage';
import GpaCalculator from '@/components/tools/GpaCalculator/GpaCalculator';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'gpaCalculator', 'gpa-calculator');
}

export default function GpaCalculatorPage() {
  return (
    <ToolPage i18nKey="gpaCalculator" slug="gpa-calculator">
      <GpaCalculator />
    </ToolPage>
  );
}
