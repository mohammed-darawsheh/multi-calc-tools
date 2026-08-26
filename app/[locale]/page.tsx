import { useTranslations } from 'next-intl';
import { toolsRegistry } from '@/config/tools-registry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ToolsExplorer from '@/components/layout/ToolsExplorer';

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section with subtle gradient and modern typography */}
        <section className="relative py-16 sm:py-24 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs">
              <span>⚡</span>
              <span>27 {t('homepage.toolsCount')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
              {t('homepage.heroTitle')}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('homepage.heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Tools Explorer Section */}
        <section id="tools" className="max-w-6xl mx-auto px-4 pb-24">
          <ToolsExplorer tools={toolsRegistry} />
        </section>
      </main>
      <Footer />
    </>
  );
}