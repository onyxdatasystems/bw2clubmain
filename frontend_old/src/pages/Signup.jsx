import React from "react";

const Signup = () => {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      
      <div className="w-1/2 flex flex-col justify-center p-12 bg-gradient-to-b from-purple-100 to-pink-100">
        <div className="relative w-full max-w-md mx-auto">
          <img
            src="src/components/images/login2.jpg" 
            alt="Women Group"
            className="rounded-lg shadow-lg w-full"
          />
          <img
            src="src/components/images/login1.jpg"
            alt="Women Empowerment"
            className="absolute top-[-40px] right-[-30px] w-3/4 rounded-lg shadow-lg border-white border-4"
          />
        </div>
        <h1 className="text-4xl font-bold text-[#7171C1] mt-8">
          Empower Women,
        </h1>
        <h1 className="text-4xl font-bold text-[#7171C1] ">
          Transform Workplaces
        </h1>
        <p className="text-[#636878] mt-4 max-w-md">
          Welcome to BW2CLUB, a global community that empowers women and girls and partners with
          companies to create inclusive spaces for personal growth, professional success, and
          meaningful connections.
        </p>
      </div>
      
      
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12">
        <img src="src/components/images/login-logo.png" alt="Logo" className="w-24 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign up</h2>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address*"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Password*"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-6 relative">
            <input
              type="password"
              placeholder="Confirm Password*"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <button className="w-full bg-purple-400 text-white py-3 rounded-lg font-semibold cursor-pointer">
            Sign up
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account? <a href="#" className="text-purple-600">Log in</a>
          </p>
          <div className="mt-4 text-xs text-gray-500 flex justify-between">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms and Conditions</a>
            <a href="#" className="hover:underline">Contact us</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;