import { cn } from "@/lib/utils";

/**
 * Credit Assist mark: an open "C" (credit) with the turquoise agent spark
 * sitting in its mouth, on the purple → azure brand tile.
 * Same artwork as src/app/icon.svg (favicon) and public/logo.svg.
 */
export function LogoMark({
  className,
  id = "ca-logo",
}: {
  className?: string;
  /** unique gradient id when the mark appears more than once on a page */
  id?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("h-9 w-9 shrink-0", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7a35a8" />
          <stop offset="0.55" stopColor="#9d4ccd" />
          <stop offset="1" stopColor="#3876ff" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill={`url(#${id})`} />
      <path
        d="M29.78 17.22 A11 11 0 1 0 29.78 32.78"
        fill="none"
        stroke="#fff"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M34 16.5 C34.8 21.4 36.6 23.2 41.5 24 C36.6 24.8 34.8 26.6 34 31.5 C33.2 26.6 31.4 24.8 26.5 24 C31.4 23.2 33.2 21.4 34 16.5Z"
        fill="#07c2c9"
      />
    </svg>
  );
}

/** Mark plus wordmark, used in the header and footer. */
export function Logo({
  className,
  id,
  as: Tag = "span",
}: {
  className?: string;
  id?: string;
  as?: "span" | "h3";
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark id={id} />
      <Tag className="font-heading text-lg font-bold leading-none tracking-tight">
        Credit <span className="text-purple-600 dark:text-turquoise [.on-navy_&]:text-turquoise">Assist</span>
      </Tag>
    </span>
  );
}
