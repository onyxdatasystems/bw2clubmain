"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ContentConfig, Animations } from './common/Config';

const ContentArea = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-w-[300px] md:min-w-[764px] p-4 bg-inherit mt-[94px] ml-0 md:ml-[278px]"
    >
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full h-[58px] bg-gradient-to-r from-[#7171C1] to-[#3E3574] rounded-t-lg flex items-center px-5"
        >
          <h1 className="text-white text-base font-medium tracking-tight">Recommended for you</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-white p-5 rounded-b-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ContentConfig.recommendedCards.map((card, i) => (
              <motion.div
                key={card.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
                className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-500"
                    priority={card.priority}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-[#292b32] mb-1">{card.title}</h2>
                  <p className="text-sm text-[#7171C1] mb-2">{card.category}</p>
                  <p className="text-xs text-gray-500 mb-3">{card.members}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{card.description}</p>
                  <motion.button
                    whileHover={{ backgroundColor: '#3E3574' }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full py-2 bg-[#7171C1] text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Join Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContentArea;