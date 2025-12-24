import {
  ChevronUp,
  ChevronDown,
  Trophy,
  TrendingUp,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Team {
  id: string;
  name: string;
  score: number;
  rank: number;
  trend: "up" | "down" | "same";
  isWinner?: boolean;
}

interface TeamScoresProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function TeamScores({ isExpanded, onToggle }: TeamScoresProps) {
  const teams: Team[] = [
    {
      id: "1",
      name: "Dhaulagiri",
      rank: 1,
      score: 40,
      trend: "up",
      isWinner: true,
    },
    { id: "2", name: "Annapurna", rank: 2, score: 35, trend: "up" },
    { id: "3", name: "Manaslu", rank: 3, score: 10, trend: "down" },
    { id: "4", name: "Sagarmatha", rank: 4, score: 5, trend: "same" },
  ];

  return (
    <div
      className="border-t flex flex-col"
      style={{
        borderColor: "rgb(var(--color-border))",
        height: isExpanded ? "100%" : "var(--team-panel-collapsed-height)",
        backgroundColor: "rgb(var(--color-bg-primary))",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-3 flex items-center justify-between transition-colors border-b"
        style={{ borderColor: "rgb(var(--color-border))" }}
      >
        <div className="flex items-center gap-3">
          <Trophy size={20} style={{ color: "rgb(var(--color-primary))" }} />
          <span
            className="font-medium"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Team Scores
          </span>
          {isExpanded && (
            <span
              className="text-sm"
              style={{ color: "rgb(var(--color-text-secondary))" }}
            >
              {teams.length} teams competing
            </span>
          )}
        </div>
        <div style={{ color: "rgb(var(--color-text-secondary))" }}>
          {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-x-auto overflow-y-hidden px-6"
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <div className="flex gap-4 h-full items-center">
              {teams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl p-4 min-w-[200px] h-fit relative border shrink-0"
                  style={{
                    borderColor: "rgb(var(--color-card-border))",
                    backgroundColor: "rgb(var(--color-card-bg))",
                  }}
                >
                  <div
                    className="absolute top-3 right-3 text-xs font-medium"
                    style={{ color: "rgb(var(--color-text-muted))" }}
                  >
                    #{team.rank}
                  </div>

                  {team.isWinner && (
                    <div
                      className="absolute -top-3 -left-3 flex items-center gap-1 px-2 py-1 rounded-full border shadow-sm"
                      style={{
                        backgroundColor: "rgb(var(--color-bg-elevated))",
                        borderColor: "rgb(var(--color-warning))",
                        color: "rgb(var(--color-warning))",
                      }}
                    >
                      <Award size={14} />
                      <span className="text-xs font-semibold">Winning</span>
                    </div>
                  )}

                  <div className="mt-2 mb-3">
                    <h4
                      className="font-medium truncate"
                      style={{ color: "rgb(var(--color-text-primary))" }}
                    >
                      {team.name}
                    </h4>
                  </div>

                  <div className="flex items-center justify-center mb-2">
                    <div
                      className="relative flex items-center justify-center rounded-full border-4"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderColor: team.isWinner
                          ? "rgb(var(--color-warning))"
                          : "rgb(var(--color-border))",
                      }}
                    >
                      <span
                        className="text-2xl font-bold"
                        style={{
                          color: team.isWinner
                            ? "rgb(var(--color-warning))"
                            : "rgb(var(--color-text-secondary))",
                        }}
                      >
                        {team.score}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-xs">
                    {team.trend === "up" && (
                      <>
                        <TrendingUp
                          size={14}
                          style={{ color: "rgb(var(--color-success))" }}
                        />
                        <span style={{ color: "rgb(var(--color-success))" }}>
                          Rising
                        </span>
                      </>
                    )}
                    {team.trend === "down" && (
                      <>
                        <TrendingUp
                          size={14}
                          className="rotate-180"
                          style={{ color: "rgb(var(--color-destructive))" }}
                        />
                        <span
                          style={{ color: "rgb(var(--color-destructive))" }}
                        >
                          Falling
                        </span>
                      </>
                    )}
                    {team.trend === "same" && (
                      <span style={{ color: "rgb(var(--color-text-muted))" }}>
                        Stable
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
