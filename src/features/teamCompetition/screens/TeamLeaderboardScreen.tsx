"use client";

import { COLORS, type TeamId } from "../constants/teamColors";
import { useTeam, type LeaderboardEntry } from "../context/TeamContext";
import { useTeamNavigation } from "../navigation/TeamCompetitionNavigator";
import { DuoButton } from "../components/DuoButton";
import { LeaderboardRow } from "../components/LeaderboardRow";
import { PodiumRow } from "../components/PodiumRow";
import { ScreenShell } from "../components/ScreenShell";

interface TeamLeaderboardScreenProps {
  leaderboardData?: LeaderboardEntry[];
  team?: TeamId;
}

export function TeamLeaderboardScreen({
  leaderboardData: dataProp,
  team = "blue",
}: TeamLeaderboardScreenProps) {
  const ctx = useTeam();
  const { exitToHome } = useTeamNavigation();

  const isRed = team === "red";
  const data = dataProp ?? (isRed ? ctx.redLeaderboardData : ctx.leaderboardData);
  const byRank = [...data].sort((a, b) => a.rank - b.rank);
  const first = byRank.find((e) => e.rank === 1);
  const second = byRank.find((e) => e.rank === 2);
  const third = byRank.find((e) => e.rank === 3);
  const totalXP = byRank.reduce((sum, entry) => sum + entry.xp, 0);

  const accent = isRed ? COLORS.red : COLORS.blue;
  const accentDark = isRed ? COLORS.redDark : COLORS.blueDark;
  const title = isRed ? "Team Red" : "Team Blue";
  const listBg = isRed ? "#FFE7E7" : COLORS.lightBlueBg;
  const background = `
    radial-gradient(80% 34% at 50% 5%, rgba(255,255,255,0.24) 0%, transparent 70%),
    linear-gradient(180deg, ${accent} 0%, ${accentDark} 58%, ${listBg} 58%, ${listBg} 100%)
  `;

  return (
    <ScreenShell background={background}>
      <div className="flex min-h-full flex-1 flex-col px-5 pt-9">
        <div className="duo-rise text-center">
          <div
            className="mx-auto inline-flex items-center rounded-full bg-white/18 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white"
            style={{ border: "1px solid rgba(255,255,255,0.24)" }}
          >
            Weekly leaderboard
          </div>
          <h1 className="mt-3 text-[30px] font-black leading-tight text-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.25)]">
            {title}
          </h1>
          <p className="mt-1 text-sm font-black text-white/85">
            Top XP earners this week
          </p>
        </div>

        <div className="relative mt-7 h-[190px] w-full">
          <div
            className="absolute bottom-0 left-1/2 h-[74px] w-[82%] -translate-x-1/2 rounded-t-[1.75rem] border-2 border-white/20 bg-white/14 shadow-inner"
            aria-hidden
          />
          <div
            className="absolute bottom-0 left-1/2 h-10 w-[88%] -translate-x-1/2 rounded-3xl opacity-35 blur-2xl"
            style={{ background: accentDark }}
            aria-hidden
          />
          {second && (
            <div className="absolute bottom-5 left-[7%] w-[27%]">
              <PodiumRow entry={second} place={2} accentColor={accent} />
            </div>
          )}
          {first && (
            <div className="absolute bottom-11 left-1/2 w-[34%] -translate-x-1/2">
              <PodiumRow entry={first} place={1} accentColor={accent} />
            </div>
          )}
          {third && (
            <div className="absolute bottom-5 right-[7%] w-[27%]">
              <PodiumRow entry={third} place={3} accentColor={accent} />
            </div>
          )}
        </div>

        <div
          className="duo-rise mt-2 grid grid-cols-2 gap-3"
          style={{ animationDelay: "160ms" }}
        >
          <div className="rounded-2xl border-2 border-[#E5E5E5] bg-white px-4 py-3">
            <div className="text-[11px] font-black uppercase tracking-wide text-[#AFAFAF]">
              Team XP
            </div>
            <div className="mt-1 text-xl font-black tabular-nums" style={{ color: accent }}>
              {totalXP.toLocaleString("en-US")}
            </div>
          </div>
          <div className="rounded-2xl border-2 border-[#E5E5E5] bg-white px-4 py-3">
            <div className="text-[11px] font-black uppercase tracking-wide text-[#AFAFAF]">
              Reset
            </div>
            <div className="mt-1 text-xl font-black text-[#4B4B4B]">10 days</div>
          </div>
        </div>

        <div className="duo-rise mt-4 rounded-3xl border-2 border-[#E5E5E5] bg-white p-3 shadow-lg">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-sm font-black text-[#4B4B4B]">
              Rankings
            </span>
            <span className="text-xs font-black uppercase tracking-wide" style={{ color: accent }}>
              {byRank.length} learners
            </span>
          </div>
          <div className="space-y-2">
            {byRank.map((entry, i) => (
              <div
                key={`${entry.rank}-${entry.name}`}
                className="duo-rise"
                style={{ animationDelay: `${500 + i * 70}ms` }}
              >
                <LeaderboardRow entry={entry} accentColor={accent} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-7 pb-6">
          <DuoButton onClick={exitToHome}>Continue Learning</DuoButton>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamLeaderboardScreen;
