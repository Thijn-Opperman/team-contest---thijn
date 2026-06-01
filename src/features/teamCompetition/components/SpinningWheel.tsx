"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { COLORS, WHEEL, type TeamId } from "../constants/teamColors";

interface SpinningWheelProps {
  /** Pre-determined outcome the wheel must land on. */
  assignedTeam: TeamId;
  /** Diameter of the wheel in px. */
  size?: number;
  /** Fired once the spin animation settles. */
  onSpinComplete?: () => void;
}

const SEG_COUNT = WHEEL.segments;
const SEG_ANGLE = 360 / SEG_COUNT; // 45deg

/** Even segments are Blue, odd are Red (alternating around the wheel). */
function segmentTeam(index: number): TeamId {
  return index % 2 === 0 ? "blue" : "red";
}

/** Point on the circle, measuring `angle` clockwise from the top (12 o'clock). */
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function wedgePath(cx: number, cy: number, r: number, start: number, end: number) {
  const a = polar(cx, cy, r, start);
  const b = polar(cx, cy, r, end);
  return `M ${cx} ${cy} L ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y} Z`;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function SpinningWheel({
  assignedTeam,
  size = 300,
  onSpinComplete,
}: SpinningWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [duration, setDuration] = useState<number>(WHEEL.spinDurationMs);
  const completedRef = useRef(false);

  const VB = 200; // SVG viewBox units
  const cx = VB / 2;
  const cy = VB / 2;
  const r = 92;

  const segments = useMemo(
    () =>
      Array.from({ length: SEG_COUNT }, (_, i) => {
        const start = i * SEG_ANGLE;
        const end = start + SEG_ANGLE;
        const center = start + SEG_ANGLE / 2;
        const team = segmentTeam(i);
        return {
          i,
          team,
          center,
          path: wedgePath(cx, cy, r, start, end),
          fill: team === "blue" ? COLORS.blue : COLORS.red,
          label: team === "blue" ? "Blue" : "Red",
          labelPos: polar(cx, cy, r * 0.62, center),
        };
      }),
    [cx, cy, r]
  );

  // Auto-spin on mount towards a segment matching the assigned team.
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Candidate segments of the correct colour, pick one at random.
    const candidates = segments
      .filter((s) => s.team === assignedTeam)
      .map((s) => s.i);
    const target = candidates[Math.floor(Math.random() * candidates.length)];
    const targetCenter = target * SEG_ANGLE + SEG_ANGLE / 2;

    // Rotation needed to bring the target segment center under the top pointer,
    // plus several full turns and a little jitter inside the segment.
    const baseOffset = (360 - (targetCenter % 360)) % 360;
    const spins = Math.round(rand(WHEEL.minRotations, WHEEL.maxRotations));
    const jitter = rand(-SEG_ANGLE * 0.35, SEG_ANGLE * 0.35);
    const finalRotation = spins * 360 + baseOffset + jitter;

    const spinMs = reduceMotion ? 0 : WHEEL.spinDurationMs;

    // Defer one frame so the transition applies from 0 -> finalRotation.
    // Setting state inside the rAF callback (not synchronously in the effect
    // body) avoids cascading renders.
    const raf = requestAnimationFrame(() => {
      setDuration(spinMs);
      setRotation(finalRotation);
    });

    const timer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onSpinComplete?.();
      }
    }, spinMs + 60);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="pointer-events-none relative"
      style={{ width: size, height: size }}
      aria-label={`Spinning wheel selecting ${assignedTeam} team`}
      role="img"
    >
      {/* Clean top pointer: no pill/bar, just a compact gold marker. */}
      <div className="absolute left-1/2 z-20" style={{ top: -8 }}>
        <div
          className="relative"
          style={{
            width: 0,
            height: 0,
            transform: "translateX(-50%)",
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop: `32px solid ${COLORS.gold}`,
            filter: "drop-shadow(0 5px 2px rgba(0,0,0,0.26))",
          }}
        >
          <span
            className="absolute"
            style={{
              left: -12,
              top: -29,
              width: 0,
              height: 0,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "19px solid rgba(255,255,255,0.42)",
            }}
          />
        </div>
      </div>

      {/* Outer gold ring + drop shadow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, #FFF17A 0%, ${COLORS.gold} 62%, ${COLORS.goldDark} 100%)`,
          boxShadow:
            "0 12px 24px rgba(0,0,0,0.32), inset 0 5px 0 rgba(255,255,255,0.42), inset 0 -8px 0 rgba(0,0,0,0.12)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          inset: size * 0.075,
          border: "4px solid rgba(255,255,255,0.42)",
          boxShadow: "inset 0 0 0 2px rgba(255,200,0,0.72)",
        }}
      />

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0"
        style={{
          width: "100%",
          height: "100%",
          padding: size * 0.045,
          transform: `rotate(${rotation}deg)`,
          transition: `transform ${duration}ms cubic-bezier(0.17, 0.67, 0.21, 1)`,
          willChange: "transform",
        }}
      >
        <defs>
          <filter id="wheelTextShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="1.8" stdDeviation="1.1" floodOpacity="0.35" />
          </filter>
          <radialGradient id="wheelGloss" cx="32%" cy="22%" r="78%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.14" />
          </radialGradient>
          {segments.map((s) => (
            <linearGradient
              key={`gradient-${s.i}`}
              id={`segment-${s.i}`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={s.team === "blue" ? "#58D5FF" : "#FF7777"}
              />
              <stop offset="100%" stopColor={s.fill} />
            </linearGradient>
          ))}
        </defs>
        {segments.map((s) => (
          <g key={s.i}>
            <path
              d={s.path}
              fill={`url(#segment-${s.i})`}
              stroke="#FFD94D"
              strokeWidth={1.4}
            />
            <text
              x={s.labelPos.x}
              y={s.labelPos.y}
              fill={COLORS.white}
              fontSize={13}
              fontWeight={800}
              textAnchor="middle"
              dominantBaseline="middle"
              filter="url(#wheelTextShadow)"
              transform={`rotate(${s.center} ${s.labelPos.x} ${s.labelPos.y})`}
            >
              {s.label}
            </text>
          </g>
        ))}
        <circle cx={cx} cy={cy} r={r} fill="url(#wheelGloss)" pointerEvents="none" />
        <circle
          cx={cx}
          cy={cy}
          r={r * 0.98}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={2}
          pointerEvents="none"
        />
      </svg>

      {/* Gold center hub */}
      <div
        className="absolute left-1/2 top-1/2 z-10 rounded-full"
        style={{
          width: size * 0.13,
          height: size * 0.13,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle at 35% 30%, ${COLORS.gold}, ${COLORS.goldDark})`,
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          border: "3px solid rgba(255,255,255,0.5)",
        }}
      />
    </div>
  );
}

export default SpinningWheel;
