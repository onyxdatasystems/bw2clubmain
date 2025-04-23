"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// OOP Class for Animations
class LoginAnimations {
  static container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  static item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  static buttonHover = {
    scale: 1.02,
    boxShadow: "0 5px 15px rgba(103, 103, 183, 0.4)"
  };

  static buttonTap = {
    scale: 0.98
  };

  static imageFloat = {
    y: [-5, 5],
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };
}

// OOP Class for Layout
class LoginLayout {
  static mainContainer = "flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200";
  static imageSection = "flex-1 relative p-8 flex flex-col justify-center items-center";
  static loginSection = "flex-1 flex flex-col items-center justify-center p-8 bg-white shadow-xl md:shadow-2xl";
  static logoContainer = "w-[111px] h-[111px] relative mb-8";
  static inputField = "w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7171c1] transition-all duration-300";
  static submitButton = "w-full h-[44px] bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-lg hover:opacity-90 disabled:opacity-70 font-medium tracking-wide";
}

const Login: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Check for existing valid session on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          router.push('/feed');
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Session check failed:', error);
        localStorage.removeItem('authToken');
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: 'POST',
        credentials: 'include', // Required for cookies
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Store token and redirect
      localStorage.setItem('authToken', data.token);
      router.push('/feed');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className={LoginLayout.mainContainer}
    >
      {/* Image Section */}
      <motion.div 
        className={LoginLayout.imageSection}
        variants={LoginAnimations.container}
      >
        <motion.div 
          className="relative w-full max-w-[563px] h-[433px]"
          variants={{ float: LoginAnimations.imageFloat }}
          initial="hidden"
          animate="float"
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-o9pwz4-w8v6Rqn/frame-20-6.png"
            alt="Empower Women"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.div 
          className="mt-8 text-center max-w-md"
          variants={LoginAnimations.item}
        >
          <motion.h2 
            className="text-3xl font-bold text-[#7171c1] mb-2"
            whileHover={{ scale: 1.02 }}
          >
            Empower Women,
          </motion.h2>
          <motion.h2 
            className="text-3xl font-bold text-[#7171c1] mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Transform Workplaces
          </motion.h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to BW2CLUB, a global community that empowers women and girls and partners with companies to create inclusive spaces for personal growth, professional success, and meaningful connections.
          </p>
        </motion.div>
      </motion.div>

      {/* Login Section */}
      <motion.div 
        className={LoginLayout.loginSection}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={LoginLayout.logoContainer}
          whileHover={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-o9pwz4-w8v6Rqn/logo-6.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold text-[#6767b7] mb-8 md:mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Log In
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-[424px] space-y-6"
          variants={LoginAnimations.container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={LoginAnimations.item}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={LoginLayout.inputField}
              placeholder="Email address"
              required
              autoComplete="email"
            />
          </motion.div>

          <motion.div 
            className="relative"
            variants={LoginAnimations.item}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={LoginLayout.inputField}
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-o9pwz4-w8v6Rqn/eye-1-6.png"
                alt="Toggle password"
                width={24}
                height={24}
              />
            </motion.button>
          </motion.div>

          {loginError && (
            <motion.div 
              className="text-red-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {loginError}
            </motion.div>
          )}

          <motion.div variants={LoginAnimations.item}>
            <Link
              href="/auth/forgot-password"
              className="text-[#7171c1] hover:underline text-sm md:text-base"
            >
              Forgot password?
            </Link>
          </motion.div>

          <motion.div variants={LoginAnimations.item}>
            <motion.button
              type="submit"
              disabled={isLoading}
              className={LoginLayout.submitButton}
              whileHover={LoginAnimations.buttonHover}
              whileTap={LoginAnimations.buttonTap}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </motion.div>

          <motion.div 
            className="text-center space-y-4 pt-4"
            variants={LoginAnimations.item}
          >
            <p className="text-[#7171c1] text-sm md:text-base">
              Don&#39;t have an account?{' '}
              <Link href="/auth/signup" className="font-semibold hover:underline">
                Sign up
              </Link>
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm text-gray-500">
              <Link href="/privacy" className="hover:underline hover:text-[#7171c1]">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:underline hover:text-[#7171c1]">Terms</Link>
              <span>•</span>
              <Link href="/contact" className="hover:underline hover:text-[#7171c1]">Contact</Link>
            </div>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Login;