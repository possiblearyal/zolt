import { X, TrendingUp, Users, FileQuestion, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl z-50 w-full max-w-2xl"
            style={{ backgroundColor: "rgb(var(--color-bg-primary))" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: "rgb(var(--color-border))" }}
            >
              <h2 style={{ color: "rgb(var(--color-text-primary))" }}>
                Quiz Statistics
              </h2>
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
                <X
                  size={20}
                  style={{ color: "rgb(var(--color-text-secondary))" }}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl p-6"
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
                          <Icon size={24} />
                        </div>
                        <div>
                          <p
                            className="text-sm"
                            style={{
                              color: "rgb(var(--color-text-secondary))",
                            }}
                          >
                            {stat.label}
                          </p>
                          <p
                            className="text-2xl font-bold"
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

              {/* Additional Info */}
              <div className="space-y-4">
                <div
                  className="border rounded-lg p-4"
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
                  className="border rounded-lg p-4"
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

            {/* Footer */}
            <div
              className="flex justify-end gap-3 p-6 border-t"
              style={{ borderColor: "rgb(var(--color-border))" }}
            >
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border transition-colors"
                style={{
                  borderColor: "rgb(var(--color-border))",
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
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
