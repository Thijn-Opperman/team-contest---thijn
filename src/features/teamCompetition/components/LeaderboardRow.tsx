import { formatXP } from "../constants/teamColors";
import type { LeaderboardEntry } from "../context/TeamContext";

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
}

/** A ranked row in the leaderboard list (rank | avatar | name | xp). */
export function LeaderboardRow({ entry }: LeaderboardRowProps) {
  return (
    <div className="duo-lift flex items-center gap-3 rounded-2xl border-2 border-b-[3px] border-[#E5E5E5] bg-white px-3 py-2.5 hover:border-[#1CB0F6]/40">
      <span className="w-5 text-center text-sm font-black text-zinc-500">
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
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#9ca3af">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1Z" />
          </svg>
        </div>
      )}

      <span className="flex-1 truncate text-sm font-bold text-zinc-800">
        {entry.name}
      </span>

      <span className="text-sm font-extrabold text-zinc-500">
        +{formatXP(entry.xp)} XP
      </span>
    </div>
  );
}

export default LeaderboardRow;
