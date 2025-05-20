import React from 'react';

interface ActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
<<<<<<< HEAD
  disabled?: boolean;
=======
  disabled?: boolean; 
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onCancel = () => {},
<<<<<<< HEAD
  onSave = () => {},
  disabled = false
=======
  onSave = () => {}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
}) => {
  return (
    <div className="flex flex-row justify-end gap-2 min-w-[248px] h-10 p-4">
      <button
        onClick={onCancel}
        className="flex items-center justify-center px-3 py-1 h-8 min-w-[120px] rounded-full border border-[#bfbfbf] text-[#212121] hover:bg-gray-50 active:bg-gray-100 transition-colors"
      >
        <span className="text-sm font-medium tracking-[-0.5px]">Cancel</span>
      </button>
      <button
        onClick={onSave}
<<<<<<< HEAD
        disabled={disabled}
        className={`flex items-center justify-center px-3 py-1 h-8 min-w-[120px] rounded-full bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white hover:from-[#9595E5] hover:to-[#7777C7] active:from-[#7575C5] active:to-[#5757A7] transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
=======
        className="flex items-center justify-center px-3 py-1 h-8 min-w-[120px] rounded-full bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white hover:from-[#9595E5] hover:to-[#7777C7] active:from-[#7575C5] active:to-[#5757A7] transition-colors"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      >
        <span className="text-sm font-medium tracking-[-0.5px]">Save changes</span>
      </button>
    </div>
  );
};

<<<<<<< HEAD
export default ActionButtons;
=======
export default ActionButtons;

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
