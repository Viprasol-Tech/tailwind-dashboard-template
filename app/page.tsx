import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/DataTable";
import { computeStats } from "@/lib/metrics";
import { formatCurrency, formatNumber } from "@/lib/format";
import {
  revenueSeries,
  ordersSeries,
  customersSeries,
  recentOrders,
} from "@/lib/data";

export default function DashboardPage() {
  const revenue = computeStats(revenueSeries);
  const orders = computeStats(ordersSeries);
  const customers = computeStats(customersSeries);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of revenue, orders, and customers for the last 7 periods.
          </p>
        </header>

        <section
          aria-label="Key metrics"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <StatCard
            label="Revenue"
            value={formatCurrency(revenue.total)}
            delta={revenue.percentChange}
          />
          <StatCard
            label="Orders"
            value={formatNumber(orders.total)}
            delta={orders.percentChange}
          />
          <StatCard
            label="New Customers"
            value={formatNumber(customers.total)}
            delta={customers.percentChange}
          />
        </section>

        <section aria-label="Recent orders">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Recent orders</h2>
          <DataTable orders={recentOrders} />
        </section>
      </main>
    </div>
  );
}
