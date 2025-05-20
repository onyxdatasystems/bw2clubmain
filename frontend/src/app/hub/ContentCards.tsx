// src/components/ContentCards.tsx
'use client';
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { UserService, CompanyService } from './services/ApiService';
import { User, Company } from './types/api';
=======
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Animations } from '../../config/Config';
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

interface CardData {
  id: number;
  image: string;
<<<<<<< HEAD
  name: string;
  description: string;
  type: 'user' | 'company';
=======
  companyName: string;
  description: string;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
}

interface ContentCardsProps {
  className?: string;
<<<<<<< HEAD
  activeTab: 'people' | 'companies';
}

const ContentCards: React.FC<ContentCardsProps> = ({ className = '', activeTab }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (activeTab === 'people') {
          const userService = new UserService();
          const response = await userService.getUsers();
          const userCards = response.data.map((user: User) => ({
            id: user.id,
            image: user.avatar || '/default-user.png',
            name: user.name,
            description: user.bio || 'No bio available',
            type: 'user' as const
          }));
          setCards(userCards);
        } else {
          const companyService = new CompanyService();
          const response = await companyService.getCompanies();
          const companyCards = response.data.map((company: Company) => ({
            id: company.id,
            image: company.logo || '/default-company.png',
            name: company.name,
            description: company.description || 'No description available',
            type: 'company' as const
          }));
          setCards(companyCards);
        }
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

=======
}

const defaultCards: CardData[] = [
  // Your card data here
];

const ContentCards: React.FC<ContentCardsProps> = ({ className = '' }) => {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
    }
  };

<<<<<<< HEAD
  if (loading) return <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 ${className}`}>Loading...</div>;
  if (error) return <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 ${className}`}>{error}</div>;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ${className}`}>
      {cards.map((card, i) => (
        <motion.div
          key={`${card.type}-${card.id}`}
=======
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 ${className}`}>
      {defaultCards.map((card, i) => (
        <motion.div
          key={card.id}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover="hover"
          className="relative flex flex-col items-center bg-white rounded-lg border border-[#b9b9b9] min-w-[177px] h-[201px] shadow-md hover:shadow-lg transition-all"
        >
          <div className="absolute top-0 -mt-10">
            <Image
              src={card.image}
<<<<<<< HEAD
              alt={card.name}
              width={81}
              height={81}
              className="rounded-full"
              priority={i < 3}
=======
              alt={card.companyName}
              width={81}
              height={81}
              className="rounded-full"
              priority={i < 3} // Only prioritize first few images
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            />
          </div>
          <div className="mt-16 flex flex-col items-center">
            <h3 className="text-[14px] text-[#3a3a3a] font-inter text-center leading-[140%] tracking-[-0.41px]">
<<<<<<< HEAD
              {card.name}
            </h3>
            <p className="mt-2 text-[11px] text-[#636878] font-inter text-center leading-[140%] tracking-[-0.41px] px-4 line-clamp-2">
=======
              {card.companyName}
            </h3>
            <p className="mt-2 text-[11px] text-[#636878] font-inter text-center leading-[140%] tracking-[-0.41px] px-4">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
              {card.description}
            </p>
            <motion.button 
              className="mt-4 px-6 py-2 bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white rounded-full text-[14px] font-inter"
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
            >
              View
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContentCards;