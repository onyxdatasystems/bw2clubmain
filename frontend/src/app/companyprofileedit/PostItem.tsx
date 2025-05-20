import React from "react";
import { Post } from "./types";
import Image from "next/image";

type PostItemProps = {
  post: Post;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-2">
        <Image
          src={post.author.avatarUrl}
          alt={post.author.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3">
          <p className="text-sm font-medium">{post.author.name}</p>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-800 mb-2">{post.content}</p>
      {post.image && (
        <div className="mt-2 rounded overflow-hidden">
          <Image
            src={post.image}
            alt="Post image"
            width={500}
            height={300}
            className="rounded"
          />
        </div>
      )}
    </div>
  );
};

export default PostItem;
