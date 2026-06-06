<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>Tailwind Dashboard Template</h1>

  <p>A clean, production-ready admin dashboard built with Next.js (App Router), TypeScript, and Tailwind CSS — sidebar, stat cards, and a data table.</p>

  <p><em>Built and maintained by Viprasol Tech</em></p>

  <p>
    <a href="https://github.com/Viprasol-Tech/tailwind-dashboard-template/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Viprasol-Tech/tailwind-dashboard-template?color=4f46e5" alt="License" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  </p>
</div>

## Features

- **App Router dashboard** — a single-page admin overview at `app/page.tsx`.
- **Composable components** — `<Sidebar>`, `<StatCard>` grid, and a `<DataTable>` of recent orders.
- **Tested business logic** — pure helpers in `lib/` for metrics and formatting, covered by Vitest.
- **Tailwind CSS** — configured with a small brand palette and global styles.
- **Strict TypeScript** — `strict: true`, path alias `@/*`, zero `any`.
- **Fast feedback** — `tsc --noEmit` typecheck and `vitest run` unit + component tests.

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
| `app/page.tsx` | Dashboard page wiring the sidebar, stat cards, and table together. |
| `app/layout.tsx` | Root layout and global Tailwind styles. |
| `components/Sidebar.tsx` | Vertical navigation sidebar. |
| `components/StatCard.tsx` | KPI tile showing a value and a colored delta badge. |
| `components/DataTable.tsx` | Recent-orders table with status pills. |
| `lib/metrics.ts` | `computeStats` (total/average/min/max/percent-change) and helpers — real math. |
| `lib/format.ts` | `formatCurrency` / `formatNumber` / `formatPercent`. |
| `lib/data.ts` | Sample series and orders used by the dashboard. |
| `tests/` | Vitest specs for metrics, formatting, and the `<StatCard>` render. |

## Contributing

Contributions are welcome. Please open an issue to discuss substantial changes first, keep the typecheck and tests green (`npm run typecheck && npm run test`), and follow the existing code style. See [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).

## Contact — Viprasol Tech Private Limited

- Website: [viprasol.com](https://viprasol.com)
- Email: [support@viprasol.com](mailto:support@viprasol.com)
- Telegram: [t.me/viprasol_help](https://t.me/viprasol_help) | WhatsApp: +91 96336 52112
- GitHub: [@Viprasol-Tech](https://github.com/Viprasol-Tech) | [LinkedIn](https://www.linkedin.com/in/viprasol/) | X [@viprasol](https://twitter.com/viprasol)

## License

[MIT](LICENSE) (c) 2025 Viprasol Tech Private Limited
