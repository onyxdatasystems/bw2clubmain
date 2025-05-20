<<<<<<< HEAD
"use client";
=======
"use client "
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import React, { useState } from 'react';
import Image from 'next/image';

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

<<<<<<< HEAD
interface UserProfileEditEduProps {
  onEditComplete?: () => void;
  onSave?: (education: Education) => void;
}

const UserProfileEditEdu: React.FC<UserProfileEditEduProps> = ({ 
  onEditComplete, 
  onSave 
}) => {
=======
const UserProfileEditEdu: React.FC = () => {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
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

<<<<<<< HEAD
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(education);
    }
    if (onEditComplete) {
      onEditComplete();
    }
  };

=======
  const handleSave = () => {
    // Handle save logic
    console.log('Education saved:', education);
  };

  function onEditComplete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    console.log('Edit completed:', education);
    // Additional logic for completing the edit can be added here
  }
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
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
<<<<<<< HEAD
          onClick={onEditComplete}
=======
          onClick={() => console.log('Close')}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
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
<<<<<<< HEAD
      </div>
=======
        
    
      <button onClick={onEditComplete}
             className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-b from-purple-500 to-purple-600 rounded-full hover:from-purple-600 hover:to-purple-700"
              >
              Complete Edit</button>
    </div>
    
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

<<<<<<< HEAD
export default UserProfileEditEdu;
=======
export default UserProfileEditEdu;

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
