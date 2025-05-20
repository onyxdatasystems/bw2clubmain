<<<<<<< HEAD
'use client';
import React from 'react';
import { motion } from 'framer-motion';
=======
import React from 'react';
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

interface TextInputSectionProps {
  initialValues: {
    title: string;
    about: string;
    interests: string;
    language: string;
  };
<<<<<<< HEAD
  onTextChange: (field: string, value: string) => void;
=======
  onTextChange: (field: keyof TextInputSectionProps['initialValues'], value: string) => void;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
}

const TextInputSection: React.FC<TextInputSectionProps> = ({
  initialValues,
  onTextChange
}) => {
<<<<<<< HEAD
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];

  const handleChange = (field: string) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
=======
  const handleChange = (field: keyof typeof initialValues) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      onTextChange(field, e.target.value);
    };

  return (
<<<<<<< HEAD
    <div className="flex flex-col w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col"
      >
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold">Title*</label>
          <span className="text-xs text-gray-500">
=======
    <div className="flex flex-col w-full max-w-md space-y-4 p-6 bg-white">
      {/* Title Input */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] font-semibold">Title*</label>
          <span className="text-xs text-[#636878]">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            {initialValues.title.length}/30
          </span>
        </div>
        <input
          value={initialValues.title}
          onChange={handleChange('title')}
          maxLength={30}
<<<<<<< HEAD
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Group title"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col"
      >
        <label className="text-sm font-semibold mb-2">About</label>
        <textarea
          value={initialValues.about}
          onChange={handleChange('about')}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="What this group is about"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col"
      >
        <label className="text-sm font-semibold mb-2">Interests</label>
        <input
          value={initialValues.interests}
          onChange={handleChange('interests')}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Add interests separated by commas"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col"
      >
        <label className="text-sm font-semibold mb-2">Language</label>
        <select
          value={initialValues.language}
          onChange={handleChange('language')}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </motion.div>
=======
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* Other input fields similarly updated */}
      {/* ... */}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

export default TextInputSection;