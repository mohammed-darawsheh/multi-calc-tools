import { cn } from '@/lib/utils';
import Card from './Card';

export interface ResultItem {
  label: string;
  value: string | number;
}

export interface ResultDisplayProps {
  title?: string;
  items: ResultItem[];
  className?: string;
}

export default function ResultDisplay({
  title,
  items,
  className,
}: ResultDisplayProps) {
  if (!items || items.length === 0) return null;

  return (
    <Card padding="md" className={cn('space-y-3', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      <div className="divide-y divide-border">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0"
          >
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm font-medium text-foreground text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}