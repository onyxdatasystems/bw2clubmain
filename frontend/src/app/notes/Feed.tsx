"use client";

import React, { useState, useEffect } from "react";
import { PostItem } from "./PostItem";
import PostCompose from "./PostCompose";
import { Post } from '../../store/type';



export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/timeline?page=${page}`
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: Post[] = await res.json();

        if (data.length === 0) {
          setHasMore(false); // No more posts to fetch
        } else {
          setPosts((prev) => [...prev, ...data]);
        }
      } catch (error) {
        console.error("Error fetching timeline:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeline();
  }, [page]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-8">
      <PostCompose />
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}

      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-gray-500 mt-4">No more posts to load.</p>
      )}
    </div>
  );
};
