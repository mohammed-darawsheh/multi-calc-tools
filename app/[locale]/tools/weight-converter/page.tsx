import ToolPage from '@/components/tools/ToolPage';
import WeightConverter from '@/components/tools/WeightConverter/WeightConverter';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'weightConverter', 'weight-converter');
}

export default function WeightConverterPage() {
  return (
    <ToolPage i18nKey="weightConverter" slug="weight-converter">
      <WeightConverter />
    </ToolPage>
  );
}
