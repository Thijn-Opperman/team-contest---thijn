import type { Metadata, Viewport } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";

// Nunito is a rounded, bold-friendly stand-in for Duolingo's "DIN Round".
const dinRound = Nunito({
  variable: "--font-din-round",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Duolingo Team Competition",
  description: "Join your team and compete for XP!",
  applicationName: "Team Contest",
  appleWebApp: {
    capable: true,
    title: "Team Contest",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#58CC02",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dinRound.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-hidden flex flex-col bg-[#F7F7F7]">
        {children}
      </body>
    </html>
  );
}
