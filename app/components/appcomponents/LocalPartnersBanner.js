import React from "react";
import LocalPartnersCarousal from "./LocalPartnersCarousal";

const LocalPartnersBanner = ({ label, categories }) => {
  return (
    <div className="relative w-full overflow-hidden mx-auto pt-[100px]  flex flex-col justify-center items-center align-center bg-[#4E4E4E] min-h-[400px] md:min-h-[500px] w-full object-cover">
      <h1
        className=" flex flex-col items-center justify-center
         py-4 px-6 mx-auto
        text-[#B9B9B9] 
        text-[28px] md:text-[40px] 
        font-normal leading-[47px] whitespace-nowrap"
      >
        {label}
      </h1>
      <LocalPartnersCarousal categories={categories} />
    </div>
  );
};
export default LocalPartnersBanner;
