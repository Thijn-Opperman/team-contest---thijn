"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { COLORS } from "../constants/teamColors";

interface Item {
  href: string;
  label: string;
  icon: ReactNode;
}

function I({ children }: { children: ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const ITEMS: Item[] = [
  {
    href: "/",
    label: "Home",
    icon: (
      <I>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
      </I>
    ),
  },
  {
    href: "/team",
    label: "Spin the wheel",
    icon: (
      <I>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 3.5v17M3.5 12h17" />
      </I>
    ),
  },
  {
    href: "/team/welcome",
    label: "My team",
    icon: (
      <I>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9.5" r="2.3" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      </I>
    ),
  },
  {
    href: "/team/standings",
    label: "Team standings",
    icon: (
      <I>
        <rect x="4" y="11" width="4" height="8" rx="1" />
        <rect x="10" y="6" width="4" height="13" rx="1" />
        <rect x="16" y="9" width="4" height="10" rx="1" />
      </I>
    ),
  },
  {
    href: "/team/leaderboard",
    label: "Blue leaderboard",
    icon: (
      <I>
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
        <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" />
        <path d="M12 13v3M9 20h6M10 16h4l1 4H9l1-4Z" />
      </I>
    ),
  },
  {
    href: "/team/leaderboard/red",
    label: "Red leaderboard",
    icon: (
      <I>
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
        <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" />
        <path d="M12 13v3M9 20h6M10 16h4l1 4H9l1-4Z" />
      </I>
    ),
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/team") return pathname === "/team";
  if (href === "/team/leaderboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Collapsible navigation anchored to the top-right of the device frame. */
export function TopNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // Close on Escape (listener added/removed in effect; setState only in callback).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Tap-away backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 z-40 cursor-default bg-black/10"
        />
      )}

      <div
        className="pointer-events-none absolute right-4 z-50 flex flex-col items-end"
        style={{ top: "calc(env(safe-area-inset-top) + 1rem)" }}
      >
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="duo-tap pointer-events-auto flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-b-[4px] border-[#E5E5E5] bg-white text-[#4B4B4B] shadow-lg"
        >
          <span className="relative block h-[18px] w-[20px]">
            <span
              className="absolute left-0 block h-[2.5px] w-full rounded bg-current transition-all duration-300"
              style={{ top: open ? 8 : 2, transform: open ? "rotate(45deg)" : "none" }}
            />
            <span
              className="absolute left-0 top-2 block h-[2.5px] w-full rounded bg-current transition-all duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 block h-[2.5px] w-full rounded bg-current transition-all duration-300"
              style={{ bottom: open ? 8 : 2, transform: open ? "rotate(-45deg)" : "none" }}
            />
          </span>
        </button>

        {/* Menu panel — absolute so the closed panel does not widen the hit area */}
        <div
          className="pointer-events-auto absolute right-0 top-[calc(100%+0.5rem)] w-60 origin-top-right overflow-hidden rounded-2xl border-2 border-[#E5E5E5] bg-white shadow-2xl transition-all duration-200 ease-out"
          style={{
            transform: open ? "scale(1) translateY(0)" : "scale(0.92) translateY(-8px)",
            opacity: open ? 1 : 0,
            visibility: open ? "visible" : "hidden",
            pointerEvents: open ? "auto" : "none",
          }}
          role="menu"
          aria-hidden={!open}
        >
          <div className="px-4 pb-1 pt-3 text-[11px] font-extrabold uppercase tracking-wider text-[#AFAFAF]">
            Navigate
          </div>
          <nav className="flex flex-col p-1.5">
            {ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              const activeColor =
                item.href === "/team/leaderboard/red" ? COLORS.red : COLORS.blue;
              const activeBg =
                item.href === "/team/leaderboard/red" ? "#FFE1E1" : COLORS.lightBlueBg;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-extrabold transition-colors"
                  style={{
                    background: active ? activeBg : "transparent",
                    color: active ? activeColor : COLORS.eel,
                  }}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center"
                    style={{ color: active ? activeColor : COLORS.hare }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

export default TopNav;
