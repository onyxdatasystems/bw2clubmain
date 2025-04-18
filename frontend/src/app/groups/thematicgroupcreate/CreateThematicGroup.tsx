import React from 'react';
import HeaderSection from './HeaderSection';
import TextInputSection from './TextInputSection';
import ImageUploadSection from './ImageUploadSection';
import ActionButtons from './ActionButtons';
import Image from 'next/image';

const CreateThematicGroup: React.FC = () => {
  return (
    <div className="flex flex-col w-[975px] bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <HeaderSection />
        <Image src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/x-1.png" alt="Close" width={24} height={24} />
      </div>

      {/* Divider */}
      <div className="w-full h-[16.25px]">
        <Image src="https://dashboard.codeparrot.ai/api/image/Z-z1cAz4-w8v6R9a/divider.png" alt="Divider" layout="responsive" width={975} height={16.25} />
      </div>

      {/* Content Section */}
      <div className="flex flex-row p-4 space-x-4">
        {/* Text Input Sections */}
        <div className="flex flex-col flex-grow space-y-4">
          <TextInputSection 
            initialValues={{ title: '', about: '', interests: '', language: '' }} 
            onTextChange={(newText) => console.log(newText)} 
          />
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col flex-grow">
          <ImageUploadSection onUpload={(file) => console.log('File uploaded:', file)} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end p-4 border-t border-gray-200">
        <ActionButtons 
          onSave={() => console.log('Save action triggered')} 
          onCancel={() => console.log('Cancel action triggered')} 
        />
      </div>
    </div>
  );
};

export default CreateThematicGroup;

