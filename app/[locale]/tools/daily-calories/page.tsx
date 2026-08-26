import ToolPage from '@/components/tools/ToolPage';
import DailyCalories from '@/components/tools/DailyCalories/DailyCalories';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'dailyCalories', 'daily-calories');
}

export default function DailyCaloriesPage() {
  return (
    <ToolPage i18nKey="dailyCalories" slug="daily-calories">
      <DailyCalories />
    </ToolPage>
  );
}
