"use client";

import { useEffect, useRef, useState } from "react";
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
  radial-gradient(80% 45% at 50% 0%, rgba(88,204,2,0.9) 0%, transparent 72%),
  radial-gradient(70% 45% at 50% 56%, rgba(0,0,0,0.34) 0%, transparent 70%),
  linear-gradient(105deg, ${COLORS.blue} 0%, ${COLORS.blue} 39%, rgba(75,75,75,0.42) 50%, ${COLORS.red} 61%, ${COLORS.red} 100%)
`;
const COUNTS_KEY = "duo.teamCompetition.assignmentCounts.v1";

function recordAssignment(team: TeamId) {
  try {
    const raw = window.localStorage.getItem(COUNTS_KEY);
    const counts = raw
      ? (JSON.parse(raw) as Partial<Record<TeamId, number>>)
      : {};
    const next = {
      blue: counts.blue ?? 0,
      red: counts.red ?? 0,
      [team]: (counts[team] ?? 0) + 1,
    };
    window.localStorage.setItem(COUNTS_KEY, JSON.stringify(next));
  } catch {
    /* Assignment still succeeds if localStorage is unavailable. */
  }
}

function BattleCard({
  team,
  name,
  subtitle,
  src,
  active,
  dimmed,
}: {
  team: TeamId;
  name: string;
  subtitle: string;
  src: string;
  active: boolean;
  dimmed: boolean;
}) {
  const isBlue = team === "blue";
  const color = isBlue ? COLORS.blue : COLORS.red;
  const dark = isBlue ? COLORS.blueDark : COLORS.redDark;

  return (
    <div className="flex flex-1 flex-col items-center">
      <div
        className={`relative flex h-[104px] w-full items-center justify-center overflow-hidden rounded-[1.35rem] border-2 transition-all duration-500 ${
          active ? "duo-pop scale-105" : dimmed ? "opacity-55" : ""
        }`}
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.34), ${color}55 44%, ${dark}70 100%)`,
          borderColor: active ? COLORS.gold : "rgba(255,255,255,0.22)",
          borderBottomWidth: 5,
          borderBottomColor: active ? COLORS.goldDark : "rgba(0,0,0,0.15)",
          boxShadow: active
            ? `0 0 0 4px ${color}55, 0 14px 28px rgba(0,0,0,0.24)`
            : "0 10px 18px rgba(0,0,0,0.18)",
        }}
      >
        <span
          className="absolute -left-10 -top-12 h-28 w-28 rounded-full bg-white/16"
          aria-hidden
        />
        {active && (
          <span
            className="duo-ring-pulse pointer-events-none absolute inset-5 rounded-3xl"
            style={{ boxShadow: `0 0 0 4px ${COLORS.gold}` }}
          />
        )}
        <CharacterPlaceholder
          width={92}
          height={100}
          tint="transparent"
          hint={name}
          src={src}
          alt={`${name} mascot`}
          imageClassName="drop-shadow-[0_7px_2px_rgba(0,0,0,0.2)]"
          className="relative z-10"
        />
      </div>
      <span
        className="mt-1 text-base font-black drop-shadow-[0_2px_1px_rgba(0,0,0,0.22)]"
        style={{ color }}
      >
        {name}
      </span>
      <span className="text-[10px] font-black uppercase tracking-wide text-white/80">
        {subtitle}
      </span>
    </div>
  );
}

export function TeamWheelScreen({ assignedTeam }: TeamWheelScreenProps) {
  const { assignTeam } = useTeam();
  const { goWelcome } = useTeamNavigation();
  const [spinDone, setSpinDone] = useState(false);
  const recordedRef = useRef(false);

  // Persist the outcome as soon as the wheel resolves.
  useEffect(() => {
    if (!spinDone) return;
    assignTeam(assignedTeam);
    if (!recordedRef.current) {
      recordedRef.current = true;
      recordAssignment(assignedTeam);
    }
  }, [spinDone, assignedTeam, assignTeam]);

  const winner = (team: TeamId) => spinDone && assignedTeam === team;

  return (
    <ScreenShell background={BACKGROUND}>
      <div className="flex min-h-0 flex-1 flex-col items-center px-5 pt-4">
        <h1 className="duo-rise text-center text-[25px] font-black leading-none text-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.28)]">
          Team Competition
        </h1>
        <p
          className="duo-rise mt-1 text-center text-sm font-black text-white/90 drop-shadow-[0_2px_1px_rgba(0,0,0,0.2)]"
          style={{ animationDelay: "80ms" }}
        >
          Check in what team you&apos;re in!
        </p>

        <div className="relative mt-3 flex items-center justify-center">
          <span
            className="absolute top-[42%] h-16 w-64 rounded-full bg-black/25 blur-xl"
            aria-hidden
          />
          <SpinningWheel
            assignedTeam={assignedTeam}
            size={236}
            onSpinComplete={() => setSpinDone(true)}
          />
        </div>

        <div
          className="duo-rise mt-3 w-full rounded-[1.35rem] border-2 border-white/20 bg-black/14 p-2.5 backdrop-blur-sm"
          style={{ animationDelay: "140ms" }}
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-px flex-1 bg-white/25" />
            <span className="rounded-full bg-white/16 px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-white">
              Pick a side
            </span>
            <span className="h-px flex-1 bg-white/25" />
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5">
            <BattleCard
              team="red"
              name="Junior"
              subtitle="Red"
              src="/eddy.png"
              active={winner("red")}
              dimmed={spinDone && !winner("red")}
            />

            <div className="flex flex-col items-center">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/40 text-base font-black text-white shadow-lg"
                style={{
                  background: `linear-gradient(180deg, ${COLORS.gold}, ${COLORS.goldDark})`,
                  borderBottomWidth: 5,
                  borderBottomColor: "rgba(0,0,0,0.18)",
                }}
              >
                VS
              </div>
              <svg className="mt-1" width="18" height="24" viewBox="0 0 24 32" aria-hidden>
                <path
                  d="M13 0 2 18h7l-2 14 13-20h-8z"
                  fill={COLORS.gold}
                  stroke="#E6A800"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <BattleCard
              team="blue"
              name="Eddy"
              subtitle="Blue"
              src="/junior.png"
              active={winner("blue")}
              dimmed={spinDone && !winner("blue")}
            />
          </div>

          <div className="mt-2 min-h-5 text-center text-xs font-black text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.24)]">
            {spinDone
              ? assignedTeam === "blue"
                ? "You're joining Team Blue."
                : "You're joining Team Red."
              : "The wheel will pick your team."}
          </div>
        </div>

        {/* CTA in flow: disabled grey until the wheel resolves, then activates */}
        <div className="mt-auto w-full pt-3 pb-3">
          <div className={spinDone ? "duo-pop-in" : ""}>
            <DuoButton onClick={goWelcome} disabled={!spinDone} className="py-3 text-base">
              Continue
            </DuoButton>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamWheelScreen;
