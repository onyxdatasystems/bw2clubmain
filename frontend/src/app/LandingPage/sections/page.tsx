// app/page.tsx (or pages/index.tsx for older Next.js versions)
import React from 'react';
import HeroSection from './HeroSection';


const Home: React.FC = () => {
  return (
    <main>
   
      <HeroSection />
      {/* Other sections of your home page can go here */}
    </main>
  );
};

export default Home;