import type { CSSProperties, ReactNode } from "react";

interface CharacterPlaceholderProps {
  /** Width in px. */
  width: number;
  /** Height in px. */
  height: number;
  /** Tint applied to the placeholder background. */
  tint?: string;
  /** Shape of the slot. */
  shape?: "rounded" | "circle";
  /** Short hint shown faintly inside the slot during development. */
  hint?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Reusable reserved slot for a character illustration. The real artwork is
 * dropped in later by replacing the inner placeholder.
 *
 * Renders a light, subtly-tinted box at a fixed size — we intentionally do NOT
 * recreate the mascots in code.
 */
export function CharacterPlaceholder({
  width,
  height,
  tint = "rgba(255,255,255,0.18)",
  shape = "rounded",
  hint,
  className = "",
  style,
  children,
}: CharacterPlaceholderProps) {
  return (
    /* CHARACTER_IMAGE: replace with asset */
    <div
      className={`relative flex items-center justify-center overflow-hidden ${
        shape === "circle" ? "rounded-full" : "rounded-3xl"
      } ${className}`}
      style={{
        width,
        height,
        background: tint,
        boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.25)",
        ...style,
      }}
      role="img"
      aria-label={hint ?? "Character illustration placeholder"}
    >
      {children ?? (
        <span className="px-2 text-center text-[11px] font-bold uppercase tracking-wide text-white/55">
          {hint ?? "Character"}
        </span>
      )}
    </div>
  );
}

export default CharacterPlaceholder;
