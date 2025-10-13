import React from "react";
import ObituaryCardFb from "./appcomponents/ObituaryCardFb";

const MemoryHeroSection = ({ obituary, handleFacebookShare }) => {
  return (
    <div className="relative mobile:pb-[50px] relative max-w-[683px] overflow-hidden mx-auto desktop:mt-[137.02px] mobile:mt-[115px] tablet:mt-[124px] flex justify-center">
      <img
      <img
        src="/fb-posting-hero-bg.png"
        alt="Memory page hero background"
        className="mobile:hidden h-[444px] mobile:h-[257px] w-full object-cover"
      />
      <img
        src="/fb-posting-hero-bg.png"
        alt="Memory page hero background"
        className="mobile:flex hidden h-[267px] w-full object-cover"
      />
      />
      <div className="absolute top-[4%] left-[3%] right-[3%]">
        <ObituaryCardFb data={obituary} />
      </div>
      <div
        onClick={handleFacebookShare}
        className="absolute flex cursor-pointer justify-center gap-3 rounded-[6px] border border-[#ffffff] items-center w-[387px] h-[32px] bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF]/[30%] mobile:bottom-[30%] mobile:w-[90%] mobile:mx-auto mobile:left-[0%] mobile:right-[0%] bottom-[15%] right-[3%]"
      >
        <p
          style={{ fontFamily: "Roboto Flex" }}
          className="text-[#3C3E41] mobile:text-[10px] text-[14px]"
        >
          Vpis v žalno knjigo in informacije o pogrebu so tukaj
        </p>
        <img
          className="rotate-[180deg] mt-1 w-[12.23px] h-[18.34px]"
          src="/previous_img.png"
        />
      </div>
    </div>
  );
};

export default MemoryHeroSection;
