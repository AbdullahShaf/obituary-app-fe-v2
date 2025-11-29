import React, { useState, useEffect } from "react";
import SavusLogo from "../../../public/lokalni/savus-logo.jpg";
import PartnerAdItem from "./PartnerAdItem";
import partnerService from "@/services/partner-service";
const NewsPartnersComponent = () => {
  const [partners, setPartners] = useState([]);
  //   const partners = [
  //     {
  //       name: "Savus",
  //       link: "https://www.partner1.com",
  //       tagline: "Lokalne novice iz zasavja",
  //       images: [SavusLogo, SavusLogo],
  //       city: "Zasavska",
  //     },
  //   ];

  useEffect(() => {
    fetchNewsPartners();
  }, []);

  const fetchNewsPartners = async () => {
    const response = await partnerService.getLocalNewsPartners();
    setPartners(response);
  };
  return (
    <div className="w-full max-w-5xl mx-auto text-left my-28 px-4 md:px-2">
      <h1 className="text-[#1E2125] text-[28px] md:text-[40px] leading-[100%] text-[#1E2125] mb-11 ">
        Lokalne novice
      </h1>
      <NewsPartnersList partners={partners} />
    </div>
  );
};

const NewsPartnersList = ({ partners }) => {
  return (
    <div
      className="
  w-full max-w-5xl mx-auto text-left 
  flex flex-col md:flex-row      
  gap-[32px]                     
  items-center md:items-start    
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
