import { cn } from "@/lib/utils";

interface DukaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * DUKA logo — stylized storefront/shop icon.
 * "Duka" means "shop" in Swahili.
 */
export function DukaLogo({ className, size = 28, showText = true }: DukaLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Storefront roof / awning */}
        <path
          d="M4 12L6 6H26L28 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        {/* Awning scallops */}
        <path
          d="M4 12C4 12 6 15 9 12C12 9 12 12 16 12C20 12 20 9 23 12C26 15 28 12 28 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        {/* Building walls */}
        <path
          d="M6 14V26H26V14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-400"
        />
        {/* Door */}
        <rect
          x="13"
          y="20"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />
        {/* Door handle */}
        <circle cx="17.5" cy="23" r="0.8" fill="currentColor" className="text-primary" />
        {/* Window left */}
        <rect
          x="8"
          y="16"
          width="4"
          height="4"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-zinc-500"
        />
        {/* Window right */}
        <rect
          x="20"
          y="16"
          width="4"
          height="4"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-zinc-500"
        />
      </svg>
      {showText && (
        <span className="font-mono text-lg font-bold tracking-tight text-zinc-100">
          DUKA
        </span>
      )}
    </span>
  );
}

/**
 * Small icon-only version for favicons, sidebar, etc.
 */
export function DukaIcon({ className, size = 20 }: { className?: string; size?: number }) {
  return <DukaLogo className={className} size={size} showText={false} />;
}
