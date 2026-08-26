export type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function celsiusToKelvin(c: number): number {
  return c + 273.15;
}

export function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function fahrenheitToKelvin(f: number): number {
  return ((f - 32) * 5) / 9 + 273.15;
}

export function kelvinToCelsius(k: number): number {
  return k - 273.15;
}

export function kelvinToFahrenheit(k: number): number {
  return ((k - 273.15) * 9) / 5 + 32;
}

export interface TemperatureValues {
  celsius: number;
  fahrenheit: number;
  kelvin: number;
}

export function convertFromCelsius(celsius: number): TemperatureValues {
  return {
    celsius,
    fahrenheit: Math.round((celsiusToFahrenheit(celsius) + Number.EPSILON) * 100) / 100,
    kelvin: Math.round((celsiusToKelvin(celsius) + Number.EPSILON) * 100) / 100,
  };
}

export function convertFromFahrenheit(fahrenheit: number): TemperatureValues {
  return {
    celsius: Math.round((fahrenheitToCelsius(fahrenheit) + Number.EPSILON) * 100) / 100,
    fahrenheit,
    kelvin: Math.round((fahrenheitToKelvin(fahrenheit) + Number.EPSILON) * 100) / 100,
  };
}

export function convertFromKelvin(kelvin: number): TemperatureValues {
  return {
    celsius: Math.round((kelvinToCelsius(kelvin) + Number.EPSILON) * 100) / 100,
    fahrenheit: Math.round((kelvinToFahrenheit(kelvin) + Number.EPSILON) * 100) / 100,
    kelvin,
  };
}