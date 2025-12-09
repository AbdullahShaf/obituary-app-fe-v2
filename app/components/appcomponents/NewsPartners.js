import React, { useState, useEffect } from "react";
import SavusLogo from "../../../public/lokalni/savus-logo.jpg";
import PartnerAdItem from "./PartnerAdItem";
import partnerService from "@/services/partner-service";
import screenSizes from "@/app/lokalni/constant";

const NewsPartnersComponent = ({ screen }) => {
  if (screen === screenSizes.MOBILE) {
    return <NewsPartnersComponentMobile screen={screen} />;
  } else if (screen === screenSizes.TABLET) {
    return <NewsPartnersComponentTablet screen={screen} />;
  } else {
    return <NewsPartnersComponentDesktop screen={screen} />;
  }
};

const NewsPartnersComponentDesktop = ({ screen }) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchNewsPartners();
  }, []);

  const fetchNewsPartners = async () => {
    try {
      const response = await partnerService.getLocalNewsPartners();
      setPartners(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to fetch news partners:", error);
      setPartners([]);
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto text-left my-28 px-2">
      <h1 className="text-[#1E2125] text-[40px] leading-[100%] text-[#1E2125] mb-11 ">
        Lokalne novice
      </h1>
      <NewsPartnersListDesktop partners={partners} />
    </div>
  );
};

const NewsPartnersComponentTablet = ({ screen }) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchNewsPartners();
  }, []);

  const fetchNewsPartners = async () => {
    try {
      const response = await partnerService.getLocalNewsPartners();
      setPartners(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to fetch news partners:", error);
      setPartners([]);
    }
  };
  return (
    <div className="w-full max-w-[680px] mx-auto text-left my-28 px-2">
      <h1 className="text-[#1E2125] text-[40px] leading-[100%] text-[#1E2125] mb-11 ">
        Lokalne novice
      </h1>
      <NewsPartnersListTablet partners={partners} />
    </div>
  );
};

const NewsPartnersComponentMobile = ({ screen }) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchNewsPartners();
  }, []);

  const fetchNewsPartners = async () => {
    try {
      const response = await partnerService.getLocalNewsPartners();
      setPartners(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to fetch news partners:", error);
      setPartners([]);
    }
  };
  return (
    <div className="w-full max-w-[340px] mx-auto text-left my-24 px-4">
      <h1 className="text-[#1E2125] text-[28px] leading-[100%] text-[#1E2125] mb-11 ">
        Lokalne novice
      </h1>
      <NewsPartnersListMobile partners={partners} />
    </div>
  );
};

const NewsPartnersListDesktop = ({ partners }) => {
  return (
    <div
      className="
  w-full mx-auto text-left 
  flex flex-row      
  gap-[24px]                     
  items-start    
  flex-wrap
"
    >
      {partners.map((partner, index) => (
        <PartnerAdItem key={index} partner={partner} />
      ))}
    </div>
  );
};

const NewsPartnersListTablet = ({ partners }) => {
  return (
    <div
      className="
  w-full mx-auto text-left 
  flex flex-row      
  gap-[24px]                     
  items-center    
  flex-wrap
"
    >
      {partners.map((partner, index) => (
        <PartnerAdItem key={index} partner={partner} />
      ))}
    </div>
  );
};
const NewsPartnersListMobile = ({ partners }) => {
  return (
    <div
      className="
  w-full mx-auto text-left 
  flex flex-col    
  gap-[24px]                     
  items-center    
  flex-wrap
"
    >
      {partners.map((partner, index) => (
        <PartnerAdItem key={index} partner={partner} />
      ))}
    </div>
  );
};

export default NewsPartnersComponent;
