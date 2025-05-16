import React from "react";

const supportBonds = [
  { id: 1, name: "Alfredo Donin", avatar: "src/components/images/user2.png" },
  { id: 2, name: "Anika Ekstrom Bothman", avatar: "src/components/images/user2.png" },
  { id: 3, name: "Ashlynn Dias", avatar: "src/components/images/user2.png" },
  { id: 4, name: "Aspen Mango", avatar: "src/components/images/user2.png" },
  { id: 5, name: "Chance Press", avatar: "src/components/images/user2.png" },
  { id: 6, name: "Cheyenne Vetrov", avatar: "src/components/images/user2.png" },
  { id: 7, name: "Craig Franci", avatar: "src/components/images/user2.png" },
  { id: 8, name: "Davis Dorwart", avatar: "src/components/images/user2.png" },
  { id: 9, name: "Martin Westervelt", avatar: "src/components/images/user2.png" },
  { id: 10, name: "Zaire Herwitz", avatar: "src/components/images/user2.png" },
];

const UserSupportBonds = () => {
  return (
    <div className="space-y-4">
      {/* Support Bonds List */}
      <div className="bg-transparent shadow-none rounded-none p-0 sm:bg-white sm:shadow-sm sm:rounded-xl sm:p-4">
        {supportBonds.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 border-b last:border-none"
          >
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-gray-900">{user.name}</span>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              &#8226;&#8226;&#8226;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSupportBonds;

