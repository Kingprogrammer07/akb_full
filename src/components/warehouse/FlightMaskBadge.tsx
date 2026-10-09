import { cn } from "../../lib/utils";

interface FlightMaskBadgeProps {
  flightName: string;
  flightMask?: string | null;
  className?: string;
}

/**
 * Shows the partner-facing flight name next to the real one, because partner
 * clients only know their masked name and quote it when picking up cargo.
 */
export default function FlightMaskBadge({ flightName, flightMask, className }: FlightMaskBadgeProps) {
  if (!flightMask || flightMask.toUpperCase() === flightName.toUpperCase()) {
    return null;
  }

  return (
    <span
      title="Mijozga ko'rinadigan reys nomi"
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap",
        "bg-sky-50 text-sky-700 border border-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20",
        className,
      )}
    >
      Mijozda: {flightMask}
    </span>
  );
}
