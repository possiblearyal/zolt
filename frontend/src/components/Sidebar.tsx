import {
  Home,
  Layers,
  HelpCircle,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Maximize2,
  Minimize2,
  LayoutGrid,
  Edit3,
  BarChart3,
} from "lucide-react";
import svgPaths from "../imports/svg-paths";
import { useState } from "react";
import { motion } from "framer-motion";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onToggleTopBar: () => void;
  isTopBarVisible: boolean;
  onToggleEditMode: () => void;
  isEditMode: boolean;
  onShowStats: () => void;
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  activeTab,
  onTabChange,
  onToggleFullscreen,
  isFullscreen,
  onToggleTopBar,
  isTopBarVisible,
  onToggleEditMode,
  isEditMode,
  onShowStats,
}: SidebarProps) {
  const [logoHovered, setLogoHovered] = useState(false);
  const [quickActionsExpanded, setQuickActionsExpanded] = useState(false);
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

  const quickActions = [
    {
      id: "fullscreen",
      icon: isFullscreen ? Minimize2 : Maximize2,
      label: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
      onClick: onToggleFullscreen,
      background: "rgb(var(--color-info))",
    },
    {
      id: "topbar",
      icon: LayoutGrid,
      label: isTopBarVisible ? "Hide Top Bar" : "Show Top Bar",
      onClick: onToggleTopBar,
      background: "rgb(var(--color-warning))",
    },
    {
      id: "edit",
      icon: Edit3,
      label: isEditMode ? "Disable Edit Mode" : "Enable Edit Mode",
      onClick: onToggleEditMode,
      background: "rgb(var(--color-success))",
    },
    {
      id: "stats",
      icon: BarChart3,
      label: "Stats",
      onClick: onShowStats,
      background: "rgb(var(--color-primary))",
    },
  ];

  return (
    <div
      className="h-screen border-r flex flex-col"
      style={{
        borderColor: "rgb(var(--color-border))",
        backgroundColor: "rgb(var(--color-bg-primary))",
      }}
    >
      {/* Logo Section */}
      <div
        className="flex items-center border-b transition-all duration-300 relative"
        style={{
          height: "var(--topbar-height)",
          borderColor: "rgb(var(--color-border))",
          paddingLeft: "24px",
          paddingRight: "24px",
          justifyContent: isCollapsed ? "center" : "flex-start",
        }}
      >
        {!isCollapsed ? (
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

        {/* Collapse Toggle Button */}
        {!isCollapsed ? (
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
          >
            <ChevronLeft size={18} />
          </button>
        ) : null}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
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
                    <Icon size={18} className="shrink-0" />
                  )}
                  {!isCollapsed && (
                    <span className="text-sm">{item.label}</span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
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

      {/* Quick Actions Section */}
      <div
        className="p-3 border-t"
        style={{ borderColor: "rgb(var(--color-border))" }}
      >
        <div className="relative">
          {/* Quick Actions Toggle Button */}
          <button
            onClick={() => setQuickActionsExpanded(!quickActionsExpanded)}
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
            {!isCollapsed && (
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

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div
                className="absolute left-full ml-2 px-2 py-1 text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                style={tooltipStyles}
              >
                Quick Actions
              </div>
            )}
          </button>

          {/* Quick Actions Menu */}
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
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgb(var(--color-bg-hover))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
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
                    {!isCollapsed && (
                      <span className="text-sm">{action.label}</span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
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
