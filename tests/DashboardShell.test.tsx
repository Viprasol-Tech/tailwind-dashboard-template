import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import DashboardShell from "@/components/DashboardShell";
import { ThemeProvider } from "@/components/ThemeProvider";

afterEach(cleanup);

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
});

function renderShell() {
  return render(
    <ThemeProvider>
      <DashboardShell title="Overview">
        <p>Body content</p>
      </DashboardShell>
    </ThemeProvider>,
  );
}

describe("<DashboardShell />", () => {
  it("renders the title and children", () => {
    renderShell();
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("toggles the collapse button's pressed state", () => {
    renderShell();
    const button = screen.getByTestId("toggle-collapse");
    expect(button).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("opens and closes the mobile drawer", () => {
    renderShell();
    expect(screen.queryByTestId("drawer-backdrop")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("open-drawer"));
    expect(screen.getByTestId("drawer-backdrop")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("drawer-backdrop"));
    expect(screen.queryByTestId("drawer-backdrop")).not.toBeInTheDocument();
  });
});
