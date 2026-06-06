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
  { id: "INV-1037", customer: "Wayne Enterprises", amount: 1875.25, status: "paid", date: "2025-05-29" },
  { id: "INV-1036", customer: "Cyberdyne", amount: 312.4, status: "pending", date: "2025-05-29" },
  { id: "INV-1035", customer: "Soylent Corp", amount: 760.0, status: "refunded", date: "2025-05-28" },
  { id: "INV-1034", customer: "Hooli", amount: 5230.0, status: "paid", date: "2025-05-28" },
  { id: "INV-1033", customer: "Pied Piper", amount: 145.0, status: "pending", date: "2025-05-27" },
];

/** A single entry in the activity feed widget. */
export interface ActivityEvent {
  id: string;
  /** Coarse category used to pick an icon/accent color. */
  type: "order" | "customer" | "refund" | "system";
  /** Human-readable description of what happened. */
  message: string;
  /** ISO 8601 timestamp of the event. */
  timestamp: string;
}

export const recentActivity: ActivityEvent[] = [
  { id: "act-9", type: "order", message: "Stark Industries placed order INV-1038", timestamp: "2025-06-01T14:22:00Z" },
  { id: "act-8", type: "customer", message: "Pied Piper signed up for a Pro plan", timestamp: "2025-06-01T11:05:00Z" },
  { id: "act-7", type: "refund", message: "Refund issued to Umbrella for INV-1039", timestamp: "2025-05-31T18:40:00Z" },
  { id: "act-6", type: "order", message: "Hooli placed order INV-1034", timestamp: "2025-05-31T09:12:00Z" },
  { id: "act-5", type: "system", message: "Nightly backup completed successfully", timestamp: "2025-05-31T02:00:00Z" },
  { id: "act-4", type: "customer", message: "Cyberdyne updated billing details", timestamp: "2025-05-30T16:33:00Z" },
];
