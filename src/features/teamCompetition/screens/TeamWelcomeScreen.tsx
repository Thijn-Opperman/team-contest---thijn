"use client";

import { COLORS, TEAMS } from "../constants/teamColors";
import { useTeam } from "../context/TeamContext";
import { useTeamNavigation } from "../navigation/TeamCompetitionNavigator";
import { CharacterPlaceholder } from "../components/CharacterPlaceholder";
import { DuoButton } from "../components/DuoButton";
import { ScreenShell } from "../components/ScreenShell";
import { Sparkle } from "../components/Sparkle";

const FEATURES = [
  { icon: "⭐", label: "Earn XP together" },
  { icon: "📅", label: "Monthly resets (10 days left)" },
  { icon: "🙌", label: "Build a strong community" },
];

export function TeamWelcomeScreen() {
  const { assignedTeam, hydrated } = useTeam();
  const { goStandings, goLeaderboard } = useTeamNavigation();

  // Fall back to blue until context hydrates / if reached directly.
  const team = TEAMS[assignedTeam ?? "blue"];
  const isBlue = team.id === "blue";

  const background = isBlue
    ? `linear-gradient(180deg, ${COLORS.blue} 0%, ${COLORS.blueDark} 100%)`
    : `linear-gradient(180deg, ${COLORS.red} 0%, ${COLORS.redDark} 100%)`;

  const ribbonColor = isBlue ? COLORS.blueDark : COLORS.redDark;
  const ribbonShadow = isBlue ? "#06709E" : "#A82626";

  return (
    <ScreenShell
      background={background}
      style={{ opacity: hydrated ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      <div className="flex flex-1 flex-col items-center px-6 pt-10">
        <div className="relative flex items-center justify-center gap-2">
          <Sparkle size={18} delayMs={0} />
          <h1 className="text-center text-[22px] font-black text-white">
            {team.welcomeTitle}
          </h1>
          <Sparkle size={18} delayMs={500} />
        </div>

        {/* Celebrating mascot with blob + pulsing ring behind it */}
        <div className="relative mt-5 flex items-center justify-center">
          <span
            className="duo-ring-pulse absolute rounded-full"
            style={{
              width: 200,
              height: 200,
              boxShadow: "0 0 0 3px rgba(255,255,255,0.5)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: 220, height: 220, background: "rgba(255,255,255,0.16)" }}
          />
          <div className="duo-pop">
            {/* CHARACTER_IMAGE: blue=Eddy / red=Junior, celebrating pose */}
            <CharacterPlaceholder
              width={176}
              height={196}
              tint="rgba(255,255,255,0.12)"
              hint={`${team.mascot} celebrating`}
              className="duo-bob"
            />
          </div>
        </div>

        {/* Banner ribbon with tactile bottom edge */}
        <div
          className="duo-rise relative mt-5 rounded-xl px-8 py-2.5 text-center text-lg font-black text-white"
          style={{
            background: ribbonColor,
            borderBottom: `4px solid ${ribbonShadow}`,
            animationDelay: "200ms",
          }}
        >
          {team.bannerName}
        </div>

        {/* Assignment card */}
        <div
          className="duo-rise mt-4 w-full rounded-2xl border-2 px-5 py-3.5 text-center text-base font-extrabold text-white"
          style={{
            background: "rgba(255,255,255,0.14)",
            borderColor: "rgba(255,255,255,0.35)",
            animationDelay: "280ms",
          }}
        >
          {team.assignedText}
        </div>

        {/* Feature list */}
        <div className="mt-5 w-full space-y-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.label}
              className="duo-rise flex items-center gap-3"
              style={{ animationDelay: `${360 + i * 90}ms` }}
            >
              <span className="text-xl" aria-hidden>
                {f.icon}
              </span>
              <span className="text-base font-extrabold text-white">
                {f.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer CTA + secondary link */}
        <div className="mt-auto flex w-full flex-col items-center gap-2.5 pt-7 pb-5">
          <DuoButton onClick={goStandings}>Continue</DuoButton>
          <button
            type="button"
            onClick={goLeaderboard}
            className="text-sm font-bold text-white underline underline-offset-2"
          >
            View team leaderboard
          </button>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamWelcomeScreen;
