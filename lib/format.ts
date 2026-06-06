/**
 * Formatting helpers for dashboard display values.
 * Pure functions — no side effects — so they are trivial to unit test.
 */

export interface CurrencyOptions {
  /** ISO 4217 currency code. Defaults to "USD". */
  currency?: string;
  /** BCP 47 locale. Defaults to "en-US". */
  locale?: string;
  /** Minimum fraction digits. Defaults to 0. */
  minimumFractionDigits?: number;
  /** Maximum fraction digits. Defaults to 0. */
  maximumFractionDigits?: number;
}

/**
 * Format a number as a localized currency string.
 *
 * @example formatCurrency(1234.5) // "$1,235"
 * @example formatCurrency(1234.5, { maximumFractionDigits: 2 }) // "$1,234.50"
 */
export function formatCurrency(value: number, options: CurrencyOptions = {}): string {
  if (!Number.isFinite(value)) {
    return "—";
  }
  const {
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * Format a plain number with grouped thousands.
 *
 * @example formatNumber(1234567) // "1,234,567"
 * @example formatNumber(12345.678, 1) // "12,345.7"
 */
export function formatNumber(value: number, maximumFractionDigits = 0, locale = "en-US"): string {
  if (!Number.isFinite(value)) {
    return "—";
  }
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits,
  }).format(value);
}

/**
 * Format a ratio-or-percent value as a percent string.
 *
 * Pass values already expressed in percent (e.g. 12.5 -> "12.5%").
 * A leading "+" is added for positive values when `signed` is true,
 * which is handy for delta indicators on stat cards.
 *
 * @example formatPercent(12.53) // "12.5%"
 * @example formatPercent(12.53, { signed: true }) // "+12.5%"
 * @example formatPercent(-4, { signed: true }) // "-4.0%"
 */
export function formatPercent(
  value: number,
  options: { fractionDigits?: number; signed?: boolean } = {},
): string {
  if (!Number.isFinite(value)) {
    return "—";
  }
  const { fractionDigits = 1, signed = false } = options;
  const fixed = value.toFixed(fractionDigits);
  const sign = signed && value > 0 ? "+" : "";
  return `${sign}${fixed}%`;
}
