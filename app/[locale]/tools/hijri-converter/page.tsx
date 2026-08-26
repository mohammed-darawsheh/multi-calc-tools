import ToolPage from '@/components/tools/ToolPage';
import HijriConverter from '@/components/tools/HijriConverter/HijriConverter';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'hijriConverter', 'hijri-converter');
}

export default function HijriConverterPage() {
  return (
    <ToolPage i18nKey="hijriConverter" slug="hijri-converter">
      <HijriConverter />
    </ToolPage>
  );
}
