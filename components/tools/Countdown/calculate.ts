export interface CountdownResult {
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  isPast: boolean;
  parts: { days: number; hours: number; minutes: number; seconds: number };
}

export function calculateCountdown(target: Date, now: Date = new Date()): CountdownResult {
  const diffMs = target.getTime() - now.getTime();
  const isPast = diffMs < 0;
  const abs = Math.abs(diffMs);

  const totalSeconds = Math.floor(abs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  return {
    totalDays, totalHours, totalMinutes, totalSeconds,
    isPast,
    parts: {
      days: totalDays,
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60,
    },
  };
}
