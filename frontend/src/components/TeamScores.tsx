import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, Trophy, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import type { TeamRecord } from "@/types/teams";

interface TeamScoresProps {
  isExpanded: boolean;
  onToggle: () => void;
  isMatchActive?: boolean;
}

interface SortableTeamCardProps {
  team: TeamRecord;
  index: number;
  isMatchActive: boolean;
  onNavigate: (slug: string) => void;
}

function SortableTeamCard({
  team,
  index,
  isMatchActive,
  onNavigate,
}: SortableTeamCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: team.id });

  const handleClick = () => {
    if (isMatchActive) {
      toast("Navigate to team?", {
        description: `This will open ${team.name}'s settings page.`,
        action: {
          label: "Go",
          onClick: () => onNavigate(team.slug),
        },
        cancel: {
          label: "Cancel",
          onClick: () => {},
        },
      });
    } else {
      onNavigate(team.slug);
    }
  };

  return (
    <div className="relative">
      {isOver && (
        <div
          className="absolute top-0 bottom-0 w-1 -left-3 rounded-full"
          style={{ backgroundColor: "rgb(var(--color-primary))" }}
        />
      )}

      <motion.div
        ref={setNodeRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="rounded-xl p-4 min-w-40 h-fit relative border shrink-0 cursor-pointer group"
        style={{
          borderColor: isDragging
            ? "rgb(var(--color-primary))"
            : "rgb(var(--color-card-border))",
          backgroundColor: "rgb(var(--color-card-bg))",
          transform: CSS.Transform.toString(transform),
          transition,
          zIndex: isDragging ? 50 : undefined,
          opacity: isDragging ? 0.5 : 1,
          boxShadow: isDragging
            ? "0 10px 25px -5px rgb(var(--color-primary) / 0.3)"
            : undefined,
        }}
        onClick={handleClick}
        {...attributes}
      >
        <div
          {...listeners}
          className="absolute top-2 left-2 p-1 rounded cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            color: "rgb(var(--color-text-muted))",
            backgroundColor: "rgb(var(--color-bg-hover))",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={14} />
        </div>

        <div
          className="absolute top-2 right-2 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "rgb(var(--color-bg-tertiary))",
            color: "rgb(var(--color-text-secondary))",
          }}
        >
          #{index + 1}
        </div>

        <div className="flex flex-col items-center mt-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 mb-3"
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
                className="text-2xl font-bold"
                style={{ color: "rgb(var(--color-text-muted))" }}
              >
                #{index + 1}
              </span>
            )}
          </div>

          <h4
            className="font-medium text-center truncate max-w-full"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            {team.name}
          </h4>
        </div>
      </motion.div>
    </div>
  );
}

export function TeamScores({
  isExpanded,
  onToggle,
  isMatchActive = false,
}: TeamScoresProps) {
  const [teams, setTeams] = useState<TeamRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const performReorder = async () => {
        const oldIndex = teams.findIndex((t) => t.id === active.id);
        const newIndex = teams.findIndex((t) => t.id === over.id);
        const newOrder = arrayMove(teams, oldIndex, newIndex);

        setTeams(newOrder);

        try {
          await window.teamsApi?.reorder(newOrder.map((t) => t.id));
          toast.success("Team order updated");
        } catch (err) {
          console.error("Failed to reorder teams", err);
          toast.error("Failed to save team order");
          loadTeams();
        }
      };

      if (isMatchActive) {
        toast("Reorder teams?", {
          description: "This will change the playing order.",
          action: {
            label: "Confirm",
            onClick: performReorder,
          },
          cancel: {
            label: "Cancel",
            onClick: () => loadTeams(), 
          },
        });
        const oldIndex = teams.findIndex((t) => t.id === active.id);
        const newIndex = teams.findIndex((t) => t.id === over.id);
        setTeams(arrayMove(teams, oldIndex, newIndex));
      } else {
        await performReorder();
      }
    }
  };

  const handleNavigate = (slug: string) => {
    navigate(`/team/${slug}`);
  };

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
          {isExpanded && !isLoading && (
            <span
              className="text-sm"
              style={{ color: "rgb(var(--color-text-secondary))" }}
            >
              {teams.length} team{teams.length !== 1 ? "s" : ""}
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
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p style={{ color: "rgb(var(--color-text-secondary))" }}>
                  Loading teams...
                </p>
              </div>
            ) : teams.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p style={{ color: "rgb(var(--color-text-muted))" }}>
                  No teams yet. Create teams from the Teams page.
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={teams.map((t) => t.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="flex gap-4 h-full items-center">
                    {teams.map((team, index) => (
                      <SortableTeamCard
                        key={team.id}
                        team={team}
                        index={index}
                        isMatchActive={isMatchActive}
                        onNavigate={handleNavigate}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
