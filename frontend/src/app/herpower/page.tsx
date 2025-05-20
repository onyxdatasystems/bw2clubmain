<<<<<<< HEAD
'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/page';
import Sidebar from '../SideBar/page';
import StatusBar from './StatusBar';
import Header from './Header';
import RecommendedSection from './RecommendedSection';
import TrendingSection from './TrendingSection';
import CategoriesSection from './CategoriesSection';
import CategoryExpansion from './CategoryExpansion';
import LoadingSpinner from './LoadingSpinner';
import ApiService from './lib/apiService';

interface Group {
  id: string;
  image: string;
  badge?: string;
  title: string;
  members: number;
  description: string;
  category?: string;
}

interface Category {
  id: string;
  imageSrc: string;
  title: string;
}

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recommendedGroups, setRecommendedGroups] = useState<Group[]>([]);
  const [trendingGroups, setTrendingGroups] = useState<Group[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryGroups, setCategoryGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const api = new ApiService();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [rec, trend, cats] = await Promise.all([
          api.fetchRecommendedGroups(),
          api.fetchTrendingGroups(),
          api.fetchCategories(),
        ]);
        setRecommendedGroups(rec);
        setTrendingGroups(trend);
        setCategories(cats);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCategorySelect = async (categoryId: string, title: string) => {
    try {
      setLoading(true);
      const groups = await api.fetchGroupsByCategory(categoryId);
      setCategoryGroups(groups);
      setSelectedCategory(title);
    } catch (err) {
      console.error('Category fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setSelectedCategory(null);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden md:ml-64 flex flex-col items-center py-6 px-4">
          <div className="w-full max-w-4xl">
            {!selectedCategory ? (
              <>
                <div className="bg-white rounded-lg shadow-md mb-5">
                  <StatusBar />
                  <Header />
                  <div className="flex flex-col gap-5 p-4">
                    <RecommendedSection groups={recommendedGroups} />
                    <TrendingSection groups={trendingGroups} />
                    <CategoriesSection
                      categories={categories}
                      onSelect={handleCategorySelect}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md">
                <CategoryExpansion
                  groups={categoryGroups}
                  categoryTitle={selectedCategory}
                  onBack={handleBack}
                />
              </div>
            )}
          </div>
=======
import { ReactNode } from 'react';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
import ContentArea from './ContentArea';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#f0f4f8]">
      <Navbar />
      <div className="flex flex-grow pt-[94px]">
        <SideBar />
        <main className="flex-1">
          <ContentArea />
          {children}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        </main>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default HomePage;
=======
export default Layout;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
