'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
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

// Rich searchable keywords / synonyms for maximum discoverability
const toolKeywords: Record<string, string[]> = {
  'age-calculator': ['عمر', 'ميلاد', 'تاريخ', 'سنة', 'كم عمري', 'احسب عمري', 'age', 'birthday', 'years'],
  'bmi-calculator': ['كتلة الجسم', 'وزن', 'طول', 'سمنة', 'نحافة', 'دايت', 'رجيم', 'bmi', 'body mass', 'fat', 'weight'],
  'ideal-weight': ['وزن مثالي', 'طول', 'رشاقة', 'دايت', 'تخسيس', 'ideal weight', 'target weight'],
  'daily-calories': ['سعرات', 'كالوري', 'طاقة', 'تنشيف', 'تضخيم', 'دايت', 'calories', 'bmr', 'tdee', 'diet'],
  'due-date': ['ولادة', 'حمل', 'موعد الولادة', 'حاسبة الحمل', 'بيبي', 'طفل', 'pregnancy', 'due date', 'trimester', 'baby'],
  'ovulation': ['تبويض', 'خصوبة', 'دورة شهرية', 'حمل', 'فرص الحمل', 'ovulation', 'fertile', 'period', 'cycle'],

  'loan-calculator': ['قرض', 'اقساط', 'تمويل', 'بنك', 'سلفة', 'فائدة', 'دفعة شهرية', 'loan', 'mortgage', 'installment'],
  'zakat-calculator': ['زكاة', 'نصاب', 'ذهب', 'فضة', 'اموال', 'صدقة', 'حساب الزكاة', 'zakat', 'nisab', 'gold', 'charity'],
  'bank-interest': ['فائدة بنكية', 'ارباح', 'وديعة', 'استثمار', 'تراكمي', 'interest', 'compound', 'bank', 'savings'],
  'discount-calculator': ['خصم', 'تخفيض', 'عروض', 'تنزيلات', 'نسبة الخصم', 'وفرت', 'discount', 'sale', 'off', 'savings'],
  'gpa-calculator': ['معدل', 'جامعة', 'تراكمي', 'درجات', 'علامات', 'شهادة', 'gpa', 'grades', 'university', 'college'],
  'salary-tax': ['راتب', 'ضريبة', 'دخل', 'معاش', 'اقتطاع', 'ضريبة الدخل', 'tax', 'salary', 'payroll', 'income'],
  'currency-converter': ['عملات', 'دولار', 'يورو', 'ريال', 'دينار', 'جنيه', 'صرف', 'تحويل عملة', 'currency', 'exchange', 'forex', 'rate'],

  'date-difference': ['فرق التاريخ', 'ايام', 'اشهر', 'بين تاريخين', 'كم باقي', 'مدة', 'date difference', 'duration', 'days between'],
  'countdown': ['عداد تنازلي', 'مؤقت', 'مناسبة', 'راس السنة', 'رمضان', 'countdown', 'timer', 'event'],
  'iddah-calculator': ['عدة', 'طلاق', 'وفاة', 'ارملة', 'مطلقة', 'حمل', 'شرع', 'احكام العدة', 'iddah', 'divorce', 'bereavement'],
  'hijri-converter': ['هجري', 'ميلادي', 'تاريخ اليوم', 'محرم', 'رمضان', 'تحويل تاريخ', 'hijri', 'gregorian', 'islamic calendar'],

  'weight-converter': ['وزن', 'كيلو', 'باوند', 'جرام', 'طن', 'اوقية', 'weight', 'kg', 'lbs', 'grams', 'converter'],
  'length-converter': ['طول', 'مسافة', 'متر', 'قدم', 'بوصة', 'سنتيمتر', 'ذراع', 'انش', 'length', 'meter', 'feet', 'inch'],
  'temperature-converter': ['حرارة', 'فهرنهايت', 'مئوي', 'سيليزيوس', 'كلفن', 'طقس', 'temperature', 'celsius', 'fahrenheit'],
  'area-converter': ['مساحة', 'متر مربع', 'فدان', 'دونم', 'قيراط', 'سهم', 'هكتار', 'اراضي', 'عقار', 'area', 'sqm', 'acre'],

  'word-counter': ['كلمات', 'نصوص', 'احرف', 'قراءة', 'تعبير', 'مقال', 'word count', 'character count', 'reading time'],
  'password-generator': ['كلمة سر', 'باسورد', 'امان', 'توليد كلمة سر', 'حماية', 'password', 'security', 'strong password'],
  'image-compressor': ['ضغط صور', 'تصغير حجم', 'ميجابايت', 'كيلوبايت', 'صورة', 'تعديل', 'image compress', 'shrink image'],

  'prayer-times': ['صلاة', 'اذان', 'مواقيت', 'فجر', 'مغرب', 'عشاء', 'ظهر', 'عصر', 'prayer times', 'adhan', 'namaz'],
  'qibla-direction': ['قبلة', 'مكة', 'كعبة', 'اتجاه القبلة', 'بوصلة', 'qibla', 'mecca', 'kaaba', 'compass'],
  'fasting-makeup-days': ['قضاء صيام', 'رمضان', 'دين صيام', 'كفارة', 'ايام الصيام', 'fasting makeup', 'ramadan'],
};

