"use client";
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PaymentHistory {
  id: number;
  amount: number;
  payment_date: string;
  transaction_id: string;
}

interface AdData {
  id: number;
  title: string;
  image_url: string;
  status: string;
  payment_status: string;
  created_at: string;
  payment_history?: PaymentHistory[];
}

const Ads: React.FC = () => {
  const [ads, setAds] = useState<AdData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    async function loadAds() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/ads`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          if (res.status === 401)
            throw new Error("Session expired. Please login again.");
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        setAds(json.data || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load ads");
      } finally {
        setLoading(false);
      }
    }
    loadAds();
  }, []);

  const handlePayment = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/ad/payment_configuration/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Payment failed");
      }
      const data = await res.json();
      if (data.redirectUrl) window.location.href = data.redirectUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment failed");
    }
  };

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (error)
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded-lg">
        {error} —{" "}
        <a href="/auth/login" className="text-blue-600 underline">
          Login again
        </a>
      </div>
    );

  return (
    <div className={`${isMobile ? 'w-full' : 'w-full lg:w-1/4'} px-4 py-6`}>
      <motion.h2
        className="text-xl font-bold mb-4"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
      >
        Your Ads
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {loading
          ? Array(3)
              .fill(null)
              .map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-lg shadow p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Skeleton height={150} className="mb-4" />
                  <Skeleton count={2} />
                </motion.div>
              ))
          : ads.map((ad) => (
              <motion.div
                key={ad.id}
                className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative h-40">
                  <Image
                    src={ad.image_url || "/default-ad-image.jpg"}
                    alt={ad.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={loading}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-800">{ad.title}</h3>
                  <div className="flex justify-between mb-2">
                    <span
                      className={`px-2 py-1 text-xs sm:text-sm rounded ${
                        ad.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ad.status}
                    </span>
                    <span
                      className={`text-xs sm:text-sm ${
                        ad.payment_status === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {ad.payment_status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-4">
                    Created: {fmt(ad.created_at)}
                  </div>
                  <button
                    onClick={() => handlePayment(ad.id)}
                    disabled={ad.payment_status === "paid"}
                    className={`w-full py-2 rounded text-sm sm:text-base ${
                      ad.payment_status === "paid"
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {ad.payment_status === "paid"
                      ? "Completed"
                      : "Complete Payment"}
                  </button>
                </div>
              </motion.div>
            ))}
      </div>

      {!loading && ads.length === 0 && (
        <motion.p 
          className="text-center py-8 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No ads found. Create one!
        </motion.p>
      )}
    </div>
=======
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AdsProps {
  className?: string;
}

const Ads: React.FC<AdsProps> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`hidden lg:flex flex-col min-w-[225px] h-[300px] bg-white rounded-lg shadow-sm ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-2 border-t border-slate-300" />
      
      <motion.div 
        className="px-5 py-4 text-sm text-black font-inter"
        whileHover={{ scale: 1.02 }}
      >
        Advertising
      </motion.div>
      
      <div className="mx-2 border-t border-slate-300" />
      
      <motion.div 
        className="mx-2 mt-2 flex-grow"
        whileHover={{ scale: 1.01 }}
      >
        <div className="relative w-full h-[241px] rounded-[14px] overflow-hidden">
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/rectangl-13.png"
            alt="Advertisement"
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </motion.div>
    </motion.div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  );
};

export default Ads;