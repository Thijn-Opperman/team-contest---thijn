import type { TeamId } from "../constants/teamColors";
import type { LeaderboardEntry } from "../context/TeamContext";

/** Mock weekly XP for the signed-in learner on each team. */
const CURRENT_USER_XP: Record<TeamId, number> = {
  blue: 3890,
  red: 3890,
};

export const CURRENT_USER_NAME = "You";

/** Mocked position for the signed-in learner. */
const CURRENT_USER_RANK = 64;

export interface LeaderboardDisplay {
  top: LeaderboardEntry[];
  currentUser?: LeaderboardEntry;
}

/** Build a leaderboard UI model: top 5 + (optional) current user row. */
export function buildLeaderboardDisplay(
  entries: LeaderboardEntry[],
  team: TeamId,
  assignedTeam: TeamId | null
): LeaderboardDisplay {
  const sorted = [...entries]
    .filter((entry) => !entry.isCurrentUser)
    .sort((a, b) => b.xp - a.xp);

  const top = sorted
    .slice(0, 5)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const currentUser =
    assignedTeam === team
      ? ({
          rank: CURRENT_USER_RANK,
          name: CURRENT_USER_NAME,
          xp: CURRENT_USER_XP[team],
          avatarUrl: null,
          isCurrentUser: true,
        } satisfies LeaderboardEntry)
      : undefined;

  return { top, currentUser };
}

export function findCurrentUserEntry(
  entries: LeaderboardEntry[]
): LeaderboardEntry | undefined {
  return entries.find((entry) => entry.isCurrentUser);
}
