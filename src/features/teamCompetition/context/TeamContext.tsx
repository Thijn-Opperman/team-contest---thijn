"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { TeamId } from "../constants/teamColors";

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatarUrl?: string | null;
  xp: number;
}

export interface TeamState {
  assignedTeam: TeamId | null;
  hasBeenAssigned: boolean;
  blueXP: number;
  redXP: number;
  leaderboardData: LeaderboardEntry[];
  redLeaderboardData: LeaderboardEntry[];
  /** Has the persisted state finished loading from storage? */
  hydrated: boolean;
}

type TeamAction =
  | { type: "ASSIGN_TEAM"; team: TeamId }
  | { type: "RESET_ASSIGNMENT" }
  | { type: "SET_XP"; blueXP: number; redXP: number }
  | { type: "SET_LEADERBOARD"; leaderboardData: LeaderboardEntry[] }
  | { type: "HYDRATE"; payload: Partial<TeamState> };

const STORAGE_KEY = "duo.teamCompetition.v1";

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Rose Wolf", xp: 7945, avatarUrl: null },
  { rank: 2, name: "Ethan", xp: 6345, avatarUrl: null },
  { rank: 3, name: "Sophie", xp: 6155, avatarUrl: null },
  { rank: 4, name: "Liam", xp: 5980, avatarUrl: null },
  { rank: 5, name: "Mia", xp: 5420, avatarUrl: null },
];

const DEFAULT_RED_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Noah Fox", xp: 7810, avatarUrl: null },
  { rank: 2, name: "Emma Cardinal", xp: 6620, avatarUrl: null },
  { rank: 3, name: "Lucas Flame", xp: 6295, avatarUrl: null },
  { rank: 4, name: "Ava Sparks", xp: 5840, avatarUrl: null },
  { rank: 5, name: "Milan Red", xp: 5215, avatarUrl: null },
];

const initialState: TeamState = {
  assignedTeam: null,
  hasBeenAssigned: false,
  blueXP: 73832,
  redXP: 70430,
  leaderboardData: DEFAULT_LEADERBOARD,
  redLeaderboardData: DEFAULT_RED_LEADERBOARD,
  hydrated: false,
};

function reducer(state: TeamState, action: TeamAction): TeamState {
  switch (action.type) {
    case "ASSIGN_TEAM":
      // No-op (return same reference) if nothing actually changes, so callers
      // can safely re-dispatch without triggering a render loop.
      if (state.assignedTeam === action.team && state.hasBeenAssigned) {
        return state;
      }
      return { ...state, assignedTeam: action.team, hasBeenAssigned: true };
    case "RESET_ASSIGNMENT":
      if (state.assignedTeam === null && !state.hasBeenAssigned) return state;
      return { ...state, assignedTeam: null, hasBeenAssigned: false };
    case "SET_XP":
      if (state.blueXP === action.blueXP && state.redXP === action.redXP) {
        return state;
      }
      return { ...state, blueXP: action.blueXP, redXP: action.redXP };
    case "SET_LEADERBOARD":
      return { ...state, leaderboardData: action.leaderboardData };
    case "HYDRATE":
      return { ...state, ...action.payload, hydrated: true };
    default:
      return state;
  }
}

interface TeamContextValue extends TeamState {
  assignTeam: (team: TeamId) => void;
  resetAssignment: () => void;
  setXP: (blueXP: number, redXP: number) => void;
  setLeaderboard: (data: LeaderboardEntry[]) => void;
}

const TeamContext = createContext<TeamContextValue | null>(null);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate the persisted slice (assignedTeam + hasBeenAssigned) once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<TeamState>;
        dispatch({
          type: "HYDRATE",
          payload: {
            assignedTeam: parsed.assignedTeam ?? null,
            hasBeenAssigned: parsed.hasBeenAssigned ?? false,
          },
        });
      } else {
        dispatch({ type: "HYDRATE", payload: {} });
      }
    } catch {
      dispatch({ type: "HYDRATE", payload: {} });
    }
  }, []);

  // Persist the relevant slice whenever it changes (after hydration).
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          assignedTeam: state.assignedTeam,
          hasBeenAssigned: state.hasBeenAssigned,
        })
      );
    } catch {
      /* ignore write failures (private mode, quota, etc.) */
    }
  }, [state.assignedTeam, state.hasBeenAssigned, state.hydrated]);

  // Stable action creators (dispatch is stable) so consumers depending on these
  // in effects don't re-fire every render.
  const assignTeam = useCallback(
    (team: TeamId) => dispatch({ type: "ASSIGN_TEAM", team }),
    []
  );
  const resetAssignment = useCallback(
    () => dispatch({ type: "RESET_ASSIGNMENT" }),
    []
  );
  const setXP = useCallback(
    (blueXP: number, redXP: number) =>
      dispatch({ type: "SET_XP", blueXP, redXP }),
    []
  );
  const setLeaderboard = useCallback(
    (leaderboardData: LeaderboardEntry[]) =>
      dispatch({ type: "SET_LEADERBOARD", leaderboardData }),
    []
  );

  const value = useMemo<TeamContextValue>(
    () => ({
      ...state,
      assignTeam,
      resetAssignment,
      setXP,
      setLeaderboard,
    }),
    [state, assignTeam, resetAssignment, setXP, setLeaderboard]
  );

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
}

export function useTeam(): TeamContextValue {
  const ctx = useContext(TeamContext);
  if (!ctx) {
    throw new Error("useTeam must be used within a <TeamProvider>");
  }
  return ctx;
}
