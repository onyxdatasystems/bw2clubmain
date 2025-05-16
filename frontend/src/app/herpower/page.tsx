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
        </main>
      </div>
    </div>
  );
};

export default Layout;