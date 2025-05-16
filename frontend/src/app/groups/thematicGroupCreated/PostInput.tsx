import React from 'react';
import Image from 'next/image';

const PostInput: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center">
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/avatar-i.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <input
          type="text"
          placeholder="What's going on..."
          className="flex-grow ml-4 p-2 border border-gray-300 rounded"
        />
        <button className="ml-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostInput;
