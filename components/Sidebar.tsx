export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Orders", href: "#" },
  { label: "Customers", href: "#" },
  { label: "Products", href: "#" },
  { label: "Settings", href: "#" },
];

export interface SidebarProps {
  /** Collapse to an icon rail when true (desktop). Defaults to false. */
  collapsed?: boolean;
  /** Called when a nav link is activated — used to close the mobile drawer. */
  onNavigate?: () => void;
  /** Override the nav items (primarily for tests). */
  items?: NavItem[];
}

/**
 * Vertical navigation sidebar. Purely presentational: collapse state and the
 * mobile drawer are owned by {@link DashboardShell}. Dark-mode aware.
 */
export function Sidebar({ collapsed = false, onNavigate, items = NAV_ITEMS }: SidebarProps) {
  return (
    <aside
      data-testid="sidebar"
      data-collapsed={collapsed}
      className={
        "flex h-full flex-col border-r border-slate-200 bg-white transition-all dark:border-slate-700 dark:bg-slate-900 " +
        (collapsed ? "w-16" : "w-60")
      }
    >
      <div className="flex items-center gap-2 px-4 py-5">
        <span className="inline-block h-7 w-7 shrink-0 rounded-lg bg-brand-600" aria-hidden />
        {!collapsed && (
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Console
          </span>
        )}
      </div>
      <nav className="flex-1 space-y-1 px-3" aria-label="Primary">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
            aria-current={item.active ? "page" : undefined}
            className={
              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
              (collapsed ? "text-center " : "") +
              (item.active
                ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-50"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white")
            }
          >
            {collapsed ? item.label.charAt(0) : item.label}
          </a>
        ))}
      </nav>
      {!collapsed && (
        <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">
          Viprasol Tech
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
