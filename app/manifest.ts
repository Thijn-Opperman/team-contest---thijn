import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Duolingo Team Competition",
    short_name: "Team Contest",
    description: "Spin the wheel and compete for XP with your team.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#58CC02",
    theme_color: "#58CC02",
    icons: [
      {
        src: "/duo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
