import Signup from "./signup";

const Layout: React.FC = () => {
  return (

    <div className="flex flex-col md:flex-row w-full h-auto">
      <div className="flex-grow md:w-1/2">
   
        < Signup/>
      </div>
     
    </div>
  );
};

export default Layout;