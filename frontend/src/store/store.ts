// store.ts
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import videosReducer from './videoSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    videos: videosReducer,

  },
});

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;