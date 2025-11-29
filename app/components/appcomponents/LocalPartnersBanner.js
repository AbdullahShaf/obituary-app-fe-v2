import React from "react";
import LocalPartnersCarousal from "./LocalPartnersCarousal";

const LocalPartnersBanner = ({ label, categories }) => {
  return (
    <div className="relative w-full overflow-hidden mx-auto desktop:mt-[100px] mobile:mt-[68px] tablet:mt-[80px] flex flex-col justify-center items-center align-center bg-[#4E4E4E] min-h-[500px] mobile:min-h-[192px] tablet:min-h-[220px] w-full object-cover">
      <h1
        className=" flex flex-col items-center justify-center
         py-4 px-6 mx-auto
        text-[#B9B9B9] 
        md:text-[28px] text-[40px] 
        font-normal leading-[47px] whitespace-nowrap"
      >
        {label}
      </h1>
      <LocalPartnersCarousal categories={categories} />
    </div>
  );
};
export default LocalPartnersBanner;
