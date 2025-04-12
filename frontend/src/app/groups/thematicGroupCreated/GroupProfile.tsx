import React from 'react';
import Image from 'next/image';

const GroupProfile: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="relative">
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/rectangl.png"
          alt="Group Cover"
          width={600}
          height={200}
          className="rounded-t-lg"
        />
        <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded">
          Successfully created
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">Planet Savers</h2>
        <p className="text-sm text-gray-500">🌍 Public Group</p>
        <div className="flex items-center mt-2">
          <span className="text-sm mr-4">0 posts</span>
          <span className="text-sm">1 member</span>
        </div>
        <p className="mt-2 text-sm">
          A community dedicated to communicating climate & justice. Another world is possible 🌏 Join us.
        </p>
        <button className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default GroupProfile;
