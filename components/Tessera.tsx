import { cn } from "@/lib/cn";

/** The two counterpart halves of the token and the seam that runs between them. */
const HALF_LEFT = "M98 45 H69 A24 24 0 0 0 45 69 V171 A24 24 0 0 0 69 195 H128 V119 H98 Z";
const HALF_RIGHT = "M112 45 H171 A24 24 0 0 1 195 69 V171 A24 24 0 0 1 171 195 H142 V105 H112 Z";
const SEAM = "M105 45 V112 H135 V195";

type SeamState = "scan" | "verified" | "none";

interface TesseraProps {
  className?: string;
  seam?: SeamState;
  /** Half fill colour. Defaults to `currentColor` so it adapts to the surface. */
  fill?: string;
}

/**
 * The Sentinel **Tessera** — two halves of one token with an amber seam that
 * scans top-to-bottom forever. Identical to the mark on sentinel.fortiqo.xyz.
 */
export function Tessera({ className, seam = "scan", fill = "currentColor" }: TesseraProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={cn("overflow-visible", className)} aria-hidden>
      <path d={HALF_LEFT} fill={fill} />
      <path d={HALF_RIGHT} fill={fill} />
      {seam === "verified" ? (
        <path d={SEAM} fill="none" stroke="#E7A03C" strokeWidth={14} />
      ) : seam === "scan" ? (
        <path className="tessera-scan" pathLength={180} d={SEAM} fill="none" stroke="#E7A03C" strokeWidth={14} />
      ) : null}
    </svg>
  );
}
