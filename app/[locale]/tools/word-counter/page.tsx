import ToolPage from '@/components/tools/ToolPage';
import WordCounter from '@/components/tools/WordCounter/WordCounter';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'wordCounter', 'word-counter');
}

export default function WordCounterPage() {
  return (
    <ToolPage i18nKey="wordCounter" slug="word-counter">
      <WordCounter />
    </ToolPage>
  );
}
