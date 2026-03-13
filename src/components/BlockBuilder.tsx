import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import MouseIcon from "@mui/icons-material/Mouse";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CodeIcon from "@mui/icons-material/Code";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { SectionSurface } from "./SectionSurface";

interface FlowNode {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  xRatio: number;
  yRatio: number;
}

interface FlowConnection {
  from: string;
  to: string;
}

interface DraftConnection {
  from: string;
  x: number;
  y: number;
}

interface DraggedNode {
  nodeId: string;
  offsetX: number;
  offsetY: number;
}

interface Point {
  x: number;
  y: number;
}

const NODE_WIDTH = 196;
const NODE_HEIGHT = 84;
const CANVAS_HEIGHT = 420;
const MIN_CANVAS_WIDTH = 1120;

const initialFlowNodes: FlowNode[] = [
  {
    id: "goto",
    type: "goto",
    label: "Go to URL",
    icon: <MouseIcon sx={{ fontSize: 16 }} />,
    xRatio: 0.03,
    yRatio: 0.14,
  },
  {
    id: "wait",
    type: "wait",
    label: "Wait for Element",
    icon: <HourglassEmptyIcon sx={{ fontSize: 16 }} />,
    xRatio: 0.25,
    yRatio: 0.14,
  },
  {
    id: "click",
    type: "click",
    label: "Click Element",
    icon: <MouseIcon sx={{ fontSize: 16 }} />,
    xRatio: 0.47,
    yRatio: 0.14,
  },
  {
    id: "type",
    type: "type",
    label: "Type Text",
    icon: <KeyboardIcon sx={{ fontSize: 16 }} />,
    xRatio: 0.25,
    yRatio: 0.62,
  },
  {
    id: "js",
    type: "js",
    label: "Run JavaScript",
    icon: <CodeIcon sx={{ fontSize: 16 }} />,
    xRatio: 0.47,
    yRatio: 0.62,
  },
  {
    id: "condition",
    type: "condition",
    label: "If/Else",
    icon: <AccountTreeIcon sx={{ fontSize: 16 }} />,
    xRatio: 0.78,
    yRatio: 0.38,
  },
];

