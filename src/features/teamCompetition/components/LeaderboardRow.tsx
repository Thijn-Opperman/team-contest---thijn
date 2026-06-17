import { formatXP } from "../constants/teamColors";
import type { LeaderboardEntry } from "../context/TeamContext";

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  accentColor?: string;
  isCurrentUser?: boolean;
}

/** A ranked row in the leaderboard list (rank | avatar | name | xp). */
export function LeaderboardRow({
  entry,
  accentColor = "#1CB0F6",
  isCurrentUser = entry.isCurrentUser,
}: LeaderboardRowProps) {
  const isTopThree = entry.rank <= 3;

  return (
    <div
      id={isCurrentUser ? "leaderboard-you" : undefined}
      className={`duo-lift flex items-center gap-3 rounded-2xl border-2 border-b-[4px] px-3 py-2 ${
        isCurrentUser ? "ring-2 ring-offset-1" : "bg-white"
      }`}
      style={{
        borderColor: isCurrentUser ? accentColor : isTopThree ? `${accentColor}55` : "#E5E5E5",
        borderBottomColor: isCurrentUser ? accentColor : isTopThree ? accentColor : "#D7D7D7",
        background: isCurrentUser ? `${accentColor}14` : undefined,
        ringColor: isCurrentUser ? `${accentColor}66` : undefined,
      }}
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
        style={{ background: isCurrentUser || isTopThree ? accentColor : "#AFAFAF" }}
      >
        {entry.rank}
      </span>

      {entry.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.avatarUrl}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        /* CHARACTER_IMAGE: replace with user avatar */
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 bg-zinc-200"
          style={{ borderColor: isTopThree ? accentColor : "#FFFFFF" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#9ca3af">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1Z" />
          </svg>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <div className="truncate text-[13px] font-black text-zinc-800">
            {entry.name}
          </div>
          {isCurrentUser && (
            <span
              className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-white"
              style={{ background: accentColor }}
            >
              You
            </span>
          )}
        </div>
        <div className="text-[11px] font-bold text-zinc-400">
          {isCurrentUser ? "Your rank" : isTopThree ? "Top 3" : "Member"}
        </div>
      </div>

      <span className="text-[13px] font-black tabular-nums" style={{ color: accentColor }}>
        +{formatXP(entry.xp)} XP
      </span>
    </div>
  );
}

export default LeaderboardRow;
