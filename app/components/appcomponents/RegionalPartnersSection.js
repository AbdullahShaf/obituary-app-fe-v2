"use client";

import React, { useEffect, useState } from "react";
import PartnerAdItem from "./PartnerAdItem";
import RegionSelectionList from "./RegionSelectionList";
import partnerService from "@/services/partner-service";
import regionsAndCities from "@/utils/regionAndCities";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import IconDown from "../../../public/lokalni/down.png"; // ADDED

const regionOptions = Object.keys(regionsAndCities).map((region) => ({
  name: region,
  link: region,
}));

const RegionalPartnersSection = ({ activeSection, setActiveSection }) => {
  const [regionalPartners, setRegionalPartners] = useState([]);

  const searchParams = useSearchParams();
  const paramValue = searchParams.get("region");
  const [selectedItem, setSelectedItem] = useState(paramValue || "");

  // NEW toggle state
  const isOpen = activeSection === "region";

  // Sync state when URL changes
  useEffect(() => {
    if (paramValue && paramValue !== selectedItem) {
      setSelectedItem(paramValue);
      fetchRegionalPartners(paramValue);
    }
  }, [paramValue]);

  const fetchRegionalPartners = async (region) => {
    try {
      if (!region || region.length === 0) {
        const response = await partnerService.getAllPartners();
        setRegionalPartners(response);
      } else {
        const response = await partnerService.getRegionalPartners(region);
        setRegionalPartners(response);
      }
    } catch (error) {
      console.error("Failed to fetch regional partners:", error);
      setRegionalPartners([]);
    }
  };

  useEffect(() => {
    fetchRegionalPartners(null);
  }, []);

  const defaultItems = [
    { name: "OSREDNJESLOVENSKA", link: "OSREDNJESLOVENSKA" },
    { name: "PODRAVSKA", link: "PODRAVSKA" },
    { name: "SAVINJSKA", link: "SAVINJSKA" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mb-28 px-4 md:px-2">
      {/* HEADER WITH TOGGLE */}
      <div
        className="flex flex-row gap-4 items-center h-[64px] mb-9 cursor-pointer select-none"
        onClick={() => setActiveSection(isOpen ? "services" : "region")}
      >
        <h1 className="flex font-normal text-[28px] md:text-[40px] leading-[48px] tracking-normal text-black">
          Regijsko
        </h1>

        <Image
          src={IconDown}
          alt="Icon Down"
          width={35}
          height={35}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />
      </div>

      {/* CONTENT SECTION */}
      {isOpen && (
        <div className="flex flex-col gap-14">
          <RegionSelectionList
            defaultItems={defaultItems}
            items={regionOptions}
            title="region"
          />

          <RegionalPartnersList regionalPartners={regionalPartners} />
        </div>
      )}
    </div>
  );
};

const RegionalPartnersList = ({ regionalPartners }) => {
  return (
    <div
      className="
  w-full max-w-5xl mx-auto text-left 
  flex flex-col md:flex-row      
  gap-[24px]                     
  items-center md:items-start    
  flex-wrap
"
    >
      {regionalPartners?.length === 0 && (
        <p className="text-center">Še ni vnosov</p>
      )}

      {regionalPartners.length > 0 &&
        regionalPartners.map((partner, index) => (
          <PartnerAdItem key={index} partner={partner} />
        ))}
    </div>
  );
};

export default RegionalPartnersSection;
