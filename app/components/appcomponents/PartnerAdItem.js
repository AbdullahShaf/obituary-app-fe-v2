import React from "react";
import Link from "next/link";
import CircleArrow from "../../../public/lokalni/circle-arrow.png";
import Image from "next/image";

const PartnerAdItem = ({ partner }) => {
  return (
    <div className="min-w-80 flex flex-col w-80">
      <div className=" img-section h-[340px] w-[340px] relative border border-[#4E4E4E4D] overflow-hidden group">
        <span className="absolute right-0 top-0 city-tag bg-[#3B3B3B] text-white py-[6px] px-[22px] text-lg leading-6 font-normal z-20">
          {partner.city}
        </span>

        {/* First Image */}
        <Image
          fill
          src={partner?.mainImage}
          alt={partner.name}
          className="absolute inset-0 h-full w-full min-w-[340px] object-cover transition-opacity duration-1000 group-hover:opacity-0"
        />

        {/* Hover Image */}
        <Image
          fill
          src={partner?.secondaryImage}
          alt={partner?.name}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
        />
      </div>

      <div className="min-h-[83px] content-section py-4 px-2 bg-gradient-to-r from-[#E3E8EC] to-white shadow-[5px_5px_10px_rgba(194,194,194,0.4)] shadow-[2px_2px_2px_rgba(0,0,0,0.15)] relative w-[340px]">
        <div className="content flex flex-col gap-[2px] ml-3 mt-1">
          <Link target="_blank" href={partner?.website}>
            <h2
              className="text-[#0A85C2] text-sm uppercase leading-6 font-light 
                  max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {partner?.notes}
            </h2>
          </Link>

          <p className="text-[#1E2125] text-xl leading-[100%] font-light max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
            {partner?.name}
          </p>
        </div>

        <Link target="_blank" href={partner?.website}>
          <Image
            src={CircleArrow}
            alt={partner?.name}
            className="size-9 absolute right-2 top-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default PartnerAdItem;
