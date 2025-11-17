"use client";

import { ReactNode, useCallback } from "react";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  className?: string;
  maxWidthClass?: string;
}

export default function Dialog({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  showCloseButton = true,
  className = "",
  maxWidthClass = "max-w-lg",
}: DialogProps) {
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose?.();
      }
    },
    [onClose]
  );

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
      onMouseDown={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative w-full rounded-2xl bg-white p-6 shadow-2xl ${maxWidthClass} ${className}`}
      >
        {showCloseButton && (
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {(icon || title || description) && (
          <div className="mb-5 flex items-start gap-3">
            {icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>
        )}

        {children && <div className="space-y-4">{children}</div>}

        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}
