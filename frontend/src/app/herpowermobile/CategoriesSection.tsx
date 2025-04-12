import React from 'react';
import Image from 'next/image';

interface CategoryCardProps {
  imageSrc: string;
  title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="flex flex-col gap-2 w-[136px]">
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

const CategoriesSection: React.FC = () => {
  const categories = [
    { imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/table.png', title: 'Sports' },
    { imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/table-2.png', title: 'Sports' },
    { imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/table-3.png', title: 'Sports' },
    { imageSrc: 'https://dashboard.codeparrot.ai/api/image/Z-5JXQz4-w8v6SGy/table-4.png', title: 'Sports' },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className="text-[14px] font-semibold text-[#141414] tracking-[-0.5px]">
        Categories
      </h2>
      <div className="flex flex-row gap-6 overflow-x-auto pb-2">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            imageSrc={category.imageSrc}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;

