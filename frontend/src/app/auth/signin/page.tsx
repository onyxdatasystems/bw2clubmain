import React from 'react';
import Login from './login';


const Layout: React.FC = () => {
  return (

    <div className="flex flex-col md:flex-row w-full h-auto">
      <div className="flex-grow md:w-1/2">
   
        <Login />
      </div>
     
    </div>
  );
};

export default Layout;

