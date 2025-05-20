import React from "react";

type Props = {
  icon: React.ElementType; // component, e.g. Plus from lucide-react
  onClick: () => void;
};

const FloatingActionButton = ({ icon: Icon, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
      aria-label="Add new"
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

export default FloatingActionButton;
