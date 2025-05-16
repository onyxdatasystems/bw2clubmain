import React from "react";
import PostComposer from "../HomeFeed/PostComposer"; // Adjust import path as needed

const UserGallery = () => {
  return (
    <div className="space-y-4">
      {/* PostComposer visible only on sm and up */}
      <div className="hidden sm:block">
        <PostComposer />
      </div>

      {/* Empty Gallery Message */}
      <div className="flex flex-col items-center justify-center text-gray-600 
                      bg-transparent shadow-none rounded-none p-0 
                      sm:bg-white sm:shadow-sm sm:rounded-xl sm:p-6">
        <img
          src="src/components/images/no-photo.png"
          alt="Empty Gallery"
          className="w-16 h-16 mb-4"
        />
        <p className="text-sm">No photos yet</p>
      </div>
    </div>
  );
};

export default UserGallery;