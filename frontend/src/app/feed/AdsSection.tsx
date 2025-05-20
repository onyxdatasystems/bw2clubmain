import React from 'react';
<<<<<<< HEAD
import { Ad } from './store/types';
import AdCard from './AdCard';

interface AdsSectionProps {
  ads: Ad[];
  loading: boolean;
  error?: string | null;
}

const AdsSection: React.FC<AdsSectionProps> = ({ ads, loading, error }) => {
  return (
    <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-4">Sponsored</h3>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-40 rounded-lg"></div>
              <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {ads.map(ad => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
=======
import Image from 'next/image';

const AdsSection: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '225px',
      height: 'auto',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      minWidth: '225px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <span style={{
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 400,
          letterSpacing: '-0.41px',
          lineHeight: '140%',
          color: '#000000'
        }}>
          Advertising
        </span>
        <div style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#CBD5E1',
          opacity: 0.52
        }} />
      </div>

      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#CBD5E1',
        opacity: 0.52
      }} />

      <div style={{
        width: '100%',
        height: 'auto',
        position: 'relative',
        borderRadius: '13.57px',
        overflow: 'hidden'
      }}>
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/rectangl-2.png"
          alt="Advertisement"
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

export default AdsSection;
<<<<<<< HEAD
=======

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
