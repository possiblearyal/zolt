import { useEffect, useRef } from "react";
import type {
  ComponentType,
  HTMLAttributes,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { useInterfaceState } from "../../hooks/useInterfaceState";

interface MovableOptions {
  panelId: string;
  anchorId: string;
  width?: number;
}

export interface MovablePanelInjectedProps {
  dragHandleProps: HTMLAttributes<HTMLDivElement>;
}

export function withMovablePanel<P extends { isOpen: boolean }>(
  WrappedComponent: ComponentType<P & MovablePanelInjectedProps>,
  { panelId, anchorId: _anchorId, width = 460 }: MovableOptions
) {
  return function MovablePanelWrapper(props: P) {
    const { isOpen } = props;
    const { getPanelPosition, setPanelPosition, nudgePanel } =
      useInterfaceState();
    const position = getPanelPosition(panelId);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const saveTimeoutRef = useRef<number | null>(null);
    const estimatedHeight = 300;

    useEffect(() => {
      return () => {
        if (saveTimeoutRef.current) {
          window.clearTimeout(saveTimeoutRef.current);
          saveTimeoutRef.current = null;
        }
      };
    }, []);

    const schedulePersist = (
      posPx: { x: number; y: number; mode: "px" },
      viewportWidth: number,
      viewportHeight: number
    ) => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
      const percentPos = pxToPercent(posPx, viewportWidth, viewportHeight);
      saveTimeoutRef.current = window.setTimeout(() => {
        saveTimeoutRef.current = null;
        setPanelPosition(panelId, percentPos);
        persistPanelPosition(panelId, percentPos);
      }, 500);
    };

    useEffect(() => {
      if (!isOpen || position) return;
      const viewportWidth = window.innerWidth || 1;
      const viewportHeight = window.innerHeight || 1;
      const centerPx = {
        x: Math.max(0, (viewportWidth - width) / 2),
        y: Math.max(0, (viewportHeight - estimatedHeight) / 2),
        mode: "px" as const,
      };
      setPanelPosition(
        panelId,
        pxToPercent(centerPx, viewportWidth, viewportHeight)
      );
    }, [isOpen, panelId, position, setPanelPosition]);

    if (!isOpen || !position) {
      return null;
    }

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      const rect = containerRef.current?.getBoundingClientRect();
      const startX = event.clientX;
      const startY = event.clientY;

      const viewportWidth = window.innerWidth || 1;
      const viewportHeight = window.innerHeight || 1;

      const basePositionPx =
        position.mode === "percent"
          ? percentToPx(position, viewportWidth, viewportHeight)
          : position;

      if (position.mode === "percent") {
        setPanelPosition(panelId, basePositionPx);
      }

      const baseLeft = rect ? rect.left : basePositionPx.x;
      const baseTop = rect ? rect.top : basePositionPx.y;

      const handleMove = (moveEvent: PointerEvent) => {
        if (rafRef.current) return;
        rafRef.current = window.requestAnimationFrame(() => {
          rafRef.current = null;
          const dx = moveEvent.clientX - startX;
          const dy = moveEvent.clientY - startY;

          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const rect = containerRef.current?.getBoundingClientRect();
          const panelWidth = rect?.width ?? width;
          const panelHeight = rect?.height ?? estimatedHeight;

          const nextX = clampPx(baseLeft + dx, viewportWidth, panelWidth);
          const nextY = clampPx(baseTop + dy, viewportHeight, panelHeight);

          const nextPosition = {
            x: nextX,
            y: nextY,
            mode: "px" as const,
          };
          setPanelPosition(panelId, nextPosition);
          schedulePersist(nextPosition, viewportWidth, viewportHeight);
        });
      };

      const handleUp = () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        if (rafRef.current) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const step = event.shiftKey ? 16 : 4;
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          nudgePanel(panelId, -step, 0);
          break;
        case "ArrowRight":
          event.preventDefault();
          nudgePanel(panelId, step, 0);
          break;
        case "ArrowUp":
          event.preventDefault();
          nudgePanel(panelId, 0, -step);
          break;
        case "ArrowDown":
          event.preventDefault();
          nudgePanel(panelId, 0, step);
          break;
      }
    };

    const dragHandleProps: HTMLAttributes<HTMLDivElement> = {
      onPointerDown: handlePointerDown,
      onKeyDown: handleKeyDown,
      tabIndex: 0,
      role: "button",
      "aria-label": "Drag panel",
      style: { cursor: "grab" },
    };

    return (
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          left:
            position.mode === "percent" ? `${position.x}%` : `${position.x}px`,
          top:
            position.mode === "percent" ? `${position.y}%` : `${position.y}px`,
          width,
          zIndex: 60,
        }}
      >
        <WrappedComponent {...props} dragHandleProps={dragHandleProps} />
      </div>
    );
  };
}

const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

const clampPx = (value: number, viewport: number, panelSize: number) => {
  const max = Math.max(0, viewport - panelSize);
  return Math.min(Math.max(value, 0), max);
};

const pxToPercent = (
  position: { x: number; y: number; mode: "px" },
  viewportWidth: number,
  viewportHeight: number
) => {
  return {
    x: clampPercent((position.x / viewportWidth) * 100),
    y: clampPercent((position.y / viewportHeight) * 100),
    mode: "percent" as const,
  };
};

const percentToPx = (
  position: { x: number; y: number; mode: "percent" },
  viewportWidth: number,
  viewportHeight: number
) => {
  return {
    x: (position.x / 100) * viewportWidth,
    y: (position.y / 100) * viewportHeight,
    mode: "px" as const,
  };
};

const persistPanelPosition = (
  panelId: string,
  position: { x: number; y: number; mode: "percent" }
) => {
  const panel =
    panelId === "theme-panel"
      ? "theme"
      : panelId === "stats-panel"
        ? "stats"
        : null;
  if (!panel) return;
  const payload = { panel, position } as const;
  window.orgApi?.updatePanel?.(payload).catch((err) => {
    console.warn("Failed to persist panel position", err);
  });
};
