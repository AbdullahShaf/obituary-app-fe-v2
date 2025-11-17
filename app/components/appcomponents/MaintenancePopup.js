"use client";

import Image from "next/image";
import imgBell from "@/public/ico_notification_bell1.png";

const MaintenancePopup = ({ message }) => {
  return (
    <div
      className="fixed top-[40px] left-0 right-0 z-[60] flex justify-end px-4"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-[460px] bg-[#E8F0F6] rounded-3xl shadow-custom-light-dark border border-[#0000001A]">
        <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#E6E8ED]">
          <div className="flex items-center space-x-3">
            <div className="w-[32px] h-[32px] rounded-full bg-[#E6F3FB] flex items-center justify-center">
              <Image src={imgBell} alt="Notification bell" width={20} height={20} />
            </div>
            <span className="text-[#0A85C2] text-[16px] leading-[20px] font-semibold font-variation-customOpt16">
              Obvestilo
            </span>
          </div>
        </div>
        <div className="px-[24px] py-[20px]">
          <p className="text-[#3C3E41] text-[14px] leading-[20px] font-variation-customOpt14 whitespace-pre-line">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePopup;

