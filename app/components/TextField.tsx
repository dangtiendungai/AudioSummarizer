"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function TextField({
  label,
  error,
  helperText,
  className = "",
  type = "text",
  ...props
}: TextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            error ? "border-red-300 focus:ring-red-500" : "border-gray-300"
          } ${isPasswordField ? "pr-12" : ""} ${className}`}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
            tabIndex={-1}
          >
            {isPasswordVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
