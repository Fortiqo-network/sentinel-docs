import Link from "next/link";
import { cn } from "@/lib/cn";
import { Tessera } from "@/components/Tessera";

/** Per-letter stroke paths of the SENTINEL wordmark. */
const LETTERS: Array<{ d: string; transform?: string }> = [
  { d: "M39 21 A15 15 0 1 0 24 36 A15 15 0 1 1 9 51" },
  { d: "M6 0 V72 M0 6 H44 M0 36 H36 M0 66 H44", transform: "translate(74 0)" },
  { d: "M6 72 V0 L46 72 V0", transform: "translate(144 0)" },
  { d: "M0 6 H52 M26 0 V72", transform: "translate(222 0)" },
  { d: "M6 0 V72", transform: "translate(300 0)" },
  { d: "M6 72 V0 L46 72 V0", transform: "translate(338 0)" },
  { d: "M6 0 V72 M0 6 H44 M0 36 H36 M0 66 H44", transform: "translate(416 0)" },
  { d: "M6 0 V66 H44", transform: "translate(486 0)" },
];

/** The SENTINEL wordmark — monoline letterforms in `currentColor`. */
export function Wordmark({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg viewBox="-6 -10 542 92" fill="none" className={cn("h-[0.9em] w-auto", className)} role="img" aria-label="Sentinel">
      <g stroke="currentColor" strokeWidth="12" strokeLinejoin="bevel" fill="none">
        {LETTERS.map((l, i) => (
          <path key={i} d={l.d} transform={l.transform} />
        ))}
      </g>
    </svg>
  );
}

interface LogoProps {
  href?: string;
  className?: string;
}

/**
 * Primary brand lockup — the scanning Tessera beside the wordmark — identical to
 * the logo on sentinel.fortiqo.xyz. Renders in `currentColor`, so it adapts to
 * the docs theme.
 */
export function Logo({ href = "/", className }: LogoProps): React.JSX.Element {
  return (
    <Link href={href} aria-label="Sentinel — home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <Tessera className="h-7 w-7" seam="scan" />
      <Wordmark className="h-3.5 text-current" />
    </Link>
  );
}
