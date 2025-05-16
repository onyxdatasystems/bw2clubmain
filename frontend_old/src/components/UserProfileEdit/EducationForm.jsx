import React, { useState } from "react";

const EducationForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    study: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // Modal backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      {/* Modal content */}
      <div className="bg-[#FFF2F9] rounded-lg max-w-lg w-full mx-4">
        <div className="p-6">
          <h2 className="text-gray-800 font-semibold mb-4 text-lg">Experience</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* School */}
            <div>
              <input
                type="text"
                name="school"
                placeholder="School"
                value={formData.school}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Degree */}
            <div>
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Field Of Study */}
            <div>
              <input
                type="text"
                name="study"
                placeholder="Field Of Study"
                value={formData.study}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Dates */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  type="text"
                  name="startDate"
                  placeholder="Start date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="endDate"
                  placeholder="End date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="border border-purple-500 text-purple-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default EducationForm;