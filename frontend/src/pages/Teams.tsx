import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, Settings } from "lucide-react";
import type { TeamRecord } from "@/types/teams";
import { SectionBanner } from "@/components/shared/SectionBanner";

export function Teams() {
  const [teams, setTeams] = useState<TeamRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const loadTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await window.teamsApi?.list();
      setTeams(data ?? []);
    } catch (err) {
      console.error("Failed to load teams", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  return (
    <section
      className="flex flex-col gap-6"
      style={{ color: "rgb(var(--color-text-primary))" }}
    >
      <SectionBanner
        title="Teams"
        description="Manage teams participating in quiz matches."
        action={
          <button
            onClick={() => navigate("/team/new")}
            className="px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2"
            style={{
              backgroundColor:
                "rgb(var(--color-primary-foreground, 255 255 255))",
              color: "rgb(var(--color-primary))",
            }}
          >
            <Plus size={18} />
            Add Team
          </button>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p style={{ color: "rgb(var(--color-text-secondary))" }}>
            Loading teams...
          </p>
        </div>
      ) : teams.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-2xl border"
          style={{
            borderColor: "rgb(var(--color-border))",
            backgroundColor: "rgb(var(--color-bg-secondary))",
          }}
        >
          <Users
            size={48}
            style={{
              color: "rgb(var(--color-text-muted))",
              marginBottom: "16px",
            }}
          />
          <p style={{ color: "rgb(var(--color-text-secondary))" }}>
            No teams created yet.
          </p>
          <button
            onClick={() => navigate("/team/new")}
            className="mt-4 px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2"
            style={{
              backgroundColor: "rgb(var(--color-primary))",
              color: "rgb(var(--color-primary-foreground, 255 255 255))",
            }}
          >
            <Plus size={18} />
            Create Your First Team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teams.map((team, index) => (
            <div
              key={team.id}
              onClick={() => navigate(`/team/${team.slug}`)}
              className="p-4 rounded-xl border cursor-pointer transition-all"
              style={{
                borderColor: "rgb(var(--color-border))",
                backgroundColor: "rgb(var(--color-card-bg))",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2"
                  style={{
                    borderColor: "rgb(var(--color-border))",
                    backgroundColor: "rgb(var(--color-bg-tertiary))",
                  }}
                >
                  {team.logoUrl ? (
                    <img
                      src={team.logoUrl}
                      alt={team.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      className="text-lg font-bold"
                      style={{ color: "rgb(var(--color-text-secondary))" }}
                    >
                      #{index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-medium truncate"
                    style={{ color: "rgb(var(--color-text-primary))" }}
                  >
                    {team.name}
                  </h3>
                </div>
                <Settings
                  size={18}
                  style={{ color: "rgb(var(--color-text-muted))" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
