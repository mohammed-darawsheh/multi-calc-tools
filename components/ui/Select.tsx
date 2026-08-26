'use client';

import { type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  /** When true, sets dir="rtl" on the select element for Arabic/RTL languages. */
  rtl?: boolean;
}

export default function Select({
  className,
  label,
  error,
  options,
  placeholder,
  rtl,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        dir={rtl ? 'rtl' : undefined}
        className={cn(
          // Base
          'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
          // Disabled
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Error
          error
            ? 'border-destructive focus:ring-destructive focus:border-destructive'
            : 'border-border',
          // Dark mode
          'dark:bg-card dark:border-border dark:text-foreground',
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${selectId}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}