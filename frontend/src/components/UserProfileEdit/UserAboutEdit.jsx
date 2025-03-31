import React, { useState } from "react";

import WorkExperienceForm from "./WorkExperienceForm";
import EducationForm from "./EducationForm";

const UserAboutEdit = () => {
  const [activeModal, setActiveModal] = useState("");

  const openModal = (section) => {
    setActiveModal(section);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  return (
    <div className="max-w mx-auto p-4 text-gray-900 bg-transparent sm:bg-white rounded-lg shadow-md">
      {/* Bio Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-semibold text-lg">Bio</h2>
          <img
            src="src/components/images/about-edit.png"
            alt="Edit"
            className="w-5 h-5 cursor-pointer"
            onClick={() => openModal("Bio")}
          />
        </div>
        <p className="text-gray-600">Ksenija Nikolova</p>
        <p className="text-gray-500 text-sm">One step at a time...</p>
      </div>

      {/* Work Experience Section */}
      <div className="mb-6 border-t pt-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-semibold text-lg">Work Experience</h2>
          <img
            src="src/components/images/about-edit.png"
            alt="Edit"
            className="w-5 h-5 cursor-pointer"
            onClick={() => openModal("Work Experience")}
          />
        </div>
        <div className="mt-2 flex items-start gap-3">
          <img
            src="src/components/images/ad.png"
            alt="Work Experience"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium">
              Works as Founder at Better Women Better World
            </p>
            <p className="text-gray-500 text-sm">August 9, 2023 - present</p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-6 border-t pt-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-semibold text-lg">Education</h2>
          <img
            src="src/components/images/about-edit.png"
            alt="Edit"
            className="w-5 h-5 cursor-pointer"
            onClick={() => openModal("Education")}
          />
        </div>
        <div className="mt-2 flex items-start gap-3">
          <img
            src="src/components/images/ad.png"
            alt="Education"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium">EU Business School Barcelona</p>
            <p className="text-gray-500 text-sm">
              Bachelor of Arts in Tourism and Leisure Management
            </p>
            <p className="text-gray-500 text-xs">
              October 1, 2007 - September 1, 2010
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-6 border-t pt-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-semibold text-lg">Skills</h2>
          <img
            src="src/components/images/about-edit.png"
            alt="Edit"
            className="w-5 h-5 cursor-pointer"
            onClick={() => openModal("Skills")}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Leadership", "Communication", "Public speaking", "Networking"].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 border rounded-full text-sm bg-gray-100"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Interests Section */}
      <div className="mb-6 border-t pt-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-semibold text-lg">Interests</h2>
          <img
            src="src/components/images/about-edit.png"
            alt="Edit"
            className="w-5 h-5 cursor-pointer"
            onClick={() => openModal("Interests")}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            "Traveling",
            "Music",
            "Movies",
            "Art",
            "Writing",
            "Yoga and meditation",
          ].map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 border rounded-full text-sm bg-gray-100"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Render Modals Based on activeModal */}
      {activeModal === "Bio" && <BioForm onClose={closeModal} />}
      {activeModal === "Work Experience" && (
        <WorkExperienceForm
          onClose={closeModal}
          onSave={(data) => {
            console.log("Work Experience Data:", data);
            closeModal();
          }}
        />
      )}
      {activeModal === "Education" && (
        <EducationForm
          onClose={closeModal}
          onSave={(data) => {
            console.log("Education Data:", data);
            closeModal();
          }}
        />
      )}
      {activeModal === "Skills" && (
        <SkillsForm
          onClose={closeModal}
          onSave={(data) => {
            console.log("Skills Data:", data);
            closeModal();
          }}
        />
      )}
      {activeModal === "Interests" && (
        <InterestsForm
          onClose={closeModal}
          onSave={(data) => {
            console.log("Interests Data:", data);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default UserAboutEdit;
