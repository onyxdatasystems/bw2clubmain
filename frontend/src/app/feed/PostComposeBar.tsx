<<<<<<< HEAD
"use client"
import Image from "next/image"
import React, { useRef, useState, useEffect } from 'react';

interface PostComposeBarProps {
  onSubmit: (content: string, mediaFiles: File[]) => void;
}

const PostComposeBar: React.FC<PostComposeBarProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<{url: string, width: number, height: number}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Clean up object URLs to avoid memory leaks
    return () => {
      mediaPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [mediaPreviews]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setMediaFiles(files);
      
      const previews = await Promise.all(files.map(async (file) => {
        const url = URL.createObjectURL(file);
        const dimensions = await getImageDimensions(url);
        return { url, width: dimensions.width, height: dimensions.height };
      }));
      
      setMediaPreviews(previews);
    }
  };

  const getImageDimensions = (url: string): Promise<{width: number, height: number}> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.src = url;
    });
  };

  const removeMedia = (index: number) => {
    URL.revokeObjectURL(mediaPreviews[index].url);
    const newFiles = [...mediaFiles];
    const newPreviews = [...mediaPreviews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setMediaFiles(newFiles);
    setMediaPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && mediaFiles.length === 0) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(content, mediaFiles);
      setContent('');
      setMediaFiles([]);
      mediaPreviews.forEach(preview => URL.revokeObjectURL(preview.url));
      setMediaPreviews([]);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
=======

import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface PostComposeBarProps {
  onCreatePost: (content: string, mediaFiles: File[]) => void;
}

const PostComposeBar: React.FC<PostComposeBarProps> = ({ onCreatePost }) => {
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles(prev => [...prev, ...files]);
    
    // Generate preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setMediaPreviews(prev => [...prev, ...previews]);
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setMediaPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (content.trim() || mediaFiles.length > 0) {
      await onCreatePost(content, mediaFiles);
      setContent('');
      setMediaFiles([]);
      setMediaPreviews([]);
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    }
  };

  return (
<<<<<<< HEAD
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          rows={3}
        />

        <div className="grid grid-cols-3 gap-2 my-3">
          {mediaPreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <Image
                src={preview.url}
                alt={`Preview ${index}`}
                width={preview.width}
                height={preview.height}
                className="w-full h-24 object-cover rounded-lg"
                unoptimized={true} // Required for blob URLs
              />
              <button
                type="button"
                onClick={() => removeMedia(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-70"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,video/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-blue-500"
            >
              📎 Attach Media
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isSubmitting || (!content.trim() && mediaFiles.length === 0)}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
=======
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's going on?"
        className="w-full p-2 border rounded mb-4 h-24"
      />

      <div className="grid grid-cols-3 gap-2 mb-4">
        {mediaPreviews.map((preview, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={preview}
              alt="Media preview"
              fill
              className="object-cover rounded"
            />
            <button
              onClick={() => removeMedia(index)}
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,video/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-100 rounded"
          >
            📎
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={!content.trim() && mediaFiles.length === 0}
        >
          Post
        </button>
      </div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

export default PostComposeBar;