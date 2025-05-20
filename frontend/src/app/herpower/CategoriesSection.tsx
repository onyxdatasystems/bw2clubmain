import React from 'react';
import Image from 'next/image';

interface CategoryCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageSrc, title, onClick }) => {
  return (
    <div 
      className="flex flex-col gap-2 w-[136px] cursor-pointer"
      onClick={onClick}
    >
      <div className="w-[136px] h-[136px] overflow-hidden rounded-lg">
        <Image 
          src={imageSrc} 
          alt={title}
          width={136}
          height={136}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      <p className="text-[14px] text-[#212121] tracking-[-0.6px] leading-[130%] font-normal text-center">
        {title}
      </p>
    </div>
  );
};

interface CategoriesSectionProps {
  categories: {
    id: string;
    imageSrc: string;
    title: string;
  }[];
  onSelect: (categoryId: string, categoryTitle: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories, onSelect }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className="text-[14px] font-semibold text-[#141414] tracking-[-0.5px]">
        Categories
      </h2>
      <div className="flex flex-row gap-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            imageSrc={category.imageSrc}
            title={category.title}
            onClick={() => onSelect(category.id, category.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;