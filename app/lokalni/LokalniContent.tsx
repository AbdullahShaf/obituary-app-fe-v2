"use client";

import React, { useState, useEffect } from "react";
import LocalPartnersBanner from "../components/appcomponents/LocalPartnersBanner";
import CommonFooter from "../components/appcomponents/CommonFooter";
import NewsPartnersComponent from "../components/appcomponents/NewsPartners";
import PartnersContactSection from "../components/appcomponents/PartnersContactSection";
import RegionalPartnersSection from "../components/appcomponents/RegionalPartnersSection";
import PartnersServicesSection from "../components/appcomponents/PartnersServicesSection";
import categoryService from "@/services/category-service";
import screenSizes from "./constant";

const LokalniContent = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [screen, setScreen] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (width === undefined) {
      return;
    }
    
    if (width < 744) {
      setScreen(screenSizes.MOBILE);
    } else if (width >= 744 && width <= 1279) {
      setScreen(screenSizes.TABLET);
    } else {
      setScreen(screenSizes.DESKTOP);
    }
  }, [width]);

  const [categories, setCategories] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("region");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoryService.getAllCategories();
      setCategories(Array.isArray(response) ? response : []);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <LocalPartnersBanner
        screen={screen}
        label={"LOKALNI PARTNERJI"}
        categories={categories}
      />
      <div className="flex flex-col mx-auto justify-center items-center w-full">
        <NewsPartnersComponent screen={screen} />
        <PartnersServicesSection
          screen={screen}
          categories={categories}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <RegionalPartnersSection
          screen={screen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <PartnersContactSection />
      </div>

      <CommonFooter currentPage="/lokalni" />
    </>
  );
};

export default LokalniContent;

