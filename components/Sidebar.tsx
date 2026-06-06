interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Orders", href: "#" },
  { label: "Customers", href: "#" },
  { label: "Products", href: "#" },
  { label: "Settings", href: "#" },
];

export function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="inline-block h-7 w-7 rounded-lg bg-brand-600" aria-hidden />
        <span className="text-lg font-semibold text-slate-900">Console</span>
      </div>
      <nav className="flex-1 space-y-1 px-3" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={
              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
              (item.active
                ? "bg-brand-50 text-brand-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")
            }
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-400">
        Viprasol Tech
      </div>
    </aside>
  );
}

export default Sidebar;
