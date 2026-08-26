'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { countWords } from './calculate';

export default function WordCounter() {
  const t = useTranslations('tools.wordCounter.ui');
  const [text, setText] = useState('');

  const stats = useMemo(() => countWords(text), [text]);

  const formatDuration = (mins: number, secs: number) => {
    if (mins === 0 && secs === 0) return `0 ${t('min')}`;
    if (mins === 0) return `${secs} ${t('sec')}`;
    if (secs === 0) return `${mins} ${t('min')}`;
    return `${mins} ${t('min')} ${secs} ${t('sec')}`;
  };

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-56 p-4 rounded-2xl border border-border bg-background resize-y text-base leading-relaxed focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
        placeholder={t('placeholder')}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatBox label={t('words')} value={stats.words} highlight />
        <StatBox label={t('chars')} value={stats.chars} />
        <StatBox label={t('charsNoSpaces')} value={stats.charsNoSpaces} />
        <StatBox label={t('sentences')} value={stats.sentences} />
        <StatBox label={t('paragraphs')} value={stats.paragraphs} />
        <StatBox label={t('readingTime')} value={formatDuration(stats.readingMinutes, stats.readingSeconds)} />
        <StatBox label={t('speakingTime')} value={formatDuration(stats.speakingMinutes, stats.speakingSeconds)} className="col-span-2 sm:col-span-1" />
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  highlight,
  className = '',
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`p-4 rounded-xl border text-center transition-all ${
        highlight
          ? 'bg-accent/10 border-accent/30 text-accent'
          : 'bg-card border-border'
      } ${className}`}
    >
      <p className="text-xs text-muted-foreground font-semibold uppercase">{label}</p>
      <p className={`text-xl sm:text-2xl font-black mt-1 ${highlight ? 'text-accent' : 'text-foreground'}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );
}