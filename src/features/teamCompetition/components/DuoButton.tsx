"use client";

import type { ButtonHTMLAttributes } from "react";
import { COLORS } from "../constants/teamColors";

type Variant = "green" | "white";

interface DuoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/**
 * Duolingo-style 3D pill button. The darker bottom border gives the "pressable"
 * tactile look; `.duo-btn` (globals.css) animates the press.
 */
export function DuoButton({
  variant = "green",
  className = "",
  style,
  children,
  ...rest
}: DuoButtonProps) {
  const palette =
    variant === "green"
      ? {
          bg: COLORS.green,
          border: COLORS.greenBorder,
          text: COLORS.white,
        }
      : {
          bg: COLORS.white,
          border: "#E5E5E5",
          text: COLORS.inkDark,
        };

  return (
    <button
      className={`duo-btn w-full select-none rounded-2xl px-6 py-4 text-center text-lg font-extrabold uppercase tracking-wide hover:brightness-[1.03] enabled:active:brightness-95 ${className}`}
      style={{
        backgroundColor: palette.bg,
        borderBottomColor: palette.border,
        color: palette.text,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default DuoButton;
