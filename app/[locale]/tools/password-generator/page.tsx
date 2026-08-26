import ToolPage from '@/components/tools/ToolPage';
import PasswordGenerator from '@/components/tools/PasswordGenerator/PasswordGenerator';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'passwordGenerator', 'password-generator');
}

export default function PasswordGeneratorPage() {
  return (
    <ToolPage i18nKey="passwordGenerator" slug="password-generator">
      <PasswordGenerator />
    </ToolPage>
  );
}