// Normalize Arabic text for robust fuzzy search
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove Arabic diacritics
    .trim();
}

export default function ToolsExplorer({ tools }: { tools: ToolEntry[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale.startsWith('ar');

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = useMemo(() => {
    return Array.from(new Set(tools.map((t) => t.category))) as ToolCategory[];
  }, [tools]);

  const filteredTools = useMemo(() => {
    const rawQuery = search.trim();
    if (!rawQuery && activeCategory === 'all') return tools;

    const normalizedQuery = normalizeText(rawQuery);

    return tools.filter((tool) => {
      const matchCat = activeCategory === 'all' || tool.category === activeCategory;
      if (!matchCat) return false;
      if (!normalizedQuery) return true;

      const name = normalizeText(t(`${tool.i18nKey}.name`));
      const desc = normalizeText(t(`${tool.i18nKey}.desc`));
      const slug = tool.slug.toLowerCase();
      const keywords = (toolKeywords[tool.slug] || []).map(normalizeText);

      const inName = name.includes(normalizedQuery);
      const inDesc = desc.includes(normalizedQuery);
      const inSlug = slug.includes(normalizedQuery);
      const inKeywords = keywords.some((kw) => kw.includes(normalizedQuery) || normalizedQuery.includes(kw));

      return inName || inDesc || inSlug || inKeywords;
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
    <div className="space-y-6 sm:space-y-8">
      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-xl text-muted-foreground">
            🔍
          </span>
          <input
            type="search"
            inputMode="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('homepage.searchPlaceholder')}
            className="w-full ps-12 pe-11 py-3.5 sm:py-4 rounded-2xl border border-border bg-card shadow-sm text-base focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute inset-y-0 end-0 flex items-center pe-4 text-muted-foreground hover:text-foreground active:scale-90 transition-transform text-base"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Swipeable Category Horizontal Pills (Touch friendly) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 ${
              activeCategory === 'all'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            ✨ {t('common.tools')} ({tools.length})
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
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
        <div className="p-8 sm:p-12 text-center text-muted-foreground space-y-3 rounded-2xl border border-dashed border-border bg-card/50 max-w-lg mx-auto">
          <span className="text-4xl block">🔍</span>
          <p className="font-bold text-foreground text-base sm:text-lg">
            {isAr ? 'لم يتم العثور على أي أداة تطابق بحثك' : 'No tools matched your search'}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {isAr ? 'جرب البحث بكلمات أخرى مثل: وزن، راتب، صلاة، زكاة...' : 'Try searching for: weight, salary, prayer, age...'}
          </p>
          <button
            type="button"
            onClick={() => { setSearch(''); setActiveCategory('all'); }}
            className="inline-block mt-2 px-4 py-2 rounded-xl bg-accent/10 text-accent font-bold text-xs sm:text-sm hover:bg-accent/20 transition-colors"
          >
            {isAr ? 'عرض جميع الأدوات' : 'View All Tools'}
          </button>
        </div>
      ) : (
        <div className="space-y-10 sm:space-y-12">
          {Object.entries(grouped).map(([category, catTools]) => (
            <div key={category} className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2 text-foreground">
                <span className="text-xl sm:text-2xl">{categoryIcons[category] || '🔧'}</span>
                <span>{t(`categories.${category}`)}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {catTools.length}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {catTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-accent/70 hover:shadow-md transition-all flex items-start gap-3.5 sm:gap-4 active:scale-[0.98]"
                  >
                    <span className="text-2xl sm:text-3xl p-2.5 sm:p-3 rounded-xl bg-muted/60 group-hover:bg-accent/10 transition-colors shrink-0">
                      {tool.icon}
                    </span>
                    <div className="space-y-1 min-w-0 flex-1">
                      <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-accent transition-colors truncate">
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
