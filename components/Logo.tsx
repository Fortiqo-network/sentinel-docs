import { cn } from "@/lib/cn";

const HALF_LEFT = "M98 45 H69 A24 24 0 0 0 45 69 V171 A24 24 0 0 0 69 195 H128 V119 H98 Z";
const HALF_RIGHT = "M112 45 H171 A24 24 0 0 1 195 69 V171 A24 24 0 0 1 171 195 H142 V105 H112 Z";
const SEAM = "M105 45 V112 H135 V195";

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

/**
 * The Sentinel brand lockup — the Tessera seal (two counterpart halves + amber
 * seam) beside the SENTINEL wordmark. Both render in `currentColor`, so the mark
 * adapts to the surrounding text colour (and the theme toggle) automatically.
 */
export function Logo({ className }: { className?: string }): React.JSX.Element {
  return (
    <span className={cn("inline-flex items-center gap-2 text-fg", className)}>
      <svg viewBox="0 0 240 240" fill="none" className="h-7 w-7 shrink-0" aria-hidden="true">
        <path d={HALF_LEFT} fill="currentColor" />
        <path d={HALF_RIGHT} fill="currentColor" />
        <path d={SEAM} fill="none" stroke="#E7A03C" strokeWidth={14} />
      </svg>
      <svg viewBox="-6 -10 542 92" fill="none" className="h-[17px] w-auto" role="img" aria-label="Sentinel">
        <g stroke="currentColor" strokeWidth="12" strokeLinejoin="bevel" fill="none">
          {LETTERS.map((l, i) => (
            <path key={i} d={l.d} transform={l.transform} />
          ))}
        </g>
      </svg>
    </span>
  );
}
