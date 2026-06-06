/**
 * Filtering, searching, and sorting for the orders table. Pure functions so
 * the table component stays a thin rendering layer and the logic is testable.
 */

import type { Order } from "@/lib/data";

/** Status filter value — a concrete status or "all". */
export type StatusFilter = Order["status"] | "all";

/** Columns the table can be sorted by. */
export type SortKey = "amount" | "customer" | "date" | "id";

/** Sort direction. */
export type SortDirection = "asc" | "desc";

export interface OrderQuery {
  /** Case-insensitive substring matched against id and customer. */
  search?: string;
  /** Restrict to a single status, or "all" to keep everything. */
  status?: StatusFilter;
  /** Column to sort by. Omit to preserve input order. */
  sortKey?: SortKey;
  /** Sort direction. Defaults to "asc". */
  sortDirection?: SortDirection;
}

/**
 * Filter orders by a free-text query over id and customer name.
 *
 * An empty or whitespace-only term returns the input unchanged.
 */
export function searchOrders(orders: readonly Order[], term: string): Order[] {
  const needle = term.trim().toLowerCase();
  if (needle === "") return [...orders];
  return orders.filter(
    (o) =>
      o.id.toLowerCase().includes(needle) ||
      o.customer.toLowerCase().includes(needle),
  );
}

/**
 * Keep only orders matching `status`. The sentinel "all" is a no-op.
 */
export function filterByStatus(
  orders: readonly Order[],
  status: StatusFilter,
): Order[] {
  if (status === "all") return [...orders];
  return orders.filter((o) => o.status === status);
}

/**
 * Return a new array of orders sorted by the given column.
 *
 * Numeric columns sort numerically; string columns use locale-aware
 * comparison. The input array is never mutated.
 */
export function sortOrders(
  orders: readonly Order[],
  key: SortKey,
  direction: SortDirection = "asc",
): Order[] {
  const factor = direction === "asc" ? 1 : -1;
  return [...orders].sort((a, b) => {
    if (key === "amount") {
      return (a.amount - b.amount) * factor;
    }
    return a[key].localeCompare(b[key]) * factor;
  });
}

/**
 * Apply search, status filter, and sort in one pass.
 *
 * This mirrors what the table component runs on every keystroke; keeping it
 * here means the whole pipeline is covered by unit tests.
 */
export function queryOrders(
  orders: readonly Order[],
  query: OrderQuery = {},
): Order[] {
  let result = searchOrders(orders, query.search ?? "");
  result = filterByStatus(result, query.status ?? "all");
  if (query.sortKey) {
    result = sortOrders(result, query.sortKey, query.sortDirection ?? "asc");
  }
  return result;
}

/**
 * Count orders grouped by status. Every known status is present in the
 * result (with a count of 0 when absent), which keeps filter chips stable.
 */
export function countByStatus(
  orders: readonly Order[],
): Record<Order["status"], number> {
  const counts: Record<Order["status"], number> = {
    paid: 0,
    pending: 0,
    refunded: 0,
  };
  for (const order of orders) {
    counts[order.status] += 1;
  }
  return counts;
}

/**
 * Sum the `amount` of every order in the list.
 *
 * @example sumAmount([{ amount: 10 }, { amount: 5 }] as Order[]) // 15
 */
export function sumAmount(orders: readonly Order[]): number {
  return orders.reduce((total, o) => total + (Number.isFinite(o.amount) ? o.amount : 0), 0);
}
