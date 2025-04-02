import React from "react";
import { FaRegImage, FaRegPlayCircle, FaPaperclip } from "react-icons/fa";

const PostComposer = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4">
      <div className="flex items-start gap-4">
        {/* Avatar with pink ring */}
        <div className="relative w-10 h-10">
          <img
            src="src/components/images/user.png"
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-pink-500 pointer-events-none" />
        </div>

        {/* Placeholder & Icons in a vertical stack */}
        <div className="flex-1">
          {/* Placeholder on top */}
          <div className="flex items-center ">
                  <input
                    type="text"
                    placeholder="What going on.."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>


          {/* Icons + Post Button below */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-full bg-[#F9F9F9] flex items-center justify-center text-gray-500 hover:text-gray-700">
                <FaRegImage size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#F9F9F9] flex items-center justify-center text-gray-500 hover:text-gray-700">
                <FaRegPlayCircle size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#F9F9F9] flex items-center justify-center text-gray-500 hover:text-gray-700">
                <FaPaperclip size={16} />
              </button>
            </div>

            <button className="bg-[#6767B7] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#b3a4d6]">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
