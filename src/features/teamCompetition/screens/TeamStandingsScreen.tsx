"use client";

import type { ReactNode } from "react";
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

const BACKGROUND = `
  radial-gradient(90% 55% at 50% 14%, rgba(255,255,255,0.35) 0%, transparent 60%),
  linear-gradient(105deg, ${COLORS.blue} 0%, ${COLORS.blue} 39%, rgba(255,255,255,0.32) 50%, ${COLORS.red} 61%, ${COLORS.red} 100%)
`;

function TitleRibbon() {
  return (
    <div className="relative mx-[-20px] h-[88px] shrink-0">
      <div
        className="absolute inset-x-0 top-0 flex h-[76px] items-center justify-center gap-3 shadow-lg"
        style={{
          background: COLORS.green,
          borderBottom: `5px solid ${COLORS.greenBorder}`,
          borderBottomLeftRadius: "50% 18px",
          borderBottomRightRadius: "50% 18px",
        }}
      >
        <Sparkle size={22} color="#1ED760" className="absolute left-8 top-4" />
        <Sparkle
          size={18}
          color="#B9F57A"
          delayMs={450}
          className="absolute left-16 top-6"
        />
        <h1 className="text-[24px] font-black text-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.32)]">
          Team standings
        </h1>
        <Sparkle
          size={24}
          color="#B9F57A"
          delayMs={700}
          className="absolute right-8 top-5"
        />
      </div>
    </div>
  );
}

function InfoChip({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="duo-rise flex flex-1 items-center gap-2 rounded-2xl border-2 border-[#E5E5E5] bg-white px-3 py-2 shadow-sm">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 bg-[#F7F7F7] shadow-sm"
        style={{ borderColor: "#E5E5E5" }}
        aria-hidden
      >
        {icon}
      </span>
      <div>
        <div className="text-[11px] font-black uppercase tracking-wide text-[#AFAFAF]">
          {label}
        </div>
        <div className="text-sm font-black text-[#4B4B4B]">
          {value}
        </div>
      </div>
    </div>
  );
}

function TrophyIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 4h10v4.5a5 5 0 0 1-10 0V4Z"
        fill="#FFC800"
        stroke="#E6A800"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7 5.5H4.5v1.8A3.1 3.1 0 0 0 7 10.3M17 5.5h2.5v1.8a3.1 3.1 0 0 1-2.5 3"
        stroke="#E6A800"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13.5V17M9 20h6M10 17h4l.8 3H9.2l.8-3Z"
        stroke="#E6A800"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="5.5"
        width="16"
        height="14"
        rx="3"
        fill="#EAF7FF"
        stroke="#1CB0F6"
        strokeWidth="2"
      />
      <path d="M4 10h16" stroke="#1CB0F6" strokeWidth="2" />
      <path d="M8 4v3M16 4v3" stroke="#1CB0F6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="14" r="1.1" fill="#1CB0F6" />
      <circle cx="13" cy="14" r="1.1" fill="#1CB0F6" />
      <circle cx="17" cy="14" r="1.1" fill="#1CB0F6" />
    </svg>
  );
}

function HeartIcon({ color }: { color: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.4S5 16.1 5 10.2C5 7.6 6.7 6 8.8 6c1.4 0 2.5.8 3.2 1.8C12.7 6.8 13.8 6 15.2 6 17.3 6 19 7.6 19 10.2c0 5.9-7 10.2-7 10.2Z"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TeamStandingsScreen({
  blueXP: blueXPProp,
  redXP: redXPProp,
}: TeamStandingsScreenProps) {
  const ctx = useTeam();
  const {
    exitToHome,
    goLeaderboard,
    goRedLeaderboard,
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
  const trailingTeam = blueLeads ? "Red" : "Blue";
  const assignedLabel =
    ctx.assignedTeam === "blue"
      ? "View Team Blue"
      : ctx.assignedTeam === "red"
        ? "View Team Red"
        : "Spin first";

  return (
    <ScreenShell background={BACKGROUND}>
      <div className="flex min-h-full flex-1 flex-col px-5">
        <TitleRibbon />

        <div
          className="duo-rise -mt-1 text-center text-sm font-black text-white/90 drop-shadow-[0_2px_1px_rgba(0,0,0,0.22)]"
          style={{ animationDelay: "80ms" }}
        >
          Current team scores
        </div>

        {/* Team cards */}
        <div
          className="duo-rise mt-5 flex items-stretch gap-3"
          style={{ animationDelay: "120ms" }}
        >
          <TeamCard
            team="blue"
            name={TEAMS.blue.standingsName}
            xp={blueXP}
            progress={blueProgress}
            isLeading={blueLeads}
            gapLabel={blueLeads ? "Defending #1" : `${formatXP(diff)} XP behind`}
            onViewLeaderboard={goLeaderboard}
          />
          <TeamCard
            team="red"
            name={TEAMS.red.standingsName}
            xp={redXP}
            progress={redProgress}
            isLeading={!blueLeads}
            gapLabel={!blueLeads ? "Defending #1" : `${formatXP(diff)} XP behind`}
            onViewLeaderboard={goRedLeaderboard}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <InfoChip icon={<TrophyIcon />} label="Reward" value="Team chest" />
          <InfoChip icon={<CalendarIcon />} label="Reset in" value="10 days" />
        </div>

        {/* Leading team banner */}
        <div
          className="duo-rise relative mt-5 overflow-hidden rounded-2xl border-2 border-white/55 px-5 py-4 text-center shadow-lg"
          style={{ background: "rgba(255,255,255,0.78)", animationDelay: "260ms" }}
        >
          <span className="duo-shimmer pointer-events-none absolute inset-0" />
          <div className="relative mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md">
            <HeartIcon color={leaderColor} />
          </div>
          <div
            className="relative text-[17px] font-black tabular-nums"
            style={{ color: leaderColor }}
          >
            {leaderName} team is leading by {formatXP(animatedDiff)} XP
          </div>
          <div
            className="relative mt-1 text-xs font-black"
            style={{ color: leaderColor }}
          >
            {trailingTeam} needs {formatXP(diff)} XP to catch up.
          </div>
        </div>

        <div
          className="duo-rise mt-4 rounded-2xl border-2 border-white/45 bg-white/18 px-4 py-3 text-center text-sm font-black text-white backdrop-blur-sm"
          style={{ animationDelay: "330ms" }}
        >
          Today&apos;s bonus: finish 2 lessons for extra team XP.
        </div>

        <div
          className="duo-rise mt-auto flex flex-col gap-3 pt-7 pb-6"
          style={{ animationDelay: "360ms" }}
        >
          <DuoButton
            variant="white"
            onClick={ctx.assignedTeam ? goWelcome : goWheel}
          >
            {assignedLabel}
          </DuoButton>
          <DuoButton onClick={exitToHome}>Continue Learning</DuoButton>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamStandingsScreen;
