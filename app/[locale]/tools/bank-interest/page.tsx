import ToolPage from '@/components/tools/ToolPage';
import BankInterest from '@/components/tools/BankInterest/BankInterest';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'bankInterest', 'bank-interest');
}

export default function BankInterestPage() {
  return (
    <ToolPage i18nKey="bankInterest" slug="bank-interest">
      <BankInterest />
    </ToolPage>
  );
}
