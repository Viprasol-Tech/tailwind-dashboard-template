import { describe, it, expect } from "vitest";
import { formatCompact, formatRelativeTime } from "@/lib/format";

describe("formatCompact", () => {
  it("uses a K suffix for thousands", () => {
    expect(formatCompact(1500)).toBe("1.5K");
  });

  it("uses an M suffix for millions", () => {
    expect(formatCompact(2_300_000)).toBe("2.3M");
  });

  it("leaves small numbers as-is", () => {
    expect(formatCompact(42)).toBe("42");
  });

  it("returns a dash for non-finite values", () => {
    expect(formatCompact(NaN)).toBe("—");
  });
});

describe("formatRelativeTime", () => {
  const now = Date.parse("2025-06-01T12:00:00Z");

  it("reports 'just now' for very recent times", () => {
    expect(formatRelativeTime("2025-06-01T11:59:30Z", now)).toBe("just now");
  });

  it("reports minutes", () => {
    expect(formatRelativeTime("2025-06-01T11:30:00Z", now)).toBe("30m ago");
  });

  it("reports hours", () => {
    expect(formatRelativeTime("2025-06-01T09:00:00Z", now)).toBe("3h ago");
  });

  it("reports days", () => {
    expect(formatRelativeTime("2025-05-30T12:00:00Z", now)).toBe("2d ago");
  });

  it("falls back to a date for anything older than a week", () => {
    expect(formatRelativeTime("2025-05-01T12:00:00Z", now)).toBe("May 1");
  });

  it("clamps future timestamps to 'just now'", () => {
    expect(formatRelativeTime("2025-06-01T12:30:00Z", now)).toBe("just now");
  });

  it("returns a dash for unparseable input", () => {
    expect(formatRelativeTime("not-a-date", now)).toBe("—");
  });
});
