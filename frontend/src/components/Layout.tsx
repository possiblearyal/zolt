import { useState, useEffect, useRef, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { TeamScores } from "./TeamScores";
import { StatsModal } from "./StatsModal";
import { ThemeModal } from "./ThemeModal";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import {
  THEMES,
  type ThemeId,
  LIGHT_THEME_BASE,
  DARK_THEME_BASE,
} from "../theme/themes";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ui/resizable";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { InterfaceStateProvider } from "../hooks/useInterfaceState";
import type { PanelPosition } from "../types/org";
import type { OrgRecord } from "../types/org";

const TAB_TO_PATH: Record<string, string> = {
  home: "/",
  rounds: "/rounds",
  questions: "/questions",
  teams: "/teams",
  settings: "/settings",
  new: "/new",
};

export function Layout() {
  const [teamPanelExpanded, setTeamPanelExpanded] = useState(false);
  const [selectedSet, setSelectedSet] = useState("");
  const [statsPanelOpen, setStatsPanelOpen] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [sidebarSize, setSidebarSize] = useState(15);
  const [topBarSize, setTopBarSize] = useState(8);
  const [bottomPanelSize, setBottomPanelSize] = useState(7);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("blue");
  const [orgData, setOrgData] = useState<OrgRecord | null>(null);
  const [initialSizesLoaded, setInitialSizesLoaded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [orgLoaded, setOrgLoaded] = useState(false);

  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);
  const topBarPanelRef = useRef<ImperativePanelHandle>(null);
  const bottomPanelRef = useRef<ImperativePanelHandle>(null);
  const resizeSaveTimeoutRef = useRef<number | null>(null);
  const topBarMaxPercent = useMemo(() => {
    const viewportHeight =
      typeof window !== "undefined" ? window.innerHeight : 0;
    const percent = viewportHeight ? (64 / viewportHeight) * 100 : 8;
    return Math.min(12, Math.max(6, percent));
  }, []);

  const applyTheme = (themeId: ThemeId, save = true) => {
    const theme = THEMES[themeId];
    if (!theme) {
      toast.error("Theme not found.");
      return;
    }

    const baseTheme = theme.isDark ? DARK_THEME_BASE : LIGHT_THEME_BASE;
    const resolvedTheme = { ...baseTheme, ...theme };
    const root = document.documentElement;
    const setVar = (token: string, value?: string) => {
      if (typeof value === "string") {
        root.style.setProperty(token, value);
      }
    };

    setVar("--color-primary", resolvedTheme.primary);
    setVar("--color-secondary", resolvedTheme.secondary);
    setVar("--color-primary-hover", resolvedTheme.secondary);
    setVar("--color-secondary-hover", resolvedTheme.secondary);
    setVar("--color-primary-light", resolvedTheme.accent);
    setVar("--color-accent", resolvedTheme.accent);
    setVar("--color-primary-foreground", resolvedTheme.primaryForeground);
    setVar("--color-accent-foreground", resolvedTheme.accentForeground);
    setVar("--color-background", resolvedTheme.background);
    setVar("--color-foreground", resolvedTheme.foreground);
    setVar("--color-bg-primary", resolvedTheme.bgPrimary);
    setVar("--color-bg-secondary", resolvedTheme.bgSecondary);
    setVar("--color-bg-tertiary", resolvedTheme.bgTertiary);
    setVar("--color-bg-elevated", resolvedTheme.bgElevated);
    setVar("--color-bg-hover", resolvedTheme.bgHover);
    setVar("--color-bg-active", resolvedTheme.bgActive);
    setVar("--color-bg-muted", resolvedTheme.bgMuted);
    setVar("--color-text-primary", resolvedTheme.textPrimary);
    setVar("--color-text-secondary", resolvedTheme.textSecondary);
    setVar("--color-text-tertiary", resolvedTheme.textTertiary);
    setVar("--color-text-muted", resolvedTheme.textMuted);
    setVar("--color-text-accent", resolvedTheme.textAccent);
    setVar("--color-border", resolvedTheme.border);
    setVar("--color-border-hover", resolvedTheme.borderHover);
    setVar("--color-border-muted", resolvedTheme.borderMuted);
    setVar("--color-card-bg", resolvedTheme.cardBg);
    setVar("--color-card-border", resolvedTheme.cardBorder);
    setVar("--color-card-hover", resolvedTheme.cardHover);
    setVar("--color-card-foreground", resolvedTheme.cardForeground);
    setVar("--color-muted", resolvedTheme.muted);
    setVar("--color-muted-foreground", resolvedTheme.mutedForeground);
    setCurrentTheme(themeId);

    if (save) {
      window.orgApi?.updateTheme?.(themeId).catch((err) => {
        console.warn("Failed to save theme", err);
      });
      toast.success("Theme applied successfully!");
    }
  };

  const saveResizablePanels = (updates: {
    sidebarSize?: number;
    topBarSize?: number;
    bottomPanelSize?: number;
  }) => {
    if (resizeSaveTimeoutRef.current) {
      window.clearTimeout(resizeSaveTimeoutRef.current);
    }
    resizeSaveTimeoutRef.current = window.setTimeout(() => {
      resizeSaveTimeoutRef.current = null;
      window.orgApi?.updateResizablePanels?.(updates).catch((err) => {
        console.warn("Failed to save panel sizes", err);
      });
    }, 500);
  };

  const handleExport = () => {
    toast.success("Exporting quiz data...");
  };

  const handleSidebarToggle = () => {
    if (sidebarPanelRef.current) {
      if (sidebarSize < 4) {
        sidebarPanelRef.current.resize(5);
      } else if (sidebarSize < 12) {
        sidebarPanelRef.current.resize(15);
      } else {
        sidebarPanelRef.current.resize(5);
      }
    }
  };

  const handleTeamPanelToggle = () => {
    if (bottomPanelRef.current) {
      if (teamPanelExpanded) {
        bottomPanelRef.current.resize(7);
        setTeamPanelExpanded(false);
      } else {
        bottomPanelRef.current.resize(40);
        setTeamPanelExpanded(true);
      }
    }
  };

  const activeTab = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const normalizedPath = segments.length === 0 ? "/" : `/${segments[0]}`;
    return (
      Object.entries(TAB_TO_PATH).find(
        ([, path]) => path === normalizedPath
      )?.[0] || "home"
    );
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    navigate(TAB_TO_PATH[tab] ?? "/");
  };

  const handleFullscreenToggle = async () => {
    try {
      if (
        !document.fullscreenElement &&
        document.documentElement.requestFullscreen
      ) {
        await document.documentElement.requestFullscreen();
        toast.success("Entered fullscreen");
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
        toast.success("Exited fullscreen");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to toggle fullscreen");
    }
  };

  const handleEditModeToggle = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      toast.info(next ? "Edit mode enabled" : "Edit mode disabled");
      return next;
    });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "k":
            e.preventDefault();
            handleSidebarToggle();
            break;
          case "e":
            e.preventDefault();
            handleExport();
            break;
          case "s":
            e.preventDefault();
            setStatsPanelOpen((prev) => !prev);
            setThemePanelOpen(false);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [sidebarSize]);

  useEffect(() => {
    const checkOrg = async () => {
      try {
        const org = await window.orgApi?.getOrg?.();
        setOrgData(org ?? null);
        const onOnboarding = location.pathname.startsWith("/onboarding");
        if (!org && !onOnboarding) {
          navigate("/onboarding", { replace: true });
        }
        if (org) {
          const savedTheme = org.selectedTheme as ThemeId | undefined;
          if (savedTheme && THEMES[savedTheme]) {
            applyTheme(savedTheme, false);
          }
          const savedSidebar = org.sidebarSize ?? 15;
          const savedTopBar = org.topBarSize ?? 8;
          const savedBottom = org.bottomPanelSize ?? 7;
          setSidebarSize(savedSidebar);
          setTopBarSize(savedTopBar);
          setBottomPanelSize(savedBottom);
          setTeamPanelExpanded(savedBottom > 12);
          setIsTopBarVisible(savedTopBar > 2);
          setInitialSizesLoaded(true);
        }
      } catch (err) {
        console.warn("Failed to load org", err);
      } finally {
        setOrgLoaded(true);
      }
    };
    checkOrg();
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (!initialSizesLoaded) return;
    if (sidebarPanelRef.current) {
      sidebarPanelRef.current.resize(sidebarSize);
    }
    if (topBarPanelRef.current) {
      topBarPanelRef.current.resize(topBarSize);
    }
    if (bottomPanelRef.current) {
      bottomPanelRef.current.resize(bottomPanelSize);
    }
  }, [initialSizesLoaded, sidebarSize, topBarSize, bottomPanelSize]);

  const clampPercent = (val: number) => Math.min(100, Math.max(0, val));
  const parsePanelPosition = (raw?: string | null): PanelPosition | null => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (
        typeof parsed?.x === "number" &&
        typeof parsed?.y === "number" &&
        (parsed?.mode === "px" || parsed?.mode === "percent")
      ) {
        if (parsed.mode === "percent") {
          return {
            x: clampPercent(parsed.x),
            y: clampPercent(parsed.y),
            mode: "percent",
          };
        }
        return {
          x: parsed.x,
          y: parsed.y,
          mode: "px",
        };
      }
    } catch (e) {
      console.warn("Failed to parse panel position", e);
    }
    return null;
  };

  const initialPanelPositions = useMemo(() => {
    const positions: Record<string, PanelPosition> = {};
    const theme = parsePanelPosition(orgData?.themeModal ?? null);
    const stats = parsePanelPosition(orgData?.statsModal ?? null);
    if (theme) positions["theme-panel"] = theme;
    if (stats) positions["stats-panel"] = stats;
    return positions;
  }, [orgData]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (isEditMode) {
      document.documentElement.setAttribute("data-edit-mode", "true");
    } else {
      document.documentElement.removeAttribute("data-edit-mode");
    }
  }, [isEditMode]);

  return (
    <InterfaceStateProvider
      currentTheme={currentTheme}
      sidebarCollapsed={sidebarSize < 12}
      teamPanelExpanded={teamPanelExpanded}
      isTopBarVisible={isTopBarVisible}
      initialPanelPositions={initialPanelPositions}
    >
      <div className="h-screen overflow-hidden">
        <Toaster position="top-right" richColors />

        {!orgLoaded || (!initialSizesLoaded && orgData) ? (
          <main className="h-full flex items-center justify-center">
            <p style={{ color: "rgb(var(--color-text-secondary))" }}>
              Loading...
            </p>
          </main>
        ) : (
          <>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel
                ref={sidebarPanelRef}
                className="overflow-hidden"
                defaultSize={sidebarSize}
                minSize={3}
                maxSize={30}
                collapsible={true}
                onResize={(size) => {
                  setSidebarSize(size);
                  if (initialSizesLoaded) {
                    saveResizablePanels({ sidebarSize: size });
                  }
                }}
              >
                <Sidebar
                  sidebarSize={sidebarSize}
                  onToggleCollapse={handleSidebarToggle}
                  currentRoute={activeTab}
                  onNavigate={handleTabChange}
                  onToggleFullscreen={handleFullscreenToggle}
                  isFullscreen={isFullscreen}
                  onToggleEditMode={handleEditModeToggle}
                  isEditMode={isEditMode}
                  onToggleStatsPanel={() => {
                    setStatsPanelOpen((prev) => !prev);
                    setThemePanelOpen(false);
                  }}
                  statsPanelOpen={statsPanelOpen}
                  onToggleThemePanel={() => {
                    setThemePanelOpen((prev) => !prev);
                    setStatsPanelOpen(false);
                  }}
                  themePanelOpen={themePanelOpen}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={60}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel
                    ref={topBarPanelRef}
                    defaultSize={topBarSize}
                    minSize={0}
                    maxSize={topBarMaxPercent}
                    collapsible
                    onResize={(size) => {
                      if (size > topBarMaxPercent && topBarPanelRef.current) {
                        topBarPanelRef.current.resize(topBarMaxPercent);
                        setIsTopBarVisible(true);
                        return;
                      }
                      setIsTopBarVisible(size > 2);
                      setTopBarSize(size);
                      if (initialSizesLoaded) {
                        saveResizablePanels({ topBarSize: size });
                      }
                    }}
                  >
                    {isTopBarVisible && (
                      <TopBar
                        selectedSet={selectedSet}
                        onSetChange={setSelectedSet}
                        orgName={orgData?.name}
                        orgLogo={orgData?.imageUrl ?? undefined}
                      />
                    )}
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  <ResizablePanel
                    defaultSize={100 - topBarSize - bottomPanelSize}
                    minSize={20}
                  >
                    <div className="h-full overflow-hidden flex flex-col">
                      <main
                        className="flex-1 overflow-auto"
                        style={{
                          padding: "40px",
                          backgroundColor: "rgb(var(--color-bg-secondary))",
                        }}
                      >
                        <Outlet />
                      </main>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  <ResizablePanel
                    ref={bottomPanelRef}
                    defaultSize={bottomPanelSize}
                    minSize={0}
                    maxSize={50}
                    onResize={(size) => {
                      const expanded = size > 12;
                      setTeamPanelExpanded(expanded);
                      setBottomPanelSize(size);
                      if (initialSizesLoaded) {
                        saveResizablePanels({ bottomPanelSize: size });
                      }
                    }}
                  >
                    <TeamScores
                      isExpanded={teamPanelExpanded}
                      onToggle={handleTeamPanelToggle}
                    />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>

            <StatsModal
              isOpen={statsPanelOpen}
              onClose={() => setStatsPanelOpen(false)}
            />
            <ThemeModal
              isOpen={themePanelOpen}
              onClose={() => setThemePanelOpen(false)}
              activeTheme={currentTheme}
              onThemeApply={(themeId) => applyTheme(themeId, true)}
            />
          </>
        )}
      </div>
    </InterfaceStateProvider>
  );
}
