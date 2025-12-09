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

const CveltComp = () => {
  const searchParams = useSearchParams();
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  return (
    <Layout
      from={"18"}
      megaMenu={""}
      forFooter={"memorypage"}
      currentPage="cvetlicarne"
      isMegaMenuVisible={false}
    >
      <div className="flex flex-col mx-auto bg-[#F5F7F9] border-b-[1px] border-[#D4D4D4] w-full">
        <ObituaryListBanner image={"/roza_ozadje.avif"} label={"Cvetličarne"} />
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
