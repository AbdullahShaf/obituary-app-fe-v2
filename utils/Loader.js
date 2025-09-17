import React from 'react';

export const Loader = ({ isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-white/20">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning loader */}
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-800 border-solid rounded-full animate-spin border-t-blue-900" style={{ borderColor: "#988f8f" }}></div>
        </div>
      </div>
    </div>
  );
};
