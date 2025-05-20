<<<<<<< HEAD
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface JobFormData {
  id?: string;
=======

"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  toggleWishlist,
} from "../../redux/jobslicer";
import { RootState, AppDispatch } from "@/redux/store";

interface JobFormData {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  remote: boolean;
}

<<<<<<< HEAD
interface Job extends JobFormData {
  id: string;
}

=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
const initialForm: JobFormData = {
  title: "",
  company: "",
  location: "",
  type: "",
  level: "",
  remote: false,
};

const JobList_SideNav_Ads_JobDetails: React.FC = () => {
<<<<<<< HEAD
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [applications, setApplications] = useState<string[]>([]);
=======
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error, wishlist, applications } = useSelector((state: RootState) => state.jobs);
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  const [form, setForm] = useState<JobFormData>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const isAdmin = true; // In real app, get this from auth state

<<<<<<< HEAD
  // Fetch jobs on component mount
   useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE}/jobs`);
        // Ensure each job has a unique id
        const jobsWithIds = response.data.map((job: any) => ({
          ...job,
          id: job.id || Math.random().toString(36).substring(2, 9) // fallback unique id
        }));
        setJobs(jobsWithIds);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [API_BASE]);
=======
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
<<<<<<< HEAD
    if (!form.title || !form.company || !form.location || !form.type || !form.level) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        const response = await axios.put(`${API_BASE}/update_jobs/${editingId}`, form);
        setJobs(jobs.map(job => job.id === editingId ? response.data : job));
      } else {
        const response = await axios.post(`${API_BASE}/create_jobs`, form);
        setJobs([...jobs, response.data]);
=======
    try {
      if (editingId) {
        await dispatch(updateJob({ id: editingId, data: { ...form, id: editingId } })).unwrap();
      } else {
        await dispatch(createJob({ ...form, id: crypto.randomUUID() })).unwrap();
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      }
      setForm(initialForm);
      setEditingId(null);
    } catch (err) {
<<<<<<< HEAD
      setError(err instanceof Error ? err.message : "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job: Job) => {
=======
      console.error("Failed to save job:", err);
    }
  };

  const handleEdit = (job: JobFormData & { id: string }) => {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      level: job.level,
      remote: job.remote,
    });
    setEditingId(job.id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
<<<<<<< HEAD
      setLoading(true);
      setError(null);
      try {
        await axios.delete(`${API_BASE}/job_delete/${id}`);
        setJobs(jobs.filter(job => job.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete job");
      } finally {
        setLoading(false);
=======
      try {
        await dispatch(deleteJob(id)).unwrap();
      } catch (err) {
        console.error("Failed to delete job:", err);
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      }
    }
  };

<<<<<<< HEAD
  const handleApply = async (id: string) => {
    if (!applications.includes(id)) {
      setLoading(true);
      try {
        await axios.post(`${API_BASE}/JobApply/${id}`);
        setApplications([...applications, id]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to apply");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleWishlist = async (id: string) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/job_add_wishlist/${id}`);
      setWishlist(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id]
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update wishlist");
    } finally {
      setLoading(false);
    }
  };

=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  const filteredJobs = filter
    ? jobs.filter(job =>
        Object.entries(job).some(([key, value]) =>
          key !== "id" && 
          typeof value === "string" && 
          value.toLowerCase().includes(filter.toLowerCase())
        )
      )
    : jobs;

  return (
<<<<<<< HEAD
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Job Listings</h1>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <input
          type="text"
          placeholder="Filter jobs by title, company, location..."
          className="p-2 border rounded w-full md:max-w-md"
=======
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Filter jobs by title, company, location..."
          className="p-2 border rounded w-full max-w-md"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Job Form */}
