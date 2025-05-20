import React from "react";

type Props = {
  title: string;
  subtitle?: string;
};

const EmptyState = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle && <p className="mt-2 text-sm">{subtitle}</p>}
    </div>
  );
};

export default EmptyState;
