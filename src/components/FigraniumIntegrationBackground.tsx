import React from "react";

type Orientation = "h" | "v";

interface FlowSegment {
  id: number;
  x: number;
  y: number;
  length: number;
  orientation: Orientation;
  baseOpacity: number;
  flowOpacity: number;
  duration: number;
  delay: number;
  reverse: boolean;
}

function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const random = createSeededRandom(17031994);

const flowSegments: FlowSegment[] = (() => {
  const segments: FlowSegment[] = [];
  let segmentId = 0;

  // Build random orthogonal routes (horizontal/vertical) across the canvas.
  for (let route = 0; route < 64; route += 1) {
    let x = random() * 100;
    let y = random() * 100;
    let orientation: Orientation = random() > 0.5 ? "h" : "v";
    const steps = 2 + Math.floor(random() * 4);

    for (let step = 0; step < steps; step += 1) {
      const length = 8 + random() * 24;
      const direction = random() > 0.5 ? 1 : -1;

      if (orientation === "h") {
        const startX = direction > 0 ? x : x - length;
        const clampedX = clamp(startX, 0, 100 - length);

        segments.push({
          id: segmentId,
          x: clampedX,
          y: clamp(y, 0, 100),
          length,
          orientation,
          baseOpacity: 0.12 + random() * 0.12,
          flowOpacity: 0.72 + random() * 0.28,
          duration: 7 + random() * 12,
          delay: random() * 18,
          reverse: random() > 0.5,
        });

        segmentId += 1;
        x = clamp(clampedX + (direction > 0 ? length : 0), 0, 100);
      } else {
        const startY = direction > 0 ? y : y - length;
        const clampedY = clamp(startY, 0, 100 - length);

        segments.push({
          id: segmentId,
          x: clamp(x, 0, 100),
          y: clampedY,
          length,
          orientation,
          baseOpacity: 0.12 + random() * 0.12,
          flowOpacity: 0.72 + random() * 0.28,
          duration: 7 + random() * 12,
          delay: random() * 18,
          reverse: random() > 0.5,
        });

        segmentId += 1;
        y = clamp(clampedY + (direction > 0 ? length : 0), 0, 100);
      }

      if (random() > 0.62) {
        x = clamp(x + (random() - 0.5) * 12, 0, 100);
        y = clamp(y + (random() - 0.5) * 12, 0, 100);
      }

      orientation = orientation === "h" ? "v" : "h";
    }
  }

  return segments;
})();

export function FigraniumIntegrationBackground() {
  return (
    <div
      className="absolute inset-0 z-1 w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <style>
        {`
          @keyframes figraniumFlowX {
            from { transform: translateX(-42px); }
            to { transform: translateX(calc(100% + 42px)); }
          }

          @keyframes figraniumFlowXReverse {
            from { transform: translateX(calc(100% + 42px)); }
            to { transform: translateX(-42px); }
          }

          @keyframes figraniumFlowY {
            from { transform: translateY(-42px); }
            to { transform: translateY(calc(100% + 42px)); }
          }

          @keyframes figraniumFlowYReverse {
            from { transform: translateY(calc(100% + 42px)); }
            to { transform: translateY(-42px); }
          }

          .figranium-flow-track {
            position: absolute;
            overflow: hidden;
            border-radius: 999px;
          }

          .figranium-flow-pulse {
            position: absolute;
            display: block;
            mix-blend-mode: screen;
            filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.78));
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform;
          }

          .figranium-flow-pulse-h {
            top: 0;
            left: 0;
            width: 44px;
            height: 100%;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.95) 45%,
              rgba(255, 255, 255, 0)
            );
          }

          .figranium-flow-pulse-v {
            top: 0;
            left: 0;
            width: 100%;
            height: 44px;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.95) 45%,
              rgba(255, 255, 255, 0)
            );
          }

          .figranium-flow-x {
            animation-name: figraniumFlowX;
          }

          .figranium-flow-x-reverse {
            animation-name: figraniumFlowXReverse;
          }

          .figranium-flow-y {
            animation-name: figraniumFlowY;
          }

          .figranium-flow-y-reverse {
            animation-name: figraniumFlowYReverse;
          }
        `}
      </style>

      {flowSegments.map((segment) => {
        const trackStyle: React.CSSProperties =
          segment.orientation === "h"
            ? {
                left: `${segment.x}%`,
                top: `${segment.y}%`,
                width: `${segment.length}%`,
                height: "1.5px",
                backgroundColor: `rgba(255, 255, 255, ${segment.baseOpacity})`,
              }
            : {
                left: `${segment.x}%`,
                top: `${segment.y}%`,
                width: "1.5px",
                height: `${segment.length}%`,
                backgroundColor: `rgba(255, 255, 255, ${segment.baseOpacity})`,
              };

        const pulseClass =
          segment.orientation === "h"
            ? segment.reverse
              ? "figranium-flow-pulse-h figranium-flow-x-reverse"
              : "figranium-flow-pulse-h figranium-flow-x"
            : segment.reverse
              ? "figranium-flow-pulse-v figranium-flow-y-reverse"
              : "figranium-flow-pulse-v figranium-flow-y";

        return (
          <div
            key={segment.id}
            className="figranium-flow-track"
            style={trackStyle}
          >
            <span
              className={`figranium-flow-pulse ${pulseClass}`}
              style={{
                opacity: segment.flowOpacity,
                animationDuration: `${segment.duration}s`,
                animationDelay: `-${segment.delay}s`,
              }}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)]" />
    </div>
  );
}

export default FigraniumIntegrationBackground;
