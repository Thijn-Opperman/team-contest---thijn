"use client";

import type { ReactNode } from "react";
import { COLORS, TEAMS } from "../constants/teamColors";
import { useTeam } from "../context/TeamContext";
import { useTeamNavigation } from "../navigation/TeamCompetitionNavigator";
import { CharacterPlaceholder } from "../components/CharacterPlaceholder";
import { DuoButton } from "../components/DuoButton";
import { ScreenShell } from "../components/ScreenShell";
import { Sparkle } from "../components/Sparkle";

const FEATURES = [
  { icon: "xp", label: "Earn XP for the team" },
  { icon: "calendar", label: "Monthly resets (10 days left)" },
  { icon: "community", label: "Build a strong community" },
];

function FeatureIcon({
  type,
  accent,
  children,
}: {
  type: string;
  accent: string;
  children?: ReactNode;
}) {
  if (children) {
    return (
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 bg-white shadow-md"
        style={{ color: accent, borderColor: `${accent}55` }}
        aria-hidden
      >
        {children}
      </span>
    );
  }

  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
  };

  if (type === "xp") {
    return (
      <FeatureIcon type={type} accent={accent}>
        <svg {...common}>
          <path
            d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7L6.8 19l1-5.8L3.6 9.1l5.8-.8L12 3Z"
            fill="#FFC800"
            stroke="#E6A800"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </FeatureIcon>
    );
  }

  if (type === "calendar") {
    return (
      <FeatureIcon type={type} accent={accent}>
        <svg {...common}>
          <rect
            x="4"
            y="5.5"
            width="16"
            height="14"
            rx="3"
            fill="#EEF8FF"
            stroke={accent}
            strokeWidth="2"
          />
          <path d="M4 10h16" stroke={accent} strokeWidth="2" />
          <path d="M8 4v3M16 4v3" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <circle cx="9" cy="14" r="1.1" fill={accent} />
          <circle cx="13" cy="14" r="1.1" fill={accent} />
          <circle cx="17" cy="14" r="1.1" fill={accent} />
        </svg>
      </FeatureIcon>
    );
  }

  return (
    <FeatureIcon type={type} accent={accent}>
      <svg {...common}>
        <circle cx="9" cy="8" r="3" fill="#E5F8D6" stroke={accent} strokeWidth="2.2" />
        <circle cx="16.8" cy="9.4" r="2.4" fill="#E5F8D6" stroke={accent} strokeWidth="2.2" />
        <path
          d="M4 19c.5-3.1 2.7-5 5-5s4.5 1.9 5 5"
          stroke={accent}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M14.7 14.6c2.5.2 4.5 1.8 5 4.4"
          stroke={accent}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </FeatureIcon>
  );
}

function HeaderCurve({
  color,
  shadow,
  title,
}: {
  color: string;
  shadow: string;
  title: string;
}) {
  return (
    <div className="relative h-[95px] w-full shrink-0">
      <div
        className="absolute inset-x-[-12px] top-0 flex h-[82px] items-center justify-center px-16 text-center shadow-lg"
        style={{
          background: color,
          borderBottom: `4px solid ${shadow}`,
          borderBottomLeftRadius: "48% 18px",
          borderBottomRightRadius: "48% 18px",
        }}
      >
        <h1 className="text-[22px] font-black leading-tight text-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.28)]">
          {title}
        </h1>
      </div>
    </div>
  );
}

