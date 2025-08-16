import React, { useEffect, useId, useState } from "react";

type Variant = "filled" | "outlined" | "ghost";
type Size = "sm" | "md" | "lg";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  type?: "text" | "password" | "email";
  clearable?: boolean;
  passwordToggle?: boolean;
  className?: string;
}

const cn = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

const VARIANT: Record<Variant, string> = {
  filled:
    "bg-gray-50 border border-gray-300 focus:bg-white dark:focus:bg-gray-900",
  outlined:
    "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700",
  ghost:
    "bg-transparent border-b border-gray-300 dark:border-gray-700 rounded-none",
};

const SIZE: Record<Size, string> = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-5 py-3",
};

export default function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "filled",
  size = "md",
  type = "text",
  clearable,
  passwordToggle,
  className,
}: InputFieldProps) {
  const id = useId();
  const descId = `${id}-desc`;
  const [internal, setInternal] = useState(value ?? "");
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (value !== undefined) setInternal(value);
  }, [value]);

  const isInvalid = !!invalid || !!errorMessage;
  const inputType = passwordToggle ? (showPw ? "text" : "password") : type;
  const val = value !== undefined ? value : internal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    else setInternal(e.target.value);
  };

  const clear = () => {
    if (onChange) {
      const fake = {
        target: { value: "" },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(fake);
    } else setInternal("");
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          value={val}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          type={inputType}
          aria-invalid={isInvalid || undefined}
          aria-describedby={helperText || errorMessage ? descId : undefined}
          className={cn(
            "w-full rounded-md outline-none transition-colors shadow-sm",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            VARIANT[variant],
            SIZE[size],
            disabled && "opacity-50 cursor-not-allowed",
            isInvalid && "border-red-500 focus:ring-red-500"
          )}
        />

        {/* Loading spinner */}
        {loading && (
          <span className="absolute inset-y-0 right-3 my-auto h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
        )}

        {/* Password toggle */}
        {passwordToggle && (
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-xs font-medium text-blue-600 hover:underline"
            tabIndex={-1}
            aria-label="Toggle password visibility"
          >
            {showPw ? "Hide" : "Show"}
          </button>
        )}

        {/* Clear button */}
        {clearable && !!val && !disabled && !loading && !passwordToggle && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear input"
            className="absolute inset-y-0 right-2 my-auto text-xl leading-none px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            tabIndex={-1}
          >
            ×
          </button>
        )}
      </div>

      {(helperText || errorMessage) && (
        <p
          id={descId}
          className={cn(
            "mt-1 text-xs",
            errorMessage
              ? "text-red-600"
              : "text-gray-500 dark:text-gray-400"
          )}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
}
