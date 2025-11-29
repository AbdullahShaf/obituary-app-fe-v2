"use client";
import React, { useEffect, useState } from "react";
import sponser1 from "@/public/sponser1.png";
import sponser2 from "@/public/sponser2.png";
import sponser3 from "@/public/sponser3.png";
import sponser5 from "@/public/sponser5.png";
import sponser6 from "@/public/sponser6.png";
import sponser7 from "@/public/sponser7.png";

import Image from "next/image";
import { usePathname } from "next/navigation";
import userService from "@/services/user-service";
const SponsorComponent = ({ text = "", region, city }) => {
  const pathname = usePathname();
  const [sponsors, setSponsosrs] = useState([]);


  let sponsorPage = '';
  if (pathname.includes('osmrtnice')) {
    sponsorPage = 'osmrtnice';
  } else if (pathname.includes('pogrebi')) {
    sponsorPage = 'pogrebi';
  } else if (pathname.includes('cvetlicarne')) {
    sponsorPage = 'cvetlicarne';
  } else if (pathname.includes('pogrebna-p')) {
    sponsorPage = 'pogrebna podjetja';
  }

  const fetchList = async () => {
    const URI = "?region=" + region + "&city=" + city + "&page=" + sponsorPage;
    const res = await userService.getSponsors(URI);
    setSponsosrs(res?.data ?? []);
  }

  useEffect(() => {
    fetchList();
  }, [region, city])

  return (
    <div className="bg-white">
      <div className="relative max-w-[1920px]  overflow-hidden mx-auto flex py-[115px] mobile:py-[100px] justify-center items-center">
        <div
          className="flex flex-col items-center justify-between
                    w-[1084px] tablet:w-[603px] mobile:w-[360px]"
        >
          <div
            className={`flex h-[28px] text-[#1E2125] mt-[-3px] font-variation-customOpt24 text-[16px] md:text-[24px]`}
          >
            {text ? `${text}` : "S podporo naših najtesnejših partnerjev"}
          </div>
          {sponsors && sponsors.length ? (
            <div className="flex justify-center items-center mt-[30px]">
              {sponsors?.map((item) => {
                return (
                  <div key={item.id} className="flex w-[180px] h-[80px] mobile:w-[150px]  filter grayscale mx-[10px] items-center justify-center">
                    <img
                      src={item?.logo ?? sponser6}
                      alt="sponser2 of the image"
                      className="max-w-[100%]"
                    />
                  </div>
                );

              })}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Image
                src={sponser6}
                alt="sponser2 of the image"
                className="flex  w-[230px] mobile:w-[150px]  filter grayscale"
              />
              <Image
                src={sponser7}
                alt="sponser2 of the image"
                className="flex w-[250px] mobile:w-[150px]   filter grayscale"
              />

              <Image
                src={sponser6}
                alt="sponser2 of the image"
                className="flex  w-[230px]  filter grayscale tablet:hidden mobile:hidden"
              />

              <Image
                src={sponser7}
                alt="sponser2 of the image"
                className="flex  w-[250px]  filter grayscale tablet:hidden mobile:hidden"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsorComponent;
