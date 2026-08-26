'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import type { ToolEntry, ToolCategory } from '@/config/tools-registry';

const categoryIcons: Record<string, string> = {
  health: '❤️',
  financial: '💰',
  dates: '📅',
  converters: '📐',
  text: '📝',
  religious: '🕌',
};

export default function ToolsExplorer({ tools }: { tools: ToolEntry[] }) {
  const t = useTranslations();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = useMemo(() => {
    return Array.from(new Set(tools.map((t) => t.category))) as ToolCategory[];
  }, [tools]);

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchCat = activeCategory === 'all' || tool.category === activeCategory;
      if (!matchCat) return false;
      if (!query) return true;

      const name = t(`${tool.i18nKey}.name`).toLowerCase();
      const desc = t(`${tool.i18nKey}.desc`).toLowerCase();
      return name.includes(query) || desc.includes(query) || tool.slug.includes(query);
    });
  }, [tools, search, activeCategory, t]);

  const grouped = useMemo(() => {
    return filteredTools.reduce((acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    }, {} as Record<string, ToolEntry[]>);
  }, [filteredTools]);

  return (
    <div className="space-y-8">
      {/* Search & Category Pills */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-muted-foreground">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('homepage.searchPlaceholder')}
            className="w-full ps-11 pe-4 py-4 rounded-2xl border border-border bg-card shadow-sm text-base focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 end-0 flex items-center pe-4 text-muted-foreground hover:text-foreground text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            ✨ {t('common.tools')} ({tools.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{categoryIcons[cat]}</span>
              <span>{t(`categories.${cat}`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Listing */}
      {Object.keys(grouped).length === 0 ? (
        <div className="p-12 text-center text-muted-foreground space-y-2">
          <span className="text-4xl block">🔍</span>
          <p className="font-semibold text-lg">لم يتم العثور على أي أداة تطابق بحثك</p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('all'); }}
            className="text-sm text-accent font-bold hover:underline"
          >
            إعادة تعيين البحث
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(grouped).map(([category, catTools]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-foreground">
                <span className="text-2xl">{categoryIcons[category] || '🔧'}</span>
                <span>{t(`categories.${category}`)}</span>
                <span className="text-xs font-normal text-muted-foreground">({catTools.length})</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group p-5 rounded-2xl border border-border bg-card hover:border-accent/80 hover:shadow-md transition-all flex items-start gap-4 active:scale-[0.99]"
                  >
                    <span className="text-3xl p-3 rounded-xl bg-muted/60 group-hover:bg-accent/10 transition-colors shrink-0">
                      {tool.icon}
                    </span>
                    <div className="space-y-1 min-w-0 flex-1">
                      <h3 className="font-bold text-base text-foreground group-hover:text-accent transition-colors truncate">
                        {t(`${tool.i18nKey}.name`)}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {t(`${tool.i18nKey}.desc`)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
