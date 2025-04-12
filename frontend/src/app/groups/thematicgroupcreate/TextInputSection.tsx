import React, { useState } from 'react';

interface TextInputSectionProps {
  titleValue?: string;
  aboutValue?: string;
  interestsValue?: string;
  languageValue?: string;
}

const TextInputSection: React.FC<TextInputSectionProps> = ({
  titleValue = '30 mins meals',
  aboutValue = 'Sollicitudin tristique augue sem blandit libero, volutpat feugiat enim aliquet. Varius porttitor vitae pretium leo adipiscing pellentesque est sit. Cras ac urna, ultrices neque',
  interestsValue = 'Food',
  languageValue = 'English'
}) => {
  const [title, setTitle] = useState(titleValue);
  const [about, setAbout] = useState(aboutValue);
  const [interests, setInterests] = useState(interestsValue);
  const [language, setLanguage] = useState(languageValue);

  return (
    <div className="flex flex-col w-full max-w-md space-y-4 p-6 bg-white">
      {/* Title Section */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] font-semibold text-[#292b32] leading-[140%]">
            Title*
          </label>
          <span className="text-xs text-[#636878]">
            {title.length}/30
          </span>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 30))}
          placeholder="30 mins meals"
          className="w-full p-3 border border-[#ebecef] rounded-md text-[14px] text-[#292b32] leading-[140%] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* About Section */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] font-semibold text-[#292b32] leading-[140%]">
            About
          </label>
          <span className="text-xs text-[#636878]">
            {about.length}/180
          </span>
        </div>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value.slice(0, 180))}
          placeholder="Sollicitudin tristique augue sem blandit libero, volutpat feugiat enim aliquet. Varius porttitor vitae pretium leo adipiscing"
          className="w-full h-28 p-3 border border-[#ebecef] rounded-md text-[14px] text-[#292b32] leading-[140%] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Interests Section */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] font-semibold text-[#292b32] leading-[140%]">
            Interests*
          </label>
        </div>
        <input
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Food"
          className="w-full p-3 border border-[#ebecef] rounded-md text-[14px] text-[#292b32] leading-[140%] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Language Section */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] font-semibold text-[#292b32] leading-[140%]">
            Language*
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="English"
            className="w-full p-3 border border-[#ebecef] rounded-md text-[14px] text-[#292b32] leading-[140%] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#636878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInputSection;

