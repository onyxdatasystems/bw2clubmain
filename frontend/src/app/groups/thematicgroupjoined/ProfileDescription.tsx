import React from 'react';

interface ProfileDescriptionProps {
  description?: string;
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({
  description = "A community dedicated to communicating climate & justice. Another world is possible 🌏 Join us."
}) => {
  return (
    <div className="flex flex-row w-full min-w-[516px] p-4">
      <p className="text-[#292b32] text-sm leading-[140%] tracking-[-0.41px] font-normal">
        {description}
      </p>
    </div>
  );
};

export default ProfileDescription;

