"use client";

import React, { Suspense } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import Layout from "../components/appcomponents/Layout";
import MemorialPageView from "../components/appcomponents/MemorialPageView";
import ObituaryListBanner from "../components/appcomponents/ObituaryListBanner";
import NextFunerals from "../components/appcomponents/NextFunerals";
import ObituaryListComponent from "../components/appcomponents/ObituaryListComponent";
import SponsorComponent from "../components/appcomponents/SponsorComponent";
import FloristsComp from "../components/appcomponents/FloristsComp";
import CommonFooter from "../components/appcomponents/CommonFooter";

const ObituaryListContent = () => {
  const searchParams = useSearchParams();
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  return (
    <>
      <ObituaryListBanner image={"/cvetje.avif"} label={"Osmrtnice"} />
      <ObituaryListComponent city={city} />
      <NextFunerals />
      <MemorialPageView />
      <SponsorComponent text="To stran so omogočili " region={region} city={city} />
      <FloristsComp />
      <CommonFooter currentPage="/osmrtnice" />
    </>
  );
};

const ObituaryList = () => {
  return (
    <>
      <Head>
        <title>Osmrtnice | Osmrtnica</title>
        <link rel="canonical" href="https://www.osmrtnica.com/osmrtnice" />
        <meta name="description" content="Pregled lokalnih osmrtnic in pogrebov." />
      </Head>

      <Layout
      megaMenu={""}
      isMegaMenuVisible={false}
      from={"18"}
      currentPage="osmrtnice"
      forFooter={"memorypage"}
    >
      <div className="flex flex-col mx-auto bg-[#F5F7F9] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <ObituaryListContent />
        </Suspense>
      </div>
    </Layout>
    </>
  );
};

export default ObituaryList;
