import { ChevronDown } from "lucide-react";
import svgPaths from "../imports/svg-2av1lo4v03";

interface TopBarProps {
  sidebarCollapsed: boolean;
  onThemeToggle: () => void;
  selectedSet: string;
  onSetChange: (set: string) => void;
}

export function TopBar({
  onThemeToggle,
  selectedSet,
  onSetChange,
}: TopBarProps) {
  const questionSets = [
    "Science Questions Set - 1",
    "History Questions Set - 1",
    "Geography Questions Set - 1",
    "Mathematics Questions Set - 1",
  ];

  return (
    <div
      className="border-b z-20"
      style={{
        height: "var(--topbar-height)",
        borderColor: "rgb(var(--color-border))",
        backgroundColor: "rgb(var(--color-bg-primary))",
      }}
    >
      <div className="h-full flex items-center justify-between px-8">
        {/* Left Section - Dropdown */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedSet}
              onChange={(e) => onSetChange(e.target.value)}
              className="appearance-none border rounded-lg px-4 py-2.5 pr-10 cursor-pointer transition-all focus:outline-none focus:ring-2"
              style={{
                borderColor: "rgb(var(--color-border))",
                color: "rgb(var(--color-text-primary))",
                backgroundColor: "rgb(var(--color-bg-primary))",
                minWidth: "250px",
              }}
            >
              {questionSets.map((set) => (
                <option
                  key={set}
                  value={set}
                  style={{
                    backgroundColor: "rgb(var(--color-bg-primary))",
                    color: "rgb(var(--color-text-primary))",
                  }}
                >
                  {set}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "rgb(var(--color-text-secondary))" }}
            />
          </div>
        </div>

        {/* Right Section - User Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span style={{ color: "rgb(var(--color-text-primary))" }}>
              Zolt
            </span>
            <span style={{ color: "rgb(var(--color-text-secondary))" }}>
              – Everest School
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg transition-all"
            title="Toggle Theme"
            style={{
              backgroundColor: "transparent",
              color: "rgb(var(--color-text-secondary))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgb(var(--color-bg-hover))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <div className="w-5 h-5">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 20 20"
              >
                <path
                  d={svgPaths.p364a9100}
                  fill="rgb(var(--color-text-primary))"
                />
              </svg>
            </div>
          </button>

          {/* User Avatar */}
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "rgb(var(--color-primary))",
            }}
          >
            <span
              style={{
                color: "rgb(var(--color-primary-foreground, 255 255 255))",
              }}
            >
              A
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
