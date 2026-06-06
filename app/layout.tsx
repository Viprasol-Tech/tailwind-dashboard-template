import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Tailwind Dashboard Template",
  description: "Tailwind admin dashboard template (Next.js) — sidebar, stat cards, table.",
};

/**
 * Applied before hydration to set the `dark` class from storage or the OS
 * preference, preventing a flash of the wrong theme on first paint.
 */
const noFlashThemeScript = `
(function () {
  try {
    var stored = localStorage.getItem("vp-dashboard-theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
