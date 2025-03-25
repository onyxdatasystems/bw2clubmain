import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      
      <div className="w-1/2 flex flex-col justify-center p-12 bg-gradient-to-b from-purple-100 to-pink-100">
        <div className="relative w-full max-w-md">
          <img
            src="src/components/images/login2.jpg" 
            alt="Group 1"
            className="rounded-xl w-full shadow-lg"
          />
          <img
            src="src/components/images/login1.jpg"
            alt="Group 2"
            className="absolute top-[-40px] right-[-30px] w-3/4 rounded-xl shadow-lg border-4 border-white"
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

      
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-5">
            <img src="src/components/images/login-logo.png" alt="Logo" className="w-20" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Log In</h2>

          
          <InputField label="Email Address" type="email" placeholder="Enter your email" />

          
          <div className="relative mb-4">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-4 top-10 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          
          <div className="text-right mb-4">
            <a href="#" className="text-indigo-500 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          
          <button className="w-full bg-[#C2B5E0] text-white py-3 rounded-lg font-semibold">
            Login
          </button>

          
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="#" className="text-indigo-500 hover:underline font-semibold">
              Sign up
            </a>
          </p>

          
          <div className="mt-6 text-center text-sm text-gray-500">
            <a href="#" className="mr-3 hover:underline">Privacy Policy</a> |
            <a href="#" className="mx-3 hover:underline">Terms and Conditions</a> |
            <a href="#" className="ml-3 hover:underline">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
