import { useEffect } from "react";
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
  offset?: { x: number; y: number };
}

export interface MovablePanelInjectedProps {
  dragHandleProps: HTMLAttributes<HTMLDivElement>;
}

export function withMovablePanel<P extends { isOpen: boolean }>(
  WrappedComponent: ComponentType<P & MovablePanelInjectedProps>,
  { panelId, anchorId, width = 460, offset = { x: 32, y: -32 } }: MovableOptions
) {
  return function MovablePanelWrapper(props: P) {
    const { isOpen } = props;
    const { getAnchor, getPanelPosition, setPanelPosition, nudgePanel } =
      useInterfaceState();
    const anchor = getAnchor(anchorId);
    const position = getPanelPosition(panelId);

    useEffect(() => {
      if (!isOpen) return;
      if (position) return;
      if (!anchor) return;
      const next = {
        x: anchor.x + anchor.width + offset.x,
        y: Math.max(24, anchor.y + offset.y),
      };
      setPanelPosition(panelId, next);
    }, [
      anchor,
      isOpen,
      offset.x,
      offset.y,
      panelId,
      position,
      setPanelPosition,
    ]);

    if (!isOpen || !position) {
      return null;
    }

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const startX = event.clientX;
      const startY = event.clientY;
      const startPos = { ...position };

      const handleMove = (moveEvent: PointerEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        setPanelPosition(panelId, {
          x: startPos.x + dx,
          y: Math.max(0, startPos.y + dy),
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
    };

    return (
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width,
          zIndex: 60,
        }}
      >
        <WrappedComponent {...props} dragHandleProps={dragHandleProps} />
      </div>
    );
  };
}
