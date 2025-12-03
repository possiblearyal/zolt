import {
  GripVertical,
  Edit2,
  Copy,
  Eye,
  Clock,
  FileQuestion,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Round {
  id: string;
  title: string;
  type: string;
  typeColor: string;
  typeBg: string;
  questions: number;
  duration: number;
}

interface RoundCardProps {
  round: Round;
  index: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPreview: (id: string) => void;
}

export function RoundCard({
  round,
  index,
  onEdit,
  onDelete,
  onDuplicate,
  onPreview,
}: RoundCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: round.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    borderColor: "rgb(var(--color-border))",
  };

  return (
    <div className="relative">
      {/* Drop indicator line */}
      {isOver && (
        <div
          className="absolute left-0 right-0 h-0.5 -top-2 rounded-full"
          style={{ backgroundColor: "rgb(var(--color-primary))" }}
        />
      )}

      <motion.div
        ref={setNodeRef}
        style={{
          ...style,
          backgroundColor: "rgb(var(--color-card-bg))",
          borderColor: "rgb(var(--color-card-border))",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-2xl border p-6 transition-all duration-200 group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: "rgb(var(--color-text-tertiary))" }}
          >
            <GripVertical size={20} />
          </button>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <h3
              className="mb-2"
              style={{ color: "rgb(var(--color-text-primary))" }}
            >
              {round.title}
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Type Badge */}
              <span
                className="px-3 py-1 rounded-lg text-sm"
                style={{
                  backgroundColor: `${round.typeBg}`,
                  color: round.typeColor,
                }}
              >
                {round.type}
              </span>

              {/* Questions Count */}
              <span
                className="flex items-center gap-1.5"
                style={{ color: "rgb(var(--color-text-secondary))" }}
              >
                <FileQuestion size={16} />
                {round.questions} Questions
              </span>

              <span style={{ color: "rgb(var(--color-text-tertiary))" }}>
                •
              </span>

              {/* Duration */}
              <span
                className="flex items-center gap-1.5"
                style={{ color: "rgb(var(--color-text-secondary))" }}
              >
                <Clock size={16} />
                {round.duration} mins
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => onPreview(round.id)}
              className="p-2 rounded-lg transition-all"
              style={{
                color: "rgb(var(--color-text-secondary))",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgb(var(--color-bg-hover))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              title="Preview"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onEdit(round.id)}
              className="p-2 rounded-lg transition-all"
              style={{
                color: "rgb(var(--color-text-secondary))",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgb(var(--color-bg-hover))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDuplicate(round.id)}
              className="p-2 rounded-lg transition-all"
              style={{
                color: "rgb(var(--color-text-secondary))",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgb(var(--color-bg-hover))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              title="Duplicate"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={() => onDelete(round.id)}
              className="p-2 rounded-lg transition-all"
              style={{
                color: "rgb(var(--color-text-secondary))",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgb(var(--color-bg-hover))";
                e.currentTarget.style.color = "rgb(var(--color-destructive))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color =
                  "rgb(var(--color-text-secondary))";
              }}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
