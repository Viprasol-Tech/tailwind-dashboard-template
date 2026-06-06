import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, within } from "@testing-library/react";
import FilterableOrders from "@/components/FilterableOrders";
import type { Order } from "@/lib/data";

afterEach(cleanup);

const orders: Order[] = [
  { id: "INV-100", customer: "Acme", amount: 300, status: "paid", date: "2025-01-03" },
  { id: "INV-101", customer: "Globex", amount: 100, status: "pending", date: "2025-01-01" },
  { id: "INV-102", customer: "Initech", amount: 200, status: "refunded", date: "2025-01-02" },
];

function dataRows(): HTMLElement[] {
  // tbody rows only (exclude header/footer).
  const table = screen.getByRole("table");
  const body = table.querySelector("tbody")!;
  return within(body).queryAllByRole("row");
}

describe("<FilterableOrders />", () => {
  it("renders all orders initially", () => {
    render(<FilterableOrders orders={orders} />);
    expect(dataRows()).toHaveLength(3);
  });

  it("filters by search term", () => {
    render(<FilterableOrders orders={orders} />);
    fireEvent.change(screen.getByTestId("order-search"), { target: { value: "globex" } });
    const rows = dataRows();
    expect(rows).toHaveLength(1);
    expect(rows[0]!).toHaveTextContent("Globex");
  });

  it("filters by status chip", () => {
    render(<FilterableOrders orders={orders} />);
    fireEvent.click(screen.getByTestId("filter-paid"));
    const rows = dataRows();
    expect(rows).toHaveLength(1);
    expect(rows[0]!).toHaveTextContent("Acme");
  });

  it("shows an empty state when nothing matches", () => {
    render(<FilterableOrders orders={orders} />);
    fireEvent.change(screen.getByTestId("order-search"), { target: { value: "zzz" } });
    expect(screen.getByTestId("orders-empty")).toBeInTheDocument();
  });

  it("totals the visible amounts in the footer", () => {
    render(<FilterableOrders orders={orders} />);
    fireEvent.click(screen.getByTestId("filter-paid"));
    expect(screen.getByTestId("orders-total")).toHaveTextContent("$300");
  });

  it("sorts by amount when the header is clicked", () => {
    render(<FilterableOrders orders={orders} />);
    fireEvent.click(screen.getByText(/Amount/));
    const rows = dataRows();
    // Ascending after first click: 100, 200, 300.
    expect(rows[0]!).toHaveTextContent("INV-101");
  });
});
