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

    useEffect(() => {
      if (!isOpen || position) return;
      setPanelPosition(panelId, {
        x: 50,
        y: 50,
        mode: "percent",
      });
    }, [isOpen, panelId, position, setPanelPosition]);

    if (!isOpen || !position) {
      return null;
    }

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = containerRef.current?.getBoundingClientRect();
      const startX = event.clientX;
      const startY = event.clientY;
      const baseLeft = rect
        ? rect.left
        : position.mode === "percent"
          ? (position.x / 100) * window.innerWidth
          : position.x;
      const baseTop = rect
        ? rect.top
        : position.mode === "percent"
          ? (position.y / 100) * window.innerHeight
          : position.y;

      const handleMove = (moveEvent: PointerEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        setPanelPosition(panelId, {
          x: baseLeft + dx,
          y: Math.max(0, baseTop + dy),
          mode: "px",
        });
      };

      const handleUp = () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
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
          transform:
            position.mode === "percent" ? "translate(-50%, -50%)" : undefined,
          width,
          zIndex: 60,
        }}
      >
        <WrappedComponent {...props} dragHandleProps={dragHandleProps} />
      </div>
    );
  };
}
