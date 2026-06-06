import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ActivityFeed from "@/components/ActivityFeed";
import type { ActivityEvent } from "@/lib/data";

afterEach(cleanup);

const now = Date.parse("2025-06-01T12:00:00Z");

const events: ActivityEvent[] = [
  { id: "a", type: "order", message: "Order placed", timestamp: "2025-06-01T11:30:00Z" },
  { id: "b", type: "refund", message: "Refund issued", timestamp: "2025-05-31T12:00:00Z" },
];

describe("<ActivityFeed />", () => {
  it("renders one list item per event", () => {
    render(<ActivityFeed events={events} now={now} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders messages and relative timestamps", () => {
    render(<ActivityFeed events={events} now={now} />);
    expect(screen.getByText("Order placed")).toBeInTheDocument();
    expect(screen.getByText("30m ago")).toBeInTheDocument();
    expect(screen.getByText("1d ago")).toBeInTheDocument();
  });

  it("shows an empty state when there are no events", () => {
    render(<ActivityFeed events={[]} />);
    expect(screen.getByTestId("activity-empty")).toBeInTheDocument();
  });
});
