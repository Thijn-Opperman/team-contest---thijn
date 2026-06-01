"use client";

import { useEffect, useState } from "react";
import { COLORS, type TeamId } from "../constants/teamColors";
import { useTeam } from "../context/TeamContext";
import { useTeamNavigation } from "../navigation/TeamCompetitionNavigator";
import { CharacterPlaceholder } from "../components/CharacterPlaceholder";
import { DuoButton } from "../components/DuoButton";
import { ScreenShell } from "../components/ScreenShell";
import { SpinningWheel } from "../components/SpinningWheel";

interface TeamWheelScreenProps {
  /** Algorithm-determined outcome the wheel lands on. */
  assignedTeam: TeamId;
}

const BACKGROUND = `
  radial-gradient(120% 80% at 15% 0%, ${COLORS.green} 0%, rgba(76,175,80,0) 55%),
  linear-gradient(90deg, ${COLORS.blue} 0%, rgba(28,176,246,0) 45%),
  linear-gradient(270deg, ${COLORS.red} 0%, rgba(255,75,75,0) 45%),
  linear-gradient(180deg, #2fa84f 0%, #1f7fae 55%, #b13b3b 100%)
`;

export function TeamWheelScreen({ assignedTeam }: TeamWheelScreenProps) {
  const { assignTeam } = useTeam();
  const { goWelcome } = useTeamNavigation();
  const [spinDone, setSpinDone] = useState(false);

  // Persist the outcome as soon as the wheel resolves.
  useEffect(() => {
    if (spinDone) assignTeam(assignedTeam);
  }, [spinDone, assignedTeam, assignTeam]);

  const winner = (team: TeamId) => spinDone && assignedTeam === team;

  return (
    <ScreenShell background={BACKGROUND}>
      <div className="flex flex-1 flex-col items-center px-5 pt-9">
        <h1 className="duo-rise text-center text-[28px] font-black leading-tight text-white drop-shadow-sm">
          Duolingo
          <br />
          Competition
        </h1>
        <p
          className="duo-rise mt-2 text-center text-base font-bold text-white/90"
          style={{ animationDelay: "80ms" }}
        >
          Check in what team you&apos;re in!
        </p>

        <div className="mt-7 flex items-center justify-center">
          <SpinningWheel
            assignedTeam={assignedTeam}
            size={290}
            onSpinComplete={() => setSpinDone(true)}
          />
        </div>

        {/* Character VS row */}
        <div className="mt-8 flex w-full items-end justify-center gap-3">
          <div className="flex flex-col items-center">
            {/* CHARACTER_IMAGE: Junior - red team mascot */}
            <div className="relative">
              {winner("red") && (
                <span
                  className="duo-ring-pulse pointer-events-none absolute inset-0 rounded-3xl"
                  style={{ boxShadow: `0 0 0 4px ${COLORS.red}` }}
                />
              )}
              <CharacterPlaceholder
                width={116}
                height={136}
                tint="rgba(255,75,75,0.30)"
                hint="Junior"
                className={
                  winner("red")
                    ? "duo-pop"
                    : spinDone
                      ? "opacity-50 transition-opacity duration-500"
                      : ""
                }
              />
            </div>
            <span className="mt-2 text-lg font-black" style={{ color: COLORS.red }}>
              Junior
            </span>
          </div>

          <div className="flex flex-col items-center pb-8">
            <div className="flex items-center gap-1 text-2xl font-black">
              <span style={{ color: COLORS.red }}>V</span>
              <svg width="20" height="28" viewBox="0 0 24 32" aria-hidden>
                <path
                  d="M13 0 2 18h7l-2 14 13-20h-8z"
                  fill={COLORS.gold}
                  stroke="#E6A800"
                  strokeWidth="1"
                />
              </svg>
              <span style={{ color: COLORS.blue }}>S</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {/* CHARACTER_IMAGE: Eddy - blue team mascot */}
            <div className="relative">
              {winner("blue") && (
                <span
                  className="duo-ring-pulse pointer-events-none absolute inset-0 rounded-3xl"
                  style={{ boxShadow: `0 0 0 4px ${COLORS.blue}` }}
                />
              )}
              <CharacterPlaceholder
                width={116}
                height={136}
                tint="rgba(28,176,246,0.30)"
                hint="Eddy"
                className={
                  winner("blue")
                    ? "duo-pop"
                    : spinDone
                      ? "opacity-50 transition-opacity duration-500"
                      : ""
                }
              />
            </div>
            <span className="mt-2 text-lg font-black" style={{ color: COLORS.blue }}>
              Eddy
            </span>
          </div>
        </div>

        {/* CTA in flow: disabled grey until the wheel resolves, then activates */}
        <div className="mt-auto w-full pt-8 pb-5">
          <div className={spinDone ? "duo-pop-in" : ""}>
            <DuoButton onClick={goWelcome} disabled={!spinDone}>
              Continue
            </DuoButton>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamWheelScreen;
