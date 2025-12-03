import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { RoundCard } from "../components/RoundCard";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Round {
  id: string;
  title: string;
  type: string;
  typeColor: string;
  typeBg: string;
  questions: number;
  duration: number;
}

export function Rounds() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [rounds, setRounds] = useState<Round[]>([
    {
      id: "1",
      title: "General Knowledge",
      type: "Multiple Choice",
      typeColor: "#009966",
      typeBg: "rgba(0, 188, 125, 0.1)",
      questions: 10,
      duration: 5,
    },
    {
      id: "2",
      title: "History Basics",
      type: "True/False",
      typeColor: "#e17100",
      typeBg: "rgba(254, 154, 0, 0.1)",
      questions: 15,
      duration: 7,
    },
    {
      id: "3",
      title: "Visual Puzzles",
      type: "Visual",
      typeColor: "#9810fa",
      typeBg: "rgba(173, 70, 255, 0.1)",
      questions: 8,
      duration: 10,
    },
    {
      id: "4",
      title: "Science & Technology",
      type: "Short Answer",
      typeColor: "#0092b8",
      typeBg: "rgba(0, 184, 219, 0.1)",
      questions: 12,
      duration: 8,
    },
  ]);

  // Round actions
  const handleAddRound = () => {
    const newRound: Round = {
      id: Date.now().toString(),
      title: `New Round ${rounds.length + 1}`,
      type: "Multiple Choice",
      typeColor: "#009966",
      typeBg: "rgba(0, 188, 125, 0.1)",
      questions: 10,
      duration: 5,
    };
    setRounds([...rounds, newRound]);
    toast.success("Round added successfully!");
  };

  const handleEditRound = (id: string) => {
    toast.info(`Editing round ${id}`);
  };

  const handleDeleteRound = (id: string) => {
    setRounds(rounds.filter((r) => r.id !== id));
    toast.success("Round deleted successfully!");
  };

  const handleDuplicateRound = (id: string) => {
    const round = rounds.find((r) => r.id === id);
    if (round) {
      const newRound = {
        ...round,
        id: Date.now().toString(),
        title: `${round.title} (Copy)`,
      };
      setRounds([...rounds, newRound]);
      toast.success("Round duplicated successfully!");
    }
  };

  const handlePreviewRound = (id: string) => {
    toast.info(`Previewing round ${id}`);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setRounds((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success("Round order updated!");
    }

    setActiveId(null);
  };

  // Keyboard shortcuts for rounds
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "n") {
          e.preventDefault();
          handleAddRound();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="mb-2"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Quiz Rounds
          </h1>
          <p style={{ color: "rgb(var(--color-text-secondary))" }}>
            Manage, reorder, and edit all quiz rounds at a glance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddRound}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all hover:opacity-90"
            style={{
              backgroundColor: "rgb(var(--color-primary))",
              color: "rgb(var(--color-primary-foreground, 255 255 255))",
            }}
          >
            <Plus size={18} />
            <span>Add Round</span>
          </button>
        </div>
      </div>

      {/* Rounds List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={rounds.map((r) => r.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {rounds.map((round, index) => (
              <RoundCard
                key={round.id}
                round={round}
                index={index}
                onEdit={handleEditRound}
                onDelete={handleDeleteRound}
                onDuplicate={handleDuplicateRound}
                onPreview={handlePreviewRound}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div
              className="rounded-2xl border p-6 shadow-lg opacity-90"
              style={{
                borderColor: "rgb(var(--color-primary))",
                backgroundColor: "rgb(var(--color-bg-primary))",
              }}
            >
              {(() => {
                const round = rounds.find((r) => r.id === activeId);
                return round ? (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="mb-2"
                        style={{ color: "rgb(var(--color-text-primary))" }}
                      >
                        {round.title}
                      </h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className="px-3 py-1 rounded-lg text-sm"
                          style={{
                            backgroundColor: round.typeBg,
                            color: round.typeColor,
                          }}
                        >
                          {round.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Empty State */}
      {rounds.length === 0 && (
        <div className="text-center py-20">
          <p className="mb-4" style={{ color: "rgb(var(--color-text-muted))" }}>
            No rounds created yet
          </p>
          <button
            onClick={handleAddRound}
            className="px-6 py-3 rounded-lg"
            style={{
              backgroundColor: "rgb(var(--color-primary))",
              color: "rgb(var(--color-primary-foreground, 255 255 255))",
            }}
          >
            Create Your First Round
          </button>
        </div>
      )}
    </>
  );
}
