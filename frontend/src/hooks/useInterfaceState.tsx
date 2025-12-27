import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ThemeId } from "../theme/themes";

interface AnchorRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PanelPosition {
  x: number;
  y: number;
  mode: "px" | "percent";
}

interface InterfaceStateValue {
  currentTheme: ThemeId;
  sidebarCollapsed: boolean;
  teamPanelExpanded: boolean;
  isTopBarVisible: boolean;
  registerAnchor: (id: string, rect: AnchorRect | null) => void;
  getAnchor: (id: string) => AnchorRect | null;
  getPanelPosition: (id: string) => PanelPosition | null;
  setPanelPosition: (id: string, position: PanelPosition) => void;
  nudgePanel: (id: string, dx: number, dy: number) => void;
}

interface InterfaceStateProviderProps {
  currentTheme: ThemeId;
  sidebarCollapsed: boolean;
  teamPanelExpanded: boolean;
  isTopBarVisible: boolean;
  initialPanelPositions?: Record<string, PanelPosition>;
  children: ReactNode;
}

const InterfaceStateContext = createContext<InterfaceStateValue | null>(null);

export function InterfaceStateProvider({
  children,
  currentTheme,
  sidebarCollapsed,
  teamPanelExpanded,
  isTopBarVisible,
  initialPanelPositions,
}: InterfaceStateProviderProps) {
  const [anchors, setAnchors] = useState<Record<string, AnchorRect | null>>({});
  const [panelPositions, setPanelPositions] = useState<
    Record<string, PanelPosition>
  >(() => initialPanelPositions ?? {});

  const registerAnchor = useCallback((id: string, rect: AnchorRect | null) => {
    setAnchors((prev) => {
      if (prev[id] && rect) {
        const same =
          prev[id]?.x === rect.x &&
          prev[id]?.y === rect.y &&
          prev[id]?.width === rect.width &&
          prev[id]?.height === rect.height;
        if (same) {
          return prev;
        }
      }
      return { ...prev, [id]: rect };
    });
  }, []);

  const getAnchor = useCallback(
    (id: string) => {
      return anchors[id] ?? null;
    },
    [anchors]
  );

  const getPanelPosition = useCallback(
    (id: string) => {
      return panelPositions[id] ?? null;
    },
    [panelPositions]
  );

  const setPanelPosition = useCallback(
    (id: string, position: PanelPosition) => {
      setPanelPositions((prev) => {
        const next: PanelPosition = {
          ...position,
          mode: position.mode ?? "px",
        };
        const existing = prev[id];
        if (
          existing &&
          existing.x === next.x &&
          existing.y === next.y &&
          (existing.mode ?? "px") === (next.mode ?? "px")
        ) {
          return prev;
        }
        return { ...prev, [id]: next };
      });
    },
    []
  );

  const nudgePanel = useCallback((id: string, dx: number, dy: number) => {
    setPanelPositions((prev): Record<string, PanelPosition> => {
      const current = prev[id];
      if (!current) return prev;
      if (current.mode === "percent") {
        const nextX = (current.x / 100) * window.innerWidth + dx;
        const nextY = (current.y / 100) * window.innerHeight + dy;
        const nextPosition: PanelPosition = {
          x: nextX,
          y: nextY,
          mode: "px" as const,
        };
        const updated: Record<string, PanelPosition> = {
          ...prev,
          [id]: nextPosition,
        };
        return updated as Record<string, PanelPosition>;
      }
      const nextPosition: PanelPosition = {
        x: current.x + dx,
        y: current.y + dy,
        mode: "px" as const,
      };
      const updated: Record<string, PanelPosition> = {
        ...prev,
        [id]: nextPosition,
      };
      return updated as Record<string, PanelPosition>;
    });
  }, []);

  useEffect(() => {
    if (!initialPanelPositions) return;
    setPanelPositions((prev) => ({ ...initialPanelPositions, ...prev }));
  }, [initialPanelPositions]);

  const value = useMemo<InterfaceStateValue>(
    () => ({
      currentTheme,
      sidebarCollapsed,
      teamPanelExpanded,
      isTopBarVisible,
      registerAnchor,
      getAnchor,
      getPanelPosition,
      setPanelPosition,
      nudgePanel,
    }),
    [
      currentTheme,
      getAnchor,
      getPanelPosition,
      isTopBarVisible,
      nudgePanel,
      registerAnchor,
      setPanelPosition,
      sidebarCollapsed,
      teamPanelExpanded,
    ]
  );

  return (
    <InterfaceStateContext.Provider value={value}>
      {children}
    </InterfaceStateContext.Provider>
  );
}

export function useInterfaceState() {
  const ctx = useContext(InterfaceStateContext);
  if (!ctx) {
    throw new Error(
      "useInterfaceState must be used within InterfaceStateProvider"
    );
  }
  return ctx;
}

export type { AnchorRect, PanelPosition };
