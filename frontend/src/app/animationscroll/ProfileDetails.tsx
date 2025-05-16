"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfileDetailsProps {
  className?: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ className = '' }) => {
  const sections = [
    {
      title: 'Bio',
      content: (
        <>
          <p className="m-0">Ksenija Nikolova</p>
          <p className="m-0">One step at a time...</p>
        </>
      )
    },
    {
      title: 'Work Experience',
      content: (
        <div className="flex gap-6">
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/pngwing.png" 
            alt="work" 
            width={53} 
            height={45} 
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Works as Founder at Better Women Better World</h3>
            <p className="text-sm">August 9, 2023 - present</p>
          </div>
        </div>
      )
    },
    {
      title: 'Education',
      content: (
        <div className="flex gap-6">
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-0N-Az4-w8v6R-l/rectangl-2.png" 
            alt="education" 
            width={45} 
            height={45} 
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-medium">EU Business School Barcelona</h3>
            <p className="text-base font-normal">Bachelor of Arts in Tourism and Leisure Management</p>
            <p className="text-sm">October 1, 2007 - September 1, 2010</p>
          </div>
        </div>
      )
    },
    {
      title: 'Skills',
      content: (
        <div className="flex flex-wrap gap-2">
          {['Leadership', 'Communication', 'Public speaking', 'Networking'].map((skill) => (
            <motion.div
              key={skill}
              className="px-2 py-1.5 rounded-full border border-gray-500 text-sm text-gray-500"
              whileHover={{ scale: 1.05, backgroundColor: '#f0f0ff' }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: 'Interests',
      content: (
        <div className="flex flex-wrap gap-2">
          {['Traveling', 'Music', 'Movies', 'Art', 'Writing', 'Yoga and meditation'].map((interest) => (
            <motion.div
              key={interest}
              className="px-2 py-1.5 rounded-full border border-gray-500 text-sm text-gray-500"
              whileHover={{ scale: 1.05, backgroundColor: '#f0f0ff' }}
            >
              {interest}
            </motion.div>
          ))}
        </div>
      )
    }
  ];

  return (
    <motion.div 
      className={`bg-white p-6 rounded-lg shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {sections.map((section, index) => (
        <motion.div 
          key={index}
          className="flex flex-col gap-4 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <h2 className="text-xl font-medium">{section.title}</h2>
          <div className="text-base text-gray-800">
            {section.content}
          </div>
          {index < sections.length - 1 && (
            <div className="h-px bg-gray-300 my-5" />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProfileDetails;