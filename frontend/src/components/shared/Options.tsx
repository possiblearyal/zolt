import React from "react";
import { cn } from "@/lib/utils";

export interface OptionItem<T = string> {
  id: T;
  name: string;
  icon?: React.ReactNode;
}

interface OptionsProps<T = string> {
  options: OptionItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function Options<T extends string | number>({
  options,
  value,
  onChange,
  className,
}: OptionsProps<T>) {
  return (
    <nav className={cn("relative flex flex-wrap gap-2 py-1", className)}>
      {options.map((option, index) => {
        const isActive = value === option.id;
        const subtleHueShift = (index - Math.floor(options.length / 2)) * 3;

        return (
          <button
            key={String(option.id)}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer",
              !isActive && "hover:opacity-80"
            )}
            style={{
              backgroundColor: isActive
                ? "rgb(var(--color-primary))"
                : "transparent",
              color: isActive
                ? "rgb(var(--color-primary-foreground, 255 255 255))"
                : "rgb(var(--color-primary))",
              border: "2px solid rgb(var(--color-primary))",
              filter:
                subtleHueShift !== 0
                  ? `hue-rotate(${subtleHueShift}deg)`
                  : undefined,
            }}
          >
            {option.icon}
            <span>{option.name}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default Options;
