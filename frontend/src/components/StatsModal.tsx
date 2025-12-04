import { X, TrendingUp, Users, FileQuestion, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { HTMLAttributes } from "react";
import {
  withMovablePanel,
  type MovablePanelInjectedProps,
} from "./hoc/withMovablePanel";

interface StatsModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

type StatsModalProps = StatsModalBaseProps & MovablePanelInjectedProps;

function StatsModalComponent({
  isOpen,
  onClose,
  dragHandleProps,
}: StatsModalProps) {
  if (!isOpen) return null;

  const stats = [
    {
      label: "Total Rounds",
      value: "12",
      icon: TrendingUp,
      background: "rgb(var(--color-info))",
    },
    {
      label: "Total Questions",
      value: "156",
      icon: FileQuestion,
      background: "rgb(var(--color-success))",
    },
    {
      label: "Total Teams",
      value: "8",
      icon: Users,
      background: "rgb(var(--color-primary))",
    },
    {
      label: "Avg. Duration",
      value: "45 min",
      icon: Clock,
      background: "rgb(var(--color-warning))",
    },
  ];

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
        {...(dragHandleProps as HTMLAttributes<HTMLDivElement>)}
      >
        <div>
          <h2
            className="text-base font-semibold"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Quiz Statistics
          </h2>
          <p
            className="text-sm"
            style={{ color: "rgb(var(--color-text-secondary))" }}
          >
            Snapshot of the current competition.
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

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl p-5"
                style={{ backgroundColor: "rgb(var(--color-card-bg))" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: stat.background,
                      color: "rgb(var(--color-text-inverse))",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-wide"
                      style={{ color: "rgb(var(--color-text-tertiary))" }}
                    >
                      {stat.label}
                    </p>
                    <p
                      className="text-2xl font-semibold"
                      style={{ color: "rgb(var(--color-text-primary))" }}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div
            className="border rounded-xl p-4"
            style={{
              backgroundColor: "rgb(var(--color-bg-muted))",
              borderColor: "rgb(var(--color-info))",
            }}
          >
            <h3
              className="mb-2 text-sm font-medium"
              style={{ color: "rgb(var(--color-info))" }}
            >
              Most Popular Question Type
            </h3>
            <p style={{ color: "rgb(var(--color-text-primary))" }}>
              Multiple Choice (45%)
            </p>
          </div>
          <div
            className="border rounded-xl p-4"
            style={{
              backgroundColor: "rgb(var(--color-bg-muted))",
              borderColor: "rgb(var(--color-success))",
            }}
          >
            <h3
              className="mb-2 text-sm font-medium"
              style={{ color: "rgb(var(--color-success))" }}
            >
              Average Score
            </h3>
            <p style={{ color: "rgb(var(--color-text-primary))" }}>
              22.5 points per team
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex justify-end gap-3 px-5 py-4 border-t"
        style={{ borderColor: "rgb(var(--color-border))" }}
      >
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
          Close
        </button>
      </div>
    </motion.div>
  );
}

export const StatsModal = withMovablePanel<StatsModalBaseProps>(
  StatsModalComponent,
  {
    panelId: "stats-panel",
    anchorId: "quick-actions-anchor",
    width: 460,
    offset: { x: 24, y: -80 },
  }
);
