import ToolPage from '@/components/tools/ToolPage';
import AreaConverter from '@/components/tools/AreaConverter/AreaConverter';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'areaConverter', 'area-converter');
}

export default function AreaConverterPage() {
  return (
    <ToolPage i18nKey="areaConverter" slug="area-converter">
      <AreaConverter />
    </ToolPage>
  );
}
