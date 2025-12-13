import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TopBarProps {
  selectedSet: string;
  onSetChange: (set: string) => void;
}

export function TopBar({ selectedSet, onSetChange }: TopBarProps) {
  const questionSets = [
    "Science Questions Set - 1",
    "History Questions Set - 1",
    "Geography Questions Set - 1",
    "Mathematics Questions Set - 1",
  ];

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
          <Select value={selectedSet} onValueChange={onSetChange}>
            <SelectTrigger
              className="min-w-[250px] justify-between border hover:[rgb(var(--color-primary))]"
              data-size="default"
              style={{
                backgroundColor: "rgb(var(--color-bg-primary))",
                borderColor: "rgb(var(--color-border))",
                color: "rgb(var(--color-text-primary))",
              }}
            >
              <SelectValue placeholder="Select question set" />
            </SelectTrigger>
            <SelectContent
              align="start"
              className="border"
              style={{
                backgroundColor: "rgb(var(--color-bg-primary))",
                borderColor: "rgb(var(--color-border))",
                color: "rgb(var(--color-text-primary))",
              }}
            >
              {questionSets.map((set) => (
                <SelectItem
                  className="hover:bg-[rgb(var(--color-card-hover))] cursor-pointer"
                  key={set}
                  value={set}
                >
                  {set}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span style={{ color: "rgb(var(--color-text-primary))" }}>
              Zolt
            </span>
            <span style={{ color: "rgb(var(--color-text-secondary))" }}>
              – Everest School
            </span>
          </div>

          <img
            src="https://github.com/evilrabbit.png"
            alt="Profile"
            width={36}
            height={36}
            style={{
              borderRadius: "9999px",
              objectFit: "cover",
              border: "1px solid rgb(var(--color-border))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
