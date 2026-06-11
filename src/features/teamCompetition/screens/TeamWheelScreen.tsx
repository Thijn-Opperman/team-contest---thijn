"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { COLORS, TEAMS, type TeamId } from "../constants/teamColors";
import { useTeam } from "../context/TeamContext";
import { useTeamNavigation } from "../navigation/TeamCompetitionNavigator";
import { CharacterPlaceholder } from "../components/CharacterPlaceholder";
import { DuoButton } from "../components/DuoButton";
import { PageTitleRibbon } from "../components/PageTitleRibbon";
import { ScreenShell } from "../components/ScreenShell";
import { Sparkle } from "../components/Sparkle";
import { SpinningWheel } from "../components/SpinningWheel";

interface TeamWheelScreenProps {
  /** Algorithm-determined outcome the wheel lands on. */
  assignedTeam: TeamId;
}

const WHEEL_SIZE = 318;
const CHARACTER_WIDTH = 168;
const CHARACTER_HEIGHT = 182;
const WINNER_SCALE = 1.48;

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

/** Matches the foreground hill green at the bottom edge of wheel-hills-bg.png. */
const WHEEL_GROUND = "#96C551";

/** Layered background: hills scene over solid ground color. */
function WheelScreenBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{ background: WHEEL_GROUND }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[64%]"
        style={{
          background: `url('/wheel-hills-bg.png') center top / cover no-repeat, ${WHEEL_GROUND}`,
        }}
      />
    </div>
  );
}

/** Sparkles scattered in the white sky area below the title banner. */
function SkyDecorations() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[42%]"
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
      <Sparkle
        size={17}
        color="#E5F8D6"
        delayMs={760}
        className="absolute right-[8%] top-[6%]"
      />
      <Sparkle
        size={11}
        color="#89E219"
        delayMs={1040}
        className="absolute left-[68%] top-[14%]"
      />
    </div>
  );
}

function WheelCharacters({
  assignedTeam,
  spinDone,
}: {
  assignedTeam: TeamId;
  spinDone: boolean;
}) {
  const juniorIsWinner = spinDone && assignedTeam === "blue";
  const eddyIsWinner = spinDone && assignedTeam === "red";
  const juniorIsLoser = spinDone && !juniorIsWinner;
  const eddyIsLoser = spinDone && !eddyIsWinner;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-visible">
      <div
        className="duo-winner-reveal absolute"
        style={{
          left: juniorIsWinner ? "50%" : "2%",
          bottom: juniorIsWinner ? "20%" : "4%",
          transform: juniorIsWinner
            ? `translateX(-50%) scale(${WINNER_SCALE})`
            : juniorIsLoser
              ? "scale(0.75)"
              : "scale(1)",
          opacity: juniorIsLoser ? 0 : 1,
        }}
        aria-hidden={juniorIsLoser}
      >
        <CharacterPlaceholder
          width={CHARACTER_WIDTH}
          height={CHARACTER_HEIGHT}
          tint="transparent"
          src="/junior.png"
          alt="Junior"
        />
      </div>

      <div
        className="duo-winner-reveal absolute"
        style={{
          left: eddyIsWinner ? "50%" : "auto",
          right: eddyIsWinner ? "auto" : "2%",
          bottom: eddyIsWinner ? "20%" : "4%",
          transform: eddyIsWinner
            ? `translateX(-50%) scale(${WINNER_SCALE})`
            : eddyIsLoser
              ? "scale(0.75)"
              : "scale(1)",
          opacity: eddyIsLoser ? 0 : 1,
        }}
        aria-hidden={eddyIsLoser}
      >
        <CharacterPlaceholder
          width={CHARACTER_WIDTH}
          height={CHARACTER_HEIGHT}
          tint="transparent"
          src="/eddy.png"
          alt="Eddy"
        />
      </div>
    </div>
  );
}

/** Result banner shown above the wheel after the spin completes. */
function WheelResultBanner({ team }: { team: TeamId }) {
  const info = TEAMS[team];
  const accentBorder = team === "blue" ? COLORS.blueBorder : COLORS.redBorder;

  return (
    <div
      className="duo-winner-banner mb-4 w-full max-w-[320px] shrink-0 px-1"
      role="status"
      aria-live="polite"
    >
      <div
        className="rounded-2xl border-2 border-b-4 bg-white px-4 py-3 text-center shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
        style={{ borderColor: accentBorder }}
      >
        <p
          className="text-[11px] font-black uppercase tracking-[0.16em]"
          style={{ color: info.color }}
        >
          You joined
        </p>
        <p
          className="mt-0.5 text-[21px] font-black leading-tight text-[#4B4B4B]"
        >
          {info.bannerName}
        </p>
        <p className="mt-1 text-[13px] font-bold leading-snug text-[#777777]">
          {info.assignedText}
        </p>
        <p className="duo-continue-hint mt-2.5 text-xs font-black text-[#58CC02]">
          Tap Continue for more info
        </p>
      </div>
    </div>
  );
}

/** Duo peeking from behind the top of the wheel. */
function HidingDuo() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[22px] z-[1] -translate-x-1/2">
      <Image
        src="/duo.png"
        alt=""
        width={92}
        height={92}
        priority
        className="h-[92px] w-[92px] object-contain object-bottom drop-shadow-[0_3px_1px_rgba(0,0,0,0.15)]"
        aria-hidden
      />
    </div>
  );
}

export function TeamWheelScreen({ assignedTeam }: TeamWheelScreenProps) {
  const { assignTeam } = useTeam();
  const { goWelcome } = useTeamNavigation();
  const [spinDone, setSpinDone] = useState(false);
  const recordedRef = useRef(false);

  useEffect(() => {
    if (!spinDone) return;
    assignTeam(assignedTeam);
    if (!recordedRef.current) {
      recordedRef.current = true;
      recordAssignment(assignedTeam);
    }
  }, [spinDone, assignedTeam, assignTeam]);

  return (
    <ScreenShell background={COLORS.white} className="pt-0">
      <WheelScreenBackground />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 w-full">
          <PageTitleRibbon
            title="Team Competition"
            fullBleed
            variant="green"
            showDuo={false}
          />
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col">
          <SkyDecorations />

          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-visible px-2">
              {spinDone && <WheelResultBanner team={assignedTeam} />}

              <div
                className="relative overflow-visible"
                style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
              >
                {!spinDone && <HidingDuo />}
                <div className="relative z-10">
                  <SpinningWheel
                    assignedTeam={assignedTeam}
                    size={WHEEL_SIZE}
                    onSpinComplete={() => setSpinDone(true)}
                  />
                </div>
              </div>
              <WheelCharacters assignedTeam={assignedTeam} spinDone={spinDone} />
            </div>
          </div>
        </div>

        <div className="shrink-0 px-5 pb-5 pt-2">
          <DuoButton onClick={goWelcome} disabled={!spinDone} className="py-3.5 text-base">
            Continue
          </DuoButton>
        </div>
      </div>
    </ScreenShell>
  );
}

export default TeamWheelScreen;
