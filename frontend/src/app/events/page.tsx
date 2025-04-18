// Layout.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "../Navbar/page";
import SideBar from "../SideBar/page";
import EventCard from "./EventCard";
import Advertisement from "./Advertisement";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  imageUrl: string;
  avatarUrl: string;
  status?: "going" | "notgoing" | "interested" | "notinterested";
}

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle event actions
  const handleEventAction = async (action: string, eventId: string) => {
    try {
      await axios.post(`/api/${action}/${eventId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Update local state
      setEvents(prev => prev.map(event => 
        event.id === eventId ? { ...event, status: action.split('_')[1] as Event["status"] } : event
      ));
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  // Categorize events
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) > now);
  const pastEvents = events.filter(event => new Date(event.date) <= now);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f6f6f6]">
      <div className="w-full bg-white shadow-md sticky top-0 z-50">
        <Navbar />
      </div>

      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "✖" : "☰"}
      </button>

      <div className="flex flex-grow">
        <div className="w-64 min-w-[250px] h-screen bg-white shadow-md hidden md:block">
          <SideBar />
        </div>

        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
              />
              <motion.div
                className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                exit={{ x: -250 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <SideBar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-grow w-3/5 p-5">
          {loading ? (
            <div className="text-center py-8">Loading events...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <>
              <section>
                <h2 className="text-lg font-semibold text-[#292b32] mb-6">
                  Upcoming Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map(event => (
                    <EventCard
                      key={event.id}
                      {...event}
                      onAction={handleEventAction}
                    />
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-lg font-semibold text-[#292b32] mb-6">
                  Past Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastEvents.map(event => (
                    <EventCard
                      key={event.id}
                      {...event}
                      onAction={handleEventAction}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </main>

        <aside className="w-1/4 hidden lg:block p-4">
          <Advertisement />
        </aside>
      </div>
    </div>
  );
};

export default Layout;