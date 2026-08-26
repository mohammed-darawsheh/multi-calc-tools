import ToolPage from '@/components/tools/ToolPage';
import IdealWeight from '@/components/tools/IdealWeight/IdealWeight';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'idealWeight', 'ideal-weight');
}

export default function IdealWeightPage() {
  return (
    <ToolPage i18nKey="idealWeight" slug="ideal-weight">
      <IdealWeight />
    </ToolPage>
  );
}
