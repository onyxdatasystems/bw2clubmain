import React from 'react';

interface TextInputSectionProps {
  initialValues: {
    title: string;
    about: string;
    interests: string;
    language: string;
  };
  onTextChange: (field: keyof TextInputSectionProps['initialValues'], value: string) => void;
}

const TextInputSection: React.FC<TextInputSectionProps> = ({
  initialValues,
  onTextChange
}) => {
  const handleChange = (field: keyof typeof initialValues) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onTextChange(field, e.target.value);
    };

  return (
    <div className="flex flex-col w-full max-w-md space-y-4 p-6 bg-white">
      {/* Title Input */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] font-semibold">Title*</label>
          <span className="text-xs text-[#636878]">
            {initialValues.title.length}/30
          </span>
        </div>
        <input
          value={initialValues.title}
          onChange={handleChange('title')}
          maxLength={30}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* Other input fields similarly updated */}
      {/* ... */}
    </div>
  );
};

export default TextInputSection;