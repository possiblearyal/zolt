import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MdOutlineAbc, MdOutlineDescription } from "react-icons/md";
import InputField from "@/components/shared/InputField";

export default function New() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Set name is required");
      return;
    }

    try {
      setIsSaving(true);
      if (!window.setsApi?.create) {
        toast.error("App bridge unavailable. Please restart the app.");
        return;
      }

      await window.setsApi.create({
        name: name.trim(),
        description: description.trim() || undefined,
        isActive: true,
      });
      toast.success("Question set created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create question set");
      console.warn(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section
      className="flex flex-col gap-8"
      style={{ color: "rgb(var(--color-text-primary))" }}
    >
      <div
        className="py-8"
        style={{
          background:
            "linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-accent)) 100%)",
          color: "rgb(var(--color-primary-foreground, 255 255 255))",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Create New Question Set</h1>
          <p style={{ opacity: 0.9 }}>
            Add a new question set to organize your quiz rounds and questions.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 rounded-2xl"
        style={{
          borderColor: "rgb(var(--color-border))",
        }}
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium">Set Name</label>
          <InputField
            name="setName"
            placeholder="e.g., Science Quiz Set 2025"
            value={name}
            onChange={(val) => setName(val)}
            icon={<MdOutlineAbc />}
            inputClassName="px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Description{" "}
            <span style={{ color: "rgb(var(--color-text-muted))" }}>
              (optional)
            </span>
          </label>
          <InputField
            name="setDescription"
            placeholder="Brief description of this question set..."
            value={description}
            onChange={(val) => setDescription(val)}
            icon={<MdOutlineDescription />}
            inputClassName="px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border cursor-pointer transition-colors"
            style={{
              borderColor: "rgb(var(--color-border))",
              color: "rgb(var(--color-text-primary))",
              backgroundColor: "rgb(var(--color-bg-secondary))",
            }}
            onClick={() => navigate(-1)}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg cursor-pointer transition-colors"
            disabled={isSaving}
            style={{
              backgroundColor: "rgb(var(--color-primary))",
              color: "rgb(var(--color-primary-foreground, 255 255 255))",
            }}
          >
            {isSaving ? "Creating..." : "Create Set"}
          </button>
        </div>
      </form>
    </section>
  );
}
