<<<<<<< HEAD
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageUploadSectionProps {
  onUpload: (file: File) => Promise<void>;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

=======
import React from 'react';
import Image from 'next/image';

interface ImageUploadSectionProps {
  onUpload: (file: File) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ onUpload }) => {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  const handleUploadClick = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
<<<<<<< HEAD
        try {
          setIsUploading(true);
          setPreviewUrl(URL.createObjectURL(file));
          await onUpload(file);
        } catch (error) {
          console.error('Upload error:', error);
          setPreviewUrl(null);
        } finally {
          setIsUploading(false);
=======
        const formData = new FormData();
        formData.append('image', file);
        try {
          const response = await fetch('https://bw2club.onyxdatasystems.com/backend/api/v1/album/add/image', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          if (response.ok) {
            console.log('Image uploaded:', data);
            // Handle successful upload (store image URL/ID in state)
          }
        } catch (error) {
          console.error('Upload error:', error);
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        }
      }
    };
    input.click();
<<<<<<< HEAD
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100"
    >
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Preview"
          fill
          className="object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[#7171c1] opacity-10"></div>
          
          <div className="absolute bottom-20 left-0 w-full">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/cloud.png"
              alt="Cloud"
              width={173}
              height={56}
              className="absolute left-0"
            />
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/cloud-2.png"
              alt="Cloud"
              width={157}
              height={60}
              className="absolute left-1/4"
            />
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/cloud-3.png"
              alt="Cloud"
              width={247}
              height={94}
              className="absolute left-1/3"
            />
          </div>

          <div className="absolute top-1/4 left-1/4">
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/balloon.png"
              alt="Balloon"
              width={38}
              height={65}
            />
          </div>
        </>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          onClick={handleUploadClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isUploading}
          className={`flex items-center px-6 py-3 bg-white bg-opacity-90 border border-purple-500 rounded-full shadow-md hover:bg-opacity-100 transition-all ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mr-2"></div>
              <span className="text-purple-600 font-medium">Uploading...</span>
            </div>
          ) : (
            <>
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-purple-600 font-medium">
                {previewUrl ? 'Change image' : 'Upload image'}
              </span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ImageUploadSection;
=======
  
};

  return (
    <div className="relative w-full max-w-[432px] h-[273px] rounded-lg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#7171c1] opacity-90"></div>
      
      {/* Decorative Elements */}
      <div className="relative h-full w-full">
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#e3e8ff] opacity-10"></div>
        
        {/* Clouds */}
        <div className="absolute bottom-20 left-0 w-full">
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/cloud.png"
            alt="Cloud"
            width={173}
            height={56}
            className="absolute left-0"
          />
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/cloud-2.png"
            alt="Cloud"
            width={157}
            height={60}
            className="absolute left-1/4"
          />
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/cloud-3.png"
            alt="Cloud"
            width={247}
            height={94}
            className="absolute left-1/3"
          />
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/cloud-4.png"
            alt="Cloud"
            width={173}
            height={56}
            className="absolute right-0"
          />
        </div>

        {/* Balloons */}
        <div className="absolute top-1/4 left-1/4">
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/balloon.png"
            alt="Balloon"
            width={38}
            height={65}
          />
        </div>
        <div className="absolute top-1/3 right-1/4">
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/balloon-2.png"
            alt="Balloon"
            width={83}
            height={104}
          />
        </div>

        {/* Confetti */}
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/confetti.png"
          alt="Confetti"
          width={343}
          height={227}
          className="absolute top-0 left-0"
        />

        {/* Upload Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={handleUploadClick}
            className="flex items-center px-4 py-2 bg-transparent border border-white rounded hover:bg-white/10 transition-colors"
          >
            <i className="fas fa-camera text-white mr-2"></i>
            <span className="text-white font-semibold">Upload image</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
