"use client";
import React, { useEffect, useState } from "react";
import PartnerAdItem from "./PartnerAdItem";
import RegionalOne from "../../../public/lokalni/reigonal-1.jpg";
import RegionalTwo from "../../../public/lokalni/regional-2.jpg";
import RegionalThree from "../../../public/lokalni/regional-3.jpg";
import RegionSelectionList from "./RegionSelectionList";
import partnerService from "@/services/partner-service";
import regionsAndCities from "@/utils/regionAndCities";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const regionOptions = Object.keys(regionsAndCities).map((region) => ({
  name: region,
  link: region, // you can slugify if required
}));

const RegionalPartnersSection = () => {
  const [regionalPartners, setRegionalPartners] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const paramValue = searchParams.get("region"); // read ?title=value from URL
  const [selectedItem, setSelectedItem] = React.useState(paramValue || "");

  // Sync state when query param changes externally
  React.useEffect(() => {
    if (paramValue && paramValue !== selectedItem) {
      setSelectedItem(paramValue);
      fetchRegionalPartners(paramValue);
    }
  }, [paramValue]);
  const fetchRegionalPartners = async (region) => {
    if (!region || region.length === 0) {
      const response = await partnerService.getAllPartners();
      setRegionalPartners(response);
      return;
    } else {
      const response = await partnerService.getRegionalPartners(region);
      setRegionalPartners(response);
    }
  };
  useEffect(() => {
    fetchRegionalPartners(null);
  }, []);
  const defaultItems = [
    {
      name: "OSREDNJESLOVENSKA",
      link: "OSREDNJESLOVENSKA",
    },
    {
      name: "PODRAVSKA",
      link: "PODRAVSKA",
    },
    {
      name: "SAVINJSKA",
      link: "SAVINJSKA",
    },
  ];

  //   {
  //     name: "Stone Studio Luxury d.o.o.",
  //     link: "https://www.partner1.com",
  //     tagline: "KAMNITE STOPNICE",
  //     images: [RegionalOne, RegionalTwo],
  //     city: "Log - Dragomer",
  //   },
  //   {
  //     name: "Stone Studio Luxury d.o.o.",
  //     link: "https://www.partner1.com",
  //     tagline: "KUHINJSKI PULTI IN STENSKE OBLOGE",
  //     images: [RegionalTwo, RegionalThree],
  //     city: "Horjul",
  //   },
  //   {
  //     name: "Stone Studio Luxury d.o.o.",
  //     link: "https://www.partner1.com",
  //     tagline: "NAGROBNI SPOMENIKI",
  //     images: [RegionalThree, RegionalOne],
  //     city: "Dobrova - Polhov Gradec",
  //   },
  // ];

  return (
    <div className="w-full max-w-5xl mx-auto mb-28">
      <h1 className="flex font-normal text-[40px] leading-[48px] tracking-normal text-black mb-9">
        Regijsko
      </h1>
      <div className="flex flex-col gap-14">
        <RegionSelectionList
          defaultItems={defaultItems}
          items={regionOptions}
          title="region"
        />
        <RegionalPartnersList regionalPartners={regionalPartners} />
      </div>
    </div>
  );
};

const RegionalPartnersList = ({ regionalPartners }) => {
  return (
    <div className="w-full max-w-5xl mx-auto text-left flex flex-row gap-[32px] flex-wrap">
      {regionalPartners?.length === 0 && (
        <p className="text-center">No partners found</p>
      )}
      {regionalPartners.length > 0 &&
        regionalPartners.map((partner, index) => (
          <PartnerAdItem key={index} partner={partner} />
        ))}
    </div>
  );
};

export default RegionalPartnersSection;
