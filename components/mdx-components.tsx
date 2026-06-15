/**
 * MDX component map for the docs renderer.
 *
 * Maps markdown elements and Mintlify-style components (Note/Warning/Tip/Card/
 * Steps/…) to brand-styled React components on the cinematic dark surface. A
 * Proxy supplies a graceful fallback for any capitalized component the content
 * references but we haven't explicitly defined, so MDX never fails to render.
 */

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type DivProps = ComponentPropsWithoutRef<"div">;

function Callout({
  tone,
  label,
  children,
}: {
  tone: "note" | "info" | "tip" | "warning";
  label: string;
  children: ReactNode;
}): React.JSX.Element {
  const tones: Record<typeof tone, string> = {
    note: "border-sentinel-500/40 bg-sentinel-500/10",
    info: "border-sentinel-500/40 bg-sentinel-500/10",
    tip: "border-trust-high/40 bg-trust-high/10",
    warning: "border-gold/50 bg-gold/10",
  };
  return (
    <div className={cn("my-5 rounded-xl border px-4 py-3 text-fg/80", tones[tone])}>
      <p className="mb-1 font-brand-mono text-xs uppercase tracking-[0.18em] text-fg/60">{label}</p>
      <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}

function Card({
  title,
  href,
  children,
}: {
  title?: string;
  href?: string;
  children?: ReactNode;
}): React.JSX.Element {
  const body = (
    <div className="group h-full rounded-xl border border-hair/10 bg-surface/60 p-4 transition-colors hover:border-gold/40">
      {title && <p className="font-semibold text-fg group-hover:text-gold">{title}</p>}
      <div className="mt-1 text-sm text-fg/60">{children}</div>
    </div>
  );
  return href ? (
    <Link href={normalizeHref(href)} className="no-underline">
      {body}
    </Link>
  ) : (
    body
  );
}

function CardGroup({ children }: DivProps): React.JSX.Element {
  return <div className="my-5 grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Steps({ children }: DivProps): React.JSX.Element {
  return <div className="my-5 space-y-4 border-l border-hair/15 pl-5">{children}</div>;
}

function Step({ title, children }: { title?: string; children?: ReactNode }): React.JSX.Element {
  return (
    <div className="relative">
      <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-gold" aria-hidden="true" />
      {title && <p className="font-semibold text-fg">{title}</p>}
      <div className="mt-1 text-sm text-fg/70">{children}</div>
    </div>
  );
}

function Section({ title, children }: { title?: string; children?: ReactNode }): React.JSX.Element {
  return (
    <div className="my-4">
      {title && <p className="mb-1 font-brand-mono text-xs uppercase tracking-wide text-gold">{title}</p>}
      <div>{children}</div>
    </div>
  );
}

function Fallback({ children }: { children?: ReactNode }): React.JSX.Element {
  return <div className="my-3 rounded-lg border border-hair/10 bg-surface/40 p-3 text-sm text-fg/70">{children}</div>;
}

/**
 * Normalize legacy Mintlify-style internal links (`/docs/...`) to this site's
 * clean root URLs (`/...`), so authored content links resolve on docs.fortiqo.xyz.
 */
function normalizeHref(href?: string): string {
  if (!href) return "#";
  if (href === "/docs" || href === "/docs/") return "/";
  if (href.startsWith("/docs/")) return `/${href.slice("/docs/".length)}`;
  return href;
}

const explicit: Record<string, React.ComponentType<Record<string, unknown>>> = {
  a: ({ href, children, ...rest }: ComponentPropsWithoutRef<"a">) => (
    <Link href={normalizeHref(href)} className="font-medium text-gold underline-offset-4 hover:underline" {...rest}>
      {children}
    </Link>
  ),
  h1: (p: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-fg" {...p} />
  ),
  h2: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-3 scroll-mt-24 border-b border-hair/10 pb-1.5 text-xl font-semibold text-fg" {...p} />
  ),
  h3: (p: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold text-fg" {...p} />
  ),
  p: (p: ComponentPropsWithoutRef<"p">) => <p className="my-3 leading-7 text-fg/75" {...p} />,
  ul: (p: ComponentPropsWithoutRef<"ul">) => <ul className="my-3 list-disc space-y-1.5 pl-6 text-fg/75" {...p} />,
  ol: (p: ComponentPropsWithoutRef<"ol">) => <ol className="my-3 list-decimal space-y-1.5 pl-6 text-fg/75" {...p} />,
  li: (p: ComponentPropsWithoutRef<"li">) => <li className="leading-7" {...p} />,
  blockquote: (p: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-4 border-l-2 border-gold/50 pl-4 text-fg/70 italic" {...p} />
  ),
  code: (p: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-fg/10 px-1.5 py-0.5 font-brand-mono text-[0.85em] text-fg" {...p} />
  ),
  pre: (p: ComponentPropsWithoutRef<"pre">) => (
    <pre className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-[#0E1014] p-4 text-sm [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[#ECEAE3]" {...p} />
  ),
  table: (p: ComponentPropsWithoutRef<"table">) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm text-fg/80" {...p} />
    </div>
  ),
  th: (p: ComponentPropsWithoutRef<"th">) => (
    <th className="border border-hair/10 bg-surface px-3 py-2 text-left font-semibold text-fg" {...p} />
  ),
  td: (p: ComponentPropsWithoutRef<"td">) => <td className="border border-hair/10 px-3 py-2" {...p} />,
  hr: () => <hr className="my-8 border-hair/10" />,
  Note: ({ children }: { children?: ReactNode }) => <Callout tone="note" label="Note">{children}</Callout>,
  Info: ({ children }: { children?: ReactNode }) => <Callout tone="info" label="Info">{children}</Callout>,
  Tip: ({ children }: { children?: ReactNode }) => <Callout tone="tip" label="Tip">{children}</Callout>,
  Warning: ({ children }: { children?: ReactNode }) => <Callout tone="warning" label="Warning">{children}</Callout>,
  Card: Card as React.ComponentType<Record<string, unknown>>,
  CardGroup,
  Steps,
  Step: Step as React.ComponentType<Record<string, unknown>>,
  Tabs: Section as React.ComponentType<Record<string, unknown>>,
  Tab: Section as React.ComponentType<Record<string, unknown>>,
  CodeGroup: Section as React.ComponentType<Record<string, unknown>>,
  Accordion: Section as React.ComponentType<Record<string, unknown>>,
  AccordionGroup: Section as React.ComponentType<Record<string, unknown>>,
};

/**
 * The component map passed to MDX. Unknown capitalized components resolve to a
 * styled fallback so example/custom components never break the render.
 */
export const mdxComponents = new Proxy(explicit, {
  get(target, prop: string) {
    if (prop in target) return target[prop];
    if (typeof prop === "string" && /^[A-Z]/.test(prop)) return Fallback;
    return undefined;
  },
}) as Record<string, React.ComponentType<Record<string, unknown>>>;
