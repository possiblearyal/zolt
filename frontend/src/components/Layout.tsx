import { useState, useEffect } from "react";
import * as React from "react";
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
  const [activeTab, setActiveTab] = useState("rounds");
  const [selectedSet, setSelectedSet] = useState("Science Questions Set - 1");
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [sidebarSize, setSidebarSize] = useState(15);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Refs for resizable panels
  const sidebarPanelRef = React.useRef<ImperativePanelHandle>(null);
  const bottomPanelRef = React.useRef<ImperativePanelHandle>(null);

  // Apply theme
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

    toast.success("Theme applied successfully!");
  };

  const handleExport = () => {
    toast.success("Exporting quiz data...");
  };

  // Handle sidebar toggle with proper collapse/expand
  const handleSidebarToggle = () => {
    if (sidebarPanelRef.current) {
      if (sidebarCollapsed || sidebarSize <= 5) {
        // Expand to default size
        sidebarPanelRef.current.resize(15);
        setSidebarCollapsed(false);
      } else {
        // Collapse to minimum
        sidebarPanelRef.current.resize(5);
        setSidebarCollapsed(true);
      }
    }
  };

  // Handle team panel toggle with proper expand/collapse
  const handleTeamPanelToggle = () => {
    if (bottomPanelRef.current) {
      if (teamPanelExpanded) {
        // Collapse to minimum (7%)
        bottomPanelRef.current.resize(7);
        setTeamPanelExpanded(false);
      } else {
        // Expand to maximum (40%)
        bottomPanelRef.current.resize(40);
        setTeamPanelExpanded(true);
      }
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const targetPath = TAB_TO_PATH[tab] ?? "/";
    navigate(targetPath);
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

  // Keyboard shortcuts
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
            setStatsModalOpen(true);
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

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const normalizedPath = segments.length === 0 ? "/" : `/${segments[0]}`;
    const matchedTab =
      Object.entries(TAB_TO_PATH).find(
        ([, path]) => path === normalizedPath
      )?.[0] || "home";
    setActiveTab((prev) => (prev === matchedTab ? prev : matchedTab));
  }, [location.pathname]);

  return (
    <div className="h-screen overflow-hidden">
      <Toaster position="top-right" richColors />

      {/* Main Layout with Resizable Panels */}
      <ResizablePanelGroup direction="horizontal">
        {/* Sidebar Panel */}
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
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={handleSidebarToggle}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onToggleFullscreen={handleFullscreenToggle}
            isFullscreen={isFullscreen}
            onToggleTopBar={handleTopBarToggle}
            isTopBarVisible={isTopBarVisible}
            onToggleEditMode={handleEditModeToggle}
            isEditMode={isEditMode}
            onShowStats={() => setStatsModalOpen(true)}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Content Panel */}
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            {/* Top Bar and Main Content */}
            <ResizablePanel defaultSize={teamPanelExpanded ? 60 : 93}>
              <div className="h-full flex flex-col">
                {/* Top Bar */}
                {isTopBarVisible && (
                  <TopBar
                    sidebarCollapsed={sidebarCollapsed}
                    onThemeToggle={() => setThemeModalOpen(true)}
                    selectedSet={selectedSet}
                    onSetChange={setSelectedSet}
                  />
                )}

                {/* Main Content - Outlet for routes */}
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

            {/* Always show ResizableHandle */}
            <ResizableHandle withHandle />

            {/* Team Scores Panel - Always present */}
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

      {/* Modals */}
      <StatsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
      />
      <ThemeModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        onThemeApply={applyTheme}
      />
    </div>
  );
}
