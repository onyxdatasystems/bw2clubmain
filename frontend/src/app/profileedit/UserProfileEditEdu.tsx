"use client "
import React, { useState } from 'react';
import Image from 'next/image';

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

const UserProfileEditEdu: React.FC = () => {
  const [education, setEducation] = useState<Education>({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic
    console.log('Education saved:', education);
  };

  function onEditComplete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    console.log('Edit completed:', education);
    // Additional logic for completing the edit can be added here
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-lg min-h-[306px] flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-gray-800">Education</h2>
        
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              name="school"
              value={education.school}
              onChange={handleChange}
              placeholder="School"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="degree"
              value={education.degree}
              onChange={handleChange}
              placeholder="Degree"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="fieldOfStudy"
              value={education.fieldOfStudy}
              onChange={handleChange}
              placeholder="Field of Study"
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex gap-7">
            <input
              type="date"
              name="startDate"
              value={education.startDate}
              onChange={handleChange}
              placeholder="Start date"
              className="flex-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:border-purple-400"
            />
            <input
              type="date"
              name="endDate"
              value={education.endDate}
              onChange={handleChange}
              placeholder="End date"
              className="flex-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => console.log('Close')}
          className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-full hover:bg-purple-50"
        >
          Close
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-b from-purple-500 to-purple-600 rounded-full hover:from-purple-600 hover:to-purple-700"
        >
          Save changes
        </button>
        
    
      <button onClick={onEditComplete}
             className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-b from-purple-500 to-purple-600 rounded-full hover:from-purple-600 hover:to-purple-700"
              >
              Complete Edit</button>
    </div>
    
    </div>
  );
};

export default UserProfileEditEdu;

