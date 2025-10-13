import Image from "next/image";
import React from "react";
import iconArrowRight from "@/public/icon_arrowright.png";
import Link from "next/link";
import { format } from "date-fns";

const formatObituaryDate = (dateString) => {
  if (!dateString) return ""; // If date doesn't exist

  const date = new Date(dateString);

  // Otherwise, show full date
  return format(date, "yyyy");
};

const calculateAge = (birthDate, deathDate) => {
  const birth = new Date(birthDate);
  const death = new Date(deathDate);

  let age = death.getFullYear() - birth.getFullYear();
  if (
    death.getMonth() < birth.getMonth() ||
    (death.getMonth() === birth.getMonth() && death.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age;
};

const ObituaryCardFb = ({
  data,
  key,
  index,
  mob,
  selectedCity,
  selectedRegion,
}) => {
  // Conditional formatting
  const formattedBirthDate = formatObituaryDate(data?.birthDate);
  const formattedDeathDate = formatObituaryDate(data?.deathDate);

  const age = calculateAge(data.birthDate, data.deathDate);

  const imageUrl = data?.image || "/user5.jpeg";

  const imageUrl = data?.image || "/user5.jpeg";

  const religionImages = {
    1: "/icon_cross.png",
    2: "/img_plus2.png",
    3: "/img_moon_star.png",
    4: "/img_plus3.png",
    5: "/img_star.png",
  };

  // Build URL with query parameters
  const buildHref = () => {
    const params = new URLSearchParams();

    if (selectedCity) {
      params.set("city", selectedCity);
    }
    if (selectedRegion) {
      params.set("region", selectedRegion);
    }

    const queryString = params.toString();

    return queryString
      ? `/m/${data.slugKey}?${queryString}`
      : `/m/${data.slugKey}`;
  };

  return (
    <Link
      href={buildHref()}
      className="w-full 
      mobile:h-[126px] tablet:h-[170px] desktop:h-[170px]  border-2
       border-white shadow-custom-light-dark-box
          bg-[#E3EAEF]/60 backdrop-blur-[50%] rounded-lg flex justify-start items-center "
    >
      <div className="flex w-full pl-2.5">
        <div className="w-full flex">
          <div
            className="rounded-xl mobile:mr-[17.33px] tablet:mr-[26px] desktop:mr-[29px]  
          shadow-custom-light-dark-box-image p-1 bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF] "
          >
            <Image
              src={imageUrl}
              alt="Slika"
              width={1000}
              height={1000}
              className="mobile:h-[98.53px] tablet:h-[130px]
               desktop:h-[130px] mobile:w-[72px] tablet:w-[95px] desktop:w-[95px] bg-center  rounded-lg"
            />
          </div>

          <div className=" flex-1 flex items-start flex-col  truncate overflow-hidden whitespace-nowrap ">
            <div
              className="flex flex-row w-full items-start mobile:pt-[0px] tablet:pt-[4px]
             desktop:pt-[4px] tablet:pr-[2px] desktop:pr-[2px] "
            >
              <div className="flex flex-1 flex-col">
                <div
                  className="text-[21px] text-[#414141] font-greatVibes font-normal text"
                  style={
                    {
                      // textShadow: "0px 1px 1px #000000, 0px 4px 4px #00000040",
                    }
                  }
                >
                  Za vedno v naših srcih
                </div>
                <div
                  className="font-variation-customOpt24 text-left desktop:text-[24px]
                   tablet:text-[24px] mobile:text-[16px]  text-[#1E2125] leading-[28.13px]"
                >
                  {data.name} {data.sirName}
                </div>
                <p
                  className="block font-variation-customOpt14 tablet:font-variation-customOpt16 
                  desktop:font-variation-customOpt16 text-left desktop:mt-[16px] tablet:mt-[16px]  
                  desktop:text-[16px] tablet:text-[16px] mobile:text-[14px]  text-[#414141] leading-[24px]"
                >
                  {data?.birthDate?.includes("1025") ? (
                    <>{formattedDeathDate}</>
                  ) : (
                    <>
                      {formattedBirthDate} – {formattedDeathDate} ({age} let)
                    </>
                  )}
                </p>
                <div
                  className="flex h-[18px] tablet:h-6 
                 desktop:h-6 items-center tablet:mt-[4px] desktop:mt-[4px]"
                >
                  <p className="font-variation-customOpt14 tablet:font-variation-customOpt16 desktop:font-variation-customOpt16 text-left desktop:text-[16px] tablet:text-[16px] mobile:text-[14px]  text-[#414141] leading-[24px]">
                    {data.location}
                    {key}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {data?.symbol && !mob && (
          <div
            className="absolute z-40 flex justify-end 
              mobile:w-[171px] 
             tablet:w-[420.33px] tablet:pt-[3px]
              desktop:w-[428px] desktop:pt-[3px]  desktop:pr-2
              "
          >
            <Image
              src={religionImages[data?.symbol]}
              alt="Slika"
              width={1000}
              height={1000}
              className={`w-[51px] ${
                data.symbol === "3" ? "h-[50px]" : "h-[55px]"
              }`}
            />
          </div>
        )}
        {data?.symbol && mob && (
          <div
            className=" absolute z-45 flex justify-end 
              w-[171px]  mobile:mt-[28.26px] pr-[3px]
              mobile:w-[263px] 
              "
          >
            <Image
              src={religionImages[data.symbol]}
              alt="Slika"
              width={500}
              height={500}
              className={` w-[37.66px] tablet:h-[65px] tablet:w-[51px] ${
                data.symbol === "3" ? "h-[40px]" : "h-[48px]"
              }`}
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ObituaryCardFb;
