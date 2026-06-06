import DashboardShell from "@/components/DashboardShell";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import ActivityFeed from "@/components/ActivityFeed";
import FilterableOrders from "@/components/FilterableOrders";
import { computeStats } from "@/lib/metrics";
import { formatCurrency, formatNumber } from "@/lib/format";
import {
  revenueSeries,
  ordersSeries,
  customersSeries,
  recentOrders,
  recentActivity,
} from "@/lib/data";

export default function DashboardPage() {
  const revenue = computeStats(revenueSeries);
  const orders = computeStats(ordersSeries);
  const customers = computeStats(customersSeries);

  return (
    <DashboardShell title="Dashboard">
      <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        Overview of revenue, orders, and customers for the last 7 periods.
      </p>

      <section
        aria-label="Key metrics"
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <StatCard
          label="Revenue"
          value={formatCurrency(revenue.total)}
          delta={revenue.percentChange}
          series={revenueSeries}
        />
        <StatCard
          label="Orders"
          value={formatNumber(orders.total)}
          delta={orders.percentChange}
          series={ordersSeries}
        />
        <StatCard
          label="New Customers"
          value={formatNumber(customers.total)}
          delta={customers.percentChange}
          series={customersSeries}
        />
      </section>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section
          aria-label="Revenue by period"
          className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Revenue by period
          </h2>
          <BarChart data={revenueSeries} label="Revenue by period" />
        </section>

        <section aria-label="Activity">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Activity
          </h2>
          <ActivityFeed events={recentActivity} />
        </section>
      </div>

      <section aria-label="Recent orders">
        <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
          Recent orders
        </h2>
        <FilterableOrders orders={recentOrders} />
      </section>
    </DashboardShell>
  );
}
