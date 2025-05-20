"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Post = {
  id: number;
  content: string;
  image?: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
};

type Props = {
  onSubmit: (post: Post) => void;
};

const PostComposer = ({ onSubmit }: Props) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;

    const newPost: Post = {
      id: Number(uuidv4().replace(/-/g, "").slice(0, 8)), // short numeric id
      content,
      author: {
        name: "John Doe",
        avatarUrl: "/images/avatar.jpg",
      },
      createdAt: new Date().toISOString(),
    };

    onSubmit(newPost);
    setContent("");
  };

  return (
    <div className="flex flex-col space-y-2">
      <textarea
        className="border rounded p-2 resize-none"
        rows={3}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="self-end bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Post
      </button>
    </div>
  );
};

export default PostComposer;
