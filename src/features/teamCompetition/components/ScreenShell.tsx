import type { CSSProperties, ReactNode } from "react";

interface ScreenShellProps {
  /** CSS background (gradient or color) for the full-bleed screen. */
  background: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Full-bleed colored surface for a single screen. The background fills the
 * complete phone viewport (including iPhone safe areas). Content gets safe-area
 * padding and may scroll as a fallback instead of being clipped.
 */
export function ScreenShell({
  background,
  children,
  className = "",
  style,
}: ScreenShellProps) {
  return (
    <div
      className={`relative box-border flex h-full min-h-0 w-full flex-col overflow-x-hidden overflow-y-auto overscroll-contain pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] ${className}`}
      style={{ background, ...style }}
    >
      {children}
    </div>
  );
}

export default ScreenShell;
