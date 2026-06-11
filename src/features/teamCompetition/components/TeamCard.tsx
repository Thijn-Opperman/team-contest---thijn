"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COLORS, formatXP, type TeamId } from "../constants/teamColors";
import { useCountUp } from "../hooks/useCountUp";
import { CharacterPlaceholder } from "./CharacterPlaceholder";

interface TeamCardProps {
  team: TeamId;
  name: string;
  xp: number;
  /** 0..1 fill of the progress bar. */
  progress: number;
  href: string;
  isLeading?: boolean;
  gapLabel?: string;
}

/** Team standings card (one per team) used on the standings screen. */
export function TeamCard({
  team,
  name,
  xp,
  progress,
  href,
  isLeading = false,
  gapLabel,
}: TeamCardProps) {
  const isBlue = team === "blue";
  const accent = isBlue ? COLORS.blue : COLORS.red;
  const accentDark = isBlue ? COLORS.blueDark : COLORS.redDark;
  const accentBorder = isBlue ? COLORS.blueBorder : COLORS.redBorder;
  const cardBg = `linear-gradient(180deg, ${accent} 0%, ${accentDark} 100%)`;

  const animatedXP = useCountUp(xp, { durationMs: 1200, delayMs: 250 });

  // Grow the progress bar from 0 once mounted.
  const [barReady, setBarReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setBarReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Link
      href={href}
      aria-label={`View ${name} leaderboard`}
      className="duo-lift duo-tap relative z-[1] flex h-full min-h-[208px] min-w-0 w-full flex-col items-center overflow-hidden rounded-2xl px-2 pb-3 pt-2.5 text-center"
      style={{
        background: cardBg,
        border: "2px solid rgba(255,255,255,0.45)",
        borderBottomWidth: 5,
        borderBottomColor: accentBorder,
        boxShadow: "0 6px 0 rgba(0,0,0,0.12)",
      }}
    >
      {isLeading && (
        <div
          className="absolute right-2 top-2 z-20 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white"
          style={{ background: COLORS.green, boxShadow: "0 3px 0 #46A302" }}
        >
          #1
        </div>
      )}

      {/* CHARACTER_IMAGE: blue=Junior / red=Eddy standings mascot */}
      <CharacterPlaceholder
        width={88}
        height={82}
        tint="rgba(255,255,255,0.12)"
        hint={isBlue ? "Junior" : "Eddy"}
        src={isBlue ? "/junior.png" : "/eddy.png"}
        alt={isBlue ? "Junior mascot" : "Eddy mascot"}
        imageClassName="drop-shadow-[0_6px_2px_rgba(0,0,0,0.16)] pointer-events-none"
        className="duo-bob pointer-events-none"
      />

      <div className="mt-1 flex min-h-[2rem] items-center justify-center text-center text-[11px] font-black leading-tight text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.24)]">
        {name}
      </div>

      <div className="mt-1 flex items-baseline gap-0.5">
        <span className="text-[22px] font-black text-white tabular-nums leading-none">
          {formatXP(animatedXP)}
        </span>
        <span className="text-xs font-extrabold text-white/75">XP</span>
      </div>

      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-black/25">
        <div
          className="h-full rounded-full bg-white/90"
          style={{
            width: `${(barReady ? Math.max(0, Math.min(1, progress)) : 0) * 100}%`,
            transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s",
          }}
        />
      </div>

      <div className="mt-2 flex min-h-[14px] items-center justify-center text-center text-[10px] font-black text-white/90">
        {gapLabel ?? "\u00A0"}
      </div>

      <span className="mt-auto text-[10px] font-black uppercase tracking-wide text-white/90 underline decoration-1 underline-offset-2">
        Leaderboard
      </span>
    </Link>
  );
}

export default TeamCard;
