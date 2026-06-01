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
  onViewLeaderboard?: () => void;
}

/** Team standings card (one per team) used on the standings screen. */
export function TeamCard({
  team,
  name,
  xp,
  progress,
  onViewLeaderboard,
}: TeamCardProps) {
  const isBlue = team === "blue";
  const accent = isBlue ? COLORS.blue : COLORS.red;
  const cardBg = isBlue ? "rgba(28,176,246,0.22)" : "rgba(255,75,75,0.22)";

  const animatedXP = useCountUp(xp, { durationMs: 1200, delayMs: 250 });

  // Grow the progress bar from 0 once mounted.
  const [barReady, setBarReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setBarReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="duo-lift relative flex flex-1 flex-col items-center rounded-3xl px-3 pb-4 pt-5"
      style={{
        background: cardBg,
        border: "2px solid rgba(255,255,255,0.35)",
        borderBottomWidth: 5,
        borderBottomColor: "rgba(0,0,0,0.12)",
        boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
      }}
    >
      <Sparkle
        size={16}
        delayMs={isBlue ? 0 : 600}
        className="absolute left-3 top-3"
        color="rgba(255,255,255,0.9)"
      />

      {/* CHARACTER_IMAGE: blue=Eddy / red=Junior standings mascot */}
      <CharacterPlaceholder
        width={100}
        height={110}
        tint="rgba(255,255,255,0.22)"
        hint={isBlue ? "Eddy" : "Junior"}
        className="duo-bob"
      />

      <div className="mt-3 text-center text-sm font-extrabold text-white">
        {name}
      </div>

      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-black text-white tabular-nums">
          {formatXP(animatedXP)}
        </span>
        <span className="text-sm font-extrabold text-white/80">XP</span>
      </div>

      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-black/15">
        <div
          className="h-full rounded-full"
          style={{
            width: `${(barReady ? Math.max(0, Math.min(1, progress)) : 0) * 100}%`,
            background: accent,
            transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s",
          }}
        />
      </div>

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
