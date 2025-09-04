"use client";

import { useEffect, useState } from "react";

export default function InfoModal({
  heading,
  text,
  name,
  icon,
  isOpen,
  onClose,
}) {
  // 🔒 Disable background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mobile:w-[344px] mobile:w-[210px] w-[550px] h-[240px] max-w-full rounded-xl bg-[#E7EEF3] shadow-xl mobile:px-0 flex flex-col justify-center">
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-3 top-3 ">
          <img
            className="mobile:w-[33.33px] mobile:h-[33.33px] w-[46.67px] h-[46.67px]"
            src="/close-icon.svg"
          />
        </button>

        {/* Content */}
        <div className="flex items-center justify-center my-3">
          <div className="flex items-center mobile:w-[300px] w-[365px] h-[100px] space-x-3 rounded-[1px] border border-[#0D94E8] bg-gradient-to-b from-[#0D94E8] to-[#1860A3] px-4 text-white shadow-md">
            <img className="w-[24px] h-[22px]" src={icon} />
            <div className="flex flex-col text-[#B2E6E3] items-start">
              <h2>{heading}</h2>
              <p className="text-[#FFFFFF]">{text}</p>
              <p>{name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
