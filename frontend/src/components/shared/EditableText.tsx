import { useState, useEffect, useRef } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export function EditableText({
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    setIsEditing(false);
    onChange(inputValue);
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") {
            setIsEditing(false);
            setInputValue(value);
          }
        }}
        placeholder={placeholder}
        className={`${inputClassName} text-center font-bold rounded-lg outline-none`}
        style={{
          backgroundColor: "rgb(var(--color-bg-primary))",
          color: "rgb(var(--color-text-primary))",
          border: "2px solid rgb(var(--color-primary))",
        }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setIsEditing(true);
      }}
      className={`${className} text-left font-bold rounded-lg transition-all duration-150 hover:ring-2 cursor-text`}
      style={{
        backgroundColor: "transparent",
        color: "rgb(var(--color-text-primary))",
        border: "1px solid transparent",
        ["--tw-ring-color" as string]: "rgb(var(--color-primary) / 0.5)",
      }}
    >
      {value || placeholder}
    </button>
  );
}
