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
      {/* Gold pointer at the top, pointing down into the wheel */}
      <div className="absolute left-1/2 z-20" style={{ top: -6 }}>
        <div
          style={{
            width: 0,
            height: 0,
            transform: "translateX(-50%)",
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            borderTop: `26px solid ${COLORS.gold}`,
            filter: "drop-shadow(0 3px 2px rgba(0,0,0,0.25))",
          }}
        />
      </div>

      {/* Outer gold ring + drop shadow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: COLORS.gold,
          boxShadow:
            "0 10px 24px rgba(0,0,0,0.35), inset 0 -6px 0 rgba(0,0,0,0.12)",
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
        {segments.map((s) => (
          <g key={s.i}>
            <path d={s.path} fill={s.fill} stroke="rgba(0,0,0,0.08)" strokeWidth={0.5} />
            <text
              x={s.labelPos.x}
              y={s.labelPos.y}
              fill={COLORS.white}
              fontSize={13}
              fontWeight={800}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${s.center} ${s.labelPos.x} ${s.labelPos.y})`}
            >
              {s.label}
            </text>
          </g>
        ))}
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
