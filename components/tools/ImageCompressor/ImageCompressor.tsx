'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { compressImage, formatFileSize, type CompressResult } from './calculate';

export default function ImageCompressor() {
  const t = useTranslations('tools.imageCompressor.ui');
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.75);
  const [isDragging, setIsDragging] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runCompression = useCallback(async (f: File, q: number) => {
    setCompressing(true);
    setError(null);
    try {
      const res = await compressImage({ file: f, quality: q });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compression error');
    } finally {
      setCompressing(false);
    }
  }, []);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WebP)');
      return;
    }
    setFile(f);
    runCompression(f, quality);
  }, [quality, runCompression]);

  useEffect(() => {
    if (file) {
      runCompression(file, quality);
    }
  }, [file, quality, runCompression]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleDownload = () => {
    if (!result || !file) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    const dotIndex = file.name.lastIndexOf('.');
    const baseName = dotIndex !== -1 ? file.name.substring(0, dotIndex) : file.name;
    const ext = file.type === 'image/png' ? 'png' : 'jpg';
    a.download = `${baseName}_compressed.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-accent bg-accent/10 scale-[1.01]'
            : 'border-border bg-card hover:border-accent/60'
        }`}
        onClick={() => document.getElementById('image-compress-input')?.click()}
      >
        <input
          id="image-compress-input"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
          className="hidden"
        />
        {result ? (
          <div className="space-y-4">
            <img src={result.dataUrl} alt="Preview" className="max-h-64 mx-auto rounded-xl shadow-md object-contain" />
            <p className="text-xs text-muted-foreground">{file?.name} ({result.width}x{result.height}px)</p>
          </div>
        ) : (
          <div className="py-6 space-y-2">
            <span className="text-5xl block animate-bounce">🖼️</span>
            <p className="font-semibold text-base">{t('dropzoneTitle')}</p>
            <p className="text-xs text-muted-foreground">{t('dropzoneSubtitle')}</p>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
          {error}
        </div>
      )}

      {/* Quality slider */}
      {file && (
        <div className="p-5 rounded-xl border border-border bg-card space-y-3">
          <div className="flex justify-between items-center text-sm font-medium">
            <span>{t('quality')}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-bold">
              {Math.round(quality * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>10% (Smallest size)</span>
            <span>100% (Highest quality)</span>
          </div>
        </div>
      )}

      {/* Comparison & Download */}
      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('originalSize')}</p>
              <p className="text-lg font-bold">{formatFileSize(result.originalSize)}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{t('compressedSize')}</p>
              <p className="text-lg font-bold text-accent">{formatFileSize(result.compressedSize)}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <p className="text-xs font-medium mb-1">{t('savedRatio')}</p>
              <p className="text-lg font-bold">-{result.compressionRatio}%</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              disabled={compressing}
              className="flex-1 bg-accent text-accent-foreground py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-95 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
            >
              <span>📥</span>
              <span>{compressing ? t('compressing') : t('download')}</span>
            </button>
            <button
              onClick={() => document.getElementById('image-compress-input')?.click()}
              className="py-3.5 px-5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition-colors"
            >
              {t('selectNew')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}