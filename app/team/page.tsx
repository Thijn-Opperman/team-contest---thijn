"use client";

import { useState } from "react";
import type { TeamId } from "@/src/features/teamCompetition/constants/teamColors";
import { useTeam } from "@/src/features/teamCompetition/context/TeamContext";
import TeamWheelScreen from "@/src/features/teamCompetition/screens/TeamWheelScreen";

export default function TeamWheelPage() {
  const { blueXP, redXP } = useTeam();

  // Balancing "algorithm": assign newcomers to the trailing team so the
  // competition stays close. The wheel is purely cosmetic — the result here is
  // authoritative and the wheel always lands on this color.
  const [assignedTeam] = useState<TeamId>(() =>
    blueXP <= redXP ? "blue" : "red"
  );

  return <TeamWheelScreen assignedTeam={assignedTeam} />;
}
