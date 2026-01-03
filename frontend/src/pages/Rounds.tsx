import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  ChevronDown,
  ArrowUpAZ,
  ArrowDownAZ,
  SortAsc,
  Clock,
  Layers,
} from "lucide-react";
import { RoundCard } from "../components/RoundCard";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
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
import type { RoundRecord, RoundCategoryRecord } from "@/types/rounds";
import { SectionBanner } from "@/components/shared/SectionBanner";

type SortOption = "name" | "questions" | "duration" | "position";

export function Rounds() {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState<RoundRecord[]>([]);
  const [categories, setCategories] = useState<RoundCategoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("position");
  const [sortAscending, setSortAscending] = useState(true);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const pollIntervalRef = useRef<number | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const loadData = useCallback(async () => {
    try {
      const [roundsData, categoriesData] = await Promise.all([
        window.roundsApi?.list(),
        window.roundCategoriesApi?.list(),
      ]);
      if (roundsData) setRounds(roundsData);
      if (categoriesData) setCategories(categoriesData);
    } catch (err) {
      console.error("Failed to load rounds", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    pollIntervalRef.current = setInterval(() => {
      loadData();
    }, 500);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [loadData]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowCategoryDropdown(false);
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRounds = rounds
    .filter((round) => {
      const matchesSearch =
        round.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        round.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !filterCategory || round.categoryId === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "questions":
          comparison = 0; // TODO: Implement when questions are counted
          break;
        case "duration":
          comparison =
            (a.configuration?.timePolicy?.baseTime ?? 0) -
            (b.configuration?.timePolicy?.baseTime ?? 0);
          break;
        case "position":
        default:
          comparison = a.position - b.position;
          break;
      }
      return sortAscending ? comparison : -comparison;
    });

  const toCardRound = (round: RoundRecord) => {
    return {
      id: round.id,
      title: round.name,
      type: round.categoryName || "Unknown",
      questions: 0,
      duration: round.configuration?.timePolicy?.baseTime ?? 0,
    };
  };

  const handleAddRound = () => {
    navigate("/round/new");
  };

  const handleEditRound = (id: string) => {
    navigate(`/round/${id}`);
  };

  const handleDeleteRound = async (id: string) => {
    if (!confirm("Delete this round? This cannot be undone.")) return;
    setRounds((prev) => prev.filter((r) => r.id !== id));
    try {
      await window.roundsApi?.delete(id);
      toast.success("Round deleted");
    } catch (err) {
      console.error("Failed to delete round", err);
      toast.error("Failed to delete round");
      loadData();
    }
  };

  const handleDuplicateRound = async (id: string) => {
    const round = rounds.find((r) => r.id === id);
    if (!round) return;
    try {
      const created = await window.roundsApi?.create({
        setId: round.setId,
        categoryId: round.categoryId,
        name: `${round.name} (Copy)`,
        description: round.description,
        configuration: round.configuration,
        confirmationRequired: round.confirmationRequired,
      });
      if (created) {
        setRounds((prev) => [...prev, created]);
        toast.success("Round duplicated");
      }
    } catch (err) {
      console.error("Failed to duplicate round", err);
      toast.error("Failed to duplicate round");
    }
  };

  const handlePreviewRound = (id: string) => {
    toast.info(`Preview coming soon for round ${id}`);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      const oldIndex = rounds.findIndex((r) => r.id === active.id);
      const newIndex = rounds.findIndex((r) => r.id === over.id);
      const newOrder = arrayMove(rounds, oldIndex, newIndex);
      setRounds(newOrder);
      try {
        const setId = rounds[oldIndex].setId;
        await window.roundsApi?.reorder({
          setId,
          roundIds: newOrder.filter((r) => r.setId === setId).map((r) => r.id),
        });
        toast.success("Round order updated");
      } catch (err) {
        console.error("Failed to reorder rounds", err);
        toast.error("Failed to save order");
        loadData();
      }
    }
  };

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

  const activeRound = activeId ? rounds.find((r) => r.id === activeId) : null;
  const showFilters =
    isSearchFocused || searchQuery || filterCategory || sortBy !== "position";

  const sortOptions: {
    value: SortOption;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { value: "position", label: "Default Order", icon: <SortAsc size={14} /> },
    { value: "name", label: "Name (A-Z)", icon: <ArrowUpAZ size={14} /> },
    { value: "duration", label: "Duration", icon: <Clock size={14} /> },
    { value: "questions", label: "Questions", icon: <Layers size={14} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full overflow-hidden"
    >
      <SectionBanner
        title="Quiz Rounds"
        description="Configure and organize the rounds for your quiz competition"
        action={
          <button
            onClick={handleAddRound}
            className="px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2"
            style={{
              backgroundColor:
                "rgb(var(--color-primary-foreground, 255 255 255))",
              color: "rgb(var(--color-primary))",
            }}
          >
            <Plus size={18} />
            Add Round
          </button>
        }
      />

      <div className="flex-1 flex flex-col overflow-hidden px-6 py-6">
        <div ref={searchContainerRef} className="mb-6">
          <div
            className="relative w-full"
            style={{
              backgroundColor: "rgb(var(--color-bg-secondary))",
              borderRadius: "12px",
            }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{
                borderBottom: showFilters
                  ? "1px solid rgb(var(--color-border))"
                  : "none",
              }}
            >
              <Search
                size={20}
                style={{ color: "rgb(var(--color-text-muted))" }}
              />
              <input
                type="text"
                placeholder="Search rounds by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="flex-1 bg-transparent outline-none text-base"
                style={{ color: "rgb(var(--color-text-primary))" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full hover:bg-black/10 cursor-pointer"
                  style={{ color: "rgb(var(--color-text-muted))" }}
                >
                  ×
                </button>
              )}
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-4 px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowCategoryDropdown(!showCategoryDropdown);
                          setShowSortDropdown(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        style={{
                          backgroundColor: filterCategory
                            ? "rgb(var(--color-primary) / 0.15)"
                            : "rgb(var(--color-bg-tertiary))",
                          color: filterCategory
                            ? "rgb(var(--color-primary))"
                            : "rgb(var(--color-text-primary))",
                        }}
                      >
                        <span>
                          {filterCategory
                            ? categories.find((c) => c.id === filterCategory)
                                ?.name || "Category"
                            : "All Categories"}
                        </span>
                        <ChevronDown size={14} />
                      </button>

                      {showCategoryDropdown && (
                        <div
                          className="absolute top-full left-0 mt-2 py-2 rounded-xl z-50 min-w-[200px]"
                          style={{
                            backgroundColor: "rgb(var(--color-bg-primary))",
                            border: "1px solid rgb(var(--color-border))",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                          }}
                        >
                          <button
                            onClick={() => {
                              setFilterCategory(null);
                              setShowCategoryDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-black/5 transition-colors cursor-pointer"
                            style={{
                              color: !filterCategory
                                ? "rgb(var(--color-primary))"
                                : "rgb(var(--color-text-primary))",
                              fontWeight: !filterCategory ? 600 : 400,
                            }}
                          >
                            All Categories
                          </button>
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setFilterCategory(cat.id);
                                setShowCategoryDropdown(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-black/5 transition-colors flex items-center gap-2 cursor-pointer"
                              style={{
                                color:
                                  filterCategory === cat.id
                                    ? "rgb(var(--color-primary))"
                                    : "rgb(var(--color-text-primary))",
                                fontWeight:
                                  filterCategory === cat.id ? 600 : 400,
                              }}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{
                                  backgroundColor: "rgb(var(--color-primary))",
                                }}
                              />
                              {cat.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowSortDropdown(!showSortDropdown);
                          setShowCategoryDropdown(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        style={{
                          backgroundColor:
                            sortBy !== "position"
                              ? "rgb(var(--color-primary) / 0.15)"
                              : "rgb(var(--color-bg-tertiary))",
                          color:
                            sortBy !== "position"
                              ? "rgb(var(--color-primary))"
                              : "rgb(var(--color-text-primary))",
                        }}
                      >
                        <span>
                          {sortOptions.find((o) => o.value === sortBy)?.label ||
                            "Sort by"}
                        </span>
                        <ChevronDown size={14} />
                      </button>

                      {showSortDropdown && (
                        <div
                          className="absolute top-full left-0 mt-2 py-2 rounded-xl z-50 min-w-[180px]"
                          style={{
                            backgroundColor: "rgb(var(--color-bg-primary))",
                            border: "1px solid rgb(var(--color-border))",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                          }}
                        >
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value);
                                setShowSortDropdown(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-black/5 transition-colors flex items-center gap-2 cursor-pointer"
                              style={{
                                color:
                                  sortBy === option.value
                                    ? "rgb(var(--color-primary))"
                                    : "rgb(var(--color-text-primary))",
                                fontWeight: sortBy === option.value ? 600 : 400,
                              }}
                            >
                              {option.icon}
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSortAscending(!sortAscending)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                      style={{
                        backgroundColor: "rgb(var(--color-bg-tertiary))",
                        color: "rgb(var(--color-text-primary))",
                      }}
                      title={sortAscending ? "Ascending" : "Descending"}
                    >
                      {sortAscending ? (
                        <ArrowUpAZ size={16} />
                      ) : (
                        <ArrowDownAZ size={16} />
                      )}
                    </button>

                    {(filterCategory ||
                      sortBy !== "position" ||
                      searchQuery) && (
                      <button
                        onClick={() => {
                          setFilterCategory(null);
                          setSortBy("position");
                          setSearchQuery("");
                          setSortAscending(true);
                        }}
                        className="ml-auto text-sm font-medium transition-colors cursor-pointer"
                        style={{ color: "rgb(var(--color-text-muted))" }}
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div
                className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
                style={{
                  borderColor: "rgb(var(--color-primary))",
                  borderTopColor: "transparent",
                }}
              />
            </div>
          ) : filteredRounds.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgb(var(--color-bg-tertiary))" }}
              >
                <Layers
                  size={32}
                  style={{ color: "rgb(var(--color-text-muted))" }}
                />
              </div>
              <h3
                className="text-lg font-medium mb-2"
                style={{ color: "rgb(var(--color-text-primary))" }}
              >
                {searchQuery || filterCategory
                  ? "No rounds found"
                  : "No rounds yet"}
              </h3>
              <p
                className="text-sm mb-4 text-center max-w-md"
                style={{ color: "rgb(var(--color-text-muted))" }}
              >
                {searchQuery || filterCategory
                  ? "Try adjusting your search or filter"
                  : "Create your first round to get started"}
              </p>
              {!searchQuery && !filterCategory && (
                <button
                  onClick={handleAddRound}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all cursor-pointer"
                  style={{
                    backgroundColor: "rgb(var(--color-primary))",
                    color: "rgb(var(--color-primary-foreground, 255 255 255))",
                  }}
                >
                  <Plus size={16} />
                  Create Round
                </button>
              )}
            </motion.div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredRounds.map((r) => r.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {filteredRounds.map((round, index) => (
                      <motion.div
                        key={round.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        <RoundCard
                          round={toCardRound(round)}
                          index={index}
                          onEdit={handleEditRound}
                          onDelete={handleDeleteRound}
                          onDuplicate={handleDuplicateRound}
                          onPreview={handlePreviewRound}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </SortableContext>

              <DragOverlay>
                {activeRound && (
                  <div style={{ opacity: 0.9 }}>
                    <RoundCard
                      round={toCardRound(activeRound)}
                      index={0}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      onDuplicate={() => {}}
                      onPreview={() => {}}
                    />
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          )}
        </div>
      </div>
    </motion.div>
  );
}
