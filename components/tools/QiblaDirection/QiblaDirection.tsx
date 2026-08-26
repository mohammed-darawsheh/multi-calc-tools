'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateQibla, getDirectionLabel } from './calculate';

export default function QiblaDirection() {
  const t = useTranslations('tools.qiblaDirection.ui');

  const [lat, setLat] = useState('24.7136'); // Riyadh default
  const [lng, setLng] = useState('46.6753');
  const [direction, setDirection] = useState<number | null>(calculateQibla(24.7136, 46.6753));
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');

  const handleCalculate = () => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    if (isNaN(latNum) || isNaN(lngNum)) return;
    setDirection(calculateQibla(latNum, lngNum));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError(t('geoError'));
      return;
    }
    setGeoLoading(true);
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setLat(latitude.toFixed(4));
        setLng(longitude.toFixed(4));
        setDirection(calculateQibla(latitude, longitude));
        setGeoLoading(false);
      },
      () => {
        setGeoError(t('geoError'));
        setGeoLoading(false);
      }
    );
  };

  const dirLabel = direction !== null ? getDirectionLabel(direction) : '';

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={getCurrentLocation}
        disabled={geoLoading}
        className="w-full bg-accent text-accent-foreground py-3.5 px-6 rounded-xl font-bold hover:opacity-95 shadow-md transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <span>{geoLoading ? '⏳' : '📍'}</span>
        <span>{geoLoading ? t('detecting') : t('useLocation')}</span>
      </button>

      {geoError && (
        <div className="p-3.5 rounded-xl bg-destructive/10 text-destructive text-xs text-center">
          {geoError}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('lat')}</label>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">{t('lng')}</label>
          <input
            type="number"
            step="any"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        disabled={!lat || !lng}
        className="w-full py-3 rounded-xl border border-border hover:bg-muted font-semibold text-sm transition-colors"
      >
        {t('calculate')}
      </button>

      {direction !== null && (
        <div className="space-y-5 text-center">
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase">{t('direction')}</p>
            <p className="text-4xl sm:text-5xl font-black text-accent">{direction}°</p>
            <p className="text-sm font-bold text-foreground mt-1">
              {t(dirLabel.toLowerCase() as any)} ({dirLabel})
            </p>
          </div>

          {/* Compass SVG Visualization */}
          <div className="relative w-52 h-52 mx-auto p-2 bg-card rounded-full border border-border shadow-inner flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
              <text x="100" y="24" textAnchor="middle" className="text-[11px] fill-current font-bold">N</text>
              <text x="100" y="190" textAnchor="middle" className="text-[11px] fill-current font-bold text-muted-foreground">S</text>
              <text x="15" y="104" textAnchor="middle" className="text-[11px] fill-current font-bold text-muted-foreground">W</text>
              <text x="185" y="104" textAnchor="middle" className="text-[11px] fill-current font-bold text-muted-foreground">E</text>

              {/* Ticks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = ((deg - 90) * Math.PI) / 180;
                const x1 = 100 + 78 * Math.cos(rad);
                const y1 = 100 + 78 * Math.sin(rad);
                const x2 = 100 + 85 * Math.cos(rad);
                const y2 = 100 + 85 * Math.sin(rad);
                return (
                  <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" className="text-border" />
                );
              })}

              {/* Kaaba Direction Arrow Needle */}
              <g transform={`rotate(${direction}, 100, 100)`}>
                <line x1="100" y1="35" x2="100" y2="165" stroke="currentColor" strokeWidth="2" className="text-muted-foreground opacity-40" />
                <polygon points="100,25 92,48 108,48" fill="#3b82f6" />
                <polygon points="100,175 94,155 106,155" fill="#94a3b8" />
                <circle cx="100" cy="100" r="6" fill="#3b82f6" />
                <circle cx="100" cy="100" r="2" fill="#ffffff" />
              </g>
            </svg>
          </div>

          <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
            {t('instruction')}
          </p>
        </div>
      )}
    </div>
  );
}