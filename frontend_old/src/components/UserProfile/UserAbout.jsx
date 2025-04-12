import React from "react";

const UserProfile = () => {
  return (
    <div className="max-w mx-auto p-4 text-gray-900 bg-transparent sm:bg-white rounded-lg shadow-md">
      {/* Bio */}
      <div className="mb-6">
        <div className="flex justify-between items-center w-full mt-2 sm:mt-0">
          <h2 className="font-semibold text-lg">Bio</h2>
        </div>
        <p className="text-gray-600">Ksenija Nikolova</p>
        <p className="text-gray-500 text-sm">One step at a time...</p>
      </div>

      {/* Work Experience */}
      <div className="mb-6 border-t pt-4">
        <div className="flex justify-between items-center w-full mt-2 sm:mt-0">
          <h2 className="font-semibold text-lg">Work Experience</h2>
        </div>
        <div className="mt-2 flex items-start gap-3">
          <img src="src/components/images/ad.png" alt="Work Experience" className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-medium">Works as Founder at Better Women Better World</p>
            <p className="text-gray-500 text-sm">August 9, 2023 - present</p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-6 border-t pt-4">
        <div className="flex justify-between items-center w-full mt-2 sm:mt-0">
          <h2 className="font-semibold text-lg">Education</h2>
        </div>
        <div className="mt-2 flex items-start gap-3">
          <img src="src/components/images/ad.png" alt="Education" className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-medium">EU Business School Barcelona</p>
            <p className="text-gray-500 text-sm">Bachelor of Arts in Tourism and Leisure Management</p>
            <p className="text-gray-500 text-xs">October 1, 2007 - September 1, 2010</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6 border-t pt-4">
        <div className="flex justify-between items-center w-full mt-2 sm:mt-0">
          <h2 className="font-semibold text-lg">Skills</h2>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Leadership", "Communication", "Public speaking", "Networking"].map((skill) => (
            <span key={skill} className="px-3 py-1 border rounded-full text-sm bg-gray-100">{skill}</span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="mb-6 border-t pt-4">
        <div className="flex justify-between items-center w-full mt-2 sm:mt-0">
          <h2 className="font-semibold text-lg">Interests</h2>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Traveling", "Music", "Movies", "Art", "Writing", "Yoga and meditation"].map((interest) => (
            <span key={interest} className="px-3 py-1 border rounded-full text-sm bg-gray-100">{interest}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

