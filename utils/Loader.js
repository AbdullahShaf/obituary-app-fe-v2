import React from 'react';

export const Loader = ({ isVisible = true }) => {
//   if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-white/10">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning loader */}
        {/* <div className="relative">
          <div className="w-16 h-16 border-4 border-white/30 rounded-full animate-spin border-t-white"></div>
        </div> */}
<div className="w-10 h-10 border-4 border-blue-500/70 rounded-full animate-spin border-t-blue-700 shadow-md"></div>

        {/* Loading text */}
        {/* <div className="text-white text-lg font-medium animate-pulse">
          Loading...
        </div> */}
        
        {/* Optional pulsing dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

