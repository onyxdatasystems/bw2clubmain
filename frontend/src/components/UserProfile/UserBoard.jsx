import React from "react";
import PostComposer from "../HomeFeed/PostComposer"; // Adjust import path as needed

const UserBoard = () => {
  return (
    <div className="space-y-4">
      {/* PostComposer only visible on sm and up */}
      <div className="hidden sm:block">
        <PostComposer />
      </div>

      {/* Empty Board Message */}
      <div className="flex flex-col items-center justify-center text-gray-600 
                      bg-transparent shadow-none rounded-none p-0 
                      sm:bg-white sm:shadow-sm sm:rounded-xl sm:p-6">
        <img
          src="src/components/images/vector.png"
          alt="Empty Board"
          className="w-16 h-16 mb-4"
        />
        <p className="text-sm text-[#A5A9B5]">Your board is empty</p>
      </div>
    </div>
  );
};

export default UserBoard;
