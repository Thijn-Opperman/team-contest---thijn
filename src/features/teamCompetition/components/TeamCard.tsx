"use client";

import { useEffect, useState } from "react";
import { COLORS, formatXP, type TeamId } from "../constants/teamColors";
import { useCountUp } from "../hooks/useCountUp";
import { CharacterPlaceholder } from "./CharacterPlaceholder";
import { Sparkle } from "./Sparkle";

interface TeamCardProps {
  team: TeamId;
  name: string;
  xp: number;
  /** 0..1 fill of the progress bar. */
  progress: number;
  isLeading?: boolean;
  gapLabel?: string;
  onViewLeaderboard?: () => void;
}

/** Team standings card (one per team) used on the standings screen. */
export function TeamCard({
  team,
  name,
  xp,
  progress,
  isLeading = false,
  gapLabel,
  onViewLeaderboard,
}: TeamCardProps) {
  const isBlue = team === "blue";
  const accent = isBlue ? COLORS.blue : COLORS.red;
  const accentDark = isBlue ? COLORS.blueDark : COLORS.redDark;
  const cardBg = `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, ${accent} 45%, ${accentDark} 100%)`;

  const animatedXP = useCountUp(xp, { durationMs: 1200, delayMs: 250 });

  // Grow the progress bar from 0 once mounted.
  const [barReady, setBarReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setBarReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="duo-lift relative flex flex-1 flex-col items-center overflow-hidden rounded-3xl px-3 pb-4 pt-4"
      style={{
        background: cardBg,
        border: "2px solid rgba(255,255,255,0.55)",
        borderBottomWidth: 5,
        borderBottomColor: "rgba(0,0,0,0.12)",
        boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
      }}
    >
      {isLeading && (
        <div
          className="absolute right-2 top-2 z-20 rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white"
          style={{ background: COLORS.green, boxShadow: "0 3px 0 rgba(0,0,0,0.14)" }}
        >
          Leading
        </div>
      )}

      <Sparkle
        size={16}
        delayMs={isBlue ? 0 : 600}
        className="absolute left-3 top-3"
        color="rgba(255,255,255,0.9)"
      />

      {/* CHARACTER_IMAGE: blue=Eddy / red=Junior standings mascot */}
      <CharacterPlaceholder
        width={118}
        height={112}
        tint="rgba(255,255,255,0.20)"
        hint={isBlue ? "Eddy" : "Junior"}
        src={isBlue ? "/junior.png" : "/eddy.png"}
        alt={isBlue ? "Eddy mascot" : "Junior mascot"}
        imageClassName="drop-shadow-[0_6px_2px_rgba(0,0,0,0.16)]"
        className="duo-bob"
      />

      <div className="mt-1 text-center text-sm font-black leading-tight text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.24)]">
        {name}
      </div>

      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-black text-white tabular-nums">
          {formatXP(animatedXP)}
        </span>
        <span className="text-sm font-extrabold text-white/80">XP</span>
      </div>

      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-black/20 shadow-inner">
        <div
          className="h-full rounded-full"
          style={{
            width: `${(barReady ? Math.max(0, Math.min(1, progress)) : 0) * 100}%`,
            background: `linear-gradient(90deg, #6BE7FF 0%, ${accentDark} 100%)`,
            transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s",
          }}
        />
      </div>

      {gapLabel && (
        <div className="mt-2 text-center text-[11px] font-black text-white/85">
          {gapLabel}
        </div>
      )}

      <button
        type="button"
        onClick={onViewLeaderboard}
        className="duo-tap mt-3 text-xs font-bold text-white underline underline-offset-2 hover:text-white/80"
      >
        View leaderboard
      </button>
    </div>
  );
}

export default TeamCard;
