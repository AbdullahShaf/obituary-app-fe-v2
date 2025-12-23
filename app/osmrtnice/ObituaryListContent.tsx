"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ObituaryListBanner from "../components/appcomponents/ObituaryListBanner";
import NextFunerals from "../components/appcomponents/NextFunerals";
import ObituaryListComponent from "../components/appcomponents/ObituaryListComponent";
import SponsorComponent from "../components/appcomponents/SponsorComponent";
import MemorialPageView from "../components/appcomponents/MemorialPageView";
import CommonFooter from "../components/appcomponents/CommonFooter";

const ObituaryListContent = ({ cityParam, h1Text, initialObituaries }: { cityParam?: string; h1Text?: string; initialObituaries?: any[] }) => {
  const urlSearchParams = useSearchParams();
  const region = urlSearchParams.get("region");
  const city = cityParam || urlSearchParams.get("city");
  const displayH1 = h1Text || "Zadnje osmrtnice";

  return (
    <>
      <ObituaryListBanner image={"/cvetje.avif"} label={"Osmrtnice"} alt="osmrtnice ozadje" h1Text={displayH1} />
      <ObituaryListComponent city={city || null} initialObituaries={initialObituaries || []} />
      <NextFunerals />
      <MemorialPageView />
      <SponsorComponent text="To stran so omogočili " region={region || null} city={city || null} />
      <CommonFooter currentPage="/osmrtnice" />
    </>
  );
};

export default ObituaryListContent;