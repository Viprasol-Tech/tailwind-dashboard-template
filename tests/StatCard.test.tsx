import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import StatCard from "@/components/StatCard";

afterEach(cleanup);

describe("<StatCard />", () => {
  it("renders the label and value", () => {
    render(<StatCard label="Revenue" value="$24,010" delta={12.5} />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByTestId("stat-value")).toHaveTextContent("$24,010");
  });

  it("renders a signed positive delta with an upbeat style", () => {
    render(<StatCard label="Orders" value="188" delta={9.3} />);
    const delta = screen.getByTestId("stat-delta");
    expect(delta).toHaveTextContent("+9.3%");
    expect(delta.className).toContain("text-emerald-700");
  });

  it("renders a negative delta with a warning style", () => {
    render(<StatCard label="Churn" value="14" delta={-4} />);
    const delta = screen.getByTestId("stat-delta");
    expect(delta).toHaveTextContent("-4.0%");
    expect(delta.className).toContain("text-rose-700");
  });
});
