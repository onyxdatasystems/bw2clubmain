"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

<<<<<<< HEAD
// Define API endpoints using the provided backend URL
const getApiUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const resetEndpoint = 'auth/reset-password'; // Adjust this endpoint as needed
  return {
    RESET_PASSWORD: `${baseUrl}${resetEndpoint}`,
  };
};

const API = getApiUrl();

=======
const API = {
  RESET_PASSWORD: 'https://bw2club.onyxdatasystems.com/backend/api/v1/reset_password',
};
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
class ResetPasswordLayout {
  static mainContainer = "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200";
  static formContainer = "w-full max-w-md bg-white p-8 rounded-xl shadow-lg";
  static inputField = "w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7171c1] transition-all duration-300";
  static submitButton = "w-full h-[44px] bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-lg hover:opacity-90 disabled:opacity-70 font-medium tracking-wide";
}

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
<<<<<<< HEAD
=======
      // Client-side validation
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

<<<<<<< HEAD
      const response = await fetch(API.RESET_PASSWORD, {
=======
      const response = await fetch('YOUR_RESET_PASSWORD_API_URL', {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          newPassword: password,
          confirmPassword 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      setSuccess(true);
      setTimeout(() => router.push('/auth/signin'), 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={ResetPasswordLayout.mainContainer}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={ResetPasswordLayout.formContainer}
      >
        <h1 className="text-3xl font-bold text-[#6767b7] mb-8 text-center">
          Set New Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={ResetPasswordLayout.inputField}
              placeholder="Enter new password"
              required
<<<<<<< HEAD
              minLength={8}
=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={ResetPasswordLayout.inputField}
              placeholder="Confirm new password"
              required
<<<<<<< HEAD
              minLength={8}
=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-sm text-center"
            >
              Password reset successful! Redirecting to login...
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className={ResetPasswordLayout.submitButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Resetting...
              </span>
            ) : (
              'Reset Password'
            )}
          </motion.button>

          <div className="text-center text-sm text-[#7171c1]">
            <Link href="/auth/signin" className="hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;