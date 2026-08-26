import ToolPage from '@/components/tools/ToolPage';
import Ovulation from '@/components/tools/Ovulation/Ovulation';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'ovulation', 'ovulation');
}

export default function OvulationPage() {
  return (
    <ToolPage i18nKey="ovulation" slug="ovulation">
      <Ovulation />
    </ToolPage>
  );
}
