'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateInterest } from './calculate';

export default function BankInterest() {
  const t = useTranslations('tools.bankInterest.ui');

  const [principal, setPrincipal] = useState('50000');
  const [rate, setRate] = useState('6');
  const [years, setYears] = useState('5');
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');

  const p = parseFloat(principal);
  const r = parseFloat(rate);
  const y = parseInt(years);
  const result = (p > 0 && r > 0 && y > 0) ? calculateInterest(p, r, y, frequency) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('principal')}</label>
          <input
            type="number"
            inputMode="decimal"
            min="10"
            step="any"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('rate')} (%)</label>
          <input
            type="number"
            inputMode="decimal"
            min="0.1"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('years')}</label>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            max="50"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-base font-bold focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-1.5">{t('frequency')}</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as any)}
            className="w-full p-3.5 rounded-xl border border-border bg-background text-sm font-medium focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
          >
            <option value="monthly">{t('monthly')}</option>
            <option value="quarterly">{t('quarterly')}</option>
            <option value="yearly">{t('yearly')}</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
            <p className="text-xs text-muted-foreground font-semibold uppercase">{t('totalAmount')}</p>
            <p className="text-3xl sm:text-4xl font-black text-accent">
              {result.totalAmount.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground pt-1">
              {t('effectiveRate')}: <span className="font-bold">{result.effectiveRate}%</span>
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card text-center">
            <p className="text-xs text-muted-foreground mb-1">{t('totalInterest')}</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              +{result.totalInterest.toLocaleString()}
            </p>
          </div>

          {/* Breakdown table */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">{t('breakdown')}</p>
            <div className="max-h-60 overflow-auto border border-border rounded-xl">
              <table className="w-full text-xs sm:text-sm">
                <thead className="sticky top-0 bg-muted border-b border-border">
                  <tr>
                    <th className="p-2.5 text-start">{t('year')}</th>
                    <th className="p-2.5 text-end">{t('interestEarned')}</th>
                    <th className="p-2.5 text-end">{t('endBalance')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-muted/30">
                      <td className="p-2 text-start font-semibold">{t('year')} {row.year}</td>
                      <td className="p-2 text-end text-emerald-600 dark:text-emerald-400">+{row.interest.toLocaleString()}</td>
                      <td className="p-2 text-end font-bold">{row.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
