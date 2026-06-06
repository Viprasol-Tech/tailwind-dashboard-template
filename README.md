<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>Tailwind Dashboard Template</h1>

  <p><strong>A clean, production-ready admin dashboard for Next.js — dark mode, a collapsible responsive sidebar, pure-SVG charts, an activity feed, and a filterable orders table.</strong></p>

  <p><em>Built and maintained by Viprasol Tech</em></p>

  <p>
    <a href="https://github.com/Viprasol-Tech/tailwind-dashboard-template/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Viprasol-Tech/tailwind-dashboard-template?color=4f46e5" alt="License" /></a>
    <a href="https://github.com/Viprasol-Tech/tailwind-dashboard-template/releases"><img src="https://img.shields.io/badge/version-0.2.0-4f46e5" alt="Version" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://vitest.dev"><img src="https://img.shields.io/badge/tests-116%20passing-22c55e?logo=vitest&logoColor=white" alt="Tests" /></a>
  </p>
</div>

---

## Features

- 🌗 **Dark mode** — class-based theme with a persisted toggle, OS-preference detection, and a no-flash boot script (no theme flicker on load).
- 📐 **Responsive app shell** — a collapsible desktop sidebar that shrinks to an icon rail, plus a slide-in mobile drawer and a sticky top bar.
- 📈 **Pure-SVG charts** — `Sparkline` and `BarChart` built from raw SVG with **zero chart dependencies**; trend-colored and theme-aware.
- 📰 **Activity feed** — a time-ordered event list with type accents and human-friendly relative timestamps ("30m ago").
- 🔎 **Filterable orders table** — live search, status filter chips with counts, click-to-sort columns, and a running total footer.
- 🧮 **Tested business logic** — pure, dependency-free helpers in `lib/` for stats, series transforms, formatting, and table queries.
- 🟦 **Strict TypeScript** — `strict: true`, path alias `@/*`, zero `any`.
- ✅ **116 tests** — Vitest unit tests for every `lib/` function plus jsdom render tests for every component.

## Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

Other scripts:

```bash
npm run typecheck   # tsc --noEmit (strict)
npm run test        # vitest run (lib + component tests)
npm run build       # next build (production)
```

## What's included

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Dashboard page wiring the shell, stat cards, charts, activity feed, and table. |
| `app/layout.tsx` | Root layout, global styles, `ThemeProvider`, and the no-flash theme script. |
| `components/DashboardShell.tsx` | Responsive chrome: collapsible sidebar, mobile drawer, sticky top bar. |
| `components/Sidebar.tsx` | Presentational navigation sidebar with a collapsed icon-rail mode. |
| `components/ThemeProvider.tsx` | Theme context with `localStorage` persistence and `useTheme()`. |
| `components/ThemeToggle.tsx` | Sun/moon button that flips between light and dark. |
| `components/StatCard.tsx` | KPI tile with a value, colored delta badge, and optional sparkline. |
| `components/Sparkline.tsx` | Pure-SVG trend line, colored by direction. |
| `components/BarChart.tsx` | Pure-SVG, baseline-aligned bar chart. |
| `components/ActivityFeed.tsx` | Time-ordered event feed with relative timestamps. |
| `components/FilterableOrders.tsx` | Searchable, filterable, sortable orders table. |
| `components/DataTable.tsx` | Simple static orders table (dark-mode aware). |
| `lib/metrics.ts` | `computeStats`, `percentChangeBetween`, `median`, `standardDeviation`, `trend`. |
| `lib/series.ts` | Chart math — `range`, `normalize`, `toSvgPoints`, `movingAverage`, `cumulativeSum`. |
| `lib/filter.ts` | Table logic — `searchOrders`, `filterByStatus`, `sortOrders`, `queryOrders`. |
| `lib/format.ts` | `formatCurrency`, `formatNumber`, `formatPercent`, `formatCompact`, `formatRelativeTime`. |
| `lib/data.ts` | Sample series, orders, and activity used by the dashboard. |
| `tests/` | Vitest specs covering every `lib/` function and component. |

## Project structure

```text
tailwind-dashboard-template/
├─ app/
│  ├─ layout.tsx         # root layout + ThemeProvider + no-flash script
│  ├─ page.tsx           # dashboard composition
│  └─ globals.css        # Tailwind layers + light/dark base styles
├─ components/           # shell, sidebar, charts, feed, tables, theme
├─ lib/                  # pure, tested logic (metrics, series, filter, format)
├─ tests/                # Vitest unit + render specs (jsdom)
└─ tailwind.config.ts    # darkMode: "class" + brand palette
```

## Dark mode

Theming is class-based (`darkMode: "class"`). `ThemeProvider` resolves the
initial theme from `localStorage`, falling back to the OS
`prefers-color-scheme`, and an inline script in `app/layout.tsx` applies the
`dark` class before first paint to avoid a flash of the wrong theme. Toggle at
runtime with the header button or programmatically via `useTheme()`.

## Roadmap

- [x] Dark mode with persistence and no-flash boot
- [x] Collapsible, responsive sidebar with mobile drawer
- [x] Pure-SVG sparkline and bar chart
- [x] Activity feed with relative timestamps
- [x] Filterable / sortable orders table
- [ ] Area chart with gradient fill
- [ ] CSV export for the orders table
- [ ] Keyboard shortcuts for navigation
- [ ] Storybook for component documentation

## FAQ

**Does this pull in a charting library?**
No. The sparkline and bar chart are drawn from raw SVG using the helpers in
`lib/series.ts`, so the bundle stays lean and the math stays testable.

**How is dark mode persisted?**
In `localStorage` under `vp-dashboard-theme`. If nothing is stored, the OS
preference is used.

**Where does the data come from?**
From `lib/data.ts` as static samples. Swap those exports for your API or
database calls — the components only depend on the exported types.

**Is the table logic reusable?**
Yes. `searchOrders`, `filterByStatus`, `sortOrders`, and `queryOrders` in
`lib/filter.ts` are pure functions you can reuse anywhere.

## Contributing

Contributions are welcome. Please open an issue to discuss substantial changes first, keep the typecheck and tests green (`npm run typecheck && npm run test`), and follow the existing code style. See [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).

## Contact — Viprasol Tech Private Limited

- Website: [viprasol.com](https://viprasol.com)
- Email: [support@viprasol.com](mailto:support@viprasol.com)
- Telegram: [t.me/viprasol_help](https://t.me/viprasol_help) | WhatsApp: +91 96336 52112
- GitHub: [@Viprasol-Tech](https://github.com/Viprasol-Tech) | [LinkedIn](https://www.linkedin.com/in/viprasol/) | X [@viprasol](https://twitter.com/viprasol)

## License

[MIT](LICENSE) (c) 2025 Viprasol Tech Private Limited
