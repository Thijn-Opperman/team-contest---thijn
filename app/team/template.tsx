"use client";

import type { ReactNode } from "react";

/**
 * A `template` re-mounts on every navigation within the /team segment (unlike a
 * `layout`), so wrapping the active screen here replays the entrance transition
 * each time — giving the flow a consistent slide/fade between pages.
 */
export default function TeamTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="duo-screen-in flex min-h-full w-full flex-1 flex-col">
      {children}
    </div>
  );
}
