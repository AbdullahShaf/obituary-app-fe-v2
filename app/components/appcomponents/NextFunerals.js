"use client";
import React, { useState } from "react";
import Dropdown from "@/app/components/appcomponents/Dropdown";
import nodeTie from "@/public/icon_node_tie.png";
import Image from "next/image";
import regionsAndCities from "@/utils/regionAndCities";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { cityToSlug } from "@/utils/citySlug";

const NextFunerals = () => {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState(null);

  const cityOptions = [
    ...Object.values(regionsAndCities)
      .flat()
      .map((city) => ({
        place: city,
        id: city,
      }))
      .sort((a, b) => a.place.localeCompare(b.place, "sl")),
  ];

  const handleCitySelect = (item) => {
    if (item.id === "allCities") {
      setSelectedCity(null);
      router.push("/pogrebi");
    } else {
      setSelectedCity(item.place);
      // Convert city name to slug and navigate to path parameter
      const citySlug = cityToSlug(item.place);
      if (citySlug) {
        router.push(`/pogrebi/${citySlug}`);
      }
    }
  };
  return (
    <div className="w-full bg-gradient-to-br from-[#D3D7DA30] to-[#ECF6FF30] border-[#939393] border-t-2 border-b-2">
      <div className="relative max-w-[1920px] w-full mx-auto flex justify-center h-[312px] mobile:h-[241px]   items-center ">
        <div className="flex flex-row items-center justify-center  h-full">
          <div className="flex justify-center items-center">
            <Image
              src={nodeTie}
              alt="Dekorativna ikona kravate za sekcijo pogrebov"
              className="hidden desktop:flex w-[94.79px] h-[159.08px] mr-[97.38px]"
            />

            <div className="flex h-[148px] mobile:h-[117px] flex-col justify-between desktop:items-center z-60">
              <h2 className="flex text-[40px] mobile:text-[28px] font-normal text-[#414141] font-variation-customOpt40 leading-[47px] mobile:leading-[33px]">
                Pogrebi v naslednjih dneh
              </h2>

              <div className="w-full h-[48px] hidden desktop:flex relative z-[60]">
                <input
                  type="email"
                  placeholder="Išči po imenu / priimku"
                  className="flex text-[16px] leading-[24px] w-[300px] h-[48.48px] bg-[#FFFFFF] font-normal border-[1px] border-[#7C7C7C] rounded-[8px] pl-[20.8px] pr-[23.5px] mr-4 text-[#7C7C7C] font-variation-customOpt16"
                ></input>

                <Dropdown
                  data={cityOptions}
                  label={"Išči po krajih"}
                  isFromNotification={false}
                  isFromFlower={false}
                  selectedValue={selectedCity}
                  onSelect={handleCitySelect}
                />
                <Link
                  href={"/funeralcompany"}
                  className="hidden desktop:flex justify-center ml-4 w-12 items-center h-full desktop:aspect-square rounded-lg bg-[#414141]"
                >
                  <MagnifyingGlassIcon className="w-5 h-5 text-white hidden desktop:block" />
                </Link>
              </div>

              <div className="w-full h-[48px] flex desktop:hidden relative z-[60]">
                <Dropdown
                  data={cityOptions}
                  label={"Občina"}
                  isFromNotification={false}
                  isFromFlower={false}
                  selectedValue={selectedCity}
                  onSelect={handleCitySelect}
                />

                <div className=" hidden tablet:flex justify-center ml-4 w-[160px] items-center h-full  rounded-lg bg-[#414141] text-[16px] font-bold text-[#F6F6F6]  leading-[24px]">
                  Prikaži
                </div>
                <div className="hidden mobile:flex justify-center ml-3 w-12 items-center h-full desktop:aspect-square rounded-lg bg-[#414141]">
                  <MagnifyingGlassIcon className="w-5 h-5 text-white flex" />
                </div>
              </div>
            </div>
            <Image
              src={nodeTie}
              alt="Dekorativna ikona kravate za sekcijo pogrebov"
              className="hidden tablet:flex mobile:flex mobile:absolute w-[94.79px] h-[159.08px] mobile:w-[135px] mobile:h-[191px] ml-[45px] mobile:z-[0]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextFunerals;
