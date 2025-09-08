"use client";

import { useState, useEffect } from "react";
import { TermsAndCond } from "../components/appcomponents/Footer";
import Layout from "../components/appcomponents/Layout";
import { Desktop } from "./components/Desktop";
import { Tab } from "./components/Tab";
import { Mobile } from "./components/Mobile";

export default function PolitikaZasebnostiPage() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    // Set initial width on mount
    setWidth(window.innerWidth);

    // Update width on resize
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout
      from={"18"}
      megaMenu={""}
      forFooter={"memorypage"}
      currentPage="politika-zasebnosti"
      isMegaMenuVisible={false}
    >
      <div className="w-full">
        <div className="flex flex-col mx-auto bg-[#F5F7F9] w-full max-w-[700px] mt-[160px] text-[#3C3E41] mb-[80px] mobile:mt-[110px] mobile:px-[15px] mobile:mb-[40px]">
          {/* Render nothing until width is detected */}
          {width === null ? null : width < 744 ? (
            <Mobile />
          ) : width <= 1279 ? (
            <Tab />
          ) : (
            <Desktop />
          )}
        </div>
        <TermsAndCond />
      </div>
    </Layout>
  );
}
