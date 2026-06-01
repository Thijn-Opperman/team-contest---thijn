"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { TopNav } from "../components/TopNav";

/**
 * Web adaptation of the spec's React-Navigation stack.
 *
 * The original brief targeted React Native; in this Next.js app each "screen"
 * is an App Router route. This module centralises the route map and exposes a
 * small `useTeamNavigation()` hook so screens navigate by intent rather than by
 * hardcoding paths.
 */
export const TEAM_ROUTES = {
  wheel: "/team",
  welcome: "/team/welcome",
  standings: "/team/standings",
  leaderboard: "/team/leaderboard",
  redLeaderboard: "/team/leaderboard/red",
  /** Exit point — back to the main home tab. */
  home: "/",
} as const;

export type TeamRouteName = keyof typeof TEAM_ROUTES;

export function useTeamNavigation() {
  const router = useRouter();

  const go = (name: TeamRouteName) => router.push(TEAM_ROUTES[name]);

  return {
    go,
    goWheel: () => go("wheel"),
    goWelcome: () => go("welcome"),
    goStandings: () => go("standings"),
    goLeaderboard: () => go("leaderboard"),
    goRedLeaderboard: () => go("redLeaderboard"),
    exitToHome: () => go("home"),
  };
}

/**
 * Modal-style wrapper for the whole flow. Centers the mobile "device" column on
 * larger screens, scrolls the active screen, and overlays a collapsible
 * top-right navigation menu so the user can hop between screens at any time.
 */
export function TeamCompetitionNavigator({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full justify-center bg-[#1c1b22] sm:py-6">
      <div className="relative flex h-[100dvh] w-full max-w-[420px] flex-col overflow-hidden bg-white shadow-2xl sm:h-[min(880px,calc(100dvh-48px))] sm:rounded-[2.25rem] sm:ring-8 sm:ring-black/70">
        <main className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          {children}
        </main>
        <TopNav />
      </div>
    </div>
  );
}

export default TeamCompetitionNavigator;
