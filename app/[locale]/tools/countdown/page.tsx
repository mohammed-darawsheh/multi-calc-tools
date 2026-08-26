import ToolPage from '@/components/tools/ToolPage';
import Countdown from '@/components/tools/Countdown/Countdown';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'countdown', 'countdown');
}

export default function CountdownPage() {
  return (
    <ToolPage i18nKey="countdown" slug="countdown">
      <Countdown />
    </ToolPage>
  );
}
