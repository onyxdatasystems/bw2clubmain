// redux/jobslicer.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:8000/api"; // Update if different

export const fetchJobs = createAsyncThunk("jobs/fetch", async () => {
  const res = await axios.get(`${API_BASE}/jobs`);
  return res.data;
});

export const createJob = createAsyncThunk("jobs/create", async (job: any) => {
  const res = await axios.post(`${API_BASE}/create_jobs`, job);
  return res.data;
});

export const updateJob = createAsyncThunk("jobs/update", async ({ id, data }: any) => {
  const res = await axios.post(`${API_BASE}/update_jobs/${id}`, data);
  return res.data;
});

export const deleteJob = createAsyncThunk("jobs/delete", async (id: string) => {
  const res = await axios.post(`${API_BASE}/job_delete/${id}`);
  return { id };
});

export const applyToJob = createAsyncThunk("jobs/apply", async (id: string) => {
  const res = await axios.post(`${API_BASE}/JobApply/${id}`);
  return id;
});

export const toggleWishlist = createAsyncThunk("jobs/wishlist", async (id: string) => {
  const res = await axios.post(`${API_BASE}/job_add_wishlist/${id}`);
  return id;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [] as any[],
    loading: false,
    error: null as string | null,
    applications: [] as string[],
    wishlist: [] as string[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs.";
      });

    builder
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(job => job.id === action.payload.id);
        if (index !== -1) state.jobs[index] = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(job => job.id !== action.payload.id);
      });

    builder
      .addCase(applyToJob.fulfilled, (state, action) => {
        if (!state.applications.includes(action.payload)) {
          state.applications.push(action.payload);
        }
      });

    builder
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.wishlist.indexOf(id);
        if (index !== -1) {
          state.wishlist.splice(index, 1);
        } else {
          state.wishlist.push(id);
        }
      });
  },
});

export default jobsSlice.reducer;
