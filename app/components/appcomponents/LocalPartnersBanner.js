import React from "react";
import LocalPartnersCarousal from "./LocalPartnersCarousal";
import screenSizes from "@/app/lokalni/constant";

const LocalPartnersBanner = ({ label, categories, screen }) => {
  if (screen === screenSizes.MOBILE) {
    return (
      <PartnersBannerMobile
        label={label}
        categories={categories}
        screen={screen}
      />
    );
  } else if (screen === screenSizes.TABLET) {
    return (
      <PartnersBannerTablet
        label={label}
        categories={categories}
        screen={screen}
      />
    );
  } else {
    return (
      <PartnersBannerDesktop
        label={label}
        categories={categories}
        screen={screen}
      />
    );
  }
};
export default LocalPartnersBanner;

const PartnersBannerDesktop = ({ label, categories, screen }) => {
  return (
    <div className="relative w-full overflow-hidden mx-auto pt-[112px]  flex flex-col justify-center items-center align-center bg-[#4E4E4E] min-h-[500px] w-full object-cover">
      <h1
        className=" flex flex-col items-center justify-center
         py-4 px-6 mx-auto
        text-[#B9B9B9] 
        text-[40px] 
        font-normal leading-[48px] whitespace-nowrap"
      >
        {label}
      </h1>
      <LocalPartnersCarousal categories={categories} screen={screen} />
    </div>
  );
};

const PartnersBannerTablet = ({ label, categories, screen }) => {
  return (
    <div className="relative w-full overflow-hidden mx-auto pt-[112px] flex flex-col justify-center items-center align-center bg-[#4E4E4E] min-h-[500px] w-full object-cover">
      <h1
        className=" flex flex-col items-center justify-center
         py-4 px-6 mx-auto
        text-[#B9B9B9] 
        text-[40px] 
        font-normal leading-[48px] whitespace-nowrap"
      >
        {label}
      </h1>
      <LocalPartnersCarousal categories={categories} screen={screen} />
    </div>
  );
};

const PartnersBannerMobile = ({ label, categories, screen }) => {
  return (
    <div className="relative w-full overflow-hidden mx-auto pt-[80px]  flex flex-col justify-center items-center align-center bg-[#4E4E4E] min-h-[400px] w-full object-cover">
      <h1
        className=" flex flex-col items-center justify-center
         py-4 px-6 mx-auto
        text-[#B9B9B9] 
        text-[28px]
        font-normal leading-[48px] whitespace-nowrap"
      >
        {label}
      </h1>
      <LocalPartnersCarousal categories={categories} screen={screen} />
    </div>
  );
};
