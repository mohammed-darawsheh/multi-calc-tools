'use client';

import { adConfig, adSlots } from '@/config/ads';

interface AdSlotProps {
  slot: keyof typeof adSlots | string;
  className?: string;
  placeholder?: boolean;
}

export default function AdSlot({ slot, className = '', placeholder = false }: AdSlotProps) {
  const slotId = typeof slot === 'string' && slot in adSlots ? adSlots[slot] : '0000000000';
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || adConfig.adsensePublisherId;
  const isProd = process.env.NODE_ENV === 'production' && pubId && pubId !== 'ca-pub-0000000000000000';

  if (!isProd || placeholder) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/30 text-muted-foreground text-xs font-semibold py-6 ${className}`}
        aria-label="Advertisement space"
      >
        <span>📢 مساحة إعلانية (Ad Space)</span>
      </div>
    );
  }

  if (adConfig.network === 'adsense') {
    return (
      <div className={`overflow-hidden text-center my-4 ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={pubId}
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

  return (
    <div
      className={className}
      id={`ad-${slot}`}
      data-slot={slotId}
      aria-label="Advertisement"
    />
  );
}
