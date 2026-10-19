import React from 'react';

// 1. Loading Spinner component (Rotating spinner)
export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-8 h-8 border-4 border-[#ff5100]/20 border-t-[#ff5100] rounded-full animate-spin"></div>
    </div>
  );
};

// 2. Content Loader / Skeleton Loader component
export const ContentLoader = () => {
  return (
    <div className="bg-[#120905] border border-white/10 rounded-2xl p-4 max-w-sm w-full animate-pulse">
      {/* Skeleton image placeholder */}
      <div className="bg-white/10 h-40 rounded-xl mb-4"></div>
      {/* Skeleton text lines */}
      <div className="space-y-3">
        <div className="h-4 bg-white/10 rounded-lg w-3/4"></div>
        <div className="h-3 bg-white/10 rounded-lg w-full"></div>
        <div className="h-3 bg-white/10 rounded-lg w-5/6"></div>
      </div>
    </div>
  );
};