# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/); versioning
follows [SemVer](https://semver.org/).

## [0.2.0] - 2025

### Added
- **Dark mode** — class-based theme with a `ThemeProvider`, persisted `ThemeToggle`, OS-preference detection, and a no-flash inline boot script.
- **Responsive app shell** (`DashboardShell`) — collapsible desktop sidebar (icon rail) plus a mobile overlay drawer and a sticky top bar.
- **Pure-SVG charts** — `Sparkline` (trend-colored line) and `BarChart` (baseline-aligned bars), with no chart library.
- **Activity feed** (`ActivityFeed`) — time-ordered events with type accents and relative timestamps.
- **Filterable orders table** (`FilterableOrders`) — live search, status filter chips with counts, click-to-sort columns, and a running total footer.
- **`lib/series.ts`** — `range`, `normalize`, `clamp`, `toSvgPoints`, `toPolylinePoints`, `movingAverage`, `cumulativeSum`, `round`.
- **`lib/filter.ts`** — `searchOrders`, `filterByStatus`, `sortOrders`, `queryOrders`, `countByStatus`, `sumAmount`.
- **More metrics** — `median`, `standardDeviation`, `trend` in `lib/metrics.ts`.
- **More formatters** — `formatCompact` and `formatRelativeTime` in `lib/format.ts`.
- Sparklines on each `StatCard` and a richer sample dataset (more orders, activity events).

### Changed
- `Sidebar`, `StatCard`, and `DataTable` are now dark-mode aware and accept new props.
- The dashboard page now uses the responsive shell and the new widgets.

### Tests
- Expanded the suite from 18 to 116 tests across `lib/` units and component render specs (jsdom).

## [0.1.0] - 2025

### Added
- Initial release of tailwind-dashboard-template: Tailwind admin dashboard template (Next.js) — sidebar, stat cards, table.
