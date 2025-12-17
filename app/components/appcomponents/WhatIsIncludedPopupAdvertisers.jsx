"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function WhatIsIncludedPopupAdvertisers({ onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    if (popupRef.current) {
      const elementPosition = popupRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 100, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={popupRef} className="w-full bg-[#F5EFE6] pt-14 pb-14">
      <div
        className="relative desktop:max-w-[766px] tablet:max-w-[580px] mobile:max-w-[500px] w-full mx-auto mobile:px-4 tablet:px-0 pt-8 pb-[60px] mobile:pt-4 mobile:pb-[40px] tablet:pb-[60px]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 mobile:top-2 z-10"
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

        <div className="mobile:hidden tablet:flex desktop:flex desktop:gap-[59px] tablet:gap-[59px] items-start">
          <div className="flex-none tablet:w-[200px]">
            <div className="desktop:w-[320px] desktop:h-auto tablet:w-[200px] tablet:h-[135px] overflow-hidden">
              <img
                src="/florist/what-is-included-popup/5.jpg"
                alt="To stran so omogočili"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex-1 desktop:max-w-[383px] tablet:max-w-[383px]">
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal">
              Oglaševanje v za to namenjenih sektorjih na spodnjem delu najbolj obiskanih strani:
            </p>
            <ul className="text-[16px] leading-[24px] text-[#444444] font-normal mt-3 list-disc list-inside">
              <li>osmrtnice</li>
              <li>pogrebi</li>
              <li>cvetličarne</li>
            </ul>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-6">
              Gre za oglaševanje logotipa z direktno povezavo do vaših strani. Logotip se pojavlja v izbrani občini.
            </p>
          </div>
        </div>

        <div className="mobile:block tablet:hidden desktop:hidden">
          <div className="flex justify-end">
            <div className="w-[200px] h-[135px] overflow-hidden">
              <img
                src="/florist/what-is-included-popup/5.jpg"
                alt="To stran so omogočili"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal">
              Oglaševanje v za to namenjenih sektorjih na spodnjem delu najbolj obiskanih strani:
            </p>
            <ul className="text-[16px] leading-[24px] text-[#444444] font-normal mt-3 list-disc list-inside">
              <li>osmrtnice</li>
              <li>pogrebi</li>
              <li>cvetličarne</li>
            </ul>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-4">
              Gre za oglaševanje logotipa z direktno povezavo do vaših strani. Logotip se pojavlja v izbrani občini.
            </p>
          </div>
        </div>
      </div>

      <div
        className="desktop:max-w-[766px] tablet:max-w-[580px] mobile:max-w-[500px] w-full mx-auto mobile:px-4 tablet:px-0 pt-[25px] pb-8 mobile:pt-[25px] mobile:pb-4 tablet:pt-[25px]"
      >
        <div className="mobile:hidden tablet:hidden desktop:flex desktop:gap-[59px] items-start">
          <div className="flex-1 desktop:max-w-[383px]">
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal">
              Istočasno oglaševalec dobi prostor tudi na posebni strani lokalnih partnerjev, kjer je mogoča prava predstavitev produktov.
            </p>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-6">
              Vaš okvir se pojavlja tako med storitvami, kot tudi regionalno. Puščica odpre vašo spletno stran.
            </p>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-6">
              V primeru oglaševanja na vsaj dveh omenjenih straneh (osmrtnice, pogrebi, cvetličarne), se odpre še druga slika in tekst v ozadju.
            </p>
            <Link
              href="/lokalni"
              className="text-[16px] leading-[24px] text-[#0A85C2] font-normal underline underline-offset-2 mt-6 inline-block"
            >
              Odpri stran
            </Link>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-14">
              Poleg naštetih so občasne še druge promocije. Kontaktirajte nas, da vam pripravimo ponudbo po meri.
            </p>
          </div>

          <div className="flex-none">
            <div className="desktop:w-[320px] desktop:h-[422px] overflow-hidden">
              <img
                src="/florist/what-is-included-popup/6.png"
                alt="Nagrobni spomeniki"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mobile:hidden tablet:flex desktop:hidden tablet:gap-8 items-start">
          <div className="flex-1 tablet:max-w-[370px]">
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal">
              Istočasno oglaševalec dobi prostor tudi na posebni strani lokalnih partnerjev, kjer je mogoča prava predstavitev produktov.
            </p>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-6">
              Vaš okvir se pojavlja tako med storitvami, kot tudi regionalno. Puščica odpre vašo spletno stran.
            </p>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-6">
              V primeru oglaševanja na vsaj dveh omenjenih straneh (osmrtnice, pogrebi, cvetličarne), se odpre še druga slika in tekst v ozadju.
            </p>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-14">
              Poleg naštetih so občasne še druge promocije. Kontaktirajte nas, da vam pripravimo ponudbo po meri.
            </p>
          </div>

          <div className="flex-none">
            <div className="tablet:w-[200px] tablet:h-[304px] overflow-hidden">
              <img
                src="/florist/what-is-included-popup/6.png"
                alt="Nagrobni spomeniki"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <Link
              href="/lokalni"
              className="text-[16px] leading-[24px] text-[#0A85C2] font-normal underline underline-offset-2 mt-4 inline-block text-right w-full"
            >
              Odpri stran
            </Link>
          </div>
        </div>

        <div className="mobile:block tablet:hidden desktop:hidden">
          <div className="flex items-center justify-between">
            <div className="flex-none flex items-center">
              <Link
                href="/lokalni"
                className="text-[16px] leading-[24px] text-[#0A85C2] font-normal underline underline-offset-2"
              >
                Odpri stran
              </Link>
            </div>
            <div className="flex-none">
              <div className="w-[200px] h-[264px] overflow-hidden">
                <img
                  src="/florist/what-is-included-popup/6.png"
                  alt="Nagrobni spomeniki"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal">
              Istočasno oglaševalec dobi prostor tudi na posebni strani lokalnih partnerjev, kjer je mogoča prava predstavitev produktov.
            </p>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-6">
              Vaš okvir se pojavlja tako med storitvami, kot tudi regionalno. Puščica odpre vašo spletno stran.
            </p>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-6">
              V primeru oglaševanja na vsaj dveh omenjenih straneh (osmrtnice, pogrebi, cvetličarne), se odpre še druga slika in tekst v ozadju.
            </p>
            <p className="text-[16px] leading-[24px] text-[#444444] font-normal mt-6">
              Poleg naštetih so občasne še druge promocije. Kontaktirajte nas, da vam pripravimo ponudbo po meri.
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-[60px] mobile:mt-[40px]">
          <button
            onClick={onClose}
            className="text-[16px] leading-[24px] text-[#0A85C2] underline underline-offset-2 whitespace-nowrap"
          >
            Zapri to okno
          </button>
        </div>
      </div>
    </div>
  );
}
