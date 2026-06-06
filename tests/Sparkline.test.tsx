import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Sparkline from "@/components/Sparkline";

afterEach(cleanup);

describe("<Sparkline />", () => {
  it("renders a polyline with one point per value", () => {
    const { container } = render(<Sparkline data={[1, 2, 3]} width={100} height={40} />);
    const polyline = container.querySelector("polyline");
    expect(polyline).not.toBeNull();
    const points = polyline!.getAttribute("points")!.trim().split(" ");
    expect(points).toHaveLength(3);
  });

  it("uses an upbeat color for a rising series", () => {
    render(<Sparkline data={[1, 2, 3]} />);
    expect(screen.getByTestId("sparkline").getAttribute("class")).toContain(
      "text-emerald-500",
    );
  });

  it("uses a warning color for a falling series", () => {
    render(<Sparkline data={[3, 2, 1]} />);
    expect(screen.getByTestId("sparkline").getAttribute("class")).toContain(
      "text-rose-500",
    );
  });

  it("renders an empty svg with no data", () => {
    render(<Sparkline data={[]} />);
    expect(screen.getByTestId("sparkline-empty")).toBeInTheDocument();
  });
});
