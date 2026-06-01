import type { CSSProperties, ReactNode } from "react";

interface ScreenShellProps {
  /** CSS background (gradient or color) for the full-bleed screen. */
  background: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Full-bleed colored surface for a single screen. It fills exactly one mobile
 * viewport inside the navigator, so screens behave like app pages instead of
 * long web pages.
 */
export function ScreenShell({
  background,
  children,
  className = "",
  style,
}: ScreenShellProps) {
  return (
    <div
      className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden ${className}`}
      style={{ background, ...style }}
    >
      {children}
    </div>
  );
}

export default ScreenShell;
