export type TeamId = "blue" | "red";

/**
 * Duolingo design-system palette used across the Team Competition feature.
 * Token names follow Duolingo's official "Duo's palette" naming where possible.
 */
export const COLORS = {
  // Core greens
  green: "#58CC02", // Feather Green (primary CTA)
  greenBorder: "#58A700", // Green shadow (3D button bottom)
  maskGreen: "#89E219", // Mask Green (secondary)
  // Secondary brand colors
  blue: "#1CB0F6", // Macaw
  blueBorder: "#1899D6",
  blueDark: "#0A8FD4",
  red: "#FF4B4B", // Cardinal
  redBorder: "#EA2B2B",
  redDark: "#CC3333",
  gold: "#FFC800", // Bee
  goldDark: "#E6A800",
  purple: "#CE82FF", // Beetle
  // Neutrals
  eel: "#4B4B4B", // primary type
  wolf: "#777777", // body copy gray
  hare: "#AFAFAF", // inactive / muted
  swan: "#E5E5E5", // hairlines / borders
  polar: "#F7F7F7", // light surface
  snow: "#FFFFFF",
  // Misc
  mint: "#A5E8C0",
  lightBlueBg: "#DDF4FF",
  white: "#FFFFFF",
  inkDark: "#4B4B4B", // alias of eel (kept for back-compat)
} as const;

export const WHEEL = {
  segments: 8,
  spinDurationMs: 3500,
  minRotations: 5,
  maxRotations: 8,
} as const;

/**
 * Per-team copy + colours. Display strings intentionally match the supplied
 * mockups (which mix the "Junior"/"Eddy" mascots between screens).
 */
export const TEAMS: Record<
  TeamId,
  {
    id: TeamId;
    mascot: string;
    welcomeTitle: string;
    bannerName: string;
    assignedText: string;
    standingsName: string;
    color: string;
    colorDark: string;
    gradient: string;
  }
> = {
  blue: {
    id: "blue",
    mascot: "Junior",
    welcomeTitle: "Welcome to Junior's Team!",
    bannerName: "Team Blue Junior",
    assignedText: "You're on Junior's team.",
    standingsName: "Team Blue Junior",
    color: COLORS.blue,
    colorDark: COLORS.blueDark,
    gradient: `linear-gradient(180deg, ${COLORS.blue} 0%, ${COLORS.blueDark} 100%)`,
  },
  red: {
    id: "red",
    mascot: "Eddy",
    welcomeTitle: "Welcome to Eddy's Team!",
    bannerName: "Team Red Eddy",
    assignedText: "You're on Eddy's team.",
    standingsName: "Team Red Eddy",
    color: COLORS.red,
    colorDark: COLORS.redDark,
    gradient: `linear-gradient(180deg, ${COLORS.red} 0%, ${COLORS.redDark} 100%)`,
  },
};

export function formatXP(value: number): string {
  return value.toLocaleString("en-US");
}
