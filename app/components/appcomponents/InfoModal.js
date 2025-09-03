"use client";

import { useEffect, useState } from "react";
import { X, Pencil } from "lucide-react";

export default function InfoModal({ heading, text, name, icon }) {
  const [isOpen, setIsOpen] = useState(true);

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
      <div className="relative mobile:w-[70%] w-[460px] max-w-full rounded-xl bg-white shadow-xl px-6 py-12">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 border-[3px] border-[#6D778E] rounded-full p-1 hover:bg-gray-100"
        >
          <X size={15} color="#6D778E" />
        </button>

        {/* Content */}
        <div className="flex items-center justify-center my-3">
          <div className="flex items-center w-[90%] space-x-3 rounded-[1px] bg-gradient-to-b from-[#0D94E8] to-[#1860A3] p-4 text-white shadow-md">
            <img className="w-9 h-9" src={icon} />
            <div className="flex flex-col text-[#FFFFFF] items-start">
              <h2 className="font-bold">{heading}</h2>
              <p>{text}</p>
              <p>{name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
