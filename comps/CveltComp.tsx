"use client";
export const dynamic = "force-dynamic";

import React from "react";
import { useSearchParams } from "next/navigation";
import Layout from "../app/components/appcomponents/Layout";
import ObituaryListBanner from "../app/components/appcomponents/ObituaryListBanner";
import LocalFloristCompo from "../app/components/appcomponents/LocalFloristCompo";
import SponsorComponent from "../app/components/appcomponents/SponsorComponent";
import FloristsFlower from "../app/components/appcomponents/FloristsFlower";
import FloristList from "../app/components/appcomponents/FloristList";
import CommonFooter from "../app/components/appcomponents/CommonFooter";
import Breadcrumbs from "../app/components/appcomponents/Breadcrumbs";
import { APP_BASE_URL } from "@/config/apiConfig";

const CveltComp = () => {
  const searchParams = useSearchParams();
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Domov",
        item: `${APP_BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Lokalne cvetličarne",
        item: `${APP_BASE_URL}/cvetlicarne`,
      },
    ],
  };

  return (
    <Layout
      from={"18"}
      megaMenu={""}
      forFooter={"memorypage"}
      currentPage="cvetlicarne"
      isMegaMenuVisible={false}
    >
      <div className="flex flex-col mx-auto bg-[#F5F7F9] border-b-[1px] border-[#D4D4D4] w-full">
        <ObituaryListBanner
          image={"/roza_ozadje.avif"}
          label={"Lokalne cvetličarne"}
          alt="ozadje za cvetličarne"
        />
        <Breadcrumbs
          items={[
            { label: "Domov", href: "/" },
            { label: "Lokalne cvetličarne" },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <FloristList />
        <LocalFloristCompo />

        <FloristsFlower />
        <SponsorComponent
          text=" S podporo naših najtesnejših partnerjev"
          region={region}
          city={city}
        />
        <CommonFooter currentPage="/cvetlicarne" />
      </div>
    </Layout>
  );
};

export default CveltComp;
