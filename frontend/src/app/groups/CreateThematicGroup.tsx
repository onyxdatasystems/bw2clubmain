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
  image?: string; 
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
      
      const response = await fetch('/api/album/add/image', {
        method: 'POST',
        body: imageFormData
      });
      
      if (!response.ok) throw new Error('Image upload failed');
      const { imageUrl } = await response.json();
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (err) {
      setError('Failed to upload image');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/group/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Group creation failed');
      }
      
      const data = await response.json();
      // Handle successful creation
      console.log('Group created:', data);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[975px] bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <HeaderSection />
        {/* Add proper close icon handling */}
        <Image 
          src="/close-icon.png" // Added leading slash
          alt="Close" 
          width={24} 
          height={24}
          className="cursor-pointer"
        />
      </div>

      <div className="w-full h-[16.25px]">
        <Image 
          src="/divider.png" // Added leading slash
          alt="Divider" 
          width={975} 
          height={16.25}
          layout="responsive"
        />
      </div>

      <div className="flex flex-row p-4 space-x-4">
        <div className="flex flex-col flex-grow space-y-4">
          <TextInputSection 
            onTextChange={handleTextChange}
            initialValues={formData}
          />
        </div>
        <div className="flex flex-col flex-grow">
          <ImageUploadSection onUpload={handleImageUpload} /> {/* Fixed prop name */}
        </div>
      </div>

      {error && (
        <div className="text-red-500 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end p-4 border-t border-gray-200">
        <ActionButtons 
          onSave={handleSubmit}
          onCancel={() => window.history.back()} // Example cancel handler
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default CreateThematicGroup;