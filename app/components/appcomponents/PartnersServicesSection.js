import React, { useEffect, useState } from "react";
import PartnersSelectionList from "./PartnersSelectionList";
import partnerService from "@/services/partner-service";
import PartnerAdItem from "./PartnerAdItem";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import IconDown from "../../../public/lokalni/down.png";

const PartnersServicesSection = ({
  categories,
  activeSection,
  setActiveSection,
}) => {
  const defaultItems = [
    { name: "cvetličarne", link: "cvetličarne" },
    { name: "KAMNOSEŠTVO", link: "kamnoseštvo" },
    { name: "svečarstvo", link: "svečarstvo" },
  ];

  const [partners, setPartners] = useState([]);

  const searchParams = useSearchParams();
  const paramValue = searchParams.get("services");
  const [selectedItem, setSelectedItem] = useState(paramValue || "");

  const isOpen = activeSection === "services";

  // Sync with param
  useEffect(() => {
    if (paramValue && paramValue !== selectedItem) {
      setSelectedItem(paramValue);
      fetchPartners(paramValue);
    }
  }, [paramValue]);

  const fetchPartners = async (service) => {
    try {
      if (!service || service.length === 0) {
        const response = await partnerService.getAllPartners();
        setPartners(response);
      } else {
        const response = await partnerService.getPartnersByCategory(service);
        setPartners(response);
      }
    } catch (error) {
      console.error("Failed to fetch partners:", error);
      setPartners([]);
    }
  };

  useEffect(() => {
    fetchPartners(null);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mb-28 px-4 md:px-2">
      {/* ▼ HEADER WITH TOGGLE */}
      <div
        className="flex flex-row gap-4 items-center h-[64px] mb-9 cursor-pointer select-none"
        onClick={() => setActiveSection(isOpen ? "region" : "services")}
      >
        <h1 className="flex font-normal text-[28px] md:text-[40px] leading-[48px] tracking-normal text-black">
          Storitve
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

      {/* SECTION THAT HIDES / SHOWS */}
      {isOpen && (
        <div className="flex flex-col gap-14">
          <PartnersSelectionList
            defaultItems={defaultItems}
            items={categories}
            title="services"
          />
          <PartnersServicesList partners={partners} />
        </div>
      )}
    </div>
  );
};

const PartnersServicesList = ({ partners }) => {
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
      {partners?.length === 0 && <p className="text-center">Še ni vnosov</p>}

      {partners?.length > 0 &&
        partners.map((partner, index) => (
          <PartnerAdItem key={index} partner={partner} />
        ))}
    </div>
  );
};

export default PartnersServicesSection;
