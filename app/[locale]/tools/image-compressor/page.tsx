import ToolPage from '@/components/tools/ToolPage';
import ImageCompressor from '@/components/tools/ImageCompressor/ImageCompressor';
import { generateToolMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateToolMetadata(locale, 'imageCompressor', 'image-compressor');
}

export default function ImageCompressorPage() {
  return (
    <ToolPage i18nKey="imageCompressor" slug="image-compressor">
      <ImageCompressor />
    </ToolPage>
  );
}
