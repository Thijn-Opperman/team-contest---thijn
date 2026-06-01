import type { CSSProperties } from "react";

interface SparkleProps {
  size?: number;
  color?: string;
  /** Stagger the pulse loop so a cluster doesn't beat in unison. */
  delayMs?: number;
  className?: string;
  style?: CSSProperties;
}

/** Four-point sparkle (✦) with a looping pulse animation. */
export function Sparkle({
  size = 18,
  color = "#A5E8C0",
  delayMs = 0,
  className = "",
  style,
}: SparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`duo-sparkle ${className}`}
      style={{ animationDelay: `${delayMs}ms`, ...style }}
    >
      <path
        d="M12 0c.7 6.2 5.1 10.6 11.3 11.3v1.4C17.1 13.4 12.7 17.8 12 24c-.7-6.2-5.1-10.6-11.3-11.3v-1.4C6.9 10.6 11.3 6.2 12 0Z"
        fill={color}
      />
    </svg>
  );
}

export default Sparkle;