<<<<<<< HEAD
      {isAdmin && (
        <div className="border p-4 md:p-6 rounded-lg bg-white shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Job" : "Create New Job"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Job Title*"
                className="p-2 border rounded w-full"
                required
              />
            </div>
            <div className="space-y-1">
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company*"
                className="p-2 border rounded w-full"
                required
              />
            </div>
            <div className="space-y-1">
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location*"
                className="p-2 border rounded w-full"
                required
              />
            </div>
            <div className="space-y-1">
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              >
                <option value="">Select Job Type*</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="space-y-1">
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              >
                <option value="">Select Experience Level*</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 md:col-span-2">
              <input
                type="checkbox"
                name="remote"
                checked={form.remote}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <span>Remote Position</span>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                editingId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
              } disabled:opacity-50`}
            >
              {loading ? "Processing..." : editingId ? "Update Job" : "Create Job"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setForm(initialForm);
                  setEditingId(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* Status Messages */}
      {loading && (
        <div className="p-4 bg-blue-50 text-blue-700 rounded mb-6">
          Loading jobs...
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded mb-6">
          {error}
        </div>
      )}

      {/* Job Cards */}
          <div className="grid gap-4 md:gap-6">
=======
      <div className="border p-6 rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Job" : "Create New Job"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="p-2 border rounded"
            required
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="p-2 border rounded"
            required
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="p-2 border rounded"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Experience Level</option>
            <option value="Entry">Entry Level</option>
            <option value="Mid">Mid Level</option>
            <option value="Senior">Senior Level</option>
            <option value="Executive">Executive</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="remote"
              checked={form.remote}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span>Remote Position</span>
          </label>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${editingId ? "bg-blue-600" : "bg-green-600"} hover:${editingId ? "bg-blue-700" : "bg-green-700"} disabled:opacity-50`}
          >
            {loading ? "Processing..." : editingId ? "Update Job" : "Create Job"}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setForm(initialForm);
                setEditingId(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Status Messages */}
      {loading && <div className="p-4 bg-blue-50 text-blue-700 rounded">Loading jobs...</div>}
      {error && <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>}

      {/* Job Cards */}
      <div className="grid gap-4">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        {filteredJobs.length === 0 ? (
          <div className="p-4 bg-yellow-50 text-yellow-700 rounded">
            No jobs found matching your criteria
          </div>
        ) : (
          filteredJobs.map((job) => (
<<<<<<< HEAD
            <div 
              key={job.id} // Ensure this is unique
              className="p-4 md:p-6 bg-white border rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-indigo-700">{job.title}</h3>
                  <p className="text-lg text-gray-800">
                    {job.company} - {job.location}
                    {job.remote && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Remote
                      </span>
                    )}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {job.type}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      {job.level}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
=======
            <div key={job.id} className="p-6 bg-white border rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700">{job.title}</h3>
                  <p className="text-lg">
                    {job.company} - {job.location}
                    {job.remote && <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Remote</span>}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{job.type}</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">{job.level}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                  {applications.includes(job.id) ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
                      Applied
                    </span>
                  ) : (
                    <button
<<<<<<< HEAD
                      onClick={() => handleApply(job.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm whitespace-nowrap"
                      disabled={loading}
=======
                      onClick={() => dispatch(applyToJob(job.id))}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                    >
                      Apply
                    </button>
                  )}
                  <button
<<<<<<< HEAD
                    onClick={() => handleWishlist(job.id)}
                    className={`px-3 py-1 rounded text-sm whitespace-nowrap ${
                      wishlist.includes(job.id) 
                        ? "bg-yellow-600 text-white" 
                        : "bg-yellow-100 text-yellow-800"
                    } hover:bg-yellow-200`}
                    disabled={loading}
=======
                    onClick={() => dispatch(toggleWishlist(job.id))}
                    className={`px-3 py-1 rounded text-sm ${wishlist.includes(job.id) ? "bg-yellow-600 text-white" : "bg-yellow-100 text-yellow-800"} hover:bg-yellow-200`}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                  >
                    {wishlist.includes(job.id) ? "In Wishlist" : "Wishlist"}
                  </button>
                </div>
              </div>

              {isAdmin && (
<<<<<<< HEAD
                <div className="mt-4 pt-4 border-t flex flex-wrap justify-end gap-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm whitespace-nowrap"
                    disabled={loading}
=======
                <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
<<<<<<< HEAD
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm whitespace-nowrap"
                    disabled={loading}
=======
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList_SideNav_Ads_JobDetails;