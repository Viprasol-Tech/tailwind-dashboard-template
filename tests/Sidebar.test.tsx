import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Sidebar from "@/components/Sidebar";

afterEach(cleanup);

describe("<Sidebar />", () => {
  it("renders the full nav labels when expanded", () => {
    render(<Sidebar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("marks the active item with aria-current", () => {
    render(<Sidebar />);
    expect(screen.getByText("Dashboard")).toHaveAttribute("aria-current", "page");
  });

  it("collapses to single-letter labels and narrow width", () => {
    render(<Sidebar collapsed />);
    const aside = screen.getByTestId("sidebar");
    expect(aside.getAttribute("data-collapsed")).toBe("true");
    expect(aside.className).toContain("w-16");
    // First letter only; brand wordmark hidden.
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("calls onNavigate when a link is clicked", () => {
    const onNavigate = vi.fn();
    render(<Sidebar onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText("Orders"));
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});
