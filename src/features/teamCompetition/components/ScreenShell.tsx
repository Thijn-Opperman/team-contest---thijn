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
 * complete phone viewport (including iPhone safe areas), while content is
 * scaled per screen to avoid page scrolling.
 */
export function ScreenShell({
  background,
  children,
  className = "",
  style,
}: ScreenShellProps) {
  return (
    <div
      className={`relative box-border flex h-full min-h-0 w-full flex-col overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] ${className}`}
      style={{ background, ...style }}
    >
      {children}
    </div>
  );
}

export default ScreenShell;
