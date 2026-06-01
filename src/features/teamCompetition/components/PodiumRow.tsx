"use client";

import { COLORS, formatXP } from "../constants/teamColors";
import type { LeaderboardEntry } from "../context/TeamContext";
import { useCountUp } from "../hooks/useCountUp";

interface PodiumAvatarProps {
  entry: LeaderboardEntry;
  /** Visual emphasis: 1st place is larger and elevated. */
  place: 1 | 2 | 3;
}

const SIZES: Record<1 | 2 | 3, number> = { 1: 64, 2: 56, 3: 56 };
const POP_DELAY: Record<1 | 2 | 3, number> = { 1: 120, 2: 0, 3: 240 };

function Avatar({ url, size }: { url?: string | null; size: number }) {
  return (
    <div
      className="overflow-hidden rounded-full bg-white"
      style={{
        width: size,
        height: size,
        border: `3px solid ${COLORS.blue}`,
        boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
      }}
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="h-full w-full object-cover" />
      ) : (
        /* CHARACTER_IMAGE: replace with user avatar */
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-zinc-200 to-zinc-300">
          <svg width="55%" height="55%" viewBox="0 0 24 24" fill="#9ca3af">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1Z" />
          </svg>
        </div>
      )}
    </div>
  );
}

/** A single podium position (1st / 2nd / 3rd). */
export function PodiumRow({ entry, place }: PodiumAvatarProps) {
  const size = SIZES[place];
  const delay = POP_DELAY[place];
  const animatedXP = useCountUp(entry.xp, { durationMs: 1100, delayMs: 400 + delay });

  return (
    <div className="flex flex-col items-center">
      <div
        className="duo-pop relative"
        style={{ animationDelay: `${delay}ms` }}
      >
        <Avatar url={entry.avatarUrl} size={size} />
        <span
          className="absolute -bottom-1 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full text-xs font-black text-white"
          style={{
            background: COLORS.blue,
            border: "2px solid #fff",
          }}
        >
          {place}
        </span>
      </div>
      <div
        className="duo-rise mt-2 text-sm font-extrabold text-white"
        style={{ animationDelay: `${delay + 150}ms` }}
      >
        {entry.name}
      </div>
      <div
        className="duo-rise text-xs font-bold text-white/80 tabular-nums"
        style={{ animationDelay: `${delay + 220}ms` }}
      >
        +{formatXP(animatedXP)} XP
      </div>
    </div>
  );
}

export default PodiumRow;
