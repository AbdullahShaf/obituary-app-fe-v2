"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ObituaryListBanner from "../components/appcomponents/ObituaryListBanner";
import NextFunerals from "../components/appcomponents/NextFunerals";
import ObituaryListComponent from "../components/appcomponents/ObituaryListComponent";
import SponsorComponent from "../components/appcomponents/SponsorComponent";
import MemorialPageView from "../components/appcomponents/MemorialPageView";
import CommonFooter from "../components/appcomponents/CommonFooter";

const ObituaryListContent = () => {
  const urlSearchParams = useSearchParams();
  const region = urlSearchParams.get("region");
  const city = urlSearchParams.get("city");

  return (
    <>
      <ObituaryListBanner image={"/cvetje.avif"} label={"Osmrtnice"} alt="osmrtnice ozadje" />
      <ObituaryListComponent city={city || null} />
      <NextFunerals />
      <MemorialPageView />
      <SponsorComponent text="To stran so omogočili " region={region || null} city={city || null} />
      <CommonFooter currentPage="/osmrtnice" />
    </>
  );
};

export default ObituaryListContent;

