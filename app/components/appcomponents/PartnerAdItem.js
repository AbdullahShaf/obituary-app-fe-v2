"use client";

import React, { useState } from "react";
import Link from "next/link";
import CircleArrow from "../../../public/lokalni/circle-arrow.png";
import Image from "next/image";

const PartnerAdItem = ({ partner }) => {
  const [isHoveredImage, setIsHoveredImage] = useState(false);
  const [isHoveredContent, setIsHoveredContent] = useState(false);

  // --- Safe Website URL Fix ---
  const rawWebsite = partner?.website?.trim();

  const website =
    rawWebsite && rawWebsite.length > 3 && /^https?:\/\//i.test(rawWebsite)
      ? rawWebsite
      : rawWebsite && rawWebsite.length > 3
      ? `https://${rawWebsite.replace(/^(http|https):?\/?/i, "")}`
      : "#"; // fallback

  // Explanation:
  // - If website is empty → "#"
  // - If website is "http" or "http:" → "#"
  // - If website starts with http/https properly → keep it
  // - Otherwise prepend https://

  return (
    <div className="relative flex flex-col w-80 h-[423px]">
      {/* Image Section */}
      <div
        className="img-section h-[340px] w-full relative border border-[#4E4E4E4D] overflow-hidden group"
        onMouseEnter={() => setIsHoveredImage(true)}
        onMouseLeave={() => setIsHoveredImage(false)}
      >
        <span className="absolute right-0 top-0 city-tag bg-[#3B3B3B] text-white py-[6px] px-[22px] text-lg leading-6 font-normal z-20">
          {partner?.city && partner?.city?.length > 0
            ? partner.city
            : partner.region}
        </span>

        {/* Main Image */}
        <Image
          fill
          src={partner?.mainImage}
          alt={partner.name}
          className={`absolute inset-0 h-full w-full min-w-[340px] object-cover transition-opacity duration-500 ${
            isHoveredImage && partner.secondaryImage
              ? "opacity-0"
              : "opacity-100"
          }`}
        />

        {/* Secondary Image */}
        {partner.secondaryImage && (
          <Image
            fill
            src={partner?.secondaryImage}
            alt={partner?.name}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              isHoveredImage ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Content Section */}
      <div
        className={`content-section absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#E3E8EC] to-white shadow-[5px_5px_10px_rgba(194,194,194,0.4)] shadow-[2px_2px_2px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300`}
        style={{
          height: isHoveredContent ? "206px" : "83px",
        }}
        onMouseEnter={() => setIsHoveredContent(true)}
        onMouseLeave={() => setIsHoveredContent(false)}
      >
        <div className="content flex flex-col gap-[2px] ml-3 mt-[18px] relative z-10">
          <Link target="_blank" rel="noopener noreferrer" href={website}>
            <h2 className="text-[#0A85C2] text-sm uppercase leading-6 font-light max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap mb-[2px]">
              {isHoveredImage &&
              partner.secondaryImage &&
              partner.secondaryImageDescription
                ? partner?.secondaryImageDescription
                : partner?.mainImageDescription || ""}
            </h2>
          </Link>

          <p className="text-[#1E2125] text-lg leading-[100%] font-light max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap mb-[26px]">
            {partner?.name}
          </p>

          <p className="text-[#4E4E4E] max-w-[270px] text-xs leading-[140%] font-light text-justify pr-4 mb-2 line-clamp-5">
            {partner?.notes || ""}
          </p>
        </div>

        <Link target="_blank" rel="noopener noreferrer" href={website}>
          <Image
            src={CircleArrow}
            alt={partner?.name}
            className="size-9 absolute right-2 top-2 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default PartnerAdItem;
