import { describe, it, expect } from "vitest";
import type { Order } from "@/lib/data";
import {
  searchOrders,
  filterByStatus,
  sortOrders,
  queryOrders,
  countByStatus,
  sumAmount,
} from "@/lib/filter";

const orders: Order[] = [
  { id: "INV-100", customer: "Acme", amount: 300, status: "paid", date: "2025-01-03" },
  { id: "INV-101", customer: "Globex", amount: 100, status: "pending", date: "2025-01-01" },
  { id: "INV-102", customer: "Initech", amount: 200, status: "refunded", date: "2025-01-02" },
  { id: "INV-103", customer: "Acme Labs", amount: 150, status: "paid", date: "2025-01-04" },
];

describe("searchOrders", () => {
  it("matches by customer substring (case-insensitive)", () => {
    const result = searchOrders(orders, "acme");
    expect(result.map((o) => o.id)).toEqual(["INV-100", "INV-103"]);
  });

  it("matches by invoice id", () => {
    expect(searchOrders(orders, "102").map((o) => o.id)).toEqual(["INV-102"]);
  });

  it("returns all for an empty term", () => {
    expect(searchOrders(orders, "  ")).toHaveLength(orders.length);
  });

  it("does not mutate the input", () => {
    const out = searchOrders(orders, "");
    expect(out).not.toBe(orders);
  });
});

describe("filterByStatus", () => {
  it("keeps only the matching status", () => {
    expect(filterByStatus(orders, "paid").map((o) => o.id)).toEqual([
      "INV-100",
      "INV-103",
    ]);
  });

  it("is a no-op for 'all'", () => {
    expect(filterByStatus(orders, "all")).toHaveLength(orders.length);
  });
});

describe("sortOrders", () => {
  it("sorts by amount ascending", () => {
    expect(sortOrders(orders, "amount", "asc").map((o) => o.amount)).toEqual([
      100, 150, 200, 300,
    ]);
  });

  it("sorts by amount descending", () => {
    expect(sortOrders(orders, "amount", "desc").map((o) => o.amount)).toEqual([
      300, 200, 150, 100,
    ]);
  });

  it("sorts by customer name", () => {
    expect(sortOrders(orders, "customer", "asc").map((o) => o.customer)).toEqual([
      "Acme",
      "Acme Labs",
      "Globex",
      "Initech",
    ]);
  });

  it("does not mutate the input array", () => {
    const before = orders.map((o) => o.id);
    sortOrders(orders, "amount", "desc");
    expect(orders.map((o) => o.id)).toEqual(before);
  });
});

describe("queryOrders", () => {
  it("applies search, filter, and sort together", () => {
    const result = queryOrders(orders, {
      search: "acme",
      status: "paid",
      sortKey: "amount",
      sortDirection: "desc",
    });
    expect(result.map((o) => o.id)).toEqual(["INV-100", "INV-103"]);
  });

  it("returns everything for an empty query", () => {
    expect(queryOrders(orders)).toHaveLength(orders.length);
  });

  it("yields an empty array when nothing matches", () => {
    expect(queryOrders(orders, { search: "zzz" })).toEqual([]);
  });
});

describe("countByStatus", () => {
  it("counts each status and includes zeros", () => {
    expect(countByStatus(orders)).toEqual({ paid: 2, pending: 1, refunded: 1 });
  });

  it("returns all-zero counts for an empty list", () => {
    expect(countByStatus([])).toEqual({ paid: 0, pending: 0, refunded: 0 });
  });
});

describe("sumAmount", () => {
  it("totals the amounts", () => {
    expect(sumAmount(orders)).toBe(750);
  });

  it("ignores non-finite amounts", () => {
    const bad: Order[] = [
      { id: "x", customer: "x", amount: NaN, status: "paid", date: "2025-01-01" },
      { id: "y", customer: "y", amount: 50, status: "paid", date: "2025-01-01" },
    ];
    expect(sumAmount(bad)).toBe(50);
  });
});
