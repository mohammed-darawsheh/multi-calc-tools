import ToolPage from '@/components/tools/ToolPage';
import QiblaDirection from '@/components/tools/QiblaDirection/QiblaDirection';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'qiblaDirection', 'qibla-direction');
}

export default function QiblaDirectionPage() {
  return (
    <ToolPage i18nKey="qiblaDirection" slug="qibla-direction">
      <QiblaDirection />
    </ToolPage>
  );
}
