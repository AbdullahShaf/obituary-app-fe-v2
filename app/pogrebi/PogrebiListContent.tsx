"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ObituaryListBanner from "../components/appcomponents/ObituaryListBanner";
import PogrebiListComponent from "../components/appcomponents/PogrebiListComponent";
import SponsorComponent from "../components/appcomponents/SponsorComponent";
import Carousel from "../components/slidercomponents/Carousel";
import MainOptions from "../components/appcomponents/MainOptions";
import PogrebiLocalFloristComp from "../components/PogrebiLocalFloristComp";
import CommonFooter from "../components/appcomponents/CommonFooter";

const PogrebiListContent = ({ cityParam, h1Text }: { cityParam?: string; h1Text?: string }) => {
  const urlSearchParams = useSearchParams();
  const region = urlSearchParams.get("region");
  const city = cityParam || urlSearchParams.get("city");
  const displayH1 = h1Text || "Pogrebi v naslednjih dneh";

  return (
    <>
      <ObituaryListBanner image={"/pogrebi_ozadje.png"} label={"Pogrebi"} alt="pogrebi ozadje" h1Text={displayH1} />
      <PogrebiListComponent city={city || null} />
      <Carousel city={city || null} region={region || null} />

      <hr className="mt-[41px] tablet:mt-[63px] desktop:mt-[115px] mb-[51px] tablet:mb-[83px] desktop:mb-[93px] mobile:h-[2px]  h-2 bg-zinc-300 border-2" />

      <MainOptions />
      <PogrebiLocalFloristComp />
      <SponsorComponent text="To stran so omogočili" region={region || null} city={city || null} />
      <CommonFooter currentPage="/pogrebi" />
    </>
  );
};

export default PogrebiListContent;

