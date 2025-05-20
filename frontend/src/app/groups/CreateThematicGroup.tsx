<<<<<<< HEAD
"use client";
=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import React, { useState } from 'react';
import HeaderSection from './thematicgroupcreate/HeaderSection';
import TextInputSection from './thematicgroupcreate/TextInputSection';
import ImageUploadSection from './thematicgroupcreate/ImageUploadSection';
import ActionButtons from './thematicgroupcreate/ActionButtons';
import Image from 'next/image';

interface GroupFormData {
  title: string;
  about: string;
  interests: string;
  language: string;
<<<<<<< HEAD
  image?: string;
=======
  image?: string; 
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
}

const CreateThematicGroup: React.FC = () => {
  const [formData, setFormData] = useState<GroupFormData>({
    title: '',
    about: '',
    interests: '',
    language: 'English'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (field: keyof GroupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageFormData = new FormData();
      imageFormData.append('image', file);
      
<<<<<<< HEAD
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/album/add/image`,
        { method: 'POST', body: imageFormData }
      );
      
      if (!response.ok) throw new Error('Image upload failed');
      const data = await response.json();
      setFormData(prev => ({ ...prev, image: data.imageUrl }));
    } catch {
=======
      const response = await fetch('/api/album/add/image', {
        method: 'POST',
        body: imageFormData
      });
      
      if (!response.ok) throw new Error('Image upload failed');
      const { imageUrl } = await response.json();
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (err) {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      setError('Failed to upload image');
    }
  };

  const handleSubmit = async () => {
<<<<<<< HEAD
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/store`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );
=======
    setLoading(true);
    try {
      const response = await fetch('/api/group/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Group creation failed');
      }
      
      const data = await response.json();
<<<<<<< HEAD
      // Redirect or show success message
=======
      // Handle successful creation
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      console.log('Group created:', data);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating group');
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col w-full max-w-[975px] mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <HeaderSection />
        <Image 
          src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/x-1.png"
=======
    <div className="flex flex-col w-[975px] bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <HeaderSection />
        {/* Add proper close icon handling */}
        <Image 
          src="/close-icon.png" // Added leading slash
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          alt="Close" 
          width={24} 
          height={24}
          className="cursor-pointer"
        />
      </div>

      <div className="w-full h-[16.25px]">
        <Image 
<<<<<<< HEAD
          src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/divider.png"
          alt="Divider" 
          width={975}
          height={16.25}
          className="w-full h-auto"
        />
      </div>

      <div className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex flex-col flex-grow w-full lg:w-1/2 space-y-4">
=======
          src="/divider.png" // Added leading slash
          alt="Divider" 
          width={975} 
          height={16.25}
          layout="responsive"
        />
      </div>

      <div className="flex flex-row p-4 space-x-4">
        <div className="flex flex-col flex-grow space-y-4">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          <TextInputSection 
            onTextChange={handleTextChange}
            initialValues={formData}
          />
        </div>
<<<<<<< HEAD
        <div className="flex flex-col flex-grow w-full lg:w-1/2">
          <ImageUploadSection onUpload={handleImageUpload} />
=======
        <div className="flex flex-col flex-grow">
          <ImageUploadSection onUpload={handleImageUpload} /> {/* Fixed prop name */}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        </div>
      </div>

      {error && (
<<<<<<< HEAD
        <div className="px-4 py-2 text-sm text-red-500">
=======
        <div className="text-red-500 px-4 py-2 text-sm">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          {error}
        </div>
      )}

      <div className="flex justify-end p-4 border-t border-gray-200">
        <ActionButtons 
          onSave={handleSubmit}
<<<<<<< HEAD
          onCancel={() => window.history.back()}
=======
          onCancel={() => window.history.back()} // Example cancel handler
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default CreateThematicGroup;