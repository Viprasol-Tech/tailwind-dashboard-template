import type { Order } from "@/lib/data";
import { formatCurrency } from "@/lib/format";

export interface DataTableProps {
  orders: Order[];
}

const STATUS_STYLES: Record<Order["status"], string> = {
  paid: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  refunded: "bg-slate-100 text-slate-600",
};

/**
 * A simple striped table of recent orders.
 */
export function DataTable({ orders }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="px-5 py-3 font-semibold">Invoice</th>
            <th scope="col" className="px-5 py-3 font-semibold">Customer</th>
            <th scope="col" className="px-5 py-3 font-semibold">Status</th>
            <th scope="col" className="px-5 py-3 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50">
              <td className="px-5 py-3 font-medium text-slate-900">{order.id}</td>
              <td className="px-5 py-3 text-slate-600">{order.customer}</td>
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
              <td className="px-5 py-3 text-right tabular-nums text-slate-900">
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
