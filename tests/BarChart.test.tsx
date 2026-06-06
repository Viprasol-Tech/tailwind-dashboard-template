import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import BarChart from "@/components/BarChart";

afterEach(cleanup);

describe("<BarChart />", () => {
  it("renders one bar per value", () => {
    render(<BarChart data={[10, 20, 30]} />);
    expect(screen.getAllByTestId("bar")).toHaveLength(3);
  });

  it("gives the tallest value the greatest height", () => {
    render(<BarChart data={[10, 40]} height={100} />);
    const bars = screen.getAllByTestId("bar");
    const h0 = Number(bars[0]!.getAttribute("height"));
    const h1 = Number(bars[1]!.getAttribute("height"));
    expect(h1).toBeGreaterThan(h0);
  });

  it("exposes an accessible label", () => {
    render(<BarChart data={[1, 2]} label="Revenue" />);
    expect(screen.getByLabelText("Revenue")).toBeInTheDocument();
  });

  it("renders an empty chart with no data", () => {
    render(<BarChart data={[]} />);
    expect(screen.getByTestId("barchart-empty")).toBeInTheDocument();
  });
});
