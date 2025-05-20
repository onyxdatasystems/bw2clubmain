import { usePostStore } from './store/postStore';
import { useUserStore } from './store/userStore';
import { useState } from 'react';
import { Post } from './types/page';

export default function CreatePostForm() {
  const { addPost } = usePostStore();
  const { currentUser } = useUserStore();
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content) return;
    const newPost: Post = {
      id: Date.now(),
      user: currentUser!,
      content,
      media: [],
      likes: 0,
      likedByUser: false,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    addPost(newPost);
    setContent('');
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <textarea
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="What's on your mind?"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Post
      </button>
    </div>
  );
}
