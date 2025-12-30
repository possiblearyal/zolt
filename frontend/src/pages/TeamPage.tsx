import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ArrowLeft,
  Trash2,
  Infinity as InfinityIcon,
  Lightbulb,
  ArrowRightLeft,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { TeamRecord } from "@/types/teams";
import type {
  TeamConfigResponse,
  TeamConfigLifelineRecord,
} from "@/types/team-config";
import type { LifelineRecord } from "@/types/lifelines";
import InputField from "@/components/shared/InputField";
import ProfileImageUpload from "@/components/shared/ProfileImageUpload";
import { SectionBanner } from "@/components/shared/SectionBanner";

interface EditableNumberProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  allowInfinity?: boolean;
  size?: "sm" | "md" | "lg";
}

function EditableNumber({
  value,
  onChange,
  min = 0,
  max = 99,
  allowInfinity = false,
  size = "md",
}: EditableNumberProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(
    value === -1 ? "∞" : value.toString()
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const isInfinity = value === -1;
  const displayValue = isInfinity ? "∞" : value.toString();

  const sizeClasses = {
    sm: {
      container: "h-10",
      button: "w-10 h-10 text-sm",
      display: "w-10 text-sm",
    },
    md: {
      container: "h-10",
      button: "w-10 h-10 text-base",
      display: "w-12 text-lg",
    },
    lg: {
      container: "h-12",
      button: "w-12 h-12 text-lg",
      display: "w-16 text-2xl",
    },
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleIncrement = () => {
    if (isInfinity) return;
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (isInfinity) {
      onChange(max);
      return;
    }
    if (value > min) onChange(value - 1);
  };

  const handleToggleInfinity = () => {
    if (isInfinity) {
      onChange(1);
    } else {
      onChange(-1);
    }
  };

  const handleSubmit = () => {
    setIsEditing(false);
    const trimmed = inputValue.trim();
    if (
      trimmed === "∞" ||
      trimmed === "-1" ||
      trimmed.toLowerCase() === "inf"
    ) {
      if (allowInfinity) {
        onChange(-1);
        return;
      }
    }
    const parsed = parseInt(trimmed, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      onChange(clamped);
    }
    setInputValue(value === -1 ? "∞" : value.toString());
  };

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size].container}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={!isInfinity && value <= min}
        className={`${sizeClasses[size].button} rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-30`}
        style={{
          backgroundColor: "rgb(var(--color-bg-tertiary))",
          color: "rgb(var(--color-text-primary))",
          border: "1px solid rgb(var(--color-border))",
        }}
      >
        <ChevronDown size={size === "sm" ? 14 : size === "md" ? 16 : 20} />
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") {
              setIsEditing(false);
              setInputValue(value === -1 ? "∞" : value.toString());
            }
          }}
          className={`${sizeClasses[size].display} h-10 text-center font-bold rounded-lg outline-none`}
          style={{
            backgroundColor: "rgb(var(--color-bg-primary))",
            color: "rgb(var(--color-text-primary))",
            border: "2px solid rgb(var(--color-primary))",
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setInputValue(value === -1 ? "∞" : value.toString());
            setIsEditing(true);
          }}
          className={`${sizeClasses[size].display} h-10 text-center font-bold rounded-lg transition-all duration-150 hover:ring-2 cursor-text`}
          style={{
            backgroundColor: "rgb(var(--color-bg-tertiary))",
            color: isInfinity
              ? "rgb(var(--color-primary))"
              : "rgb(var(--color-text-primary))",
            border: "1px solid rgb(var(--color-border))",
            ["--tw-ring-color" as string]: "rgb(var(--color-primary) / 0.5)",
          }}
        >
          {displayValue}
        </button>
      )}

      <button
        type="button"
        onClick={handleIncrement}
        disabled={isInfinity || value >= max}
        className={`${sizeClasses[size].button} rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-30`}
        style={{
          backgroundColor: "rgb(var(--color-bg-tertiary))",
          color: "rgb(var(--color-text-primary))",
          border: "1px solid rgb(var(--color-border))",
        }}
      >
        <ChevronUp size={size === "sm" ? 14 : size === "md" ? 16 : 20} />
      </button>

      {allowInfinity && (
        <button
          type="button"
          onClick={handleToggleInfinity}
          className={`${sizeClasses[size].button} rounded-lg flex items-center justify-center transition-all duration-150`}
          style={{
            backgroundColor: isInfinity
              ? "rgb(var(--color-primary))"
              : "rgb(var(--color-bg-tertiary))",
            color: isInfinity
              ? "rgb(var(--color-primary-foreground, 255 255 255))"
              : "rgb(var(--color-text-muted))",
            border: "1px solid rgb(var(--color-border))",
          }}
          title={isInfinity ? "Set to finite" : "Set to unlimited"}
        >
          <InfinityIcon size={size === "sm" ? 12 : size === "md" ? 14 : 18} />
        </button>
      )}
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (value: number) => void;
  allowInfinity?: boolean;
  description?: string;
}

