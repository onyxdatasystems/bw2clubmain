import React from 'react';
import StatusBar from './StatusBar';
import Header from './Header';
import RecommendedSection from './RecommendedSection';
import TrendingSection from './TrendingSection';
import CategoriesSection from './CategoriesSection';
import CategoryExpansion from './CategoryExpansion';
import Image from 'next/image';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md">
        <StatusBar />
        <Header />
        <div className="flex flex-col gap-5 p-4">
          <RecommendedSection />
          <TrendingSection />
          <CategoriesSection />
        </div>
      </div>
      <div className="w-full max-w-md bg-white mt-5 shadow-md">
        <CategoryExpansion />
      </div>
    </div>
  );
};

export default HomePage;

