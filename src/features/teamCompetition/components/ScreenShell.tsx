import type { CSSProperties, ReactNode } from "react";

interface ScreenShellProps {
  /** CSS background (gradient or color) for the full-bleed screen. */
  background: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Full-bleed colored surface for a single screen. Fills the scrollable content
 * area provided by the navigator (which owns the device column + bottom nav).
 */
export function ScreenShell({
  background,
  children,
  className = "",
  style,
}: ScreenShellProps) {
  return (
    // NOTE: no `flex-1` and no vertical `overflow-hidden` here. As a flex child,
    // `overflow-hidden` would force min-height:0 and let the panel shrink below
    // its content (clipping the CTA behind the nav). Instead we use `min-h-full`
    // so short screens fill the viewport while tall screens grow and let the
    // parent <main> scroll. `overflow-x-clip` keeps decorative blobs in bounds.
    <div
      className={`relative flex min-h-full w-full flex-col overflow-x-clip ${className}`}
      style={{ background, ...style }}
    >
      {children}
    </div>
  );
}

export default ScreenShell;