function StatCard({
  icon,
  label,
  value,
  onChange,
  allowInfinity,
  description,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl border transition-all duration-200"
      style={{
        backgroundColor: "rgb(var(--color-card-bg))",
        borderColor: "rgb(var(--color-card-border))",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="p-2 rounded-lg"
          style={{
            backgroundColor: "rgb(var(--color-primary) / 0.1)",
            color: "rgb(var(--color-primary))",
          }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h4
            className="font-medium text-sm"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            {label}
          </h4>
          {description && (
            <p
              className="text-xs"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      <EditableNumber
        value={value}
        onChange={onChange}
        allowInfinity={allowInfinity}
        size="md"
      />
    </motion.div>
  );
}

interface LifelineCardProps {
  lifeline: LifelineRecord;
  config?: TeamConfigLifelineRecord;
  onToggle: (enabled: boolean) => void;
  onCountChange: (count: number) => void;
  onNameChange: (name: string) => void;
}

function LifelineCard({
  lifeline,
  config,
  onToggle,
  onCountChange,
  onNameChange,
}: LifelineCardProps) {
  const isEnabled = config?.isEnabled === 1;
  const count = config?.defaultCount ?? 1;
  const [name, setName] = useState(lifeline.displayName);

  const handleNameChange = (newName: string) => {
    setName(newName);
    onNameChange(newName);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 rounded-xl border transition-all duration-200"
      style={{
        backgroundColor: isEnabled
          ? "rgb(var(--color-card-bg))"
          : "rgb(var(--color-bg-secondary))",
        borderColor: isEnabled
          ? "rgb(var(--color-primary) / 0.3)"
          : "rgb(var(--color-border))",
        opacity: isEnabled ? 1 : 0.6,
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            type="button"
            onClick={() => onToggle(!isEnabled)}
            className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 cursor-pointer"
            style={{
              backgroundColor: isEnabled
                ? "rgb(var(--color-primary))"
                : "rgb(var(--color-bg-tertiary))",
            }}
          >
            <motion.div
              className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm"
              animate={{ x: isEnabled ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>

          <div className="min-w-0">
            <input
              name="lifelineName"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={`text-sm font-medium truncate focus:outline-none`}
              style={{
                backgroundColor: "rgb(var(--color-bg-primary))",
                color: "rgb(var(--color-text-primary))",
              }}
            />

            {lifeline.description && (
              <p
                className="text-xs truncate"
                style={{ color: "rgb(var(--color-text-muted))" }}
              >
                {lifeline.description}
              </p>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isEnabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
            >
              <EditableNumber
                value={count}
                onChange={onCountChange}
                size="sm"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const { slug } = useParams<{ slug: string }>();
  const isNewTeam = slug === "new";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [existingTeam, setExistingTeam] = useState<TeamRecord | null>(null);

  const [teamConfig, setTeamConfig] = useState<TeamConfigResponse | null>(null);
  const [allLifelines, setAllLifelines] = useState<LifelineRecord[]>([]);
  const [maxPasses, setMaxPasses] = useState(2);
  const [maxHints, setMaxHints] = useState(3);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);

      const [configData, lifelinesData] = await Promise.all([
        window.teamConfigApi?.get(),
        window.lifelinesApi?.list(),
      ]);

      if (configData) {
        setTeamConfig(configData);
        setMaxPasses(configData.config?.maxPasses ?? 2);
        setMaxHints(configData.config?.maxHints ?? 3);
      }
      if (lifelinesData) {
        setAllLifelines(lifelinesData);
      }

      if (!isNewTeam && slug) {
        const team = await window.teamsApi?.get(slug);
        if (team) {
          setExistingTeam(team);
          setName(team.name);
          setLogoUrl(team.logoUrl ?? "");
        } else {
          toast.error("Team not found");
          navigate("/teams");
        }
      }
    } catch (err) {
      console.error("Failed to load data", err);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [isNewTeam, slug, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Team name is required");
      return;
    }

    try {
      setIsSaving(true);

      if (isNewTeam) {
        if (!window.teamsApi?.create) {
          toast.error("App bridge unavailable. Please restart the app.");
          return;
        }
        const created = await window.teamsApi.create({
          name: name.trim(),
          logoUrl: logoUrl || undefined,
        });
        toast.success("Team created successfully!");
        navigate(`/team/${created.slug}`);
      } else if (existingTeam) {
        if (!window.teamsApi?.update) {
          toast.error("App bridge unavailable. Please restart the app.");
          return;
        }
        const updated = await window.teamsApi.update({
          id: existingTeam.id,
          name: name.trim(),
          logoUrl: logoUrl || undefined,
        });
        setExistingTeam(updated);
        toast.success("Team updated!");
        if (updated.slug !== slug) {
          navigate(`/team/${updated.slug}`, { replace: true });
        }
      }
    } catch (err) {
      toast.error(
        isNewTeam ? "Failed to create team" : "Failed to update team"
      );
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleMaxPassesChange = async (newValue: number) => {
    setMaxPasses(newValue);
    try {
      await window.teamConfigApi?.update({ maxPasses: newValue });
    } catch (err) {
      console.error("Failed to update max passes", err);
      toast.error("Failed to update passes");
    }
  };

  const handleMaxHintsChange = async (newValue: number) => {
    setMaxHints(newValue);
    try {
      await window.teamConfigApi?.update({ maxHints: newValue });
    } catch (err) {
      console.error("Failed to update max hints", err);
      toast.error("Failed to update hints");
    }
  };

  const handleLifelineToggle = async (
    lifelineId: string,
    isEnabled: boolean
  ) => {
    try {
      await window.teamConfigApi?.updateLifeline({ lifelineId, isEnabled });
      const updated = await window.teamConfigApi?.get();
      if (updated) setTeamConfig(updated);
    } catch (err) {
      console.error("Failed to toggle lifeline", err);
      toast.error("Failed to toggle lifeline");
    }
  };

  const handleLifelineCountChange = async (
    lifelineId: string,
    count: number
  ) => {
    try {
      await window.teamConfigApi?.updateLifeline({
        lifelineId,
        defaultCount: count,
      });
      const updated = await window.teamConfigApi?.get();
      if (updated) setTeamConfig(updated);
    } catch (err) {
      console.error("Failed to update lifeline count", err);
      toast.error("Failed to update count");
    }
  };

  const handleLifelineNameChange = async (
    lifelineId: string,
    displayName: string
  ) => {
    try {
      await window.lifelinesApi?.update({ id: lifelineId, displayName });
      const lifelinesData = await window.lifelinesApi?.list();
      if (lifelinesData) {
        setAllLifelines(lifelinesData);
      }
    } catch (err) {
      console.error("Failed to update lifeline name", err);
      toast.error("Failed to update name");
    }
  };

  const handleDelete = async () => {
    if (!existingTeam) return;
    if (!confirm(`Delete "${existingTeam.name}"? This cannot be undone.`))
      return;

    try {
      await window.teamsApi?.delete(existingTeam.id);
      toast.success("Team deleted");
      navigate("/teams");
    } catch (err) {
      console.error("Failed to delete team", err);
      toast.error("Failed to delete team");
    }
  };

  const getLifelineConfig = (
    lifelineId: string
  ): TeamConfigLifelineRecord | undefined => {
    return teamConfig?.lifelines.find((l) => l.lifelineId === lifelineId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div
            className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
            style={{
              borderColor: "rgb(var(--color-primary))",
              borderTopColor: "transparent",
            }}
          />
          <p style={{ color: "rgb(var(--color-text-secondary))" }}>
            Loading...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full overflow-hidden"
      style={{ color: "rgb(var(--color-text-primary))" }}
    >
      <div
        className="px-6 py-4 border-b flex items-center gap-4 shrink-0"
        style={{ borderColor: "rgb(var(--color-border))" }}
      >
        <button
          type="button"
          onClick={() => navigate("/teams")}
          className="p-2 rounded-lg transition-colors hover:bg-opacity-10 cursor-pointer"
          style={{
            color: "rgb(var(--color-text-secondary))",
            backgroundColor: "transparent",
          }}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold truncate">
            {isNewTeam ? "New Team" : (existingTeam?.name ?? "Edit Team")}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {!isNewTeam && existingTeam && (
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              style={{
                color: "rgb(var(--color-error))",
                backgroundColor: "rgb(var(--color-error) / 0.1)",
              }}
              title="Delete team"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="px-6 py-8 space-y-8">
          <SectionBanner
            title="Team Details"
            description="Basic information about the team"
          />
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  style={{ color: "rgb(var(--color-text-secondary))" }}
                >
                  Team Name
                </label>
                <InputField
                  name="teamName"
                  value={name}
                  onChange={(val) => setName(val)}
                  placeholder="Enter team name..."
                  icon={<Users size={18} />}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  style={{ color: "rgb(var(--color-text-secondary))" }}
                >
                  Team Logo
                </label>
                <ProfileImageUpload value={logoUrl} onChange={setLogoUrl} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                type="submit"
                disabled={isSaving || !name.trim()}
                className="px-6 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: "rgb(var(--color-primary))",
                  color: "rgb(var(--color-primary-foreground, 255 255 255))",
                }}
              >
                {isSaving ? "Saving..." : isNewTeam ? "Create Team" : "Save"}
              </button>
            </div>
          </motion.form>

          {!isNewTeam && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <SectionBanner
                title="Global Team Settings"
                description="Applied to all teams at match start"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  icon={<ArrowRightLeft size={20} />}
                  label="Max Passes"
                  description="Question skips per team"
                  value={maxPasses}
                  onChange={handleMaxPassesChange}
                  allowInfinity
                />
                <StatCard
                  icon={<Lightbulb size={20} />}
                  label="Max Hints"
                  description="Hints available per team"
                  value={maxHints}
                  onChange={handleMaxHintsChange}
                  allowInfinity
                />
              </div>

              <SectionBanner
                title="Lifelines"
                description="Cool system to reward strategy"
              />
              <div className="space-y-4">
                {allLifelines.length === 0 ? (
                  <p
                    className="text-sm py-4 text-center"
                    style={{ color: "rgb(var(--color-text-muted))" }}
                  >
                    No lifelines configured. Add lifelines in Settings.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allLifelines.map((lifeline) => (
                      <LifelineCard
                        key={lifeline.id}
                        lifeline={lifeline}
                        config={getLifelineConfig(lifeline.id)}
                        onToggle={(enabled) =>
                          handleLifelineToggle(lifeline.id, enabled)
                        }
                        onCountChange={(count) =>
                          handleLifelineCountChange(lifeline.id, count)
                        }
                        onNameChange={(newName) =>
                          handleLifelineNameChange(lifeline.id, newName)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
