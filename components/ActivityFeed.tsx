import type { ActivityEvent } from "@/lib/data";
import { formatRelativeTime } from "@/lib/format";

export interface ActivityFeedProps {
  events: readonly ActivityEvent[];
  /** Reference time for relative timestamps; injectable for tests. */
  now?: number;
}

const TYPE_ACCENT: Record<ActivityEvent["type"], string> = {
  order: "bg-brand-500",
  customer: "bg-emerald-500",
  refund: "bg-rose-500",
  system: "bg-slate-400",
};

const TYPE_LABEL: Record<ActivityEvent["type"], string> = {
  order: "Order",
  customer: "Customer",
  refund: "Refund",
  system: "System",
};

/**
 * A vertical, time-ordered feed of recent events. Each row shows a colored
 * dot keyed to the event type, the message, and a relative timestamp.
 */
export function ActivityFeed({ events, now }: ActivityFeedProps) {
  if (events.length === 0) {
    return (
      <p
        data-testid="activity-empty"
        className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
      >
        No recent activity.
      </p>
    );
  }

  return (
    <ol
      aria-label="Recent activity"
      data-testid="activity-feed"
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      {events.map((event) => (
        <li key={event.id} className="flex gap-3">
          <span
            aria-hidden
            className={
              "mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full " +
              TYPE_ACCENT[event.type]
            }
          />
          <div className="min-w-0">
            <p className="text-sm text-slate-700 dark:text-slate-200">
              <span className="sr-only">{TYPE_LABEL[event.type]}: </span>
              {event.message}
            </p>
            <time
              dateTime={event.timestamp}
              className="text-xs text-slate-400 dark:text-slate-500"
            >
              {formatRelativeTime(event.timestamp, now)}
            </time>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default ActivityFeed;
