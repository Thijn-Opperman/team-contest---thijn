"use client";

import { useState } from "react";
import type { TeamId } from "@/src/features/teamCompetition/constants/teamColors";
import TeamWheelScreen from "@/src/features/teamCompetition/screens/TeamWheelScreen";

const COUNTS_KEY = "duo.teamCompetition.assignmentCounts.v1";

function randomTeam(): TeamId {
  const values = new Uint32Array(1);
  window.crypto?.getRandomValues(values);
  return values[0] % 2 === 0 ? "blue" : "red";
}

function chooseBalancedTeam(): TeamId {
  try {
    const raw = window.localStorage.getItem(COUNTS_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Record<TeamId, number>>) : {};
    const blue = parsed.blue ?? 0;
    const red = parsed.red ?? 0;

    if (blue < red) return "blue";
    if (red < blue) return "red";
    return randomTeam();
  } catch {
    return Math.random() < 0.5 ? "blue" : "red";
  }
}

export default function TeamWheelPage() {
  // Local balancing for this prototype: equal counts choose randomly, otherwise
  // the wheel assigns the side that has been selected less often on this device.
  const [assignedTeam] = useState<TeamId>(chooseBalancedTeam);

  return <TeamWheelScreen assignedTeam={assignedTeam} />;
}
