"use client";

import { COLORS, formatXP } from "../constants/teamColors";
import type { LeaderboardEntry } from "../context/TeamContext";
import { useCountUp } from "../hooks/useCountUp";

interface PodiumAvatarProps {
  entry: LeaderboardEntry;
  /** Visual emphasis: 1st place is larger and elevated. */
  place: 1 | 2 | 3;
  accentColor?: string;
}

const SIZES: Record<1 | 2 | 3, number> = { 1: 58, 2: 48, 3: 48 };
const POP_DELAY: Record<1 | 2 | 3, number> = { 1: 120, 2: 0, 3: 240 };

function Avatar({
  url,
  size,
  accentColor,
}: {
  url?: string | null;
  size: number;
  accentColor: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-full bg-white"
      style={{
        width: size,
        height: size,
        border: `4px solid ${accentColor}`,
        boxShadow: "0 6px 12px rgba(0,0,0,0.22), inset 0 0 0 2px #fff",
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
export function PodiumRow({
  entry,
  place,
  accentColor = COLORS.blue,
}: PodiumAvatarProps) {
  const size = SIZES[place];
  const delay = POP_DELAY[place];
  const animatedXP = useCountUp(entry.xp, { durationMs: 1100, delayMs: 400 + delay });

  return (
    <div className="flex flex-col items-center">
      <div className="duo-pop relative" style={{ animationDelay: `${delay}ms` }}>
        {place === 1 && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-lg drop-shadow-md">
            👑
          </div>
        )}
        <Avatar url={entry.avatarUrl} size={size} accentColor={accentColor} />
        <span
          className="absolute -bottom-1 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full text-xs font-black text-white"
          style={{
            background: accentColor,
            border: "2px solid #fff",
          }}
        >
          {place}
        </span>
      </div>
      <div
        className="duo-rise mt-1.5 text-center text-[12px] font-black leading-tight text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.25)]"
        style={{ animationDelay: `${delay + 150}ms` }}
      >
        {entry.name}
      </div>
      <div
        className="duo-rise text-[10px] font-black text-white/85 tabular-nums"
        style={{ animationDelay: `${delay + 220}ms` }}
      >
        +{formatXP(animatedXP)} XP
      </div>
    </div>
  );
}

export default PodiumRow;
