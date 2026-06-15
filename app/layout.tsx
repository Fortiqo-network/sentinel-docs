import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const THEME_INIT = `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}`;

const SITE_URL = "https://docs.fortiqo.xyz";
const HOME_URL = "https://sentinel.fortiqo.xyz";
const GITHUB_URL = "https://github.com/Fortiqo-network";

const INVESTOR_MESSAGE =
  "Hi Sentinel team, we are interested in investing in Sentinel and would love to connect.";
const INVESTOR_WHATSAPP = `https://wa.me/917000695135?text=${encodeURIComponent(INVESTOR_MESSAGE)}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sentinel Docs — the trust layer for AI agents",
    template: "%s · Sentinel Docs",
  },
  description:
    "Documentation for Sentinel: the AI agent marketplace and trust layer. What Sentinel is, our goal and progress, and how to discover, buy, build, and publish independently verified AI agents.",
  applicationName: "Sentinel Docs",
  keywords: [
    "Sentinel",
    "AI agent marketplace",
    "agent trust layer",
    "AI agent verification",
    "trust score",
    "how to use Sentinel",
    "AI agent documentation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sentinel Docs",
    title: "Sentinel Docs — the trust layer for AI agents",
    description:
      "What Sentinel is, how it works, and how to build, publish, and buy verified AI agents.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentinel Docs — the trust layer for AI agents",
    description: "What Sentinel is, how it works, and how to use it.",
  },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${HOME_URL}/#organization`,
      name: "Sentinel",
      url: HOME_URL,
      description: "The AI agent marketplace and trust layer.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "investor relations",
        telephone: "+917000695135",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sentinel Docs",
      publisher: { "@id": `${HOME_URL}/#organization` },
    },
  ],
};

/** Root layout: cinematic dark shell with a logo header and footer (investor CTA). */
export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="flex min-h-screen flex-col bg-bg text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />

        <header className="sticky top-0 z-30 border-b border-hair/10 bg-bg/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <Logo href="/" />
              <span className="font-brand-mono text-[11px] uppercase tracking-[0.2em] text-gold">Docs</span>
            </div>
            <nav className="flex items-center gap-1.5 text-sm sm:gap-2">
              <a href={`${HOME_URL}/agents`} className="hidden rounded-lg px-3 py-1.5 text-fg/70 hover:text-fg sm:inline-block">
                Marketplace
              </a>
              <a
                href={HOME_URL}
                className="rounded-lg border border-hair/20 px-3 py-1.5 font-medium text-fg/90 transition-colors hover:border-gold/50 hover:text-fg"
              >
                Home ↗
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-hair/10 bg-surface2/60">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="max-w-sm">
                <Logo href={HOME_URL} />
                <p className="mt-3 text-sm text-fg/55">
                  The AI agent marketplace and trust layer — discover, verify, and deploy agents you can
                  actually trust.
                </p>
              </div>

              <div className="flex flex-wrap gap-10">
                <div>
                  <p className="font-brand-mono text-xs uppercase tracking-[0.16em] text-fg/45">Sentinel</p>
                  <ul className="mt-3 space-y-2 text-sm text-fg/70">
                    <li><a href={HOME_URL} className="hover:text-gold">Home</a></li>
                    <li><a href={`${HOME_URL}/agents`} className="hover:text-gold">Marketplace</a></li>
                    <li><a href={`${HOME_URL}/how-it-works`} className="hover:text-gold">How it works</a></li>
                    <li><a href={GITHUB_URL} className="hover:text-gold">GitHub</a></li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gold/30 bg-gold/5 p-4">
                  <p className="font-brand-mono text-xs uppercase tracking-[0.16em] text-gold">Want to invest?</p>
                  <p className="mt-2 max-w-xs text-sm text-fg/70">
                    We&apos;re raising to build the trust layer for AI agents. Reach the founders directly.
                  </p>
                  <a
                    href={INVESTOR_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-gold/90"
                  >
                    Connect on WhatsApp →
                  </a>
                  <p className="mt-2 text-xs text-fg/40">+91 70006 95135</p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-xs text-fg/35">© {2026} Sentinel. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
