
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaGem, FaRegCommentDots, FaShare, FaLink } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

const PostCard = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4">
      {/* --- Bordered Content Box: Avatar, User Info, Post Text & Image --- */}
      <div className="border border-gray-200 rounded-md p-4">
        {/* Top Row: Avatar, Name/Time, 3-dot Menu */}
        <div className="flex items-start justify-between">
          {/* Avatar + Info */}
          <div className="flex items-start gap-3">
            <img
              src="src/components/images/avatar.jpg"
              alt="Jackie Jonnes"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="leading-tight">
              <h4 className="text-[14px] font-semibold text-[#4E4E4E]">
                Jackie Jonnes
              </h4>
              <span className="text-[12px] text-gray-500">30 mins</span>
            </div>
          </div>
          {/* 3-dot Menu */}
          <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <HiOutlineDotsHorizontal size={18} />
          </button>
        </div>

        {/* Post Text */}
        <p className="text-[14px] text-[#4E4E4E] mt-3 leading-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in mi
          quis augue rhoncus euismod id ac neque. Fusce vulputate odio varius,
          lacinia nisi in, ultricies mauris. Fusce dignissim nec massa non
          luctusdfdfdfdfd.
        </p>

        {/* Post Image */}
        <div className="mt-3">
          <img
            src="src/components/images/avatar.jpg"
            alt="Office Lady"
            className="w-full h-auto rounded-md object-cover"
          />
        </div>
      </div>

      {/* --- First Action Row: Counts (split left and right) --- */}
      <div className="flex items-center justify-between text-[14px] text-gray-500 mt-4">
        {/* Left: 3 Cheers & 4 Feedback */}
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1 hover:text-gray-700">
            <FaGem size={16} className="text-[#5D4AA7]" />
            <span>3 Cheers</span>
          </button>
          <button className="flex items-center gap-1 hover:text-gray-700">
            <FaRegCommentDots size={16} className="text-[#5D4AA7]" />
            <span>4 Feedback</span>
          </button>
        </div>
        {/* Right: 2 Spread */}
        <button className="flex items-center gap-1 hover:text-gray-700">
          <FaShare size={16} className="text-[#5D4AA7]" />
          <span>2 Spread</span>
        </button>
      </div>

      {/* --- Separator Line --- */}
      <hr className="my-3 border-gray-200" />

      {/* --- Second Action Row: Labels (centered) --- */}
      <div className="flex items-center justify-center gap-6 text-[14px] text-gray-500">
        <button className="flex items-center gap-1 hover:text-gray-700">
          <FaGem size={16} className="text-[#5D4AA7]" />
          <span>Cheers</span>
        </button>
        <button className="flex items-center gap-1 hover:text-gray-700">
          <FaRegCommentDots size={16} className="text-[#5D4AA7]" />
          <span>Feedback</span>
        </button>
        <button className="flex items-center gap-1 hover:text-gray-700">
          <FaShare size={16} className="text-[#5D4AA7]" />
          <span>Spread</span>
        </button>
        <button className="flex items-center gap-1 hover:text-gray-700">
          <FaLink size={16} className="text-[#5D4AA7]" />
          <span>Copy link</span>
        </button>
      </div>

      {/* --- Feedback Input & Send Button (separated) --- */}
      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          placeholder="Enter Feedback"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-[14px] text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        <button className="flex items-center justify-center text-white bg-[#5D4AA7] rounded-md px-3 py-2 hover:bg-[#4e3e8f]">
          <AiOutlineSend size={16} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
