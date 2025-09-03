"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function MemoryModal() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // reset on unmount
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative mobile:w-[40%] w-[500px] max-w-full rounded-2xl mobile:bg-[#E0E9F3] bg-[#E8F0F6] shadow-xl px-4 py-16">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 border-[3px] border-[#6D778E] rounded-full p-1 hover:bg-gray-100"
        >
          <X size={20} color="#6D778E" />
        </button>

        {/* Content */}
        <div className="flex flex-col bg-[#E0E9F3] px-5 py-10 mobile:border-0 border border-[#6D778E] rounded-[16px] w-[80%] mx-auto items-center text-center space-y-4">
          {/* Header */}
          <div>
            <h2 className="text-[24px] text-[#1E2125] font-bold">
              Digitalna kartica
            </h2>
            <p className="text-[16px] text-[#1E2125]">
              za pošiljanje naprej preko moblica
            </p>
          </div>

          {/* Phone Preview */}
          <div className="w-[220px] h-[350px] rounded-[2rem] overflow-hidden relative">
            <img className="object-contain w-full h-full" src={"/mobile-image.svg"} />
          </div>

          {/* Download Button */}
          <button className="w-full w-[330px] rounded-[10px] bg-gradient-to-r from-[#00aaff] to-[#0077ff] text-white py-3 font-semibold shadow-md hover:opacity-90 transition">
            Prenesi
          </button>

          {/* Footer */}
          <p className="text-[14px] text-[#6D778E]">
            Kartica je namenjena pošiljanju po telefonu. <br />
            Vtipkaj številko. Dodaj sliko. Pošlji.
          </p>
        </div>
      </div>
    </div>
  );
}
