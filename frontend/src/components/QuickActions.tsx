import {
  Maximize2,
  Minimize2,
  LayoutGrid,
  Edit3,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface QuickActionsProps {
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onToggleTopBar: () => void;
  isTopBarVisible: boolean;
  onToggleEditMode: () => void;
  isEditMode: boolean;
  onShowStats: () => void;
}

export function QuickActions({
  onToggleFullscreen,
  isFullscreen,
  onToggleTopBar,
  isTopBarVisible,
  onToggleEditMode,
  isEditMode,
  onShowStats,
}: QuickActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col-reverse items-end gap-3">
      {/* Action Buttons */}
      <motion.div
        className="flex flex-col-reverse gap-2"
        animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 20 }}
        style={{ display: isExpanded ? "flex" : "none" }}
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                action.onClick();
                setIsExpanded(false);
              }}
              className="p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group relative hover:scale-110"
              style={{
                backgroundColor: action.background,
                color: "rgb(var(--color-text-inverse))",
              }}
            >
              <Icon size={20} />
              <span
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                style={{
                  backgroundColor: "rgb(var(--color-bg-elevated))",
                  color: "rgb(var(--color-text-primary))",
                  border: "1px solid rgb(var(--color-border))",
                  boxShadow: "0 8px 20px rgba(15, 23, 42, 0.15)",
                }}
              >
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        style={{
          backgroundColor: "rgb(var(--color-primary))",
          color: "rgb(var(--color-primary-foreground, 255 255 255))",
        }}
        animate={{ rotate: isExpanded ? 180 : 0 }}
      >
        <Zap size={24} />
      </motion.button>
    </div>
  );
}
