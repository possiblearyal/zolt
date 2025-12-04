import { X, Check, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { THEMES, type ThemeId, type ThemeDefinition } from "../theme/themes";
import {
  withMovablePanel,
  type MovablePanelInjectedProps,
} from "./hoc/withMovablePanel";

interface ThemeModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeId;
  onThemeApply: (theme: ThemeId) => void;
}

type ThemeModalProps = ThemeModalBaseProps & MovablePanelInjectedProps;

function ThemeModalComponent({
  isOpen,
  onClose,
  onThemeApply,
  activeTheme,
  dragHandleProps,
}: ThemeModalProps) {
  const themeEntries = Object.entries(THEMES) as Array<
    [ThemeId, ThemeDefinition]
  >;
  const lightThemes = themeEntries.filter(([, theme]) => !theme.isDark);
  const darkThemes = themeEntries.filter(([, theme]) => theme.isDark);

  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(activeTheme);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelectedTheme(activeTheme);
  }, [activeTheme]);

  const filterThemes = (
    themes: Array<[ThemeId, ThemeDefinition]>
  ): Array<[ThemeId, ThemeDefinition]> => {
    if (!searchQuery.trim()) return themes;
    const query = searchQuery.toLowerCase();
    return themes.filter(([, theme]) =>
      theme.name.toLowerCase().includes(query)
    );
  };

  const filteredLightThemes = useMemo(
    () => filterThemes(lightThemes),
    [lightThemes, searchQuery]
  );
  const filteredDarkThemes = useMemo(
    () => filterThemes(darkThemes),
    [darkThemes, searchQuery]
  );

  const handleApply = () => {
    onThemeApply(selectedTheme);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="max-h-[80vh] overflow-hidden rounded-2xl border shadow-2xl flex flex-col bg-[rgb(var(--color-bg-primary))]"
      style={{ borderColor: "rgb(var(--color-border))" }}
    >
      <div
        className="flex items-center justify-between px-5 py-4 border-b cursor-move"
        style={{ borderColor: "rgb(var(--color-border))" }}
        {...dragHandleProps}
      >
        <div>
          <h2
            className="text-base font-semibold"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Theme Library
          </h2>
          <p
            className="text-sm"
            style={{ color: "rgb(var(--color-text-secondary))" }}
          >
            Browse, search, and apply curated themes.
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg transition-colors"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "rgb(var(--color-bg-hover))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <X size={18} style={{ color: "rgb(var(--color-text-secondary))" }} />
        </button>
      </div>

      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: "rgb(var(--color-border))" }}
      >
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "rgb(var(--color-text-tertiary))" }}
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search themes by name..."
            className="w-full rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "rgb(var(--color-bg-secondary))",
              color: "rgb(var(--color-text-primary))",
              border: `1px solid rgb(var(--color-border))`,
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        <ThemeSection
          title="Light Themes"
          themes={filteredLightThemes}
          selectedTheme={selectedTheme}
          onSelect={setSelectedTheme}
          emptyLabel="No light themes found."
        />
        <ThemeSection
          title="Dark Themes"
          themes={filteredDarkThemes}
          selectedTheme={selectedTheme}
          onSelect={setSelectedTheme}
          emptyLabel="No dark themes found."
        />
      </div>

      <div
        className="flex items-center justify-between gap-3 px-5 py-4 border-t"
        style={{ borderColor: "rgb(var(--color-border))" }}
      >
        <div
          className="text-xs"
          style={{ color: "rgb(var(--color-text-secondary))" }}
        >
          {selectedTheme
            ? `Selected: ${THEMES[selectedTheme].name}`
            : "Choose a theme"}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm transition-colors"
            style={{
              borderColor: "rgb(var(--color-border))",
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
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded-lg text-sm transition-colors"
            style={{
              backgroundColor: "rgb(var(--color-primary))",
              color: "rgb(var(--color-primary-foreground, 255 255 255))",
            }}
          >
            Apply Theme
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export const ThemeModal = withMovablePanel<ThemeModalBaseProps>(
  ThemeModalComponent,
  {
    panelId: "theme-panel",
    anchorId: "quick-actions-anchor",
    width: 460,
    offset: { x: 24, y: 16 },
  }
);

interface ThemeSectionProps {
  title: string;
  themes: Array<[ThemeId, ThemeDefinition]>;
  selectedTheme: ThemeId;
  onSelect: (themeId: ThemeId) => void;
  emptyLabel: string;
}

function ThemeSection({
  title,
  themes,
  selectedTheme,
  onSelect,
  emptyLabel,
}: ThemeSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "rgb(var(--color-text-secondary))" }}
        >
          {title}
        </h3>
        <span
          className="text-xs"
          style={{ color: "rgb(var(--color-text-tertiary))" }}
        >
          {themes.length} options
        </span>
      </div>
      {themes.length === 0 ? (
        <div
          className="rounded-lg border px-4 py-3 text-sm"
          style={{
            borderColor: "rgb(var(--color-border))",
            backgroundColor: "rgb(var(--color-bg-secondary))",
            color: "rgb(var(--color-text-secondary))",
          }}
        >
          {emptyLabel}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {themes.map(([themeId, theme], index) => (
            <motion.button
              key={themeId}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => onSelect(themeId)}
              className="relative p-4 border-2 rounded-xl text-left transition-all hover:shadow-lg"
              style={{
                borderColor:
                  selectedTheme === themeId
                    ? `rgb(${theme.primary})`
                    : "rgb(var(--color-border))",
                backgroundColor: theme.bgPrimary
                  ? `rgb(${theme.bgPrimary})`
                  : "transparent",
              }}
            >
              {selectedTheme === themeId && (
                <div
                  className="absolute top-2 right-2 rounded-full p-1"
                  style={{ backgroundColor: `rgb(${theme.primary})` }}
                >
                  <Check
                    size={12}
                    style={{
                      color:
                        "rgb(var(--color-primary-foreground, 255 255 255))",
                    }}
                  />
                </div>
              )}
              <div className="flex gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: `rgb(${theme.primary})` }}
                />
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: `rgb(${theme.secondary})` }}
                />
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{ backgroundColor: `rgb(${theme.accent})` }}
                />
              </div>
              <p
                className="text-sm font-medium"
                style={{
                  color: theme.cardForeground
                    ? `rgb(${theme.cardForeground})`
                    : theme.textPrimary
                    ? `rgb(${theme.textPrimary})`
                    : theme.foreground
                    ? `rgb(${theme.foreground})`
                    : "rgb(var(--color-text-primary))",
                }}
              >
                {theme.name}
              </p>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
