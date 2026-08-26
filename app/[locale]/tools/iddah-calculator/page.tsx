import ToolPage from '@/components/tools/ToolPage';
import IddahCalculator from '@/components/tools/IddahCalculator/IddahCalculator';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'iddahCalculator', 'iddah-calculator');
}

export default function IddahCalculatorPage() {
  return (
    <ToolPage i18nKey="iddahCalculator" slug="iddah-calculator">
      <IddahCalculator />
    </ToolPage>
  );
}
