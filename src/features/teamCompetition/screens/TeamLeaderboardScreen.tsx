"use client";

import { COLORS } from "../constants/teamColors";
import { useTeam, type LeaderboardEntry } from "../context/TeamContext";
import { useTeamNavigation } from "../navigation/TeamCompetitionNavigator";
import { DuoButton } from "../components/DuoButton";
import { LeaderboardRow } from "../components/LeaderboardRow";
import { PodiumRow } from "../components/PodiumRow";
import { ScreenShell } from "../components/ScreenShell";
import { Sparkle } from "../components/Sparkle";

interface TeamLeaderboardScreenProps {
  leaderboardData?: LeaderboardEntry[];
}

export function TeamLeaderboardScreen({
  leaderboardData: dataProp,
}: TeamLeaderboardScreenProps) {
  const ctx = useTeam();
  const { exitToHome } = useTeamNavigation();

  const data = dataProp ?? ctx.leaderboardData;
  const byRank = [...data].sort((a, b) => a.rank - b.rank);
  const first = byRank.find((e) => e.rank === 1);
  const second = byRank.find((e) => e.rank === 2);
  const third = byRank.find((e) => e.rank === 3);

  // Blue hero gradient (matches the mock) so the white podium text stays legible.
  const background = `linear-gradient(180deg, ${COLORS.blue} 0%, ${COLORS.blueDark} 70%, ${COLORS.lightBlueBg} 70%, ${COLORS.lightBlueBg} 100%)`;

  return (
    <ScreenShell background={background}>
      <div className="flex flex-1 flex-col px-5 pt-10">
        {/* Green title banner */}
        <div
          className="duo-rise mx-auto flex items-center gap-2 rounded-2xl px-6 py-2.5 shadow-md"
          style={{ background: COLORS.green, borderBottom: `4px solid ${COLORS.greenBorder}` }}
        >
          <Sparkle size={16} color="#DFFFC0" />
          <span className="text-lg font-black text-white">Leaderboard</span>
          <Sparkle size={16} color="#DFFFC0" delayMs={500} />
        </div>

        {/* Podium (staggered via absolute positioning) */}
        <div className="relative mt-8 h-44 w-full">
          {second && (
            <div className="absolute bottom-0 left-[6%] w-[28%]">
              <PodiumRow entry={second} place={2} />
            </div>
          )}
          {first && (
            <div className="absolute bottom-6 left-1/2 w-[34%] -translate-x-1/2">
              <PodiumRow entry={first} place={1} />
            </div>
          )}
          {third && (
            <div className="absolute bottom-0 right-[6%] w-[28%]">
              <PodiumRow entry={third} place={3} />
            </div>
          )}
        </div>

        {/* Ranked list */}
        <div className="mt-4 rounded-3xl bg-white/55 p-3 shadow-inner backdrop-blur-sm">
          <div className="space-y-2">
            {byRank.map((entry, i) => (
              <div
                key={`${entry.rank}-${entry.name}`}
                className="duo-rise"
                style={{ animationDelay: `${500 + i * 70}ms` }}
              >
                <LeaderboardRow entry={entry} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-7 pb-5">
          <DuoButton onClick={exitToHome}>Continue Learning</DuoButton>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamLeaderboardScreen;
