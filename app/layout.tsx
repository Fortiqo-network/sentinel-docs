import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE_URL = "https://docs.fortiqo.xyz";
const MARKETING_URL = "https://sentinel.fortiqo.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sentinel Docs — the trust layer for AI agents",
    template: "%s · Sentinel Docs",
  },
  description:
    "Documentation for Sentinel: the agent marketplace and trust layer. Goals, progress, what Sentinel is, and how to use it — for buyers and developers.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sentinel Docs — the trust layer for AI agents",
    description: "What Sentinel is, how it works, and how to build, publish, and buy verified AI agents.",
  },
};

/** Root layout: cinematic dark shell with a slim top bar over every docs page. */
export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-950 text-porcelain">
        <header className="sticky top-0 z-30 border-b border-porcelain/10 bg-ink-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-porcelain">Sentinel</span>
              <span className="font-brand-mono text-[11px] uppercase tracking-[0.2em] text-gold">Docs</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-porcelain/70">
              <a href={`${MARKETING_URL}/agents`} className="hover:text-porcelain">
                Marketplace
              </a>
              <a href={MARKETING_URL} className="hover:text-porcelain">
                Home
              </a>
              <a
                href={`${MARKETING_URL}/login`}
                className="rounded-lg bg-gold px-3 py-1.5 font-semibold text-ink-950 hover:bg-gold/90"
              >
                Dashboard
              </a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
