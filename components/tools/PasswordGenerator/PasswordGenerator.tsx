'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { generatePassword, type PasswordOptions, type PasswordResult } from './calculate';

export default function PasswordGenerator() {
  const t = useTranslations('tools.passwordGenerator.ui');

  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeAmbiguous: false,
  });

  const [result, setResult] = useState<PasswordResult | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setResult(generatePassword(options));
    setCopied(false);
  }, [options]);

  useEffect(() => {
    generate();
  }, [generate]);

  const copyToClipboard = async () => {
    if (!result?.password) return;
    await navigator.clipboard.writeText(result.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthColors: Record<string, string> = {
    Weak: 'bg-red-500',
    Medium: 'bg-amber-500',
    Strong: 'bg-emerald-500',
    'Very Strong': 'bg-emerald-600',
  };

  const strengthKeyMap: Record<string, string> = {
    Weak: 'weak',
    Medium: 'medium',
    Strong: 'strong',
    'Very Strong': 'veryStrong',
  };

  const strengthPercent: Record<string, number> = {
    Weak: 25,
    Medium: 50,
    Strong: 75,
    'Very Strong': 100,
  };

  return (
    <div className="space-y-6">
      {/* Generated Password Box */}
      {result && (
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/60 border border-border/60">
            <code className="text-lg sm:text-xl font-mono font-bold tracking-wider break-all text-accent">
              {result.password}
            </code>
            <button
              type="button"
              onClick={copyToClipboard}
              className={`shrink-0 px-4 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-accent text-accent-foreground hover:opacity-90'
              }`}
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? t('copied') : t('copy')}</span>
            </button>
          </div>

          {/* Strength bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs font-semibold">
              <span>{t('strength')}: <span className="text-accent">{t(strengthKeyMap[result.strength] as any)}</span></span>
              <span className="text-muted-foreground">{result.entropy} bits</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${strengthColors[result.strength]}`}
                style={{ width: `${strengthPercent[result.strength]}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Length Slider */}
      <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
        <div className="flex justify-between items-center text-sm font-medium">
          <span>{t('length')}</span>
          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-bold">
            {options.length}
          </span>
        </div>
        <input
          type="range"
          min={6}
          max={64}
          value={options.length}
          onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
          className="w-full accent-accent cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>6</span>
          <span>64</span>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
        {[
          { key: 'includeUppercase', label: t('uppercase') },
          { key: 'includeLowercase', label: t('lowercase') },
          { key: 'includeNumbers', label: t('numbers') },
          { key: 'includeSymbols', label: t('symbols') },
          { key: 'excludeAmbiguous', label: t('excludeAmbiguous') },
        ].map((item) => (
          <label key={item.key} className="flex items-center gap-3 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={(options as any)[item.key]}
              onChange={(e) => setOptions({ ...options, [item.key]: e.target.checked })}
              className="w-4 h-4 rounded accent-accent"
            />
            <span className="text-sm font-medium">{item.label}</span>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={generate}
        className="w-full bg-accent text-accent-foreground py-3.5 px-6 rounded-xl font-bold hover:opacity-95 shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <span>🔄</span>
        <span>{t('generate')}</span>
      </button>
    </div>
  );
}