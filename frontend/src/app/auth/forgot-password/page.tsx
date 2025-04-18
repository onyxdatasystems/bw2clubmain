"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API = {
  FORGOT_PASSWORD: 'https://bw2club.onyxdatasystems.com/backend/api/v1/forgot_password',
};
class ForgotPasswordAnimations {
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
}

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      setSuccess(true);
      setTimeout(() => router.push('/auth/signin'), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <motion.div 
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
        variants={ForgotPasswordAnimations.container}
      >
        <motion.h1 
          className="text-3xl font-bold text-[#6767b7] mb-8 text-center"
          variants={ForgotPasswordAnimations.item}
        >
          Reset Your Password
        </motion.h1>

        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={ForgotPasswordAnimations.container}
        >
          <motion.div variants={ForgotPasswordAnimations.item}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#7171c1] focus:border-[#7171c1] transition-all"
              placeholder="Enter your registered email"
            />
          </motion.div>

          {error && (
            <motion.div 
              className="text-red-500 text-sm text-center"
              variants={ForgotPasswordAnimations.item}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div 
              className="text-green-500 text-sm text-center"
              variants={ForgotPasswordAnimations.item}
            >
              Password reset email sent! Redirecting to login...
            </motion.div>
          )}

          <motion.div variants={ForgotPasswordAnimations.item}>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </motion.button>
          </motion.div>

          <motion.div 
            className="text-center text-sm text-[#7171c1]"
            variants={ForgotPasswordAnimations.item}
          >
            <Link 
              href="/auth/signin" 
              className="hover:underline"
            >
              Back to Login
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;