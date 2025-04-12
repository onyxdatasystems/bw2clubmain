"use client"
import React from 'react';
import Image from 'next/image';

interface JobListingProps {
  title: string;
  company: string;
  location: string;
  timePosted: string;
  type: string;
  level: string;
  remote: boolean;
}

const JobList_SideNav_Ads_JobDetails: React.FC = () => {
  // Sample job data
  const jobListings: JobListingProps[] = [
    {
      title: 'Virtual Assistant - Remote',
      company: 'Google',
      location: 'New York (Remote)',
      timePosted: '6 hours ago',
      type: 'Remote',
      level: 'Entry level',
      remote: true,
    },
    {
      title: 'Software Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      timePosted: '2 days ago',
      type: 'On-site',
      level: 'Mid level',
      remote: false,
    },
    // Add more jobs as necessary...
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-[545px] bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Job picks for you</h2>
          <Image src="/frame-48.png" alt="Filter" width={22} height={19} />
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobListings.map((job, index) => (
            <div key={index} className="p-4 border-b">
              <div className="flex gap-4">
                <Image src={`/ellipse-${index + 1}.png`} alt="Company" width={59} height={59} />
                <div className="flex-1">
                  <h3 className="text-[14px] text-[#7171C1]">{job.title}</h3>
                  <p className="text-[14px] text-[#3A3A3A]">{job.company}</p>
                  <p className="text-[14px] text-[#3A3A3A]">{job.location}</p>
                  <p className="text-[14px] text-[#165226]">{job.timePosted}</p>
                </div>
                <button className="text-[14px] text-[#3A3A3A]">x</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ads Section */}
      <div className="w-full md:w-[225px] bg-white p-4 mx-4">
        <h3 className="text-[14px] font-medium mb-4">Advertising</h3>
        <div className="border-t border-b border-[#CBD5E1] py-4">
          <Image src="/rectangl.png" alt="Ad" width={211} height={241} className="rounded-2xl" />
        </div>
      </div>

      {/* Job Details */}
      <div className="w-full md:w-[784px] bg-white p-8">
        {/* For simplicity, using first job listing's details */}
        <div className="flex gap-6 mb-8">
          <Image src="/pngwing.png" alt="Company Logo" width={85} height={84} />
          <div>
            <h2 className="text-[14px] text-[#3A3A3A]">{jobListings[0].title}</h2>
            <p className="text-[14px] text-[#3A3A3A]">{jobListings[0].company}</p>
            <p className="text-[14px] text-[#3A3A3A]">{jobListings[0].location}</p>
            <p className="text-[14px] text-[#165226]">{jobListings[0].timePosted}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <span className="px-4 py-2 bg-[#8EF596]/40 rounded-md text-[14px]">{jobListings[0].type}</span>
          <span className="px-4 py-2 bg-[#8EF596]/40 rounded-md text-[14px]">{jobListings[0].level}</span>
          {jobListings[0].remote && (
            <span className="px-4 py-2 bg-[#8EF596]/40 rounded-md text-[14px]">Remote</span>
          )}
        </div>

        <div className="flex gap-4 mb-8">
          <button className="px-12 py-2 bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white rounded-full">
            Apply
          </button>
          <button className="px-12 py-2 border border-[#7171C1] text-[#7171C1] rounded-full">
            Save
          </button>
        </div>

        <div className="text-[14px] leading-[140%] text-[#3A3A3A] whitespace-pre-line">
          {`About Job\n\nWe are looking for a detail-oriented Remote Office Administrator to oversee and manage our administrative activities. The ideal candidate will have excellent organizational skills, a keen eye for detail, and the ability to handle multiple administrative tasks efficiently.\n\nResponsibilities:\n\n• Manage office supplies inventory and place orders as necessary.\n• Organize and schedule meetings and appointments.\n• Prepare and distribute correspondence, memos, and forms.\n• Assist in the preparation of regularly scheduled reports.\n• Maintain digital filing systems and ensure documents are easily accessible.\n• Handle sensitive information with confidentiality and discretion.\n• Provide general administrative support to the office staff.\n\nQualifications:\n\n• High school diploma or equivalent; additional education or certification in office administration is a plus.\n• Proven experience as an office administrator, administrative assistant, or similar role.\n• Excellent organizational and time-management skills.\n• Proficiency in Microsoft Office Suite (Word, Excel, PowerPoint) and Google Workspace.\n• Strong written and verbal communication skills.\n• Ability to work independently with minimal supervision.\n• Reliable internet connection and a quiet workspace.\n\nBenefits:\n\n• Competitive hourly wage.\n• Flexible working hours.\n• Opportunity to work from the comfort of your home.\n• Supportive and collaborative team environment.\n• Opportunities for career growth and advancement.`}
        </div>
      </div>
    </div>
  );
};

export default JobList_SideNav_Ads_JobDetails;
