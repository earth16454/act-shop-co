import React from "react";
import { Button } from "./Button";

interface ErrorAlertProps {
  title: string;
  description?: string;
  onRetry?: () => void;
  isLoading?: boolean;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title,
  description = "Unknown error",
  onRetry,
  isLoading,
}) => {
  return (
    <div
      className="rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600">
        {description}
      </p>
      {onRetry && (
        <Button
          type="button"
          onClick={onRetry}
          disabled={isLoading}
          className="mt-5 px-6 py-2.5 "
        >
          {isLoading ? "Trying again…" : "Try again"}
        </Button>
      )}
    </div>
  );
};
