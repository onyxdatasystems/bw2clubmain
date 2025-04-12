'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const LoginSection = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const { success, message, token } = await authService.login(email, password);
      
      if (success && token) {
        localStorage.setItem('authToken', token);
        router.push('/feed');
      } else {
        throw new Error(message || 'Login failed');
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
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

  const imageFloat = {
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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200"
    >
      {/* Image Section */}
      <motion.div 
        className="flex-1 relative p-8 flex flex-col justify-center items-center"
        variants={containerVariants}
      >
        <motion.div 
          className="relative w-full max-w-[563px] h-[433px]"
          animate={imageFloat}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-o9pwz4-w8v6Rqn/frame-20-6.png"
            alt="Empower Women"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.div className="mt-8 text-center max-w-md" variants={itemVariants}>
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
            Welcome to BW2CLUB, a global community that empowers women and girls and partners 
            with companies to create inclusive spaces for personal growth, professional success, 
            and meaningful connections.
          </p>
        </motion.div>
      </motion.div>

      {/* Login Form Section */}
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center p-8 bg-white shadow-xl md:shadow-2xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-[111px] h-[111px] relative mb-8"
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
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7171c1] transition-all duration-300"
              placeholder="Email address"
              required
            />
          </motion.div>

          <motion.div className="relative" variants={itemVariants}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7171c1] transition-all duration-300"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-o9pwz4-w8v6Rqn/eye-1-6.png"
                alt="Toggle password"
                width={24}
                height={24}
              />
            </button>
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

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-lg hover:opacity-90 disabled:opacity-70 font-medium tracking-wide"
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(103, 103, 183, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner />
                  <span className="ml-2">Signing in...</span>
                </span>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </motion.div>

          <motion.div className="text-center space-y-4 pt-4" variants={itemVariants}>
            <Link
              href="/auth/forgot-password"
              className="text-[#7171c1] hover:underline text-sm md:text-base"
            >
              Forgot password?
            </Link>
            <p className="text-[#7171c1] text-sm md:text-base">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-semibold hover:underline">
                Sign up
              </Link>
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm text-gray-500">
              <Link href="/privacy" className="hover:underline hover:text-[#7171c1]">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:underline hover:text-[#7171c1]">
                Terms
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:underline hover:text-[#7171c1]">
                Contact
              </Link>
            </div>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default LoginSection;
