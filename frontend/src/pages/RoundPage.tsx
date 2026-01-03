import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Trash2,
  Clock,
  Trophy,
  Lightbulb,
  ArrowRightLeft,
  ChevronUp,
  ChevronDown,
  FileText,
  Image,
  Music,
  Video,
  Type,
  ListChecks,
  Hash,
  ToggleLeft,
  Infinity as InfinityIcon,
  Layers,
  Lock,
  TrendingDown,
} from "lucide-react";
import type {
  RoundRecord,
  RoundCategoryRecord,
  RoundConfiguration,
  PassPolicy,
  TimePolicy,
  ScoringPolicy,
  HintPolicy,
  QuestionFormat,
  AnswerPolicy,
} from "@/types/rounds";
import type { LifelineRecord } from "@/types/lifelines";
import InputField from "@/components/shared/InputField";
import { SectionBanner } from "@/components/shared/SectionBanner";
import { Options } from "@/components/shared/Options";

interface EditableNumberProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  allowInfinity?: boolean;
  allowNegative?: boolean;
  size?: "sm" | "md" | "lg";
}

function EditableNumber({
  value,
  onChange,
  min = 0,
  max = 9999,
  allowInfinity = false,
  allowNegative = false,
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
      display: "w-14 text-sm",
    },
    md: {
      container: "h-10",
      button: "w-10 h-10 text-base",
      display: "w-16 text-base",
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
    const minVal = allowNegative ? -9999 : min;
    if (value > minVal) onChange(value - 1);
  };

  const handleToggleInfinity = () => {
    onChange(isInfinity ? 1 : -1);
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
      const minVal = allowNegative ? -9999 : min;
      const clamped = Math.max(minVal, Math.min(max, parsed));
      onChange(clamped);
    }
    setInputValue(value === -1 ? "∞" : value.toString());
  };

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size].container}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={!isInfinity && value <= (allowNegative ? -9999 : min)}
        className={`${sizeClasses[size].button} rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-30 cursor-pointer`}
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
        className={`${sizeClasses[size].button} rounded-lg flex items-center justify-center transition-all duration-150 disabled:opacity-30 cursor-pointer`}
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
          className={`${sizeClasses[size].button} rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer`}
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
  allowNegative?: boolean;
  description?: string;
}

