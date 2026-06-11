"use client";

import { COLORS, TEAMS, formatXP } from "../constants/teamColors";
import { useTeam } from "../context/TeamContext";
import { useCountUp } from "../hooks/useCountUp";
import { useTeamNavigation, TEAM_ROUTES } from "../navigation/TeamCompetitionNavigator";
import { DuoButton } from "../components/DuoButton";
import { PageTitleRibbon } from "../components/PageTitleRibbon";
import { ScreenShell } from "../components/ScreenShell";
import { Sparkle } from "../components/Sparkle";
import { TeamCard } from "../components/TeamCard";

interface TeamStandingsScreenProps {
  blueXP?: number;
  redXP?: number;
}

/** Matches the foreground hill green at the bottom edge of wheel-hills-bg.png. */
const WHEEL_GROUND = "#96C551";

function StandingsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: WHEEL_GROUND }} />
      <div
        className="absolute inset-x-0 top-0 h-[58%]"
        style={{
          background: `url('/wheel-hills-bg.png') center top / cover no-repeat, ${WHEEL_GROUND}`,
        }}
      />
    </div>
  );
}

function SkyDecorations() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[38%]"
      aria-hidden
    >
      <Sparkle size={20} color="#C8EB9A" className="absolute left-[10%] top-[22%]" />
      <Sparkle
        size={14}
        color="#A5E8C0"
        delayMs={320}
        className="absolute left-[24%] top-[10%]"
      />
      <Sparkle
        size={18}
        color="#DDF4C8"
        delayMs={640}
        className="absolute left-[38%] top-[28%]"
      />
      <Sparkle
        size={12}
        color="#B9F57A"
        delayMs={180}
        className="absolute left-[52%] top-[8%]"
      />
      <Sparkle
        size={22}
        color="#C8EB9A"
        delayMs={880}
        className="absolute right-[18%] top-[18%]"
      />
      <Sparkle
        size={15}
        color="#A5E8C0"
        delayMs={520}
        className="absolute right-[32%] top-[32%]"
      />
    </div>
  );
}

function VsBadge() {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-white text-xs font-black text-white shadow-[0_4px_0_#E6A800]"
      style={{ background: COLORS.gold }}
      aria-hidden
    >
      VS
    </div>
  );
}

export function TeamStandingsScreen({
  blueXP: blueXPProp,
  redXP: redXPProp,
}: TeamStandingsScreenProps) {
  const ctx = useTeam();
  const {
    exitToHome,
    goWelcome,
    goWheel,
  } = useTeamNavigation();

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

  const assignedLabel =
    ctx.assignedTeam === "blue"
      ? "View Team Blue"
      : ctx.assignedTeam === "red"
        ? "View Team Red"
        : "Spin first";

  return (
    <ScreenShell background={COLORS.white} className="pt-0">
      <StandingsBackground />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 w-full">
          <PageTitleRibbon
            title="Team standings"
            fullBleed
            variant="green"
            showDuo={false}
          />
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col">
          <SkyDecorations />

          <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pt-4">
            <div className="duo-rise grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-x-1.5">
              <TeamCard
                team="blue"
                name={TEAMS.blue.standingsName}
                xp={blueXP}
                progress={blueProgress}
                href={TEAM_ROUTES.leaderboard}
                isLeading={blueLeads}
                gapLabel={blueLeads ? undefined : `${formatXP(diff)} XP behind`}
              />
              <div className="pointer-events-none flex self-center justify-center">
                <VsBadge />
              </div>
              <TeamCard
                team="red"
                name={TEAMS.red.standingsName}
                xp={redXP}
                progress={redProgress}
                href={TEAM_ROUTES.redLeaderboard}
                isLeading={!blueLeads}
                gapLabel={!blueLeads ? undefined : `${formatXP(diff)} XP behind`}
              />
            </div>

            <div
              className="duo-rise mt-4 rounded-2xl border-2 border-[#E5E5E5] border-b-4 bg-white px-4 py-3 text-center shadow-sm"
              style={{ animationDelay: "180ms" }}
            >
              <p className="text-[16px] font-black" style={{ color: leaderColor }}>
                Team {leaderName} is winning!
              </p>
              <p className="mt-1 text-sm font-bold text-[#777777]">
                <span className="tabular-nums" style={{ color: leaderColor }}>
                  {formatXP(animatedDiff)} XP
                </span>{" "}
                ahead
              </p>
            </div>

            <p
              className="duo-rise mt-3 text-center text-xs font-black uppercase tracking-[0.14em] text-[#777777]"
              style={{ animationDelay: "260ms" }}
            >
              Resets in 10 days
            </p>

            <div
              className="duo-rise mt-auto flex flex-col gap-2.5 pb-5 pt-4"
              style={{ animationDelay: "320ms" }}
            >
              <DuoButton
                variant="white"
                onClick={ctx.assignedTeam ? goWelcome : goWheel}
                className="py-3.5 text-base"
              >
                {assignedLabel}
              </DuoButton>
              <DuoButton onClick={exitToHome} className="py-3.5 text-base">
                Continue Learning
              </DuoButton>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamStandingsScreen;
