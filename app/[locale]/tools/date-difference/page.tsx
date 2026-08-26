import ToolPage from '@/components/tools/ToolPage';
import DateDifference from '@/components/tools/DateDifference/DateDifference';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'dateDifference', 'date-difference');
}

export default function DateDifferencePage() {
  return (
    <ToolPage i18nKey="dateDifference" slug="date-difference">
      <DateDifference />
    </ToolPage>
  );
}
