import ToolPage from '@/components/tools/ToolPage';
import LoanCalculator from '@/components/tools/LoanCalculator/LoanCalculator';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'loanCalculator', 'loan-calculator');
}

export default function LoanCalculatorPage() {
  return (
    <ToolPage i18nKey="loanCalculator" slug="loan-calculator">
      <LoanCalculator />
    </ToolPage>
  );
}
