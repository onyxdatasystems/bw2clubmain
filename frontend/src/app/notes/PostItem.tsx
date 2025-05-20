"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import  CommentsSection  from "./CommentsSection";
import { Post } from '../../store/type';





interface PostItemProps {
  post: Post;
}
export const PostItem: React.FC<PostItemProps> = ({ post }) => { 
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = async () => {
    console.log("Deleting post:", post.id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete_post/${post.id}`,
        {
          method: "POST",
        }
      );
      if (!res.ok) {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <motion.div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-2">
      {/* Basic post content */}
      <div>
        <p className="font-bold text-gray-800">{post.author}</p>
        <p className="text-sm text-gray-500">{post.created_at}</p>
        <p className="mt-2 text-gray-700">{post.content}</p>
      </div>

      {/* Options */}
      <button onClick={() => setShowOptions(!showOptions)} className="text-blue-500 text-sm">
        Toggle Options
      </button>
      {showOptions && (
        <div className="mt-2">
          <button onClick={handleDelete} className="text-red-600 text-sm">Delete Post</button>
        </div>
      )}

      {/* Comments section */}
      <CommentsSection postId={post.id} comments={post.comments || []} />

     
    </motion.div>
  );
};
