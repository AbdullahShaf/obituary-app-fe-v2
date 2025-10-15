import React from "react";
import ObituaryCardFb from "./appcomponents/ObituaryCardFb";
import { useRouter } from "next/navigation";

const MemoryHeroSection = ({ obituary, handleFacebookShare, href, ref }) => {
  const router = useRouter();
  return (
    <div
      ref={ref}
      onClick={() => router.push(href)}
      className="relative mobile:pb-[50px] mb-2 cursor-pointer relative max-w-full overflow-hidden mx-auto desktop:mt-[137.02px] mobile:mt-[115px] tablet:mt-[124px] flex justify-center"
    >
      <img
        src="/fb-posting-hero-bg.png"
        alt="Memory page hero background"
        className="mobile:hidden h-auto mobile:h-[315px] w-full object-cover"
      />
      <img
        src="/fb-posting-hero-bg.png"
        alt="Memory page hero background"
        className="mobile:flex hidden h-[400px] w-full object-cover"
      />
      <div className="absolute top-[3%] left-[4%] right-[4%]">
        <ObituaryCardFb data={obituary} />
      </div>
      <div
        onClick={handleFacebookShare}
        className="absolute flex cursor-pointer px-6 justify-center gap-6 rounded-[6px] border border-[#ffffff] items-center w-auto h-[48px] bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF]/[30%] mobile:bottom-[22%] mobile:w-[80%] mobile:mx-auto mobile:right-[3%] bottom-[12%] right-[3%]"
      >
        <p
          style={{ fontFamily: "Roboto Flex" }}
          className="text-[#3C3E41] mobile:text-[11.5px] mb-0 text-[32px]"
        >
          Vpis v žalno knjigo in informacije o pogrebu so tukaj
        </p>
        <img
          className="rotate-[180deg] mt-1 h-[15px] w-[15.23px] h-[22.34px]"
          src="/previous_img.png"
        />
      </div>
      <p
        style={{ fontFamily: "Roboto Flex" }}
        className="text-black/50 absolute mobile:bottom-[13%] bottom-[7%] left-[1%] mobile:text-[11.5px] text-[20px]"
      >
        osmrtnica.com
      </p>
    </div>
  );
};

export default MemoryHeroSection;
