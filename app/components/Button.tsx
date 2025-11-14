import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all cursor-pointer disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 active:scale-95 disabled:bg-gray-300 disabled:text-gray-500",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95 disabled:border-gray-200 disabled:text-gray-400",
    danger: "border border-red-600 bg-red-600 text-white hover:bg-red-700 active:scale-95 disabled:bg-gray-300 disabled:text-gray-500",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

