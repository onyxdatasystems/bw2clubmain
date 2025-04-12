import React from "react";

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        
        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <div className="flex gap-2">
              <input type="text" placeholder="First name" className="border p-2 rounded w-1/2" />
              <input type="text" placeholder="Last name" className="border p-2 rounded w-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Tell us who you are in one sentence</label>
            <input type="text" placeholder="Enter description" className="border p-2 rounded w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium">Birth date</label>
            <input type="date" className="border p-2 rounded w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium">Language</label>
            <input type="text" placeholder="Language" className="border p-2 rounded w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter city" className="border p-2 rounded w-1/2" />
              <input type="text" placeholder="Enter Country" className="border p-2 rounded w-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Relationship status</label>
            <input type="text" placeholder="In a Relationship" className="border p-2 rounded w-full" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Close</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
