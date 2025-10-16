"use client";
import React from "react";

const MobileMenuButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col justify-center items-center p-2 rounded-md bg-gray-800 hover:bg-gray-700"
      aria-label="Open mobile menu"
    >
      <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all duration-200"></span>
      <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all duration-200"></span>
      <span className="block w-6 h-0.5 bg-white transition-all duration-200"></span>
    </button>
  );
};

export default MobileMenuButton;
