"use client"
<<<<<<< HEAD
import React, { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import CompetitionCard from "./CompetitionCard";

// Type definitions
type CompetitionType = "ongoing" | "past" | "upcoming";

interface Competition {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate?: string;
  endDate?: string;
  participants?: number;
}

interface CompetitionState {
  data: Competition[];
  isLoading: boolean;
  error: string | null;
}

// API Service
class CompetitionAPIService {
  private baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async getCompetitions(type: CompetitionType): Promise<Competition[]> {
    try {
      const endpoint = `${this.baseUrl}/competitions/${type}`;
      const response = await axios.get<Competition[]>(endpoint, {
        timeout: 8000,
      });
      return response.data;
    } catch (error) {
      throw this.handleApiError(error as AxiosError);
    }
  }

  private handleApiError(error: AxiosError): string {
    if (error.response) {
      return `Server error: ${error.response.status}`;
    } else if (error.request) {
      return "Network error - please check your connection";
    } else {
      return "Failed to load competitions";
    }
  }
}

const CompetitionList = () => {
  const [apiService] = useState(() => new CompetitionAPIService());
  const [competitions, setCompetitions] = useState<Record<CompetitionType, CompetitionState>>({
    ongoing: { data: [], isLoading: true, error: null },
    past: { data: [], isLoading: true, error: null },
    upcoming: { data: [], isLoading: true, error: null },
  });

  const fetchCompetitions = useCallback(async (type: CompetitionType) => {
    setCompetitions(prev => ({
      ...prev,
      [type]: { ...prev[type], isLoading: true, error: null }
    }));

    try {
      const data = await apiService.getCompetitions(type);
      setCompetitions(prev => ({
        ...prev,
        [type]: { data, isLoading: false, error: null }
      }));
    } catch (error) {
      setCompetitions(prev => ({
        ...prev,
        [type]: { ...prev[type], isLoading: false, error: error as string }
      }));
    }
  }, [apiService]);

  useEffect(() => {
    // Fetch all competition types on mount
    const fetchAll = async () => {
      await Promise.all([
        fetchCompetitions("ongoing"),
        fetchCompetitions("past"),
        fetchCompetitions("upcoming"),
      ]);
    };
    fetchAll();
  }, [fetchCompetitions]);

  const refreshCompetitions = useCallback(() => {
    fetchCompetitions("ongoing");
    fetchCompetitions("past");
    fetchCompetitions("upcoming");
  }, [fetchCompetitions]);

  const renderSection = (type: CompetitionType, title: string) => {
    const { data, isLoading, error } = competitions[type];

    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            className="text-2xl font-bold bg-gradient-to-r from-[#5A67D8] to-[#8B5CF6] bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            {title}
          </motion.h2>
          <motion.button
            onClick={refreshCompetitions}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-[#5A67D8] hover:text-[#4C51BF]"
          >
            Refresh
          </motion.button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`skeleton-${type}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="h-[380px] bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <motion.div
            className="p-4 bg-red-50 text-red-700 rounded-lg"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            {error} - <button 
              onClick={() => fetchCompetitions(type)} 
              className="underline"
            >
              Try again
            </button>
          </motion.div>
        ) : data.length === 0 ? (
          <motion.div
            className="p-4 bg-blue-50 text-blue-700 rounded-lg"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            No competitions found
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {data.map((comp) => (
              <motion.div
                key={`${type}-${comp.id}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5 }}
              >
                <CompetitionCard
                  image={comp.image}
                  title={comp.title}
                  description={comp.description}
                  startDate={comp.startDate}
                  endDate={comp.endDate}
                  participants={comp.participants}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderSection("upcoming", "Upcoming Competitions")}
      {renderSection("ongoing", "Ongoing Competitions")}
      {renderSection("past", "Past Competitions")}
=======
import React from "react";
import CompetitionCard from './CompetitionCard';
import { motion } from "framer-motion";

// Competition Data Manager
class CompetitionManager {
  private competitions = {
    ongoing: [
      { image: "/ongoing1.png", title: "Competition A", description: "Join now!" },
      { image: "/ongoing2.png", title: "Competition B", description: "Exciting challenges await!" }
    ],
    past: [
      { image: "/past1.png", title: "Past Competition 1", description: "Great memories!" },
      { image: "/past2.png", title: "Past Competition 2", description: "Awesome event!" }
    ]
  };

  getCompetitions(type: 'ongoing' | 'past') {
    return this.competitions[type];
  }
}

interface CompetitionListProps {
  className?: string;
}

const CompetitionList: React.FC<CompetitionListProps> = ({ className = "" }) => {
  const manager = new CompetitionManager();

  return (
    <div className={`competition-list px-4 py-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-[#5A67D8] to-[#8B5CF6] bg-clip-text text-transparent">
          Ongoing Competitions
        </h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          {manager.getCompetitions('ongoing').map((comp, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <CompetitionCard {...comp} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-[#5A67D8] to-[#8B5CF6] bg-clip-text text-transparent">
          Past Competitions
        </h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4
              }
            }
          }}
        >
          {manager.getCompetitions('past').map((comp, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <CompetitionCard {...comp} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

export default CompetitionList;