function StatCard({
  icon,
  label,
  value,
  onChange,
  allowInfinity,
  allowNegative,
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
        allowNegative={allowNegative}
        size="md"
      />
    </motion.div>
  );
}

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 cursor-pointer"
      style={{
        backgroundColor: enabled
          ? "rgb(var(--color-primary))"
          : "rgb(var(--color-bg-tertiary))",
      }}
    >
      <motion.div
        className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm"
        animate={{ x: enabled ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

interface ModeTab<T> {
  value: T;
  label: string;
  icon: React.ReactNode;
}

interface ModeTabSelectorProps<T> {
  tabs: ModeTab<T>[];
  value: T;
  onChange: (value: T) => void;
}

function ModeTabSelector<T extends string>({
  tabs,
  value,
  onChange,
}: ModeTabSelectorProps<T>) {
  return (
    <nav
      className="flex gap-2 p-1.5 rounded-xl"
      style={{ backgroundColor: "rgb(var(--color-bg-tertiary))" }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: isActive
                ? "rgb(var(--color-primary) / 0.15)"
                : "transparent",
              color: isActive
                ? "rgb(var(--color-primary))"
                : "rgb(var(--color-text-muted))",
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}


interface AccordionSectionProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionSection({
  title,
  description,
  icon,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: "rgb(var(--color-card-bg))",
        border: `1px solid ${isOpen ? "rgb(var(--color-primary) / 0.3)" : "rgb(var(--color-card-border))"}`,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-4 cursor-pointer transition-colors"
        style={{
          backgroundColor: isOpen
            ? "rgb(var(--color-primary) / 0.05)"
            : "transparent",
        }}
      >
        <div
          className="p-2 rounded-lg shrink-0"
          style={{
            backgroundColor: "rgb(var(--color-primary) / 0.1)",
            color: "rgb(var(--color-primary))",
          }}
        >
          {icon}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p
            className="font-medium text-sm"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            {title}
          </p>
          {description && (
            <p
              className="text-xs truncate"
              style={{ color: "rgb(var(--color-text-muted))" }}
            >
              {description}
            </p>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-2"
              style={{ borderTop: `1px solid rgb(var(--color-border) / 0.5)` }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


interface ConfigRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

function ConfigRow({ label, description, children }: ConfigRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium"
          style={{ color: "rgb(var(--color-text-primary))" }}
        >
          {label}
        </p>
        {description && (
          <p
            className="text-xs"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}


interface LifelineCardProps {
  lifeline: LifelineRecord;
  isEnabled: boolean;
  count: number;
  onToggle: (enabled: boolean) => void;
  onCountChange: (count: number) => void;
}

function LifelineCard({
  lifeline,
  isEnabled,
  count,
  onToggle,
  onCountChange,
}: LifelineCardProps) {
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
          <ToggleSwitch enabled={isEnabled} onChange={onToggle} />
          <div className="min-w-0">
            <p
              className="text-sm font-medium truncate"
              style={{ color: "rgb(var(--color-text-primary))" }}
            >
              {lifeline.displayName}
            </p>
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


export default function RoundPage() {
  const { id } = useParams<{ id: string }>();
  const isNewRound = id === "new";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [confirmationRequired, setConfirmationRequired] = useState(false);
  const [existingRound, setExistingRound] = useState<RoundRecord | null>(null);

  const [categories, setCategories] = useState<RoundCategoryRecord[]>([]);
  const [lifelines, setLifelines] = useState<LifelineRecord[]>([]);

  const [passPolicy, setPassPolicy] = useState<PassPolicy>({ enabled: false });
  const [timePolicy, setTimePolicy] = useState<TimePolicy>({ baseTime: 10 });
  const [scoringPolicy, setScoringPolicy] = useState<ScoringPolicy>({
    correct: 10,
    incorrect: 0,
    pass: 0,
  });
  const [hintPolicy, setHintPolicy] = useState<HintPolicy>({ enabled: false });
  const [questionFormat, setQuestionFormat] = useState<QuestionFormat>({
    promptType: "text",
    responseType: "choice",
  });
  const [answerPolicy, setAnswerPolicy] = useState<AnswerPolicy>({
    mode: "single",
  });
  const [allowedLifelines, setAllowedLifelines] = useState<
    Record<string, number>
  >({});

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {
      timeAfterPass: true,
      scoringWhenPassed: false,
      passSettings: true,
      hintSettings: false,
    }
  );

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [passedScoringMode, setPassedScoringMode] = useState<
    "static" | "dynamic"
  >(() =>
    (scoringPolicy.correctWhenPassedMultiple?.length ?? 0) > 0
      ? "dynamic"
      : "static"
  );

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [categoriesData, lifelinesData] = await Promise.all([
        window.roundCategoriesApi?.list(),
        window.lifelinesApi?.list(),
      ]);

      if (categoriesData) setCategories(categoriesData);
      if (lifelinesData) setLifelines(lifelinesData);

      if (!isNewRound && id) {
        const round = await window.roundsApi?.get(id);
        if (round) {
          setExistingRound(round);
          setName(round.name);
          setDescription(round.description || "");
          setCategoryId(round.categoryId);
          setConfirmationRequired(round.confirmationRequired);
          const config = round.configuration;
          if (config.passPolicy) setPassPolicy(config.passPolicy);
          if (config.timePolicy) setTimePolicy(config.timePolicy);
          if (config.scoringPolicy) setScoringPolicy(config.scoringPolicy);
          if (config.hintPolicy) setHintPolicy(config.hintPolicy);
          if (config.questionFormat) setQuestionFormat(config.questionFormat);
          if (config.answerPolicy) setAnswerPolicy(config.answerPolicy);
          if (config.allowedLifelines)
            setAllowedLifelines(config.allowedLifelines);
        } else {
          toast.error("Round not found");
          navigate("/rounds");
        }
      } else if (categoriesData && categoriesData.length > 0) {
        setCategoryId(categoriesData[0].id);
        applyDefaultConfig(categoriesData[0]);
      }
    } catch (err) {
      console.error("Failed to load data", err);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [isNewRound, id, navigate]);

  const applyDefaultConfig = (category: RoundCategoryRecord) => {
    const config = category.defaultConfiguration;
    if (config.passPolicy) setPassPolicy(config.passPolicy);
    if (config.timePolicy) setTimePolicy(config.timePolicy);
    if (config.scoringPolicy) setScoringPolicy(config.scoringPolicy);
    if (config.hintPolicy) setHintPolicy(config.hintPolicy);
    if (config.questionFormat) setQuestionFormat(config.questionFormat);
    if (config.answerPolicy) setAnswerPolicy(config.answerPolicy);
    if (config.allowedLifelines) setAllowedLifelines(config.allowedLifelines);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCategoryChange = (newCategoryId: string) => {
    setCategoryId(newCategoryId);
    const category = categories.find((c) => c.id === newCategoryId);
    if (category) {
      applyDefaultConfig(category);
      toast.success(`Applied ${category.name} defaults`);
    }
  };

  const buildConfiguration = (): RoundConfiguration => ({
    passPolicy,
    timePolicy,
    scoringPolicy,
    hintPolicy,
    questionFormat,
    answerPolicy,
    allowedLifelines:
      Object.keys(allowedLifelines).length > 0 ? allowedLifelines : undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Round name is required");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      setIsSaving(true);

      if (isNewRound) {
        const sets = await window.setsApi?.list();
        const activeSet = sets?.find((s) => Boolean(s.isActive)) || sets?.[0];
        if (!activeSet) {
          toast.error("Please create a question set first");
          return;
        }

        const created = await window.roundsApi?.create({
          setId: activeSet.id,
          categoryId,
          name: name.trim(),
          description: description.trim() || undefined,
          configuration: buildConfiguration(),
          confirmationRequired,
        });
        if (created) {
          toast.success("Round created!");
          navigate(`/round/${created.id}`);
        }
      } else if (existingRound) {
        const updated = await window.roundsApi?.update({
          id: existingRound.id,
          categoryId,
          name: name.trim(),
          description: description.trim() || undefined,
          configuration: buildConfiguration(),
          confirmationRequired,
        });
        if (updated) {
          setExistingRound(updated);
          toast.success("Round updated!");
        }
      }
    } catch (err) {
      toast.error(
        isNewRound ? "Failed to create round" : "Failed to update round"
      );
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!existingRound) return;
    if (!confirm(`Delete "${existingRound.name}"? This cannot be undone.`))
      return;

    try {
      await window.roundsApi?.delete(existingRound.id);
      toast.success("Round deleted");
      navigate("/rounds");
    } catch (err) {
      console.error("Failed to delete round", err);
      toast.error("Failed to delete round");
    }
  };

  const handleLifelineToggle = (slug: string, enabled: boolean) => {
    setAllowedLifelines((prev) => {
      if (enabled) {
        return { ...prev, [slug]: 1 };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [slug]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const handleLifelineCount = (slug: string, count: number) => {
    setAllowedLifelines((prev) => ({ ...prev, [slug]: count }));
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
          onClick={() => navigate("/rounds")}
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
            {isNewRound ? "New Round" : (existingRound?.name ?? "Edit Round")}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {!isNewRound && existingRound && (
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              style={{
                color: "rgb(var(--color-error))",
                backgroundColor: "rgb(var(--color-error) / 0.1)",
              }}
              title="Delete round"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
          <SectionBanner
            title="Round Details"
            description="Basic information about the round"
            action={
              <div className="flex items-center justify-end gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSaving || !name.trim()}
                  className="px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2"
                  style={{
                    backgroundColor:
                      "rgb(var(--color-primary-foreground, 255 255 255))",
                    color: "rgb(var(--color-primary))",
                  }}
                >
                  {isSaving
                    ? "Saving..."
                    : isNewRound
                      ? "Create Round"
                      : "Save"}
                </button>
              </div>
            }
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label
                className="text-sm font-medium"
                style={{ color: "rgb(var(--color-text-secondary))" }}
              >
                Round Name
              </label>
              <InputField
                name="roundName"
                value={name}
                onChange={(val) => setName(val)}
                placeholder="e.g., General Knowledge"
                icon={<Layers size={18} />}
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium"
                style={{ color: "rgb(var(--color-text-secondary))" }}
              >
                Description
              </label>
              <InputField
                name="roundDescription"
                value={description}
                onChange={(val) => setDescription(val)}
                placeholder="Brief description of this round..."
                icon={<FileText size={18} />}
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium"
                style={{ color: "rgb(var(--color-text-secondary))" }}
              >
                Round Category
              </label>
              <Options
                options={categories.map((cat) => ({
                  id: cat.id,
                  name: cat.name,
                }))}
                value={categoryId}
                onChange={handleCategoryChange}
              />
            </div>
          </motion.div>

          {(!isNewRound || existingRound) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <SectionBanner
                title="Time & Scoring"
                description="Configure timing and point values"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={<Clock size={20} />}
                  label="Base Time"
                  description="Seconds per question"
                  value={timePolicy.baseTime}
                  onChange={(v) =>
                    setTimePolicy((p) => ({ ...p, baseTime: v }))
                  }
                  allowInfinity
                />
                <StatCard
                  icon={<Trophy size={20} />}
                  label="Correct Points"
                  description="Points for correct answer"
                  value={scoringPolicy.correct}
                  onChange={(v) =>
                    setScoringPolicy((p) => ({ ...p, correct: v }))
                  }
                  allowNegative
                />
                <StatCard
                  icon={<Trophy size={20} />}
                  label="Incorrect Points"
                  description="Points for wrong answer"
                  value={scoringPolicy.incorrect}
                  onChange={(v) =>
                    setScoringPolicy((p) => ({ ...p, incorrect: v }))
                  }
                  allowNegative
                />
                <StatCard
                  icon={<ArrowRightLeft size={20} />}
                  label="Pass Points"
                  description="Points when passing"
                  value={scoringPolicy.pass ?? 0}
                  onChange={(v) => setScoringPolicy((p) => ({ ...p, pass: v }))}
                  allowNegative
                />
              </div>

              <SectionBanner
                title="Pass & Hints"
                description="Configure passing and hint options"
              />

              <div className="space-y-3">
                <AccordionSection
                  title="Passing Options"
                  description="Configure how question passing works"
                  icon={<ArrowRightLeft size={18} />}
                  isOpen={openAccordions.passSettings}
                  onToggle={() => toggleAccordion("passSettings")}
                >
                  <div className="space-y-1">
                    <ConfigRow
                      label="Enable Passing"
                      description="Allow teams to pass questions"
                    >
                      <ToggleSwitch
                        enabled={passPolicy.enabled}
                        onChange={(v) =>
                          setPassPolicy((p) => ({ ...p, enabled: v }))
                        }
                      />
                    </ConfigRow>
                    <AnimatePresence>
                      {passPolicy.enabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <ConfigRow
                            label="Reduces Pass Quota"
                            description="Count against team's total passes"
                          >
                            <ToggleSwitch
                              enabled={passPolicy.reducesPassQuota ?? false}
                              onChange={(v) =>
                                setPassPolicy((p) => ({
                                  ...p,
                                  reducesPassQuota: v,
                                }))
                              }
                            />
                          </ConfigRow>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AccordionSection>

                <AnimatePresence>
                  {passPolicy.enabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <AccordionSection
                        title="Time After Pass"
                        description="Configure time limits when questions are passed"
                        icon={<Clock size={18} />}
                        isOpen={openAccordions.timeAfterPass}
                        onToggle={() => toggleAccordion("timeAfterPass")}
                      >
                        <div className="space-y-4">
                          <ModeTabSelector
                            tabs={[
                              {
                                value: "static" as const,
                                label: "Static",
                                icon: <Lock size={16} />,
                              },
                              {
                                value: "dynamic" as const,
                                label: "Dynamic",
                                icon: <TrendingDown size={16} />,
                              },
                            ]}
                            value={timePolicy.afterPassTimeMode ?? "static"}
                            onChange={(v) =>
                              setTimePolicy((p) => ({
                                ...p,
                                afterPassTimeMode: v,
                                staticAfterPassTime:
                                  v === "static"
                                    ? (p.staticAfterPassTime ?? p.baseTime)
                                    : p.staticAfterPassTime,
                                afterPassTime:
                                  v === "dynamic"
                                    ? (p.afterPassTime ?? [
                                        Math.max(1, p.baseTime - 2),
                                        Math.max(1, p.baseTime - 4),
                                        Math.max(1, p.baseTime - 6),
                                      ])
                                    : p.afterPassTime,
                              }))
                            }
                          />

                          <AnimatePresence mode="wait">
                            {(timePolicy.afterPassTimeMode ?? "static") ===
                              "static" && (
                              <motion.div
                                key="static"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-4 rounded-xl"
                                style={{
                                  backgroundColor:
                                    "rgb(var(--color-primary) / 0.05)",
                                  border:
                                    "1px solid rgb(var(--color-primary) / 0.15)",
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p
                                      className="text-sm font-medium"
                                      style={{
                                        color: "rgb(var(--color-text-primary))",
                                      }}
                                    >
                                      Fixed Time After Pass
                                    </p>
                                    <p
                                      className="text-xs"
                                      style={{
                                        color: "rgb(var(--color-text-muted))",
                                      }}
                                    >
                                      Same time limit for all passed questions
                                    </p>
                                  </div>
                                  <EditableNumber
                                    value={
                                      timePolicy.staticAfterPassTime ??
                                      timePolicy.baseTime
                                    }
                                    onChange={(v) =>
                                      setTimePolicy((p) => ({
                                        ...p,
                                        staticAfterPassTime: v,
                                      }))
                                    }
                                    size="md"
                                    allowInfinity
                                  />
                                </div>
                              </motion.div>
                            )}

                            {timePolicy.afterPassTimeMode === "dynamic" && (
                              <motion.div
                                key="dynamic"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-3"
                              >
                                <p
                                  className="text-xs"
                                  style={{
                                    color: "rgb(var(--color-text-muted))",
                                  }}
                                >
                                  Time decreases after each pass. Add more
                                  levels as needed.
                                </p>
                                <div className="flex flex-wrap gap-3 mt-1">
                                  {(timePolicy.afterPassTime ?? []).map(
                                    (time, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center gap-2 p-3 rounded-xl"
                                        style={{
                                          backgroundColor:
                                            "rgb(var(--color-primary) / 0.05)",
                                          border:
                                            "1px solid rgb(var(--color-primary) / 0.15)",
                                        }}
                                      >
                                        <span
                                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                          style={{
                                            backgroundColor:
                                              "rgb(var(--color-primary) / 0.15)",
                                            color: "rgb(var(--color-primary))",
                                          }}
                                        >
                                          Pass {index + 1}
                                        </span>
                                        <EditableNumber
                                          value={time}
                                          onChange={(v) => {
                                            const newTimes = [
                                              ...(timePolicy.afterPassTime ??
                                                []),
                                            ];
                                            newTimes[index] = v;
                                            setTimePolicy((p) => ({
                                              ...p,
                                              afterPassTime: newTimes,
                                            }));
                                          }}
                                          size="sm"
                                          allowInfinity
                                        />
                                        {(timePolicy.afterPassTime?.length ??
                                          0) > 1 && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newTimes = (
                                                timePolicy.afterPassTime ?? []
                                              ).filter((_, i) => i !== index);
                                              setTimePolicy((p) => ({
                                                ...p,
                                                afterPassTime:
                                                  newTimes.length > 0
                                                    ? newTimes
                                                    : undefined,
                                              }));
                                            }}
                                            className="text-xs cursor-pointer opacity-60 hover:opacity-100"
                                            style={{
                                              color: "rgb(var(--color-error))",
                                            }}
                                          >
                                            Remove
                                          </button>
                                        )}
                                      </motion.div>
                                    )
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current =
                                        timePolicy.afterPassTime ?? [];
                                      const lastTime =
                                        current[current.length - 1] ??
                                        timePolicy.baseTime;
                                      setTimePolicy((p) => ({
                                        ...p,
                                        afterPassTime: [
                                          ...current,
                                          Math.max(1, lastTime - 2),
                                        ],
                                      }));
                                    }}
                                    className="flex flex-col items-center justify-center w-24 h-24 rounded-xl transition-all cursor-pointer"
                                    style={{
                                      backgroundColor:
                                        "rgb(var(--color-bg-tertiary))",
                                      border:
                                        "2px dashed rgb(var(--color-border))",
                                      color: "rgb(var(--color-text-muted))",
                                    }}
                                  >
                                    <span className="text-2xl">+</span>
                                    <span className="text-xs mt-1">
                                      Add Level
                                    </span>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </AccordionSection>

                      <AccordionSection
                        title="Scoring for Passed Questions"
                        description="Points awarded when answering a passed question"
                        icon={<Trophy size={18} />}
                        isOpen={openAccordions.scoringWhenPassed}
                        onToggle={() => toggleAccordion("scoringWhenPassed")}
                      >
                        <div className="space-y-4">
                          <ModeTabSelector
                            tabs={[
                              {
                                value: "static" as const,
                                label: "Static",
                                icon: <Lock size={16} />,
                              },
                              {
                                value: "dynamic" as const,
                                label: "Dynamic",
                                icon: <TrendingDown size={16} />,
                              },
                            ]}
                            value={passedScoringMode}
                            onChange={(v) => {
                              setPassedScoringMode(v);
                              if (v === "static") {
                                setScoringPolicy((p) => ({
                                  ...p,
                                  correctWhenPassedMultiple: undefined,
                                }));
                              } else {
                                setScoringPolicy((p) => ({
                                  ...p,
                                  correctWhenPassedMultiple: [
                                    p.correctWhenPassed ?? p.correct,
                                    Math.floor(
                                      (p.correctWhenPassed ?? p.correct) * 0.8
                                    ),
                                    Math.floor(
                                      (p.correctWhenPassed ?? p.correct) * 0.6
                                    ),
                                  ],
                                }));
                              }
                            }}
                          />

                          <AnimatePresence mode="wait">
                            {passedScoringMode === "static" && (
                              <motion.div
                                key="static-scoring"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-4 rounded-xl"
                                style={{
                                  backgroundColor:
                                    "rgb(var(--color-primary) / 0.05)",
                                  border:
                                    "1px solid rgb(var(--color-primary) / 0.15)",
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p
                                      className="text-sm font-medium"
                                      style={{
                                        color: "rgb(var(--color-text-primary))",
                                      }}
                                    >
                                      Fixed Points When Passed
                                    </p>
                                    <p
                                      className="text-xs"
                                      style={{
                                        color: "rgb(var(--color-text-muted))",
                                      }}
                                    >
                                      Same points regardless of pass count
                                    </p>
                                  </div>
                                  <EditableNumber
                                    value={
                                      scoringPolicy.correctWhenPassed ??
                                      scoringPolicy.correct
                                    }
                                    onChange={(v) =>
                                      setScoringPolicy((p) => ({
                                        ...p,
                                        correctWhenPassed: v,
                                      }))
                                    }
                                    size="md"
                                    allowNegative
                                  />
                                </div>
                              </motion.div>
                            )}

                            {passedScoringMode === "dynamic" && (
                              <motion.div
                                key="dynamic-scoring"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-3"
                              >
                                <p
                                  className="text-xs"
                                  style={{
                                    color: "rgb(var(--color-text-muted))",
                                  }}
                                >
                                  Points decrease based on how many times the
                                  question was passed.
                                </p>
                                <div className="flex flex-wrap gap-3 mt-1">
                                  {(
                                    scoringPolicy.correctWhenPassedMultiple ??
                                    []
                                  ).map((points, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className="flex flex-col items-center gap-2 p-3 rounded-xl"
                                      style={{
                                        backgroundColor:
                                          "rgb(var(--color-primary) / 0.05)",
                                        border:
                                          "1px solid rgb(var(--color-primary) / 0.15)",
                                      }}
                                    >
                                      <span
                                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                        style={{
                                          backgroundColor:
                                            "rgb(var(--color-primary) / 0.15)",
                                          color: "rgb(var(--color-primary))",
                                        }}
                                      >
                                        After {index + 1} pass
                                        {index > 0 ? "es" : ""}
                                      </span>
                                      <EditableNumber
                                        value={points}
                                        onChange={(v) => {
                                          const newPoints = [
                                            ...(scoringPolicy.correctWhenPassedMultiple ??
                                              []),
                                          ];
                                          newPoints[index] = v;
                                          setScoringPolicy((p) => ({
                                            ...p,
                                            correctWhenPassedMultiple:
                                              newPoints,
                                          }));
                                        }}
                                        size="sm"
                                        allowNegative
                                      />
                                      {(scoringPolicy.correctWhenPassedMultiple
                                        ?.length ?? 0) > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newPoints = (
                                              scoringPolicy.correctWhenPassedMultiple ??
                                              []
                                            ).filter((_, i) => i !== index);
                                            setScoringPolicy((p) => ({
                                              ...p,
                                              correctWhenPassedMultiple:
                                                newPoints.length > 0
                                                  ? newPoints
                                                  : undefined,
                                            }));
                                            if (newPoints.length === 0) {
                                              setPassedScoringMode("static");
                                            }
                                          }}
                                          className="text-xs cursor-pointer opacity-60 hover:opacity-100"
                                          style={{
                                            color: "rgb(var(--color-error))",
                                          }}
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </motion.div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current =
                                        scoringPolicy.correctWhenPassedMultiple ??
                                        [];
                                      const lastPoints =
                                        current[current.length - 1] ??
                                        scoringPolicy.correct;
                                      setScoringPolicy((p) => ({
                                        ...p,
                                        correctWhenPassedMultiple: [
                                          ...current,
                                          Math.floor(lastPoints * 0.8),
                                        ],
                                      }));
                                    }}
                                    className="flex flex-col items-center justify-center w-24 h-24 rounded-xl transition-all cursor-pointer"
                                    style={{
                                      backgroundColor:
                                        "rgb(var(--color-bg-tertiary))",
                                      border:
                                        "2px dashed rgb(var(--color-border))",
                                      color: "rgb(var(--color-text-muted))",
                                    }}
                                  >
                                    <span className="text-2xl">+</span>
                                    <span className="text-xs mt-1">
                                      Add Level
                                    </span>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </AccordionSection>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AccordionSection
                  title="Hint Options"
                  description="Configure how hints work in this round"
                  icon={<Lightbulb size={18} />}
                  isOpen={openAccordions.hintSettings}
                  onToggle={() => toggleAccordion("hintSettings")}
                >
                  <div className="space-y-1">
                    <ConfigRow
                      label="Enable Hints"
                      description="Allow hints for this round"
                    >
                      <ToggleSwitch
                        enabled={hintPolicy.enabled}
                        onChange={(v) =>
                          setHintPolicy((p) => ({ ...p, enabled: v }))
                        }
                      />
                    </ConfigRow>
                    <AnimatePresence>
                      {hintPolicy.enabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-0"
                        >
                          <ConfigRow
                            label="Progressive Reveal"
                            description="Reveal hints gradually"
                          >
                            <ToggleSwitch
                              enabled={hintPolicy.progressiveReveal ?? false}
                              onChange={(v) =>
                                setHintPolicy((p) => ({
                                  ...p,
                                  progressiveReveal: v,
                                }))
                              }
                            />
                          </ConfigRow>
                          <ConfigRow
                            label="Reduces Hint Quota"
                            description="Count against team's total hints"
                          >
                            <ToggleSwitch
                              enabled={hintPolicy.reducesHintQuota ?? false}
                              onChange={(v) =>
                                setHintPolicy((p) => ({
                                  ...p,
                                  reducesHintQuota: v,
                                }))
                              }
                            />
                          </ConfigRow>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AccordionSection>

                <AnimatePresence>
                  {hintPolicy.enabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <StatCard
                        icon={<Lightbulb size={20} />}
                        label="Max Hints"
                        description="Hints available per question"
                        value={hintPolicy.maxHints ?? 3}
                        onChange={(v) =>
                          setHintPolicy((p) => ({ ...p, maxHints: v }))
                        }
                        allowInfinity
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: "rgb(var(--color-card-bg))",
                  border: "1px solid rgb(var(--color-card-border))",
                }}
              >
                <ConfigRow
                  label="Require Confirmation"
                  description="Ask for confirmation before advancing to next question"
                >
                  <ToggleSwitch
                    enabled={confirmationRequired}
                    onChange={setConfirmationRequired}
                  />
                </ConfigRow>
              </div>

              <SectionBanner
                title="Question Format"
                description="How questions are presented and answered"
              />

              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "rgb(var(--color-text-secondary))" }}
                  >
                    Prompt Type
                  </label>
                  <Options
                    options={[
                      {
                        id: "text" as const,
                        name: "Text",
                        icon: <Type size={16} />,
                      },
                      {
                        id: "image" as const,
                        name: "Image",
                        icon: <Image size={16} />,
                      },
                      {
                        id: "audio" as const,
                        name: "Audio",
                        icon: <Music size={16} />,
                      },
                      {
                        id: "video" as const,
                        name: "Video",
                        icon: <Video size={16} />,
                      },
                    ]}
                    value={questionFormat.promptType}
                    onChange={(v) =>
                      setQuestionFormat((p) => ({ ...p, promptType: v }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "rgb(var(--color-text-secondary))" }}
                  >
                    Response Type
                  </label>
                  <Options
                    options={[
                      {
                        id: "choice" as const,
                        name: "Choice",
                        icon: <ListChecks size={16} />,
                      },
                      {
                        id: "text" as const,
                        name: "Text",
                        icon: <Type size={16} />,
                      },
                      {
                        id: "number" as const,
                        name: "Number",
                        icon: <Hash size={16} />,
                      },
                      {
                        id: "boolean" as const,
                        name: "True/False",
                        icon: <ToggleLeft size={16} />,
                      },
                    ]}
                    value={questionFormat.responseType}
                    onChange={(v) =>
                      setQuestionFormat((p) => ({ ...p, responseType: v }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "rgb(var(--color-text-secondary))" }}
                  >
                    Answer Mode
                  </label>
                  <Options
                    options={[
                      { id: "single" as const, name: "Single Answer" },
                      { id: "multiple" as const, name: "Multiple Answers" },
                      { id: "open" as const, name: "Open Ended" },
                    ]}
                    value={answerPolicy.mode}
                    onChange={(v) => setAnswerPolicy({ mode: v })}
                  />
                </div>
              </div>

              <SectionBanner
                title="Allowed Lifelines"
                description="Which lifelines can be used in this round"
              />

              {lifelines.length === 0 ? (
                <p
                  className="text-sm py-4 text-center"
                  style={{ color: "rgb(var(--color-text-muted))" }}
                >
                  No lifelines configured. Add lifelines in Settings.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lifelines.map((lifeline) => {
                    const isEnabled = lifeline.slug in allowedLifelines;
                    const count = allowedLifelines[lifeline.slug] ?? 1;
                    return (
                      <LifelineCard
                        key={lifeline.id}
                        lifeline={lifeline}
                        isEnabled={isEnabled}
                        count={count}
                        onToggle={(enabled) =>
                          handleLifelineToggle(lifeline.slug, enabled)
                        }
                        onCountChange={(count) =>
                          handleLifelineCount(lifeline.slug, count)
                        }
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </form>
      </div>
    </motion.section>
  );
}
