import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Edit3,
  HelpCircle,
  Home,
  LayoutGrid,
  Layers,
  Maximize2,
  Minimize2,
  Palette,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
} from "react";

import { useInterfaceState } from "../hooks/useInterfaceState";
import svgPaths from "../imports/svg-paths";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  currentRoute: string;
  onNavigate: (tab: string) => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onToggleTopbar: () => void;
  isTopbarVisible: boolean;
  onToggleEditMode: () => void;
  isEditMode: boolean;
  onToggleStatsPanel: () => void;
  statsPanelOpen: boolean;
  onToggleThemePanel: () => void;
  themePanelOpen: boolean;
}

interface QuickAction {
  id: string;
  label: string;
  sublabel?: string;
  icon: ElementType;
  onClick: () => void;
  background: string;
  active?: boolean;
}

const tooltipStyles = {
  backgroundColor: "rgb(var(--color-bg-elevated))",
  color: "rgb(var(--color-text-primary))",
  border: "1px solid rgb(var(--color-border))",
  boxShadow: "0 8px 20px rgba(15, 23, 42, 0.15)",
} as const;

const menuItems = [
  { id: "home", label: "Home", icon: Home, svg: null },
  { id: "rounds", label: "Rounds", icon: Layers, svg: "rounds" },
  { id: "questions", label: "Questions", icon: HelpCircle, svg: null },
  { id: "teams", label: "Teams", icon: Users, svg: null },
  { id: "settings", label: "Settings", icon: Settings, svg: null },
];

