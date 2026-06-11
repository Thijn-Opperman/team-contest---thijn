import Image from "next/image";
import { COLORS } from "../constants/teamColors";
import { Sparkle } from "./Sparkle";

interface PageTitleRibbonProps {
  title: string;
  className?: string;
  /** Edge-to-edge ribbon flush with the top of the screen. */
  fullBleed?: boolean;
  variant?: "split" | "green";
  showDuo?: boolean;
}

function RibbonBar({
  title,
  variant,
}: {
  title: string;
  variant: "split" | "green";
}) {
  if (variant === "green") {
    return (
      <>
        <Sparkle size={18} color="#1ED760" className="absolute left-7 top-3" />
        <Sparkle
          size={14}
          color="#B9F57A"
          delayMs={420}
          className="absolute left-14 top-5"
        />
        <h1 className="px-14 text-center text-[21px] font-black leading-tight text-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.32)]">
          {title}
        </h1>
        <Sparkle
          size={18}
          color="#B9F57A"
          delayMs={600}
          className="absolute right-7 top-3"
        />
        <Sparkle
          size={14}
          color="#1ED760"
          delayMs={900}
          className="absolute right-14 top-5"
        />
      </>
    );
  }

  return (
    <>
      <Sparkle size={18} color="#8FE5FF" className="absolute left-7 top-3" />
      <Sparkle
        size={14}
        color="#A8DFFF"
        delayMs={420}
        className="absolute left-14 top-5"
      />
      <h1 className="px-14 text-center text-[21px] font-black leading-tight text-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.32)]">
        {title}
      </h1>
      <Sparkle
        size={18}
        color="#FFB8B8"
        delayMs={600}
        className="absolute right-7 top-3"
      />
      <Sparkle
        size={14}
        color="#FF9A9A"
        delayMs={900}
        className="absolute right-14 top-5"
      />
    </>
  );
}

const splitRibbonStyle = {
  background: `linear-gradient(105deg, ${COLORS.blue} 0%, ${COLORS.blue} 49%, ${COLORS.red} 51%, ${COLORS.red} 100%)`,
  borderBottom: "5px solid rgba(0,0,0,0.14)",
  borderBottomLeftRadius: "50% 18px",
  borderBottomRightRadius: "50% 18px",
} as const;

const greenRibbonStyle = {
  background: COLORS.green,
  borderBottom: `5px solid ${COLORS.greenBorder}`,
  borderBottomLeftRadius: "50% 18px",
  borderBottomRightRadius: "50% 18px",
} as const;

/** Title ribbon with optional Duo peeking over the top edge. */
export function PageTitleRibbon({
  title,
  className = "",
  fullBleed = false,
  variant = "split",
  showDuo = true,
}: PageTitleRibbonProps) {
  const ribbonStyle = variant === "green" ? greenRibbonStyle : splitRibbonStyle;

  if (fullBleed) {
    return (
      <div className={`relative w-full shrink-0 ${className}`}>
        <div
          className="relative flex w-full items-center justify-center shadow-lg"
          style={{
            ...ribbonStyle,
            paddingTop: "max(env(safe-area-inset-top), 0px)",
            minHeight: "calc(96px + env(safe-area-inset-top, 0px))",
          }}
        >
          <RibbonBar title={title} variant={variant} />
        </div>
        {showDuo && (
          <div className="pointer-events-none absolute left-1/2 top-[calc(env(safe-area-inset-top,0px)+10px)] z-20 -translate-x-1/2">
            <Image
              src="/duo.png"
              alt=""
              width={76}
              height={76}
              priority
              className="h-[76px] w-[76px] object-contain object-bottom drop-shadow-[0_4px_2px_rgba(0,0,0,0.22)]"
              aria-hidden
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative shrink-0 ${className}`}>
      {showDuo && (
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <Image
            src="/duo.png"
            alt=""
            width={76}
            height={76}
            priority
            className="h-[76px] w-[76px] object-contain object-bottom drop-shadow-[0_4px_2px_rgba(0,0,0,0.22)]"
            aria-hidden
          />
        </div>
      )}

      <div className="relative z-10 mt-[46px] h-[50px]">
        <div
          className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center shadow-lg"
          style={ribbonStyle}
        >
          <RibbonBar title={title} variant={variant} />
        </div>
      </div>
    </div>
  );
}

export default PageTitleRibbon;
