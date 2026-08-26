'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        <Link href="/" className="text-lg sm:text-xl font-black flex items-center gap-2 text-foreground tracking-tight hover:opacity-90 transition-opacity">
          <span className="p-1.5 rounded-xl bg-accent text-accent-foreground text-sm font-mono">🧮</span>
          <span>{t('common.siteName')}</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
          <Link
            href="/"
            className={`px-2.5 py-1.5 rounded-lg transition-colors ${
              isActive('/') ? 'text-accent bg-accent/10 font-bold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('common.home')}
          </Link>
          <Link
            href="/about"
            className={`hidden sm:inline-block px-2.5 py-1.5 rounded-lg transition-colors ${
              isActive('/about') ? 'text-accent bg-accent/10 font-bold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('common.about')}
          </Link>
          <Link
            href="/privacy"
            className={`hidden md:inline-block px-2.5 py-1.5 rounded-lg transition-colors ${
              isActive('/privacy') ? 'text-accent bg-accent/10 font-bold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('common.privacy')}
          </Link>
          <Link
            href="/contact"
            className={`hidden sm:inline-block px-2.5 py-1.5 rounded-lg transition-colors ${
              isActive('/contact') ? 'text-accent bg-accent/10 font-bold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('common.contact')}
          </Link>

          <LanguageSwitcher />

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border hover:bg-muted transition-colors text-muted-foreground flex items-center justify-center text-sm"
            aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}