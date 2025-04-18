
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
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  remote: boolean;
}

const initialForm: JobFormData = {
  title: "",
  company: "",
  location: "",
  type: "",
  level: "",
  remote: false,
};

const JobList_SideNav_Ads_JobDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error, wishlist, applications } = useSelector((state: RootState) => state.jobs);
  const [form, setForm] = useState<JobFormData>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const isAdmin = true; // In real app, get this from auth state

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await dispatch(updateJob({ id: editingId, data: { ...form, id: editingId } })).unwrap();
      } else {
        await dispatch(createJob({ ...form, id: crypto.randomUUID() })).unwrap();
      }
      setForm(initialForm);
      setEditingId(null);
    } catch (err) {
      console.error("Failed to save job:", err);
    }
  };

  const handleEdit = (job: JobFormData & { id: string }) => {
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
      try {
        await dispatch(deleteJob(id)).unwrap();
      } catch (err) {
        console.error("Failed to delete job:", err);
      }
    }
  };

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
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Filter jobs by title, company, location..."
          className="p-2 border rounded w-full max-w-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Job Form */}
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
        {filteredJobs.length === 0 ? (
          <div className="p-4 bg-yellow-50 text-yellow-700 rounded">
            No jobs found matching your criteria
          </div>
        ) : (
          filteredJobs.map((job) => (
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
                  {applications.includes(job.id) ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => dispatch(applyToJob(job.id))}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      Apply
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(toggleWishlist(job.id))}
                    className={`px-3 py-1 rounded text-sm ${wishlist.includes(job.id) ? "bg-yellow-600 text-white" : "bg-yellow-100 text-yellow-800"} hover:bg-yellow-200`}
                  >
                    {wishlist.includes(job.id) ? "In Wishlist" : "Wishlist"}
                  </button>
                </div>
              </div>

              {isAdmin && (
                <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
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