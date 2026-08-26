/**
 * Calculate Qibla direction from a given location to the Kaaba in Mecca.
 * Formula: bearing = atan2(sin(Δλ), cos(φ1)*tan(φ2) - sin(φ1)*cos(Δλ))
 * Kaaba: 21.4225°N, 39.8262°E
 */
export function calculateQibla(lat: number, lng: number): number {
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;

  const φ1 = toRadians(lat);
  const φ2 = toRadians(kaabaLat);
  const Δλ = toRadians(kaabaLng - lng);

  const y = Math.sin(Δλ);
  const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);

  let bearing = Math.atan2(y, x);
  bearing = toDegrees(bearing);
  bearing = (bearing + 360) % 360;

  return Math.round(bearing * 100) / 100;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function getDirectionLabel(degrees: number): string {
  if (degrees >= 337.5 || degrees < 22.5) return 'N';
  if (degrees >= 22.5 && degrees < 67.5) return 'NE';
  if (degrees >= 67.5 && degrees < 112.5) return 'E';
  if (degrees >= 112.5 && degrees < 157.5) return 'SE';
  if (degrees >= 157.5 && degrees < 202.5) return 'S';
  if (degrees >= 202.5 && degrees < 247.5) return 'SW';
  if (degrees >= 247.5 && degrees < 292.5) return 'W';
  return 'NW';
}