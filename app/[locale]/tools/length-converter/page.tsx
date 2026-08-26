import ToolPage from '@/components/tools/ToolPage';
import LengthConverter from '@/components/tools/LengthConverter/LengthConverter';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'lengthConverter', 'length-converter');
}

export default function LengthConverterPage() {
  return (
    <ToolPage i18nKey="lengthConverter" slug="length-converter">
      <LengthConverter />
    </ToolPage>
  );
}
