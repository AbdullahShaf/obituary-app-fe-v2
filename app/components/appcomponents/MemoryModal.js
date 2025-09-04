"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "@/config/apiConfig";
import { toast } from "react-hot-toast";

export default function MemoryModal({ isOpen, onClose, shownCard }) {
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

  const downloadCard = () => {
    const downloadURL = `${API_BASE_URL}/user/me/download/${shownCard?.id}`;

    const popup = window.open(downloadURL, '_blank', 'noopener,noreferrer');
    if (!popup) {
      alert('Popup blocked. Please allow popups for this site.');
      return;
    }
    toast.success("Kartica je bila uspešno prenesena");
  };

  console.log('>>>>>> shownCard', shownCard);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Change h-[940px] to  h-[1100px] */}
      <div className="relative flex flex-col justify-center mobile:w-[344px] w-[600px] mobile:h-[951px] h-[940px] rounded-2xl bg-[#E0E9F3] desktop:bg-[#E8F0F6] shadow-xl mobile:py-2 tablet:py-2 py-16">
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-3 top-3 ">
          <img
            className="mobile:w-[40px] mobile:h-[40px] w-[56px] h-[56px]"
            src="/close-icon.svg"
          />
        </button>

        {/* Content */}
        <div className="flex flex-col bg-[#E0E9F3] px-5 py-10 mobile:border-0 border border-[#6D778E] rounded-[16px] mobile:w-full h-[917px] w-[450px] mx-auto items-center text-center space-y-4">
          {/* Header */}
          <div>
            <h2 className="text-[24px] text-[#1E2125] font-[500]">
              Digitalna kartica
            </h2>
            <p className="text-[16px] mb-2 text-[#1E2125]">
              za pošiljanje naprej preko mobilca
            </p>
          </div>

          {/* Phone Preview */}
          {/* <div className="mobile:w-[293px] mobile:h-[586px] w-[300px] h-[600px] rounded-[2rem] overflow-hidden relative">
            <img
              className="object-contain w-full h-full"
              src={"/mobile-image.svg"}
            />
          </div> */}

          {/* Change h-[510px] to h-[600px] */}
          <div className="mobile:w-[293px] mobile:h-[586px] w-[300px] h-[510px] rounded-[2rem] overflow-hidden relative">
            <div className="mockup-phone h-[500px] w-[260px] shadow-custom-light-dark-box-image-wall ">
              <div style={{ height: 25, width: 120 }} className=" camera" />
              <div className="display w-full h-full flex justify-center items-center">
                <img
                  src={`${API_BASE_URL}/${shownCard?.cardImage}`}
                  alt={`Digi card`}
                  className={`relative object-cover h-full w-full`}
                  onError={(e) => {
                    e.target.src = defaultImages[index];
                  }}
                />
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button onClick={downloadCard} className="mobile:w-[266px] w-[330px] rounded-[10px] bg-gradient-to-b from-[#0D94E8] to-[#0A85C2] text-white text-[20px] h-[60px] font-[500] shadow-md hover:opacity-90 transition">
            Prenesi
          </button>

          {/* Footer */}
          <p className="text-[14px] leading-[30px] text-[#6D778E]">
            Kartica je namenjena pošiljanju po telefonu. <br />
            Vtipkaj številko. Dodaj sliko. Pošlji.
          </p>
        </div>
      </div>
    </div>
  );
}
