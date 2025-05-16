
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
    }
  };

  return (
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
    </div>
  );
};

export default PostComposeBar;