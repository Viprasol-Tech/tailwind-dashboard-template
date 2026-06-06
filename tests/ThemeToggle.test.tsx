import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

afterEach(cleanup);

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
});

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("<ThemeToggle />", () => {
  it("renders a labelled toggle button", () => {
    renderToggle();
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("adds the dark class on the root when toggled on", () => {
    renderToggle();
    fireEvent.click(screen.getByTestId("theme-toggle"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("vp-dashboard-theme")).toBe("dark");
  });

  it("toggles back to light on a second click", () => {
    renderToggle();
    const button = screen.getByTestId("theme-toggle");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("vp-dashboard-theme")).toBe("light");
  });
});
