'use client';

import { adConfig, adSlots } from '@/config/ads';

interface AdSlotProps {
  slot: keyof typeof adSlots | string;
  className?: string;
  /** Show a placeholder box during development instead of real ad scripts */
  placeholder?: boolean;
}

export default function AdSlot({ slot, className = '', placeholder = false }: AdSlotProps) {
  const slotId = typeof slot === 'string' && slot in adSlots ? adSlots[slot] : '0000000000';

  if (placeholder || process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 text-muted-foreground text-sm py-8 ${className}`}
        aria-label="Advertisement"
      >
        Advertisement
      </div>
    );
  }

  if (adConfig.network === 'adsense') {
    return (
      <div className={className}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adConfig.adsensePublisherId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
          }}
        />
      </div>
    );
  }

  // Adsterra fallback — replace with your Adsterra embed script
  return (
    <div
      className={className}
      id={`adsterra-${slot}`}
      data-adsterra-slot={slotId}
      aria-label="Advertisement"
    />
  );
}