function TeamRibbon({
  color,
  shadow,
  children,
}: {
  color: string;
  shadow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mt-1 w-full px-1">
      <div
        className="absolute left-3 right-3 top-[-10px] h-6 rounded-t-xl opacity-85"
        style={{ background: shadow }}
      />
      <div
        className="duo-rise relative rounded-xl px-6 py-3 text-center text-[24px] font-black text-white shadow-lg"
        style={{
          background: color,
          borderBottom: `5px solid ${shadow}`,
          animationDelay: "200ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function TeamWelcomeScreen() {
  const { assignedTeam, hydrated } = useTeam();
  const { goStandings, goLeaderboard, goRedLeaderboard } = useTeamNavigation();

  // Fall back to blue until context hydrates / if reached directly.
  const team = TEAMS[assignedTeam ?? "blue"];
  const isBlue = team.id === "blue";

  const background = isBlue
    ? `radial-gradient(120% 50% at 50% 28%, rgba(221,244,255,0.82) 0%, rgba(221,244,255,0.36) 45%, transparent 70%), linear-gradient(180deg, #3AA7EF 0%, ${COLORS.blue} 48%, ${COLORS.blueDark} 100%)`
    : `radial-gradient(120% 50% at 50% 28%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.22) 45%, transparent 70%), linear-gradient(180deg, #FF6A57 0%, ${COLORS.red} 50%, #FF4A59 100%)`;

  const headerColor = isBlue ? "#127FE4" : "#F43C1F";
  const headerShadow = isBlue ? "#0B65BB" : "#C72B1A";
  const ribbonColor = isBlue ? "#0C75DD" : "#F23617";
  const ribbonShadow = isBlue ? "#0756AC" : "#B92512";
  const cardColor = isBlue ? "#0B73DC" : "#F23B1F";
  const characterSrc = isBlue ? "/junior.png" : "/eddy.png";
  const iconAccent = isBlue ? "#1CB0F6" : "#FF4B4B";

  return (
    <ScreenShell
      background={background}
      style={{ opacity: hydrated ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      <div className="flex min-h-full flex-1 flex-col items-center px-5">
        <HeaderCurve
          color={headerColor}
          shadow={headerShadow}
          title={team.welcomeTitle}
        />

        {/* Celebrating mascot with curved highlight behind it. */}
        <div className="relative -mt-1 flex h-[220px] w-full items-center justify-center">
          <Sparkle
            size={28}
            className="absolute left-10 top-8"
            color={isBlue ? "#DDF4FF" : "#FFD7D7"}
          />
          <Sparkle
            size={22}
            delayMs={420}
            className="absolute left-[30%] top-10"
            color={isBlue ? "#8FE5FF" : "#B7664D"}
          />
          <Sparkle
            size={24}
            delayMs={780}
            className="absolute right-12 top-12"
            color={isBlue ? "#BDEEFF" : "#E77B67"}
          />
          <div
            className="absolute left-1/2 top-[30px] h-[150px] w-[330px] -translate-x-1/2 rounded-[50%]"
            style={{ background: "rgba(255,255,255,0.20)" }}
          />
          <div className="duo-pop relative z-10">
            {/* CHARACTER_IMAGE: blue=Eddy / red=Junior, celebrating pose */}
            <CharacterPlaceholder
              width={205}
              height={220}
              tint="transparent"
              hint={`${team.mascot} celebrating`}
              src={characterSrc}
              alt={`${team.mascot} celebrating`}
              imageClassName="drop-shadow-[0_6px_2px_rgba(0,0,0,0.16)]"
              className="duo-bob"
            />
          </div>
        </div>

        <TeamRibbon color={ribbonColor} shadow={ribbonShadow}>
          {team.bannerName}
        </TeamRibbon>

        {/* Assignment card */}
        <div
          className="duo-rise mt-5 w-full rounded-xl px-4 py-4 text-center text-[15px] font-black text-white shadow-lg"
          style={{
            background: cardColor,
            borderBottom: `5px solid ${ribbonShadow}`,
            animationDelay: "280ms",
          }}
        >
          {team.assignedText}
        </div>

        {/* Feature list */}
        <div className="mt-8 w-full space-y-6 px-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.label}
              className="duo-rise flex items-center gap-4"
              style={{ animationDelay: `${360 + i * 90}ms` }}
            >
              <FeatureIcon type={f.icon} accent={iconAccent} />
              <span className="text-[16px] font-black text-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.30)]">
                {f.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer CTA + secondary link */}
        <div className="mt-auto flex w-full flex-col items-center gap-3 pt-8 pb-6">
          <DuoButton onClick={goStandings}>Continue</DuoButton>
          <button
            type="button"
            onClick={isBlue ? goLeaderboard : goRedLeaderboard}
            className="text-[15px] font-black text-white underline decoration-2 underline-offset-4 drop-shadow-[0_2px_1px_rgba(0,0,0,0.22)]"
          >
            View team leaderboard
          </button>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamWelcomeScreen;
