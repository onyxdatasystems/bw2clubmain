// videoSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { videoApi } from '../app/services/api';
import type { AxiosError } from 'axios';

// Define and export Video type
export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: number;
  views: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface ErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}

interface VideosState {
  videos: Video[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VideosState = {
  videos: [],
  status: 'idle',
  error: null,
};

export const fetchVideos = createAsyncThunk<Video[], void, { rejectValue: ErrorResponse }>(
  'videos/fetchVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await videoApi.getAll();
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createVideo = createAsyncThunk<Video, FormData, { rejectValue: ErrorResponse }>(
  'videos/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await videoApi.create(formData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const viewVideo = createAsyncThunk<void, string, { rejectValue: ErrorResponse }>(
  'videos/view',
  async (videoId, { rejectWithValue }) => {
    try {
      await videoApi.view(videoId);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    clearVideoError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Videos
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<Video[]>) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch videos';
      })
      
      // Create Video
      .addCase(createVideo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createVideo.fulfilled, (state, action: PayloadAction<Video>) => {
        state.status = 'succeeded';
        state.videos.unshift(action.payload);
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to upload video';
      })
      
      // View Video
      .addCase(viewVideo.rejected, (state, action) => {
        // Handle view count error if needed
        console.error('Failed to increment view count:', action.payload?.message);
      });
  },
});

export const { clearVideoError } = videosSlice.actions;
export default videosSlice.reducer;