import ToolPage from '@/components/tools/ToolPage';
import DueDate from '@/components/tools/DueDate/DueDate';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'dueDate', 'due-date');
}

export default function DueDatePage() {
  return (
    <ToolPage i18nKey="dueDate" slug="due-date">
      <DueDate />
    </ToolPage>
  );
}
