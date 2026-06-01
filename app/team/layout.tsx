import type { ReactNode } from "react";
import { TeamProvider } from "@/src/features/teamCompetition/context/TeamContext";
import { TeamCompetitionNavigator } from "@/src/features/teamCompetition/navigation/TeamCompetitionNavigator";

export default function TeamLayout({ children }: { children: ReactNode }) {
  return (
    <TeamProvider>
      <TeamCompetitionNavigator>{children}</TeamCompetitionNavigator>
    </TeamProvider>
  );
}
