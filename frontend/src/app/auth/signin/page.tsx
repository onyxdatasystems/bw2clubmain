import React from 'react';
import LoginSection_ImageSection from './LoginSection_ImageSection';


const Layout: React.FC = () => {
  return (

    <div className="flex flex-col md:flex-row w-full h-auto">
      <div className="flex-grow md:w-1/2">
   
        <LoginSection_ImageSection />
      </div>
     
    </div>
  );
};

export default Layout;

