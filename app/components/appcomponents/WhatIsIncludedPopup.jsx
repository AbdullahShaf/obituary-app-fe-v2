"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import PricingCard from "./PricingCard";

export default function WhatIsIncludedPopup({ onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    if (popupRef.current) {
      const elementPosition =
        popupRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={popupRef} className="w-full bg-[#F5EFE6] pt-14 pb-14">
      <div
        style={{ fontFamily: "Roboto Flex" }}
        className="relative desktop:max-w-[766px] tablet:max-w-[580px] mobile:max-w-[500px] w-full mx-auto mobile:px-4 tablet:px-0 px-4 pt-8 pb-[114px] mobile:pt-4 mobile:pb-[60px] tablet:pb-[80px]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 mobile:top-2 mobile:mb-8 z-10"
        >
          <img
            src="/close-icon.svg"
            alt="Close"
            className="desktop:w-[47px] desktop:h-[47px] tablet:w-[40px] tablet:h-[40px] mobile:w-[33px] mobile:h-[33px]"
          />
        </button>
        <h2 className="desktop:text-[32px] mobile:text-[22px] tablet:text-[32px] text-[#444444] mb-14 mobile:mb-4 mobile:mt-10">
          Kaj je vključeno
        </h2>

        <div className="flex mobile:flex-col mobile:items-center tablet:flex-row desktop:gap-[105px] tablet:gap-6 mobile:gap-6 w-[766px]">
          <div className="flex-1 mobile:w-[340px] desktop:max-w-[383px]">
            <div className="desktop:w-[320px] ms-[-10px] desktop:h-[297px] tablet:w-[250px] tablet:h-[232px] mobile:w-[340px] mobile:h-[297px] overflow-hidden">
              <img
                src="/florist/what-is-included-popup/1.png"
                alt="Seznam lokalnih cvetličarn"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="desktop:text-[16px] desktop:leading-[24px] tablet:text-[16px] mobile:text-[16px] text-[#444444] font-normal mt-3">
              Uvrstitev na seznam lokalnih cvetličarn
            </p>
            <Link
              href="/cvetlicarne?city=Trbovlje"
              className="desktop:text-[16px] desktop:leading-[24px] tablet:text-[16px] mobile:text-[16px] text-[#0A85C2] font-normal underline underline-offset-2"
            >
              Odpri
            </Link>
          </div>

          <div className="flex-1 mobile:w-[340px] desktop:max-w-[383px]">
            <div className="desktop:w-[320px] ms-[-9px] desktop:h-[297px] tablet:w-[250px] tablet:h-[232px] mobile:w-[340px] mobile:h-[297px] overflow-hidden border-none">
              <img
                src="/florist/what-is-included-popup/2.png"
                alt="Prikaz na žalnih straneh"
                className="w-full h-full object-cover border-none"
              />
            </div>
            <p className="desktop:text-[16px] desktop:leading-[24px] tablet:text-[16px] mobile:text-[16px] text-[#444444] font-normal mt-3">
              Prikaz na vseh žalnih straneh v občini
            </p>
            <p className="desktop:text-[16px] desktop:leading-[24px] tablet:text-[16px] mobile:text-[16px] text-[#0A85C2] font-normal">
              V spodnjem delu
            </p>
          </div>
        </div>
      </div>

      <div className="border-t-[2px] border-[#0A85C2] w-full desktop:max-w-[1000px] tablet:max-w-[650px] mobile:max-w-[300px] mx-auto"></div>

      <div
        style={{ fontFamily: "Roboto Flex" }}
        className="desktop:max-w-[766px] tablet:max-w-[580px] mobile:max-w-[500px] w-full mx-auto mobile:px-4 tablet:px-0 pt-[114px] pb-8 mobile:pt-[60px] mobile:pb-4 tablet:pt-[80px]"
      >
        <div className="w-[766px]">
          <p className="desktop:text-[20px] desktop:leading-[100%] desktop:max-w-[766px]  tablet:text-[16px] mobile:text-[14px] text-[#0A85C2] font-normal uppercase tracking-wide">
            PRILOŽNOST - AKCIJA V DECEMBRU
          </p>
          <h3 className="desktop:text-[32px] desktop:text-nowrap  desktop:block tablet:hidden desktop:leading-[40px] mobile:hidden tablet:text-[24px] tablet:leading-[32px] mobile:text-[20px] mobile:leading-[26px] text-[#444444] font-normal mt-2">
            Dodatna ugodnost izključno za cvetličarne - oglaševanje
            <br />
            <span className="text-[#EB1D1D] desktop:text-[24px] tablet:text-[20px] mobile:text-[16px]">
              (samo do konca leta)
            </span>
          </h3>
        </div>

        <h3 className="desktop:hidden tablet:block tablet:text-nowrap mobile:block desktop:leading-[40px] tablet:text-[24px] tablet:leading-[32px] mobile:text-[20px] mobile:leading-[26px] text-[#444444] font-normal mt-2">
          <span className="tablet:hidden whitespace-nowrap">Izključno za cvetličarne - oglaševanje<br /></span>
          <span className="mobile:hidden tablet:inline">Izključno za cvetličarne - oglaševanje </span>
          <span className="mobile:text-[16px] mobile:text-[#444444] tablet:hidden">(samo do konca leta)</span>
          <span className="mobile:hidden tablet:inline">(samo do konca leta)</span>
        </h3>

        <div className="flex mobile:flex-row mobile:justify-center tablet:flex-row desktop:gap-[59px] tablet:gap-6 mobile:gap-4 mt-14 w-[766px] mx-auto">
          <div className="flex-1 mobile:flex-none tablet:flex-none">
            <div className="desktop:w-[320px] desktop:h-[216px] tablet:w-[250px] tablet:h-[169px] mobile:w-[130px] mobile:h-[88px] overflow-hidden">
              <img
                src="/florist/what-is-included-popup/5.jpg"
                alt="To stran so omogočili"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="tablet:w-[250px] mobile:hidden desktop:w-[383px] mobile:text-[16px] w-full text-[#444444] mt-6 mobile:mt-3 leading-[22px] text-[14px]">
              Oglaševanje na najbolj obiskanih straneh z možnostjo predstavitve
              produktov s 50% popustom.
            </p>
            <p className="mobile:hidden tablet:w-[250px] desktop:w-[383px] mobile:text-[16px] text-[#444444] mt-3 leading-[22px] text-[14px]">
              Za več informacij odpri podstran{" "}
              <Link
                href="#"
                className="text-[#0A85C2] underline underline-offset-2"
              >
                Oglaševalci (zgoraj)
              </Link>
              .
            </p>
          </div>

          <div className="flex-1 mobile:flex-none tablet:flex-none">
            <div className="desktop:w-[320px] desktop:h-[422px] tablet:w-[250px] tablet:h-[330px] mobile:w-[200px] mobile:h-[263px] overflow-hidden">
              <img
                src="/florist/what-is-included-popup/4.png"
                alt="Adventni aranžma"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mobile:block tablet:hidden desktop:hidden">
          <p className="tablet:w-[250px] mobile:block tablet:hidden desktop:hidden desktop:w-full mobile:text-[14px] text-[14px] w-full text-[#444444] mt-6 mobile:mt-3 leading-[22px]">
            Oglaševanje na najbolj obiskanih straneh z možnostjo predstavitve
            produktov s 50% popustom.
          </p>
          <p className="mobile:block tablet:hidden desktop:hidden tablet:w-[250px] desktop:w-full mobile:text-[14px] text-[14px] text-[#444444] mt-3 leading-[22px]">
            Za več informacij odpri podstran{" "}
            <Link
              href="#"
              className="text-[#0A85C2] underline underline-offset-2"
            >
              Oglaševalci (zgoraj)
            </Link>
            .
          </p>
        </div>

        <div className="mt-[60px] space-y-3 desktop:w-[550px] tablet:w-full mobile:w-full">
          <PricingCard label="OGLAŠEVANJE" title="50% Popust" number={1} />
          <PricingCard
            label="OGLAŠEVANJE - PRVA CVETLIČARNA V OBČINI"
            title="6 mesecev brezplačno"
            number={2}
          />
        </div>

        <div className="mt-[40px] space-y-2">
          <p className="desktop:text-[14px] tablet:text-[14px] mobile:text-[14px] text-[#444444] leading-[20px]">
            <sup className="text-[12px]">1</sup> Oglaševanje na mestih za partnerje s 50% popustom.
            Pomeni od 5€ na mesec naprej (oz manj v primeru letne pogodbe).
            Ponudba velja do konca leta.
          </p>
          <p className="desktop:text-[14px] tablet:text-[14px] mobile:text-[14px] text-[#444444] leading-[20px]">
            <sup className="text-[12px]">2</sup> Prva cvetličarna v občini prejme pol leta oglaševanja
            brezplačno. Druga cvetličarna v občini prejme 3 mesece brezplačno.
          </p>
        </div>

        <div className="flex mobile:flex-col justify-between items-center mobile:items-end mt-[60px] mobile:mt-[40px] gap-4">
          <p className="desktop:text-[16px] tablet:text-[14px] mobile:text-[14px] text-[#6D778E]">
            * Op. vse promocije so veljavne izključno v primeru letne pogodbe
          </p>
          <button
            onClick={onClose}
            className="desktop:text-[16px] tablet:mt-10 mobile:mt-10 tablet:text-[16px] mobile:text-[14px] text-[#0A85C2] underline underline-offset-2 whitespace-nowrap "
          >
            Zapri to okno
          </button>
        </div>
      </div>
    </div>
  );
}
