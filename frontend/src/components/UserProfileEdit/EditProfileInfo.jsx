import React from "react";

const EditProfileInfo = ({ onClose, onSave }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#FFF2F9] p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <div className="flex gap-2">
              <input type="text" placeholder="First name" className="w-1/2 p-2 border rounded" />
              <input type="text" placeholder="Last name" className="w-1/2 p-2 border rounded" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Tell us who you are</label>
            <input type="text" placeholder="Enter description" className="w-full p-2 border rounded" />
          </div>

          {/* Birth date */}
          <div>
            <label className="block text-sm font-medium">Birth date</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium">Language</label>
            <input type="text" placeholder="Language" className="w-full p-2 border rounded" />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium">Location</label>
            <div className="flex gap-2">
              <input type="text" placeholder="City" className="w-1/2 p-2 border rounded" />
              <input type="text" placeholder="Country" className="w-1/2 p-2 border rounded" />
            </div>
          </div>

          {/* Relationship Status */}
          <div>
            <label className="block text-sm font-medium">Relationship status</label>
            <input type="text" placeholder="In a Relationship" className="w-full p-2 border rounded" />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="border border-purple-500 text-purple-500 px-4 py-2 rounded">
              Close
            </button>
            <button type="submit" className="bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white px-4 py-2 rounded">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileInfo;
