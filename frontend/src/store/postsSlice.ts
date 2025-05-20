// postsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postApi } from '../app/services/api';

// Define and export your Post type
export interface Post {
  id: string;
  content: string;
  media: string[];
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  reactions: {
    cheers: number;
    feedback: number;
    spread: number;
  };
}

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts', 
  async () => {
    const response = await postApi.getTimeline();
    return response.data;
  }
);

export const createPost = createAsyncThunk<Post, FormData>(
  'posts/createPost',
  async (postData) => {
    const response = await postApi.create(postData);
    return response.data;
  }
);

export const editPost = createAsyncThunk<Post, { id: string; data: { content: string } }>(
  'posts/editPost',
  async ({ id, data }) => {
    const response = await postApi.edit(id, data);
    return response.data;
  }
);

export const deletePost = createAsyncThunk<string, string>(
  'posts/deletePost',
  async (id) => {
    await postApi.delete(id);
    return id;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;