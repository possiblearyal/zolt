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

const TAB_TO_PATH: Record<string, string> = {
  home: "/",
  rounds: "/rounds",
  questions: "/questions",
  teams: "/teams",
  settings: "/settings",
};

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [teamPanelExpanded, setTeamPanelExpanded] = useState(false);
  const [selectedSet, setSelectedSet] = useState("Science Questions Set - 1");
  const [statsPanelOpen, setStatsPanelOpen] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [sidebarSize, setSidebarSize] = useState(15);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("blue");

  const navigate = useNavigate();
  const location = useLocation();

  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);
  const bottomPanelRef = useRef<ImperativePanelHandle>(null);

  const applyTheme = (themeId: ThemeId) => {
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

    toast.success("Theme applied successfully!");
  };

  const handleExport = () => {
    toast.success("Exporting quiz data...");
  };

  const handleSidebarToggle = () => {
    if (sidebarPanelRef.current) {
      if (sidebarCollapsed || sidebarSize <= 5) {
        sidebarPanelRef.current.resize(15);
        setSidebarCollapsed(false);
      } else {
        sidebarPanelRef.current.resize(5);
        setSidebarCollapsed(true);
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

  const handleTopBarToggle = () => {
    setIsTopBarVisible((prev) => {
      const next = !prev;
      toast.info(next ? "Top bar shown" : "Top bar hidden");
      return next;
    });
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
            setSidebarCollapsed(!sidebarCollapsed);
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
  }, [sidebarCollapsed]);

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
      sidebarCollapsed={sidebarCollapsed}
      teamPanelExpanded={teamPanelExpanded}
      isTopBarVisible={isTopBarVisible}
    >
      <div className="h-screen overflow-hidden">
        <Toaster position="top-right" richColors />

        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            ref={sidebarPanelRef}
            defaultSize={sidebarCollapsed ? 5 : 15}
            minSize={5}
            maxSize={25}
            collapsible={true}
            onResize={(size) => {
              setSidebarSize(size);
              if (size <= 5) {
                setSidebarCollapsed(true);
              } else if (size > 5) {
                setSidebarCollapsed(false);
              }
            }}
          >
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggleCollapse={handleSidebarToggle}
              currentRoute={activeTab}
              onNavigate={handleTabChange}
              onToggleFullscreen={handleFullscreenToggle}
              isFullscreen={isFullscreen}
              onToggleTopbar={handleTopBarToggle}
              isTopbarVisible={isTopBarVisible}
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
              <ResizablePanel defaultSize={teamPanelExpanded ? 60 : 93}>
                <div className="h-full flex flex-col">
                  {isTopBarVisible && (
                    <TopBar
                      selectedSet={selectedSet}
                      onSetChange={setSelectedSet}
                    />
                  )}

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
                defaultSize={teamPanelExpanded ? 40 : 7}
                minSize={0}
                maxSize={50}
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
          onThemeApply={applyTheme}
        />
      </div>
    </InterfaceStateProvider>
  );
}
