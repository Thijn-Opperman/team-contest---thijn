"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { COLORS, type TeamId } from "@/src/features/teamCompetition/constants/teamColors";
import { CharacterPlaceholder } from "@/src/features/teamCompetition/components/CharacterPlaceholder";
import { DuoButton } from "@/src/features/teamCompetition/components/DuoButton";
import { Sparkle } from "@/src/features/teamCompetition/components/Sparkle";

const STORAGE_KEY = "duo.teamCompetition.v1";

/**
 * Main home tab. First-time visitors (no `hasBeenAssigned` flag) are sent
 * straight into the Team Competition flow; returning users get a colorful hub
 * showing their team with quick links into each screen.
 */
export default function Home() {
  const router = useRouter();
  const [team, setTeam] = useState<TeamId | null>(null);

  useEffect(() => {
    let assigned = false;
    let stored: TeamId | null = null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        assigned = Boolean(parsed?.hasBeenAssigned);
        stored = parsed?.assignedTeam ?? null;
      }
    } catch {
      /* ignore */
    }

    if (!assigned) {
      router.replace("/team");
      return;
    }
    // setState deferred into rAF (not synchronously in the effect body).
    const id = requestAnimationFrame(() => setTeam(stored));
    return () => cancelAnimationFrame(id);
  }, [router]);

  const isBlue = team === "blue";
  const teamLabel = isBlue ? "Team Blue" : team === "red" ? "Team Red" : null;
  const teamColor = isBlue ? COLORS.blue : COLORS.red;

  return (
    <main className="flex min-h-[100dvh] flex-1 justify-center bg-[#DDF4FF]">
      <div className="duo-screen-in flex w-full max-w-[420px] flex-col px-5 pb-10 pt-12">
        {/* Header */}
        <p className="duo-rise text-xs font-extrabold uppercase tracking-[0.2em] text-[#1CB0F6]">
          Duolingo
        </p>
        <h1
          className="duo-rise text-3xl font-black leading-tight text-[#4B4B4B]"
          style={{ animationDelay: "60ms" }}
        >
          Team Competition
        </h1>

        {teamLabel && (
          <div
            className="duo-rise mt-3 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5"
            style={{ background: `${teamColor}22`, animationDelay: "120ms" }}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: teamColor }}
            />
            <span className="text-sm font-extrabold" style={{ color: teamColor }}>
              You&apos;re on {teamLabel}
            </span>
          </div>
        )}

        {/* Versus hero card */}
        <div
          className="duo-rise relative mt-6 overflow-hidden rounded-3xl border-2 border-b-[6px] border-black/10 p-5"
          style={{
            background: `linear-gradient(110deg, ${COLORS.blue} 0%, ${COLORS.blue} 42%, ${COLORS.red} 58%, ${COLORS.red} 100%)`,
            boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
            animationDelay: "180ms",
          }}
        >
          <Sparkle size={16} className="absolute left-3 top-3" color="#ffffff" />
          <Sparkle
            size={14}
            delayMs={600}
            className="absolute right-3 top-4"
            color="#ffffff"
          />

          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-1 flex-col items-center">
              {/* CHARACTER_IMAGE: Eddy - blue team mascot */}
              <CharacterPlaceholder
                width={104}
                height={120}
                tint="rgba(255,255,255,0.22)"
                hint="Eddy"
                className="duo-bob"
              />
              <span className="mt-2 text-base font-black text-white">Eddy</span>
              <span className="text-xs font-bold text-white/80">Team Blue</span>
            </div>

            <div className="flex flex-col items-center pb-7">
              <svg width="34" height="46" viewBox="0 0 24 32" aria-hidden>
                <path
                  d="M13 0 2 18h7l-2 14 13-20h-8z"
                  fill={COLORS.gold}
                  stroke="#E6A800"
                  strokeWidth="1"
                />
              </svg>
              <span className="mt-1 text-sm font-black text-white">VS</span>
            </div>

            <div className="flex flex-1 flex-col items-center">
              {/* CHARACTER_IMAGE: Junior - red team mascot */}
              <CharacterPlaceholder
                width={104}
                height={120}
                tint="rgba(255,255,255,0.22)"
                hint="Junior"
                className="duo-bob"
              />
              <span className="mt-2 text-base font-black text-white">Junior</span>
              <span className="text-xs font-bold text-white/80">Team Red</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div
          className="duo-rise mt-5 grid grid-cols-2 gap-3"
          style={{ animationDelay: "240ms" }}
        >
          {[
            { icon: "📅", value: "10 days", label: "until reset" },
            { icon: "⭐", value: "Earn XP", label: "for your team" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border-2 border-b-[4px] border-[#E5E5E5] bg-white px-4 py-3"
            >
              <div className="text-xl">{s.icon}</div>
              <div className="mt-1 text-base font-black text-[#4B4B4B]">
                {s.value}
              </div>
              <div className="text-xs font-bold text-[#777]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div
          className="duo-rise mt-auto flex flex-col gap-3 pt-7"
          style={{ animationDelay: "300ms" }}
        >
          <DuoButton onClick={() => router.push("/team/standings")}>
            View team standings
          </DuoButton>
          <DuoButton
            variant="white"
            onClick={() => router.push("/team/leaderboard")}
          >
            Leaderboard
          </DuoButton>
          <button
            onClick={() => router.push("/team")}
            className="duo-tap text-sm font-bold text-[#1CB0F6] underline underline-offset-2"
          >
            Spin the wheel again
          </button>
        </div>
      </div>
    </main>
  );
}
