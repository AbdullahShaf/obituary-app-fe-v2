"use client";
export const dynamic = "force-dynamic";

import React from "react";
import { useSearchParams } from "next/navigation";
import Layout from "../app/components/appcomponents/Layout";
import WorkTogetherComp from "../app/components/appcomponents/WorkTogetherComp";
import ObituaryListBanner from "../app/components/appcomponents/ObituaryListBanner";
import FuneralList from "../app/components/appcomponents/FuneralList";
import SponsorComponent from "../app/components/appcomponents/SponsorComponent";
import PartnersCompo from "../app/components/appcomponents/PartnersCompo";
import CommonFooter from "../app/components/appcomponents/CommonFooter";

const FuneralsList = () => {
  const searchParams = useSearchParams();
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  return (
    <Layout from={"18"} megaMenu={""} forFooter={"memorypage"} currentPage="pogrebna-p" isMegaMenuVisible={false}>
      <div className="flex flex-col mx-auto bg-[#F5F7F9] border-b-[1px] border-[#D4D4D4] w-full">
        <ObituaryListBanner
          image={"/belo_ozadje.jpg"}
          label={"Pogrebna podjetja"}
        />
        <FuneralList />
        <WorkTogetherComp />
        <PartnersCompo />
        <SponsorComponent region={region} city={city} />
        <CommonFooter currentPage="/pogrebna-p" />

      </div>
    </Layout>
  );
};

export default FuneralsList;
