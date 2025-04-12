import React from 'react';
import Image from 'next/image';

const ImageUploadSection: React.FC = () => {
  const handleUploadClick = () => {
    // Handle file upload logic here
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle the file upload
        console.log('File selected:', file);
      }
    };
    input.click();
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

