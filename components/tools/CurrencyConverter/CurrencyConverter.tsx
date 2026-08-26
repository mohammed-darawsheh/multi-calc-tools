'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { convertCurrency, currencies } from './calculate';
import { getExchangeRate } from '@/lib/api/exchangeRate';

export default function CurrencyConverter() {
  const t = useTranslations('tools.currencyConverter.ui');

  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('SAR');
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    getExchangeRate(from, to)
      .then((r) => {
        if (!cancelled) {
          setRate(r);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Failed to fetch rate');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [from, to]);

  const a = parseFloat(amount);
  const result = (a >= 0 && rate !== null) ? convertCurrency(a, rate, from, to) : null;

  const swapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">{t('amount')}</label>
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3.5 rounded-xl border border-border bg-background text-lg font-semibold"
        />
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] gap-2 sm:gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('from')}</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background font-semibold"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={swapCurrencies}
          className="p-3 rounded-xl border border-border hover:bg-muted text-accent font-bold transition-all active:scale-95"
          title="Swap"
        >
          ⇄
        </button>

        <div>
          <label className="block text-sm font-medium mb-1.5">{t('to')}</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background font-semibold"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="p-4 text-center text-sm text-muted-foreground animate-pulse">
          ⏳ {t('loading')}
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm text-center">
          {error}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-3">
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase">{t('rate')}</p>
            <p className="text-3xl sm:text-4xl font-black text-accent">
              {result.converted.toLocaleString()} <span className="text-lg font-bold">{to}</span>
            </p>
          </div>
          <div className="p-3 rounded-xl border border-border bg-card text-center text-xs text-muted-foreground">
            1 {from} = {rate?.toFixed(4)} {to}
          </div>
        </div>
      )}
    </div>
  );
}
