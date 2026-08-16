import React from "react";

interface NotFoundAlertProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const NotFoundAlert: React.FC<NotFoundAlertProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="rounded-2xl border border-neutral-200 px-6 py-16 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>

      {description && (
        <p className="mt-2 text-sm text-neutral-500">{description}</p>
      )}

      {children}
    </div>
  );
};
