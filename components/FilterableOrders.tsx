"use client";

import { useMemo, useState } from "react";
import type { Order } from "@/lib/data";
import {
  queryOrders,
  countByStatus,
  sumAmount,
  type SortDirection,
  type SortKey,
  type StatusFilter,
} from "@/lib/filter";
import { formatCurrency } from "@/lib/format";

export interface FilterableOrdersProps {
  orders: readonly Order[];
}

const STATUS_STYLES: Record<Order["status"], string> = {
  paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  refunded: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "refunded", label: "Refunded" },
];

/**
 * A self-contained orders table with live search, status filter chips, and
 * click-to-sort columns. All data logic lives in `lib/filter` so this stays a
 * thin, interactive shell.
 */
export function FilterableOrders({ orders }: FilterableOrdersProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const counts = useMemo(() => countByStatus(orders), [orders]);

  const visible = useMemo(
    () => queryOrders(orders, { search, status, sortKey, sortDirection }),
    [orders, search, status, sortKey, sortDirection],
  );

  const total = useMemo(() => sumAmount(visible), [visible]);

  function toggleSort(key: SortKey): void {
    if (key === sortKey) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  function sortIndicator(key: SortKey): string {
    if (key !== sortKey) return "";
    return sortDirection === "asc" ? " ▲" : " ▼";
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search orders</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice or customer…"
            data-testid="order-search"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => {
            const active = status === f.value;
            const count =
              f.value === "all"
                ? orders.length
                : counts[f.value];
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setStatus(f.value)}
                aria-pressed={active}
                data-testid={`filter-${f.value}`}
                className={
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors " +
                  (active
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700")
                }
              >
                {f.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                <button type="button" onClick={() => toggleSort("id")} className="uppercase">
                  Invoice{sortIndicator("id")}
                </button>
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                <button type="button" onClick={() => toggleSort("customer")} className="uppercase">
                  Customer{sortIndicator("customer")}
                </button>
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                <button type="button" onClick={() => toggleSort("amount")} className="uppercase">
                  Amount{sortIndicator("amount")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {visible.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  data-testid="orders-empty"
                  className="px-5 py-8 text-center text-slate-400"
                >
                  No orders match your filters.
                </td>
              </tr>
            ) : (
              visible.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-slate-100">
                    {order.id}
                  </td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                    {order.customer}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        "rounded-full px-2 py-0.5 text-xs font-semibold capitalize " +
                        STATUS_STYLES[order.status]
                      }
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-slate-900 dark:text-slate-100">
                    {formatCurrency(order.amount, { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="border-t border-slate-200 bg-slate-50 text-sm dark:border-slate-700 dark:bg-slate-800">
            <tr>
              <td colSpan={3} className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                {visible.length} order{visible.length === 1 ? "" : "s"}
              </td>
              <td
                data-testid="orders-total"
                className="px-5 py-3 text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100"
              >
                {formatCurrency(total, { maximumFractionDigits: 2 })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default FilterableOrders;
