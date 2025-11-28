"use client";

import React, { Suspense } from "react";
import Head from "next/head";
import Layout from "../components/appcomponents/Layout";
import LocalPartnersBanner from "../components/appcomponents/LocalPartnersBanner";
import CommonFooter from "../components/appcomponents/CommonFooter";
import NewsPartnersComponent from "../components/appcomponents/NewsPartners";
import PartnersContactSection from "../components/appcomponents/PartnersContactSection";
import RegionalPartnersSection from "../components/appcomponents/RegionalPartnersSection";
import PartnersServicesSection from "../components/appcomponents/PartnersServicesSection";

const LokalniContent = () => {
  return (
    <>
      <LocalPartnersBanner label={"LOKALNI PARTNERJI"} />
      <div className="flex flex-col mx-auto justify-center items-center w-full">

      <NewsPartnersComponent />
      <PartnersServicesSection />
      <RegionalPartnersSection />
      <PartnersContactSection />
      </div>

      <CommonFooter currentPage="/lokalni" />
    </>
  );
};

const ObituaryList = () => {
  return (
    <>
      <Head>
        <title>Pogrebna podjetja | Lokalni</title>
        <link rel="canonical" href="https://www.osmrtnica.com/lokalni" />
        <meta name="description" content="Pregled lokalnih pogrebna podjetja." />
      </Head>

      <Layout
      megaMenu={""}
      isMegaMenuVisible={false}
      from={"18"}
      currentPage="lokalni"
      forFooter={"memorypage"}
    >
      <div className="flex flex-col mx-auto bg-[#F5F7F9] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <LokalniContent />
        </Suspense>
      </div>
    </Layout>
    </>
  );
};

export default ObituaryList;
