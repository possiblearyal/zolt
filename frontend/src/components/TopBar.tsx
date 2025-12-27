import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus } from "lucide-react";
import type { SetRecord } from "@/types/sets";

interface TopBarProps {
  selectedSet: string;
  onSetChange: (set: string) => void;
  orgName?: string;
  orgLogo?: string;
}

export function TopBar({
  selectedSet,
  onSetChange,
  orgName,
  orgLogo,
}: TopBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sets, setSets] = useState<SetRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onSetChangeRef = useRef(onSetChange);
  onSetChangeRef.current = onSetChange;

  const loadSets = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await window.setsApi?.list?.();
      setSets(data ?? []);
      if (data?.length) {
        const activeSet = data.find((s: SetRecord) => s.isActive);
        if (activeSet) {
          onSetChangeRef.current(activeSet.id);
        } else if (!selectedSet) {
          onSetChangeRef.current(data[0].id);
        }
      }
    } catch (err) {
      console.warn("Failed to load sets", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSet]);

  useEffect(() => {
    loadSets();
  }, [location.pathname, loadSets]);

  const handleSetChange = async (setId: string) => {
    onSetChange(setId);
    try {
      await window.setsApi?.setActive?.(setId);
      const data = await window.setsApi?.list?.();
      setSets(data ?? []);
    } catch (err) {
      console.warn("Failed to set active set", err);
    }
  };

  const selectedSetName =
    sets.find((s) => s.id === selectedSet)?.name ?? "Select question set";

  return (
    <div
      className="border-b z-20"
      style={{
        height: "var(--topbar-height)",
        borderColor: "rgb(var(--color-border))",
        backgroundColor: "rgb(var(--color-bg-primary))",
      }}
    >
      <div className="h-full flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <img
            src="/zolt.svg"
            alt="Zolt logo"
            width={28}
            height={28}
            style={{ objectFit: "contain" }}
          />
          <ButtonGroup>
            <Select value={selectedSet} onValueChange={handleSetChange}>
              <SelectTrigger
                className="min-w-[250px] justify-between border cursor-pointer"
                data-size="default"
              >
                <SelectValue
                  placeholder={isLoading ? "Loading..." : "Select question set"}
                >
                  {selectedSetName}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start" className="border">
                {sets.length === 0 && !isLoading ? (
                  <div
                    className="px-3 py-2 text-sm"
                    style={{ color: "rgb(var(--color-text-muted))" }}
                  >
                    No sets found. Create one!
                  </div>
                ) : (
                  sets.map((set) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={set.id}
                      value={set.id}
                    >
                      {set.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              aria-label="Add Set"
              className="cursor-pointer"
              onClick={() => navigate("/new")}
            >
              <Plus className="size-4 opacity-50" />
            </Button>
          </ButtonGroup>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span style={{ color: "rgb(var(--color-text-primary))" }}>
              Zolt
            </span>
            <span style={{ color: "rgb(var(--color-text-secondary))" }}>
              – {orgName || "Your organization"}
            </span>
          </div>

          <img
            src={orgLogo || "/zolt.svg"}
            alt={orgName || "Organization"}
            width={36}
            height={36}
            style={{
              borderRadius: "9999px",
              objectFit: "cover",
              border: "1px solid rgb(var(--color-border))",
            }}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
