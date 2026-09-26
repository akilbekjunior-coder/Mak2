import { Currency } from '../types';

export function formatPrice(amountUZS: number, amountUSD: number, currency: Currency): string {
  if (currency === 'USD') {
    return `$${amountUSD.toLocaleString('en-US')}`;
  }
  // Format with space separators e.g. "176 109 429"
  return `${amountUZS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'm`;
}

export function formatPricePerM2(amountUZS: number, area: number, currency: Currency): string {
  if (!area || area <= 0) return '';
  if (currency === 'USD') {
    const usdPerM2 = Math.round((amountUZS / 12700) / area);
    return `$${usdPerM2.toLocaleString('en-US')}/m²`;
  }
  const perM2 = Math.round(amountUZS / area);
  return `${perM2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'm/m²`;
}
