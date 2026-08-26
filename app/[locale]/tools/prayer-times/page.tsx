import ToolPage from '@/components/tools/ToolPage';
import PrayerTimes from '@/components/tools/PrayerTimes/PrayerTimes';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'prayerTimes', 'prayer-times');
}

export default function PrayerTimesPage() {
  return (
    <ToolPage i18nKey="prayerTimes" slug="prayer-times">
      <PrayerTimes />
    </ToolPage>
  );
}
