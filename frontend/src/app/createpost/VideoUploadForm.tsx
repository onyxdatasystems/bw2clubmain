// components/VideoUploadForm.tsx
'use client';
import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../../store/hook';
import { createVideo } from '@/store/videoSlice';
import type { AppDispatch } from '@/store/store';

const VideoUploadForm = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
      
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid video file (MP4, WEBM or MOV)');
        return;
      }
      
      if (file.size > 100 * 1024 * 1024) {
        setError('Video file must be less than 100MB');
        return;
      }
      
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image (JPEG, PNG or WEBP)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Thumbnail must be less than 5MB');
        return;
      }
      
      setThumbnailFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!videoFile || !title) {
      setError('Title and video file are required');
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('video', videoFile);
      if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

      await dispatch(createVideo(formData)).unwrap();
      
      // Reset form on success
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
      if (videoInputRef.current) videoInputRef.current.value = '';
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
      
    } catch (err: unknown) {
      setError(
        (err as { message?: string }).message || 
        'Failed to upload video. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isUploading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            disabled={isUploading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video File <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center w-full">
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
              isUploading ? 'bg-gray-100 border-gray-300' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
            }`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload video</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  MP4, WEBM or MOV (MAX. 100MB)
                </p>
              </div>
              <input 
                ref={videoInputRef}
                type="file" 
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleVideoChange}
                className="hidden"
                required
                disabled={isUploading}
              />
            </label>
          </div>
          {videoFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail (Optional)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
              isUploading ? 'bg-gray-100 border-gray-300' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
            }`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload thumbnail</span>
                </p>
                <p className="text-xs text-gray-500">
                  JPG or PNG (MAX. 5MB)
                </p>
              </div>
              <input 
                ref={thumbnailInputRef}
                type="file" 
                accept="image/jpeg,image/png,image/webp"
                onChange={handleThumbnailChange}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>
          {thumbnailFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {thumbnailFile.name} ({(thumbnailFile.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isUploading || !videoFile}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
            isUploading || !videoFile 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            'Upload Video'
          )}
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;