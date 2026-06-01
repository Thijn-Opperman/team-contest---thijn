"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { COLORS } from "@/src/features/teamCompetition/constants/teamColors";
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
    <main className="flex h-[100dvh] flex-1 justify-center overflow-hidden bg-[#F7F7F7]">
      <div className="duo-screen-in flex h-full w-full max-w-[420px] flex-col items-center justify-center px-6 pb-10 pt-10 text-center">
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
          className="duo-rise mt-10 w-full"
          style={{ animationDelay: "260ms" }}
        >
          <DuoButton onClick={() => go("/team")}>
            Spin the wheel
          </DuoButton>
        </div>
      </div>
    </main>
  );
}
