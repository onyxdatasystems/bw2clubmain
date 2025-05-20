<<<<<<< HEAD
// components/Layout.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";


import Navbar from "../Navbar/page";
import Sidebar from "../SideBar/page";         // <-- your new independent Sidebar
import EventCard from "./EventCard";
import Advertisement from "./Advertisement";
import InviteModal from "./InviteModal";
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

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
<<<<<<< HEAD
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const fetchEvents = async (pageNumber: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/load_event_by_scrolling`,
        {
          params: { page: pageNumber },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newEvents: Event[] = response.data;
      setEvents((prev) => [...prev, ...newEvents]);
      setHasMore(newEvents.length > 0);
    } catch {
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300 &&
      hasMore &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleEventAction = async (actionType: string, eventId: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${actionType}`,
        { event_id: eventId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newStatus = actionType.split("/").pop() as Event["status"];
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === eventId ? { ...ev, status: newStatus } : ev
        )
      );
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  const openInviteModal = (eventId: string) => {
    setSelectedEventId(eventId);
    setShowInviteModal(true);
  };
  const closeInviteModal = () => {
    setSelectedEventId(null);
    setShowInviteModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Navbar />

      <div className="flex flex-1">
        {/* Fixed Sidebar (w-64 on md+) */}
        <Sidebar joinedGroups={[]} />

        {/* Content + Advertisement */}
        <div className="flex flex-1">
          {/* Main events list; offset by sidebar width */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 md:ml-64">
            <h1 className="text-2xl font-semibold mb-4 text-gray-700">
              Upcoming Events
            </h1>
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-wrap gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onAction={(type) => handleEventAction(type, event.id)}
                  onInvite={() => openInviteModal(event.id)}
                />
              ))}
            </div>

            {loading && (
              <p className="mt-6 text-gray-500">Loading more events...</p>
            )}
          </main>

          {/* Right‑hand Advertisement (only on lg+) */}
          <aside className="hidden lg:block lg:w-1/4 p-4">
            <Advertisement />
          </aside>
        </div>
      </div>

      {showInviteModal && selectedEventId && (
        <InviteModal
          eventId={selectedEventId}
          onClose={closeInviteModal}
          activeTab="defaultTab"
          onTabChange={(tab) => console.log("Tab:", tab)}
        />
      )}
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

<<<<<<< HEAD
export default Layout;
=======
export default Layout;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
