'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateLoan } from './calculate';

export default function LoanCalculator() {
  const t = useTranslations('tools.loanCalculator.ui');

  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('15');

  const a = parseFloat(amount);
  const r = parseFloat(rate);
  const y = parseFloat(years);
  const result = (a > 0 && y > 0) ? calculateLoan(a, r, y) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('amount')}</label>
          <input
            type="number"
            min="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background text-base font-semibold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('rate')}</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background text-base font-semibold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('years')}</label>
          <input
            type="number"
            min="1"
            max="40"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background text-base font-semibold"
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase">{t('monthlyPayment')}</p>
            <p className="text-3xl sm:text-4xl font-black text-accent">
              {result.monthlyPayment.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('totalPayment')}</p>
              <p className="text-xl font-bold">{result.totalPayment.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('totalInterest')}</p>
              <p className="text-xl font-bold text-red-500">{result.totalInterest.toLocaleString()}</p>
            </div>
          </div>

          {/* Amortization Schedule Table */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">{t('schedule')}</p>
            <div className="max-h-72 overflow-auto border border-border rounded-xl">
              <table className="w-full text-xs sm:text-sm">
                <thead className="sticky top-0 bg-muted border-b border-border">
                  <tr>
                    <th className="p-3 text-start">{t('month')}</th>
                    <th className="p-3 text-end">{t('payment')}</th>
                    <th className="p-3 text-end">{t('principal')}</th>
                    <th className="p-3 text-end">{t('interest')}</th>
                    <th className="p-3 text-end">{t('balance')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {result.amortizationSchedule.slice(0, 60).map((row) => (
                    <tr key={row.month} className="hover:bg-muted/30">
                      <td className="p-2.5 text-start font-semibold">#{row.month}</td>
                      <td className="p-2.5 text-end">{row.payment.toLocaleString()}</td>
                      <td className="p-2.5 text-end text-emerald-600 dark:text-emerald-400">{row.principal.toLocaleString()}</td>
                      <td className="p-2.5 text-end text-red-500">{row.interest.toLocaleString()}</td>
                      <td className="p-2.5 text-end font-mono">{row.balance.toLocaleString()}</td>
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
