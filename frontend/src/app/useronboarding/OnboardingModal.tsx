"use client"
import React, { useState } from 'react';
import Image from 'next/image';

interface OnboardingModalProps {
  className?: string;
}
const OnboardingModal: React.FC<OnboardingModalProps> = ({ className = '' }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
      {
        title: 'Header',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
    ];

    return (
      <div className={`min-w-[300px] md:min-w-[540px] h-auto bg-white rounded-xl border border-[#0000000f] flex flex-col items-center justify-center p-5 ${className}`}>
        {/* Close button */}
        <div className="self-end">
          <button className="px-4 py-1 text-sm text-black hover:bg-gray-100 rounded-full">
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 w-full md:w-[500px] mt-4">
        <h1 className="text-[24px] md:text-[28px] font-medium leading-[140%] tracking-[-0.5px] text-black">
          {steps[currentStep].title}
        </h1>
        <p className="text-[14px] leading-[140%] tracking-[-0.41px] text-[#2f2f2f]">
          {steps[currentStep].description}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center w-full md:w-[500px] mt-6">
        <div className="flex gap-[5px]">
<Image src="https://dashboard.codeparrot.ai/api/image/Z-v3lgz4-w8v6R3X/frame-5-3.png" alt="Step indicator" width={40} height={8} />
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-v3lgz4-w8v6R3X/frame-3-3.png" alt="Step indicator" width={8} height={8} />
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-v3lgz4-w8v6R3X/frame-4-3.png" alt="Step indicator" width={8} height={8} />
        </div>
        <button 
          className="px-3 py-2 bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white rounded-full hover:opacity-90 transition-opacity"
          onClick={() => setCurrentStep(prev => prev + 1)}
        >
          <span className="text-[15px] font-medium tracking-[-0.5px]">Get started</span>
        </button>
      </div>
    </div>
  );
};
export default OnboardingModal;