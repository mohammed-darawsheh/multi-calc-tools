import ToolPage from '@/components/tools/ToolPage';
import TemperatureConverter from '@/components/tools/TemperatureConverter/TemperatureConverter';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'temperatureConverter', 'temperature-converter');
}

export default function TemperatureConverterPage() {
  return (
    <ToolPage i18nKey="temperatureConverter" slug="temperature-converter">
      <TemperatureConverter />
    </ToolPage>
  );
}
