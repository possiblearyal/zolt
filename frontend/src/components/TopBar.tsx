import svgPaths from "../imports/svg-paths";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
          <Select value={selectedSet} onValueChange={onSetChange}>
            <SelectTrigger
              className="min-w-[250px] justify-between border"
              data-size="default"
            >
              <SelectValue placeholder="Select question set" />
            </SelectTrigger>
            <SelectContent align="start">
              {questionSets.map((set) => (
                <SelectItem key={set} value={set}>
                  {set}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