export function Sidebar({
  collapsed,
  onToggleCollapse,
  currentRoute,
  onNavigate,
  onToggleFullscreen,
  isFullscreen,
  onToggleTopbar,
  isTopbarVisible,
  onToggleEditMode,
  isEditMode,
  onToggleStatsPanel,
  statsPanelOpen,
  onToggleThemePanel,
  themePanelOpen,
}: SidebarProps) {
  const [logoHovered, setLogoHovered] = useState(false);
  const [quickActionsExpanded, setQuickActionsExpanded] = useState(false);
  const quickActionsRef = useRef<HTMLDivElement | null>(null);
  const { registerAnchor } = useInterfaceState();

  const quickActions = useMemo<QuickAction[]>(
    () => [
      {
        id: "stats",
        icon: BarChart3,
        label: statsPanelOpen ? "Hide Stats" : "Show Stats",
        sublabel: "Performance digest",
        onClick: onToggleStatsPanel,
        background: "rgba(46, 255, 201, 0.35)",
        active: statsPanelOpen,
      },
      {
        id: "themes",
        icon: Palette,
        label: themePanelOpen ? "Hide Themes" : "Theme Library",
        sublabel: "Palette explorer",
        onClick: onToggleThemePanel,
        background: "rgba(255, 210, 160, 0.35)",
        active: themePanelOpen,
      },
      {
        id: "fullscreen",
        icon: isFullscreen ? Minimize2 : Maximize2,
        label: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
        sublabel: "Focus mode",
        onClick: onToggleFullscreen,
        background: "rgb(var(--color-info))",
        active: isFullscreen,
      },
      {
        id: "topbar",
        icon: LayoutGrid,
        label: isTopbarVisible ? "Hide Top Bar" : "Show Top Bar",
        sublabel: "Toggle controls",
        onClick: onToggleTopbar,
        background: "rgb(var(--color-warning))",
        active: !isTopbarVisible,
      },
      {
        id: "edit",
        icon: Edit3,
        label: isEditMode ? "Disable Edit Mode" : "Enable Edit Mode",
        sublabel: "Rearrange layout",
        onClick: onToggleEditMode,
        background: "rgb(var(--color-success))",
        active: isEditMode,
      },
    ],
    [
      isEditMode,
      isFullscreen,
      isTopbarVisible,
      onToggleEditMode,
      onToggleFullscreen,
      onToggleStatsPanel,
      onToggleThemePanel,
      onToggleTopbar,
      statsPanelOpen,
      themePanelOpen,
    ]
  );

  useLayoutEffect(() => {
    const node = quickActionsRef.current;
    if (!node) {
      registerAnchor("quick-actions-anchor", null);
      return;
    }

    const updateRect = () => {
      const rect = node.getBoundingClientRect();
      registerAnchor("quick-actions-anchor", {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    };

    updateRect();

    const observer = new ResizeObserver(updateRect);
    observer.observe(node);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateRect, true);
      registerAnchor("quick-actions-anchor", null);
    };
  }, [collapsed, quickActionsExpanded, registerAnchor]);

  return (
    <div
      className="h-screen border-r flex flex-col"
      style={{
        borderColor: "rgb(var(--color-border))",
        backgroundColor: "rgb(var(--color-bg-primary))",
      }}
    >
      <div
        className="flex items-center border-b transition-all duration-300 relative"
        style={{
          height: "var(--topbar-height)",
          borderColor: "rgb(var(--color-border))",
          paddingLeft: "24px",
          paddingRight: "24px",
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg shrink-0"
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "rgb(var(--color-primary))",
              }}
            >
              <span
                style={{
                  color: "rgb(var(--color-primary-foreground, 255 255 255))",
                }}
              >
                Z
              </span>
            </div>
            <span style={{ color: "rgb(var(--color-text-primary))" }}>
              Zolt
            </span>
          </div>
        ) : (
          <div
            className="relative flex flex-1 items-center justify-center"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <div
              className={`flex items-center justify-center rounded-lg transition-opacity duration-150 ${
                logoHovered ? "opacity-0" : "opacity-100"
              }`}
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "rgb(var(--color-primary))",
              }}
            >
              <span
                style={{
                  color: "rgb(var(--color-primary-foreground, 255 255 255))",
                }}
              >
                Z
              </span>
            </div>
            <button
              onClick={onToggleCollapse}
              className={`absolute inset-0 flex items-center justify-center rounded-lg transition-opacity duration-150 ${
                logoHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                color: "rgb(var(--color-text-secondary))",
                backgroundColor: "transparent",
              }}
              aria-label="Expand sidebar"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {!collapsed ? (
          <button
            onClick={onToggleCollapse}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200"
            style={{
              color: "rgb(var(--color-text-secondary))",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgb(var(--color-bg-hover))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={18} />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative"
                  style={{
                    backgroundColor: isActive
                      ? "rgb(var(--color-primary))"
                      : "transparent",
                    color: isActive
                      ? "rgb(var(--color-primary-foreground, 255 255 255))"
                      : "rgb(var(--color-text-secondary))",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        "rgb(var(--color-bg-tertiary))";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {item.svg === "rounds" ? (
                    <div className="w-[18px] h-[18px] shrink-0">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 18 18"
                      >
                        <g clipPath="url(#clip0_4_287)">
                          <path
                            d={svgPaths.p3ba229c0}
                            stroke={
                              isActive
                                ? "rgb(var(--color-primary-foreground, 255 255 255))"
                                : "rgb(var(--color-text-secondary))"
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <path
                            d={svgPaths.p1ea61200}
                            stroke={
                              isActive
                                ? "rgb(var(--color-primary-foreground, 255 255 255))"
                                : "rgb(var(--color-text-secondary))"
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <path
                            d={svgPaths.p3e4d7380}
                            stroke={
                              isActive
                                ? "rgb(var(--color-primary-foreground, 255 255 255))"
                                : "rgb(var(--color-text-secondary))"
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4_287">
                            <rect
                              fill="rgb(var(--color-primary-foreground, 255 255 255))"
                              height="18"
                              width="18"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  ) : (
                    Icon && <Icon size={18} className="shrink-0" />
                  )}
                  {!collapsed && <span className="text-sm">{item.label}</span>}

                  {collapsed && (
                    <div
                      className="absolute left-full ml-2 px-2 py-1 text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                      style={tooltipStyles}
                    >
                      {item.label}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        ref={quickActionsRef}
        className="p-3 border-t"
        style={{ borderColor: "rgb(var(--color-border))" }}
        id="quick-actions-anchor"
      >
        <div className="relative">
          <button
            onClick={() => setQuickActionsExpanded((prev) => !prev)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group"
            style={{
              color: "rgb(var(--color-text-secondary))",
              backgroundColor: quickActionsExpanded
                ? "rgb(var(--color-primary))"
                : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!quickActionsExpanded) {
                e.currentTarget.style.backgroundColor =
                  "rgb(var(--color-bg-hover))";
              }
            }}
            onMouseLeave={(e) => {
              if (!quickActionsExpanded) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <motion.div animate={{ rotate: quickActionsExpanded ? 180 : 0 }}>
              <Zap
                size={18}
                className="shrink-0"
                style={{
                  color: quickActionsExpanded
                    ? "rgb(var(--color-primary-foreground, 255 255 255))"
                    : "inherit",
                }}
              />
            </motion.div>
            {!collapsed && (
              <span
                className="text-sm"
                style={{
                  color: quickActionsExpanded
                    ? "rgb(var(--color-primary-foreground, 255 255 255))"
                    : "inherit",
                }}
              >
                Quick Actions
              </span>
            )}

            {collapsed && (
              <div
                className="absolute left-full ml-2 px-2 py-1 text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                style={tooltipStyles}
              >
                Quick Actions
              </div>
            )}
          </button>

          {quickActionsExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 space-y-1"
            >
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      action.onClick();
                      setQuickActionsExpanded(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group"
                    style={{
                      color: "rgb(var(--color-text-secondary))",
                      backgroundColor: action.active
                        ? "rgba(255, 255, 255, 0.08)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgb(var(--color-bg-hover))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = action.active
                        ? "rgba(255, 255, 255, 0.08)"
                        : "transparent";
                    }}
                  >
                    <div
                      className="p-1.5 rounded"
                      style={{
                        backgroundColor: action.background,
                        color: "rgb(var(--color-text-inverse))",
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    {!collapsed && (
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-medium">
                          {action.label}
                        </span>
                        {action.sublabel && (
                          <span className="text-xs text-white/60" style={{color: "rgb(var(--color-text-secondary))"}}>
                            {action.sublabel}
                          </span>
                        )}
                      </div>
                    )}

                    {collapsed && (
                      <div
                        className="absolute left-full ml-2 px-2 py-1 text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                        style={tooltipStyles}
                      >
                        {action.label}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
