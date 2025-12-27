"use client";

import React, { useId } from "react";
import clsx from "clsx";
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

  return (
    <div
      className={clsx(
        "input-field bg-white dark:bg-gray-800 border relative flex items-center border-gray-300 dark:border-gray-600",
        error && "ring-1 ring-red-500 border-red-500",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && (
        <span className="icon text-gray-600 dark:text-gray-300 flex items-center justify-center">
          {icon}
        </span>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
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
      />
      {error && (
        <span id={errorId} className="sr-only">{`Error: ${error}`}</span>
      )}
    </div>
  );
};

export default InputField;
