import type { Order } from "@/lib/data";
import { formatCurrency } from "@/lib/format";

export interface DataTableProps {
  orders: Order[];
}

const STATUS_STYLES: Record<Order["status"], string> = {
  paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  refunded: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

/**
 * A simple striped table of recent orders. Dark-mode aware. For interactive
 * search/sort/filter use {@link FilterableOrders}.
 */
export function DataTable({ orders }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <tr>
            <th scope="col" className="px-5 py-3 font-semibold">Invoice</th>
            <th scope="col" className="px-5 py-3 font-semibold">Customer</th>
            <th scope="col" className="px-5 py-3 font-semibold">Status</th>
            <th scope="col" className="px-5 py-3 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
              <td className="px-5 py-3 font-medium text-slate-900 dark:text-slate-100">{order.id}</td>
              <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{order.customer}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