const defaultConnections: FlowConnection[] = [
  { from: "goto", to: "wait" },
  { from: "wait", to: "click" },
  { from: "wait", to: "type" },
  { from: "click", to: "condition" },
  { from: "type", to: "js" },
  { from: "js", to: "condition" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function buildConnectionPath(from: Point, to: Point) {
  const horizontalCurve = Math.max(64, Math.abs(to.x - from.x) * 0.45);
  const controlPoint1X = from.x + horizontalCurve;
  const controlPoint2X = to.x - horizontalCurve;

  return `M ${from.x} ${from.y} C ${controlPoint1X} ${from.y}, ${controlPoint2X} ${to.y}, ${to.x} ${to.y}`;
}

export function BlockBuilder() {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [canvasWidth, setCanvasWidth] = useState(MIN_CANVAS_WIDTH);
  const [nodes, setNodes] = useState(initialFlowNodes);
  const [connections, setConnections] = useState(defaultConnections);
  const [draftConnection, setDraftConnection] =
    useState<DraftConnection | null>(null);
  const [draggedNode, setDraggedNode] = useState<DraggedNode | null>(null);
  const [hoverTargetId, setHoverTargetId] = useState<string | null>(null);

  const nodesById = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes],
  );

  const getNodePosition = (node: FlowNode): Point => ({
    x: node.xRatio * Math.max(1, canvasWidth - NODE_WIDTH),
    y: node.yRatio * Math.max(1, CANVAS_HEIGHT - NODE_HEIGHT),
  });

  const getInputPoint = (nodeId: string): Point => {
    const node = nodesById.get(nodeId);
    if (!node) {
      return { x: 0, y: 0 };
    }

    const position = getNodePosition(node);
    return {
      x: position.x,
      y: position.y + NODE_HEIGHT / 2,
    };
  };

  const getOutputPoint = (nodeId: string): Point => {
    const node = nodesById.get(nodeId);
    if (!node) {
      return { x: 0, y: 0 };
    }

    const position = getNodePosition(node);
    return {
      x: position.x + NODE_WIDTH,
      y: position.y + NODE_HEIGHT / 2,
    };
  };

  const getCanvasPointFromClient = (
    clientX: number,
    clientY: number,
  ): Point | null => {
    if (!canvasRef.current) {
      return null;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: clamp(clientX - rect.left, 0, canvasWidth),
      y: clamp(clientY - rect.top, 0, CANVAS_HEIGHT),
    };
  };

  const startConnection = (
    event: React.PointerEvent<HTMLButtonElement>,
    fromNodeId: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const startPoint = getOutputPoint(fromNodeId);
    setDraggedNode(null);
    setHoverTargetId(null);
    setDraftConnection({ from: fromNodeId, x: startPoint.x, y: startPoint.y });
  };

  const startNodeDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    nodeId: string,
  ) => {
    if ((event.target as HTMLElement).closest("[data-port='true']")) {
      return;
    }

    const node = nodesById.get(nodeId);
    const pointerPoint = getCanvasPointFromClient(event.clientX, event.clientY);
    if (!node || !pointerPoint) {
      return;
    }

    event.preventDefault();
    const nodePosition = getNodePosition(node);
    setDraftConnection(null);
    setHoverTargetId(null);
    setDraggedNode({
      nodeId,
      offsetX: pointerPoint.x - nodePosition.x,
      offsetY: pointerPoint.y - nodePosition.y,
    });
  };

  const connectNodes = (targetNodeId: string) => {
    if (!draftConnection || draftConnection.from === targetNodeId) {
      return;
    }

    setConnections((previousConnections) => {
      const alreadyConnected = previousConnections.some(
        (connection) =>
          connection.from === draftConnection.from &&
          connection.to === targetNodeId,
      );

      if (alreadyConnected) {
        return previousConnections;
      }

      return [
        ...previousConnections,
        { from: draftConnection.from, to: targetNodeId },
      ];
    });
  };

  useEffect(() => {
    if (!canvasHostRef.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateWidth = () => {
      if (!canvasHostRef.current) {
        return;
      }

      const nextWidth = Math.max(
        MIN_CANVAS_WIDTH,
        Math.floor(canvasHostRef.current.clientWidth),
      );
      setCanvasWidth((previousWidth) =>
        previousWidth === nextWidth ? previousWidth : nextWidth,
      );
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(canvasHostRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!draftConnection && !draggedNode) {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const pointerPoint = getCanvasPointFromClient(
        event.clientX,
        event.clientY,
      );
      if (!pointerPoint) {
        return;
      }

      if (draftConnection) {
        setDraftConnection((previousDraft) => {
          if (!previousDraft) {
            return previousDraft;
          }

          return {
            ...previousDraft,
            x: pointerPoint.x,
            y: pointerPoint.y,
          };
        });
      }

      if (draggedNode) {
        const minX = 8;
        const minY = 8;
        const maxX = canvasWidth - NODE_WIDTH - 8;
        const maxY = CANVAS_HEIGHT - NODE_HEIGHT - 8;
        const nextX = clamp(pointerPoint.x - draggedNode.offsetX, minX, maxX);
        const nextY = clamp(pointerPoint.y - draggedNode.offsetY, minY, maxY);
        const widthSpan = Math.max(1, canvasWidth - NODE_WIDTH);
        const heightSpan = Math.max(1, CANVAS_HEIGHT - NODE_HEIGHT);

        setNodes((previousNodes) =>
          previousNodes.map((node) => {
            if (node.id !== draggedNode.nodeId) {
              return node;
            }

            return {
              ...node,
              xRatio: nextX / widthSpan,
              yRatio: nextY / heightSpan,
            };
          }),
        );
      }
    };

    const handlePointerUp = () => {
      setDraggedNode(null);
      setDraftConnection(null);
      setHoverTargetId(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draftConnection, draggedNode, canvasWidth]);

  return (
    <SectionSurface contentClassName="px-6 py-10 md:px-10 md:py-12">
      <div className="mb-16">
        <span className="text-zinc-500 font-medium tracking-[0.2em] mb-4 block text-xs uppercase">
          BLOCK-FIRST DESIGN
        </span>
        <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-6 max-w-2xl">
          Drag and drop to build logic.
        </h3>
        <p className="text-zinc-400 max-w-2xl leading-relaxed text-lg">
          Complex automation is broken down into simple, composable blocks. Move
          cards around, then drag from an output port to another block's input
          to wire the flow.
        </p>
      </div>

      <div className="relative rounded-2xl border border-white/10 bg-[#060606]/95 p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span>Flow Editor</span>
          <button
            type="button"
            onClick={() => {
              setNodes(initialFlowNodes);
              setConnections(defaultConnections);
            }}
            className="rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-[0.12em] text-zinc-400 hover:border-white/25 hover:text-zinc-200 transition-colors"
          >
            Reset Graph
          </button>
        </div>

        <div ref={canvasHostRef} className="overflow-x-auto pb-2">
          <div
            ref={canvasRef}
            className="relative rounded-xl border border-white/10 bg-[#050505]"
            style={{
              width: canvasWidth,
              height: CANVAS_HEIGHT,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          >
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none"
              viewBox={`0 0 ${canvasWidth} ${CANVAS_HEIGHT}`}
              fill="none"
              preserveAspectRatio="none"
            >
              {connections.map((connection) => {
                const fromPoint = getOutputPoint(connection.from);
                const toPoint = getInputPoint(connection.to);

                return (
                  <path
                    key={`${connection.from}-${connection.to}`}
                    d={buildConnectionPath(fromPoint, toPoint)}
                    stroke="rgba(34, 211, 238, 0.65)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                );
              })}

              {draftConnection && (
                <path
                  d={buildConnectionPath(getOutputPoint(draftConnection.from), {
                    x: draftConnection.x,
                    y: draftConnection.y,
                  })}
                  stroke="rgba(125, 211, 252, 0.95)"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                />
              )}
            </svg>

            {nodes.map((node, index) => {
              const position = getNodePosition(node);
              const isTargetHighlighted =
                hoverTargetId === node.id &&
                draftConnection !== null &&
                draftConnection.from !== node.id;
              const isDragging = draggedNode?.nodeId === node.id;

              return (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: position.x,
                    top: position.y,
                    width: NODE_WIDTH,
                    height: NODE_HEIGHT,
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <div
                    className={`group relative h-full rounded-xl border bg-[#0A0A0A] px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-colors cursor-grab active:cursor-grabbing ${isDragging ? "border-cyan-300/70" : "border-white/10 hover:border-white/20"}`}
                    onPointerDown={(event) => startNodeDrag(event, node.id)}
                  >
                    <button
                      type="button"
                      data-port="true"
                      aria-label={`Connect into ${node.label}`}
                      onPointerEnter={() => {
                        if (
                          draftConnection &&
                          draftConnection.from !== node.id
                        ) {
                          setHoverTargetId(node.id);
                        }
                      }}
                      onPointerLeave={() => {
                        if (hoverTargetId === node.id) {
                          setHoverTargetId(null);
                        }
                      }}
                      onPointerUp={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        connectNodes(node.id);
                        setDraftConnection(null);
                        setHoverTargetId(null);
                      }}
                      className={`absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border transition-colors ${isTargetHighlighted ? "border-cyan-200 bg-cyan-300" : "border-zinc-500 bg-zinc-700"}`}
                    />

                    <button
                      type="button"
                      data-port="true"
                      aria-label={`Connect from ${node.label}`}
                      onPointerDown={(event) => startConnection(event, node.id)}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border border-cyan-300/50 bg-cyan-400/20 hover:bg-cyan-300/40 transition-colors"
                    />

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md border border-white/10 bg-zinc-900 text-zinc-300 flex items-center justify-center">
                        {node.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-zinc-100 font-medium text-sm tracking-tight truncate">
                          {node.label}
                        </div>
                        <div className="text-zinc-500 text-[11px] uppercase tracking-[0.14em] mt-1">
                          {node.type}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 text-xs text-zinc-500">
          Tip: drag cards to reposition, then drag from right connectors and
          drop onto left connectors to create links.
        </div>
      </div>
    </SectionSurface>
  );
}
