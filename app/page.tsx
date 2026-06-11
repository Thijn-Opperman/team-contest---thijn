"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { COLORS } from "@/src/features/teamCompetition/constants/teamColors";
import { CharacterPlaceholder } from "@/src/features/teamCompetition/components/CharacterPlaceholder";
import { DuoButton } from "@/src/features/teamCompetition/components/DuoButton";

/**
 * Minimal landing page for the Team Competition flow.
 */
export default function Home() {
  const router = useRouter();

  function go(path: string) {
    router.push(path);
  }

  return (
    <main className="flex h-[100dvh] min-h-[100svh] flex-1 justify-center overflow-hidden bg-[#F7F7F7]">
      <div className="duo-screen-in box-border flex h-full w-full max-w-[420px] flex-col items-center justify-center px-6 pt-[calc(env(safe-area-inset-top)+2.5rem)] pb-[calc(env(safe-area-inset-bottom)+2.5rem)] text-center">
        <div
          className="duo-rise relative flex h-64 w-64 items-center justify-center rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(137,226,25,0.22), rgba(88,204,2,0.06) 58%, transparent 70%)",
          }}
        >
          <Image
            src="/duo.png"
            alt="Duo"
            width={248}
            height={248}
            priority
            className="duo-bob h-[248px] w-[248px] object-contain drop-shadow-[0_14px_10px_rgba(0,0,0,0.14)]"
          />
        </div>

        <p
          className="duo-rise mt-7 text-xs font-black uppercase tracking-[0.22em]"
          style={{ color: COLORS.green, animationDelay: "80ms" }}
        >
          Team competition
        </p>

        <h1
          className="duo-rise mt-2 max-w-xs text-[32px] font-black leading-[1.05] text-[#4B4B4B]"
          style={{ animationDelay: "140ms" }}
        >
          Spin the wheel
        </h1>

        <p
          className="duo-rise mt-3 max-w-[290px] text-base font-bold leading-6 text-[#777777]"
          style={{ animationDelay: "200ms" }}
        >
          Find out which team you&apos;re joining.
        </p>

        <div
          className="duo-rise relative mt-8 flex w-full max-w-[340px] items-end justify-center"
          style={{ animationDelay: "240ms" }}
        >
          <div className="flex flex-1 flex-col items-center">
            <CharacterPlaceholder
              width={118}
              height={128}
              src="/junior.png"
              alt="Team Blue mascot"
              tint="transparent"
              imageClassName="drop-shadow-[0_6px_2px_rgba(0,0,0,0.12)]"
              className="duo-bob"
            />
            <span
              className="mt-1 text-xs font-black uppercase tracking-wide"
              style={{ color: COLORS.blue }}
            >
              Team Blue
            </span>
          </div>

          <div
            className="mb-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] border-white text-[11px] font-black text-white shadow-[0_3px_0_#E6A800]"
            style={{ background: COLORS.gold }}
            aria-hidden
          >
            VS
          </div>

          <div className="flex flex-1 flex-col items-center">
            <CharacterPlaceholder
              width={118}
              height={128}
              src="/eddy.png"
              alt="Team Red mascot"
              tint="transparent"
              imageClassName="drop-shadow-[0_6px_2px_rgba(0,0,0,0.12)]"
              className="duo-bob"
            />
            <span
              className="mt-1 text-xs font-black uppercase tracking-wide"
              style={{ color: COLORS.red }}
            >
              Team Red
            </span>
          </div>
        </div>

        <div
          className="duo-rise mt-6 w-full"
          style={{ animationDelay: "300ms" }}
        >
          <DuoButton onClick={() => go("/team")}>
            Spin the wheel
          </DuoButton>
        </div>
      </div>
    </main>
  );
}
