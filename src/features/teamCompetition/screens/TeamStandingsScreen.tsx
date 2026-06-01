"use client";

import { COLORS, TEAMS, formatXP } from "../constants/teamColors";
import { useTeam } from "../context/TeamContext";
import { useCountUp } from "../hooks/useCountUp";
import { useTeamNavigation } from "../navigation/TeamCompetitionNavigator";
import { DuoButton } from "../components/DuoButton";
import { ScreenShell } from "../components/ScreenShell";
import { Sparkle } from "../components/Sparkle";
import { TeamCard } from "../components/TeamCard";

interface TeamStandingsScreenProps {
  blueXP?: number;
  redXP?: number;
}

const BACKGROUND = `linear-gradient(110deg, ${COLORS.blue} 0%, ${COLORS.blue} 35%, ${COLORS.red} 65%, ${COLORS.red} 100%)`;

export function TeamStandingsScreen({
  blueXP: blueXPProp,
  redXP: redXPProp,
}: TeamStandingsScreenProps) {
  const ctx = useTeam();
  const { exitToHome, goLeaderboard } = useTeamNavigation();

  const blueXP = blueXPProp ?? ctx.blueXP;
  const redXP = redXPProp ?? ctx.redXP;

  const blueLeads = blueXP >= redXP;
  const diff = Math.abs(blueXP - redXP);
  const leaderColor = blueLeads ? COLORS.blue : COLORS.red;
  const leaderName = blueLeads ? "Blue" : "Red";

  const max = Math.max(blueXP, redXP, 1);
  const blueProgress = blueXP / max;
  const redProgress = redXP / max;

  const animatedDiff = useCountUp(diff, { durationMs: 1200, delayMs: 500 });

  return (
    <ScreenShell background={BACKGROUND}>
      <div className="flex flex-1 flex-col px-5 pt-10">
        {/* Green title banner */}
        <div
          className="duo-rise mx-auto flex items-center gap-2 rounded-2xl px-6 py-2.5 shadow-md"
          style={{ background: COLORS.green, borderBottom: `4px solid ${COLORS.greenBorder}` }}
        >
          <Sparkle size={16} color="#DFFFC0" />
          <span className="text-lg font-black text-white">Team standings</span>
          <Sparkle size={16} color="#DFFFC0" delayMs={500} />
        </div>

        {/* Team cards */}
        <div
          className="duo-rise mt-7 flex items-stretch gap-3"
          style={{ animationDelay: "120ms" }}
        >
          <TeamCard
            team="blue"
            name={TEAMS.blue.standingsName}
            xp={blueXP}
            progress={blueProgress}
            onViewLeaderboard={goLeaderboard}
          />
          <TeamCard
            team="red"
            name={TEAMS.red.standingsName}
            xp={redXP}
            progress={redProgress}
            onViewLeaderboard={goLeaderboard}
          />
        </div>

        {/* Leading team banner */}
        <div
          className="duo-rise relative mt-7 overflow-hidden rounded-2xl px-5 py-4 text-center"
          style={{ background: "rgba(255,255,255,0.82)", animationDelay: "260ms" }}
        >
          <span className="duo-shimmer pointer-events-none absolute inset-0" />
          <div
            className="relative text-base font-black tabular-nums"
            style={{ color: leaderColor }}
          >
            {leaderName} team is leading by {formatXP(animatedDiff)} XP
          </div>
          <div
            className="relative mt-0.5 text-xs font-bold"
            style={{ color: leaderColor }}
          >
            Keep earning XP to stay ahead!
          </div>
        </div>

        <div
          className="duo-rise mt-auto pt-7 pb-5"
          style={{ animationDelay: "360ms" }}
        >
          <DuoButton onClick={exitToHome}>Continue Learning</DuoButton>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamStandingsScreen;
