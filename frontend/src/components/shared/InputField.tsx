"use client";

import React, { useId, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import "@/styles/input-styles.css";

export interface InputFieldProps {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  defaultValue,
  disabled,
  autoComplete,
  required,
  minLength,
  maxLength,
  pattern,
  error,
  icon,
  className = "",
  inputClassName = "",
  onChange,
  onBlur,
}) => {
  const reactId = useId();
  const inputId = `${name}-${reactId}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div
      className={clsx(
        "input-field border relative flex items-center",
        error && "ring-1 ring-red-500 border-red-500",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{
        backgroundColor: "rgb(var(--color-bg-primary))",
        borderColor: error ? undefined : "rgb(var(--color-border))",
      }}
    >
      {icon && (
        <span
          className="icon flex items-center justify-center"
          style={{ color: "rgb(var(--color-text-secondary))" }}
        >
          {icon}
        </span>
      )}
      <input
        id={inputId}
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        onChange={(e) => onChange?.(e.target.value, e)}
        onBlur={onBlur}
        className={clsx(
          "flex-1 bg-transparent outline-none text-sm px-0 py-2",
          "placeholder:opacity-50",
          error && "placeholder:text-red-400",
          inputClassName
        )}
        style={{ color: "rgb(var(--color-text-primary))" }}
      />
      {isPasswordType && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="flex items-center justify-center p-2 mr-3 rounded-full transition-colors"
          style={{ color: "rgb(var(--color-text-secondary))" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "rgb(var(--color-bg-hover))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
      {error && (
        <span id={errorId} className="sr-only">{`Error: ${error}`}</span>
      )}
    </div>
  );
};

export default InputField;
