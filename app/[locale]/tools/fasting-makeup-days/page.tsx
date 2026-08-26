import ToolPage from '@/components/tools/ToolPage';
import FastingMakeupDays from '@/components/tools/FastingMakeupDays/FastingMakeupDays';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'fastingMakeupDays', 'fasting-makeup-days');
}

export default function FastingMakeupDaysPage() {
  return (
    <ToolPage i18nKey="fastingMakeupDays" slug="fasting-makeup-days">
      <FastingMakeupDays />
    </ToolPage>
  );
}
