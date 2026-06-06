import { describe, it, expect } from "vitest";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format";

describe("formatCurrency", () => {
  it("formats USD with no fraction digits by default", () => {
    expect(formatCurrency(1234.5)).toBe("$1,235");
  });

  it("respects maximumFractionDigits", () => {
    expect(formatCurrency(1234.5, { maximumFractionDigits: 2, minimumFractionDigits: 2 })).toBe(
      "$1,234.50",
    );
  });

  it("returns a dash for non-finite values", () => {
    expect(formatCurrency(Infinity)).toBe("—");
    expect(formatCurrency(NaN)).toBe("—");
  });
});

describe("formatNumber", () => {
  it("groups thousands", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
  });

  it("respects fraction digits", () => {
    expect(formatNumber(12345.678, 1)).toBe("12,345.7");
  });

  it("returns a dash for non-finite values", () => {
    expect(formatNumber(NaN)).toBe("—");
  });
});

describe("formatPercent", () => {
  it("formats with one fraction digit by default", () => {
    expect(formatPercent(12.53)).toBe("12.5%");
  });

  it("adds a plus sign for positive values when signed", () => {
    expect(formatPercent(12.53, { signed: true })).toBe("+12.5%");
  });

  it("keeps the minus sign for negatives", () => {
    expect(formatPercent(-4, { signed: true })).toBe("-4.0%");
  });

  it("returns a dash for non-finite values", () => {
    expect(formatPercent(NaN)).toBe("—");
  });
});
