import ToolPage from '@/components/tools/ToolPage';
import SalaryTax from '@/components/tools/SalaryTax/SalaryTax';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'salaryTax', 'salary-tax');
}

export default function SalaryTaxPage() {
  return (
    <ToolPage i18nKey="salaryTax" slug="salary-tax">
      <SalaryTax />
    </ToolPage>
  );
}
