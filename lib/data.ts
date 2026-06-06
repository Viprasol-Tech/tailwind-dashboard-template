/**
 * Sample dashboard data. In a real app this would come from an API or DB;
 * here it is static so the template renders out of the box.
 */

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: "paid" | "pending" | "refunded";
  date: string;
}

export const revenueSeries: number[] = [
  18200, 19100, 17800, 21050, 22340, 24010, 26890,
];

export const ordersSeries: number[] = [120, 138, 131, 149, 162, 171, 188];

export const customersSeries: number[] = [42, 47, 51, 55, 60, 66, 73];

export const recentOrders: Order[] = [
  { id: "INV-1042", customer: "Acme Corp", amount: 1240.0, status: "paid", date: "2025-06-01" },
  { id: "INV-1041", customer: "Globex", amount: 540.5, status: "pending", date: "2025-06-01" },
  { id: "INV-1040", customer: "Initech", amount: 2300.0, status: "paid", date: "2025-05-31" },
  { id: "INV-1039", customer: "Umbrella", amount: 89.99, status: "refunded", date: "2025-05-30" },
  { id: "INV-1038", customer: "Stark Industries", amount: 4120.0, status: "paid", date: "2025-05-30" },
];
