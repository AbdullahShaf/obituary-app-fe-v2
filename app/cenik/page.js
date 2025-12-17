"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import axios from "@/services/axios";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getYear, getMonth } from "date-fns";

import Tabs from "../components/appcomponents/Tabs";
import PaymentModal from "../components/PaymentModal";
import Layout from "../components/appcomponents/Layout";
import PricingCard from "../components/appcomponents/PricingCard";
import WhatIsIncludedPopup from "../components/appcomponents/WhatIsIncludedPopup";
import WhatIsIncludedPopupAdvertisers from "../components/appcomponents/WhatIsIncludedPopupAdvertisers";
import Breadcrumbs from "../components/appcomponents/Breadcrumbs";

const Subscription = () => {
  const { user, isAuthenticated, isRole } = useAuth();

  const isFloristTabPublic = () => {
    const now = new Date();
    const year = getYear(now);
    const month = getMonth(now);

    return year === 2025 && month === 11;
  };

  const showFullFloristContent =
    isFloristTabPublic() || (isAuthenticated && isRole("Florist"));

  const tabs = [
    { id: "spominske", label: "Spominske" },
    { id: "cvetlicarne", label: "Cvetličarne" },
    { id: "oglasevalci", label: "Oglaševalci" },
    { id: "pogrebna-podjetja", label: "Pogrebna podjetja" },
  ];
  const formtabs = [
    { id: "mesecno", label: "MESEČNO" },
    { id: "letno", label: "LETNO*" },
  ];

  const formtabsoglasevalci = [
    { id: "mesecno", label: "MESEČNO" },
    { id: "letno", label: "LETNO*" },
  ];

  const [active, setActive] = useState("spominske");
  const [activeFormTabCvetlicarne, setActiveFormTabCvetlicarne] =
    useState("mesecno");
  const [activeFormTabOglasevalci, setActiveFormTabOglasevalci] =
    useState("mesecno");
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    packageType: null,
    customCode: null,
  });
  const [isWhatIsIncludedOpen, setIsWhatIsIncludedOpen] = useState(false);
  const [isWhatIsIncludedAdvertisersOpen, setIsWhatIsIncludedAdvertisersOpen] = useState(false);

  const handlePayment = (packageType, customCode = null) => {
    setPaymentModal({
      isOpen: true,
      packageType,
      customCode,
    });
  };

  const handleCustomCodeSubmit = (code, type) => {
    // Map the code to the appropriate package type
    const codeToPackageMap = {
      "CUSTOM-001": "custom_one",
      "CUSTOM-002": "custom_two",
    };

    const packageType = codeToPackageMap[code];
    if (!packageType) {
      toast.error(
        "Neveljavna koda. Prosimo preverite kodo in poskusite znova."
      );
      return;
    }

    handlePayment(packageType, code);
  };

  const handleManagePayments = async () => {
    if (!user) {
      toast.error("Potrebna je prijava");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/portal`,
        {
          headers: { "access-token": localStorage.getItem("access-token") },
        }
      );

      if (response.data.success) {
        window.open(response.data.data.portalUrl, "_blank");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Ni najdenih plačil za upravljanje");
      } else {
        toast.error(
          error.response?.data?.message || "Napaka pri dostopu do portala"
        );
      }
    }
  };

  const FormTabsContentCvetlicarne = () => {
    switch (activeFormTabCvetlicarne) {
      case "mesecno":
        return (
          <>
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <PricingCard
                label="MESEČNO"
                title="Manjša mesta"
                price="10 €"
                onPayment={() => handlePayment("florist_monthly_small_city")}
                paymentEnabled={true}
              />
              <PricingCard
                label="MESEČNO"
                price="20 €"
                title="Večja mesta"
                number={1}
                onPayment={() => handlePayment("florist_monthly_large_city")}
                paymentEnabled={true}
              />
              <PricingCard
                label="MESEČNO"
                price="30 €"
                title="Ljubljana"
                onPayment={() => handlePayment("florist_monthly_capital_city")}
                paymentEnabled={true}
              />
              {/* <CustomPackageCard 
                type="florist"
                onCodeSubmit={(code) => handleCustomCodeSubmit(code, 'florist')}
              /> */}
            </div>
          </>
        );
      case "letno":
        return (
          <>
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <PricingCard
                label="LETNO"
                title="Manjša mesta"
                price="100 €"
                onPayment={() => handlePayment("florist_yearly_small_city")}
                paymentEnabled={true}
              />
              <PricingCard
                label="LETNO"
                price="200 €"
                title="Večja mesta"
                number={1}
                onPayment={() => handlePayment("florist_yearly_large_city")}
                paymentEnabled={true}
              />
              <PricingCard
                label="LETNO"
                price="300 €"
                title="Ljubljana"
                onPayment={() => handlePayment("florist_yearly_capital_city")}
                paymentEnabled={true}
              />
              {/* <CustomPackageCard 
                type="florist"
                onCodeSubmit={(code) => handleCustomCodeSubmit(code, 'florist')}
              /> */}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const FormTabsContentOglasevalci = () => {
    switch (activeFormTabOglasevalci) {
      case "mesecno":
        return (
          <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
            <PricingCard
              label="MESEČNO"
              title="Manjša mesta"
              price="10 €"
              onPayment={() => handlePayment("advertiser_monthly_small_city")}
              paymentEnabled={true}
            />
            <PricingCard
              label="MESEČNO"
              price="20 €"
              title="Večja mesta"
              number={1}
              onPayment={() => handlePayment("advertiser_monthly_large_city")}
              paymentEnabled={true}
            />
            <PricingCard
              label="MESEČNO"
              price="30 €"
              title="Ljubljana"
              onPayment={() => handlePayment("advertiser_monthly_capital_city")}
              paymentEnabled={true}
            />
            <PricingCard label="MESEČNO" title="Regijsko" number={2} />
            {/* <CustomPackageCard 
              type="advertiser"
              onCodeSubmit={(code) => handleCustomCodeSubmit(code, 'advertiser')}
            /> */}
          </div>
        );
      case "letno":
        return (
          <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
            <PricingCard
              label="LETNO"
              title="Manjša mesta"
              price="100 €"
              onPayment={() => handlePayment("advertiser_yearly_small_city")}
              paymentEnabled={true}
            />
            <PricingCard
              label="LETNO"
              price="200 €"
              title="Večja mesta"
              number={1}
              onPayment={() => handlePayment("advertiser_yearly_large_city")}
              paymentEnabled={true}
            />
            <PricingCard
              label="LETNO"
              price="300 €"
              title="Ljubljana"
              onPayment={() => handlePayment("advertiser_yearly_capital_city")}
              paymentEnabled={true}
            />
            <PricingCard label="LETNO" title="Regijsko" number={2} />
            {/* <CustomPackageCard 
              type="advertiser"
              onCodeSubmit={(code) => handleCustomCodeSubmit(code, 'advertiser')}
            /> */}
          </div>
        );
      default:
        return null;
    }
  };

  const TabContent = () => {
    switch (active) {
      case "spominske":
        return (
          // <div className="mobile:px-1 mobile:max-w-[500px] mobile:mx-auto p-4 flex flex-col mb-[40px] items-center justify-center desktop:justify-start desktop:items-start mobile:gap-y-11 gap-y-9">
          <div className="mobile:px-1 mobile:max-w-[500px] mobile:mx-auto flex flex-col mb-[40px] w-[766px] mx-auto mobile:gap-y-11 gap-y-9">
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4 mb-[40px]">
              <div className="w-full flex items-center gap-4">
                <h2 className="mobile:text-[24px] text-[32px] text-[#000000]">
                  Spominska stran
                </h2>
              </div>

              <div className="w-full space-y-[12px] ">
                <div className="w-[759px] text-[18px] leading-[24px] mobile:w-full tablet:w-full">
                  <h4 className="text-[#3C3E41]">POZOR:</h4>
                  <p className="text-[#414141]">
                    Če želite postati Skrbnik spominske strani, nas
                    kontaktirajte in bomo to uredili{" "}
                    <span className="text-[#530CC6]">BREZPLAČNO</span>{" "}
                  </p>
                  <p className="w-[586px] mt-1 text-[14px] leading-[24px] text-[#6D778E]  mobile:w-full">
                    (dokler še niso vnešene lokalne cvetličarne v seznam;
                    kasneje vam bodo to uredile cvetličarne).
                  </p>
                </div>
              </div>
              <div className="border-[#0A85C2] border-t-[2px] w-[200px] my-6"></div>

              <p className="text-[#414141] flex gap-1 w-full desktop:w-[780px] mobile:text-[14px] text-[16px]">
                <p className="text-[14px]"></p>{" "}
                <p className="mt-1 mobile:hidden block">
                  Bližnji svojci lahko postanejo Skrbniki spominske strani
                  pokojne/ga. S tem prevzamejo skrb nad objavljenimi vsebinami
                  in omogočijo dodajanje dodatnih vsebin tudi vsem ostalim.
                  Stran postane s skrbnikom toplejša, barvita, pristna, polna
                  zgodb in spominov; stran, na katero se bližnji kasneje pogosto
                  vračajo.
                </p>
                <p className="mobile:block hidden">
                  Bližnji svojci lahko prevzamejo skrb nad objavljenimi
                  vsebinami in omogočijo dodajanje dodatnih vsebin tudi vsem
                  ostalim. Stran postane s skrbnikom toplejša, barvita, pristna,
                  polna zgodb in spominov; stran, na katero se bližnji kasneje
                  pogosto vračajo.{" "}
                </p>
              </p>
              <PricingCard
                label="SPOMINSKA STRAN"
                sublabel="(v cvetličarni)"
                text="brezplačno"
                title="1 mesec brezplačno"
                number={1}
              />
              <PricingCard
                label="SPOMINSKA STRAN"
                sublabel="(preko naše strani)"
                price="10 €"
                mobilesublabel="(na naši strani)"
                title="1 mesec"
                onPayment={() => handlePayment("memory_page_one_month")}
                paymentEnabled={true}
              />
              <PricingCard
                label="spominska STRAN"
                price="20 €"
                title="1 leto"
                onPayment={() => handlePayment("memory_page_one_year")}
                paymentEnabled={true}
              />
              <PricingCard
                label="spominska knjiga"
                price="30 €"
                title="6 let"
                onPayment={() => handlePayment("memory_page_six_years")}
                paymentEnabled={true}
              />
              <div className="text-[#414141] flex gap-1 w-full desktop:w-[754px] text-[14px]">
                <p className="text-[12px]">1</p>{" "}
                <div className="flex flex-col">
                  <p className="mobile:hidden block mt-1">
                    Mesečnega Skrbnika lahko prejmete brezplačno v cvetličarni,
                    ki jo najdete na seznamu lokalnih cvetličarn. Če trenutno še
                    ni vpisane nobene lokalne cvetličarne, nas kontaktirajte in
                    bomo to uredili mi brezplačno.
                  </p>
                  <p className="mobile:block hidden mt-1">
                    Mesečnega Skrbnika lahko prejmete brezplačno v cvetličarni,
                    ki jo najdete na seznamu lokalnih. Če trenutno še ni vpisane
                    nobene v vaši občini, nas kontaktirajte in bomo to uredili
                    mi brezplačno.
                  </p>
                  <p className="text-[#414141] w-full desktop:w-[754px] text-[14px] mt-3">
                    Plačilo je enkratno, brez avtomatskega podaljšanja.
                  </p>
                </div>
              </div>
            </div>
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <PricingCard
                label="zadnji pozdrav, spomini, zahvale"
                title="Brezplačno"
                subtitle="(objavo potrdi skrbnik)"
              />
              <PricingCard
                label="digitalne kartice"
                title="Brezplačno"
                subtitle="(samo v cvetličarni)"
              />
              <PricingCard label="QR kode za nagrobnike" title="Brezplačno" />
              <PricingCard
                label="novosti in občasne druge promocije"
                mobilelabel="NOVOSTI IN DRUGE PROMOCIJE"
                title="Na Facebooku - sledite nam"
                icon="/fb-icon.png"
              />

              <div className="w-[771px] text-[14px] leading-[24px] text-[#6D778E] space-y-[12px] mobile:w-full tablet:w-full mt-[20px]">
                <p>
                  Op. Za postati Skrbnik je nujno potrebno priložiti Smrtovnico,
                  ki vam jo izda pogrebno podjetje (izdajo jo takoj). Smrtovnica
                  je nujno potrebna, da se preprečijo zlorabe, objavljanje
                  lažnih smrti, spam in nasploh, ker skrbnik je lahko samo en
                  izmed najbližnjih pokojni/emu).{" "}
                </p>
                <p>
                  Op. Podarili bomo mesečnega skrbnika; kasneje ga lahko
                  podaljšate ali pa gre v avtomatsko prekinitev (vse dodane
                  vsebine ostanejo na spominski strani, ni pa mogoče dodajati
                  več novih).
                </p>
              </div>

              <div className="w-full flex justify-start mt-[60px]">
                <p className="w-[456px] text-[16px] leading-[24px] mobile:w-full">
                  Imate vprašanja, predloge, komentarje?{" "}
                  <a
                    href="mailto:info@osmrtnica.com"
                    className="text-[#0A85C2] underline underline-offset-2"
                  >
                    {" "}
                    Pišite nam.{" "}
                  </a>
                </p>
                {/* <Link href={"/kontakt"}>
                  <Image
                    src={"/Kontaktirajte_nas_btn.png"}
                    alt="Arrow Right"
                    width={250}
                    height={60}
                  />
                </Link> */}
                {/* <div
                  className="flex w-[250px] h-[60px] rounded-full bg-transparent"
                  style={{
                    boxShadow: "5px 5px 10px 0px #A6ABBD",
                    border: "0.5px solid #6D778E66",
                  }}
                >
                  <Link
                    href={"/kontakt"}
                    className={`w-[250px] h-[60px] shrink-0 rounded-full text-[#3C3E41] justify-center items-center self-center shadow-custom-light-dark flex font-semibold text-[20px]`}
                    style={{
                      background:
                        "background: linear-gradient(0deg, rgba(231, 235, 240, 0.3), rgba(231, 235, 240, 0.3)), linear-gradient(180deg, rgba(0, 0, 0, 0) 60.83%, rgba(24, 96, 163, 0.1) 100%)",
                      boxShadow: "inset -5px -5px 10px 0px #A6ABBD",
                    }}
                  >
                    Kontaktirajte nas
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        );

      case "cvetlicarne":
        return (
          <div className="mobile:px-1 mobile:max-w-[500px] w-[766px] mx-auto mobile:mx-auto p-4 mb-[40px] flex flex-col mobile:items-center mobile:justify-center space-y-4">
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <div className="w-full flex items-center gap-4">
                <h2 className="mobile:text-[24px] text-[32px] text-[#000000]">
                Cvetličarne
                </h2>
              </div>

              {showFullFloristContent ? (
                !isWhatIsIncludedOpen && (
                  <>
                    <p className="text-[#414141] flex gap-1 w-full desktop:w-[744px] mobile:text-[14px] text-[16px]">
                      <p className="text-[14px]"></p>{" "}
                      <p className="mt-1">
                        V ceni je zajeta uvrstitev na seznam lokalnih cvetličarn, prikazovanje lokalnih cvetličarn na lokalnih žalnih straneh / osmrtnicah in vrsta privilegijev, ki so podrobneje predstavljeni na straneh za cvetličarne.
                      </p>
                    </p>
                    <div className="w-full mt-4">
                      <Tabs
                        tabs={formtabs}
                        setActive={setActiveFormTabCvetlicarne}
                        active={activeFormTabCvetlicarne}
                        tabContent={
                          <>
                            <FormTabsContentCvetlicarne />
                            <div className="mobile:w-[99%] mt-4 w-[550px] flex flex-col">
                              <div className="text-[#414141] flex gap-1 mb-[40px] w-full desktop:w-[744px] text-[14px] desktop:text-[14px]">
                                <p className="text-[14px]">1</p>{" "}
                                <div className="flex flex-col">
                                  <p className="mt-1">
                                    Občine nad 25.000 preb: Maribor, Celje, Kranj,
                                    Koper, Novo Mesto, Domžale, Velenje, Nova
                                    Gorica
                                  </p>
                                  <p className="mt-2">
                                    Naročnina s samodejnim podaljšanjem; velja do
                                    preklica.
                                  </p>
                                </div>
                              </div>
                              <div className="w-full flex flex-col gap-4">
                                <div className="relative">
                                  <PricingCard
                                    label="Izdelava lastne strani"
                                    title="Brezplačno"
                                  />
                                </div>
                                <div className="relative">
                                  <PricingCard
                                    label="možnost vpisovanja lokalnih osmrtnic"
                                    mobilelabel="MOŽNOST VPISOVANJA OSMRTNIC"
                                    title="Brezplačno"
                                  />
                                </div>
                                <div className="relative">
                                  <PricingCard
                                    label="darila za vaše stranke; skrbnik, digitalne kartice, qr kode"
                                    mobilelabel="ZA STRANKE: SKRBNIK, KARTICE, QR KODE"
                                    title="Brezplačno"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="text-[#414141] w-full mt-6 desktop:w-[744px] text-[14px] desktop:text-[14px]">
                                  <p className=" mt-4 ">
                                    Poleg naštetega so občasno mogoče še druge
                                    promocije. Preverite trenutne.
                                  </p>
                                  <button
                                    onClick={() => setIsWhatIsIncludedOpen(true)}
                                    className="w-[250px] mt-14 h-[53px] shrink-0 rounded-full text-white justify-center items-center self-center shadow-custom-light-dark bg-gradient-to-b from-[#0D94E8] to-[#1860A3] flex"
                                    style={{
                                      fontSize: "18px",
                                      boxShadow:
                                        "rgba(0, 0, 0, 0.22) 0px 4px 5px 0px, rgba(0, 0, 0, 0.45) 0px 2px 3px 0px",
                                    }}
                                  >
                                    Kaj je vključeno
                                  </button>
                                  <p className="w-[739px] text-[16px] leading-[24px] mt-14 mobile:w-full tablet:w-full">
                                    Imate več cvetličarn, dostavljate v več občin,
                                    razmišljate o širši kampanji? Kontaktirajte
                                    nas, da poiščemo možnosti oz. da vam
                                    pripravimo ponudbo po meri.
                                  </p>
                                  <p className="w-[456px] text-[16px] leading-[24px] mt-3 mobile:w-full">
                                    Imate vprašanja, predloge, komentarje?{" "}
                                    <a
                                      href="mailto:info@osmrtnica.com"
                                      className="text-[#0A85C2] underline underline-offset-2"
                                    >
                                      {" "}
                                      Pišite nam.{" "}
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        }
                        text="* 2 meseca brezplačno + promocije spodaj"
                        innerTab={true}
                      />
                    </div>
                  </>
                )
              ) : (
                // Limited content - shown when not December 2025 AND user is not authenticated florist
                <>
                  <div className="text-[#414141] flex gap-1 w-full desktop:w-[744px] mobile:text-[14px] text-[16px]">
                    <span className="text-[14px]"></span>
                    <p className="mt-1">
                      Registrirajte se in poslali vam bomo vse potrebne
                      informacije in trenutne promocije. Prvo cvetličarno v
                      občini čakajo dodatne ugodnosti. Lahko nas tudi
                      kontaktirate.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/kontakt"
                      className="text-[#0A85C2] underline underline-offset-2 text-[16px]"
                    >
                      Kontaktirajte nas
                    </Link>
                  </div>
                  <div className="mt-6">
                    <Link href="/podjetja">
                      <button
                        className="w-[250px] h-[53px] shrink-0 rounded-full text-white justify-center items-center self-center shadow-custom-light-dark bg-gradient-to-b from-[#0D94E8] to-[#1860A3] flex"
                        style={{
                          fontSize: "18px",
                          boxShadow:
                            "rgba(0, 0, 0, 0.22) 0px 4px 5px 0px, rgba(0, 0, 0, 0.45) 0px 2px 3px 0px",
                        }}
                      >
                        Registracija za cvetličarne
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case "oglasevalci":
        return (
          <div className="mobile:px-1 p-4 mobile:max-w-[500px] w-[766px] mx-auto mobile:mx-auto mb-[40px] flex flex-col mobile:items-center mobile:justify-center space-y-4">
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <div className="w-full flex items-center gap-4">
                <h2 className="mobile:text-[24px] text-[32px] text-[#000000]">
                Oglaševalci
                </h2>
              </div>
              <p className="text-[#414141] flex gap-1 w-full desktop:w-[744px] mobile:text-[16px] text-[16px]">
                <p className="text-[14px]"></p>{" "}
                <p className="mt-1">
                  Oglaševanje je mogoče v za to namenjenih sektorjih na spodnjem
                  delu strani osmrtnice, pogrebi, cvetličarne - prikazan logotip
                  se pojavlja v izbrani občini{" "}
                  <span className="text-[#EB1D1D]">IN</span> hkrati na posebni
                  strani lokalnih partnerjev.
                </p>
              </p>
              <div className="w-full mt-4">
                <Tabs
                  tabs={formtabsoglasevalci}
                  setActive={setActiveFormTabOglasevalci}
                  active={activeFormTabOglasevalci}
                  tabContent={
                    <>
                      <FormTabsContentOglasevalci />
                      <div className="mobile:w-[99%] mt-4 w-[550px] flex flex-col gap-4">
                        <div className="mb-[40px] space-y-1">
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[744px] text-[14px]">
                            <p className="text-[12px]">1</p>{" "}
                            <p className="mt-1">
                              Občine nad 25.000 preb: Maribor, Celje, Kranj,
                              Koper, Novo Mesto, Domžale, Velenje, Nova Gorica
                            </p>
                          </div>
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[794px] text-[14px]">
                            <p className="text-[12px]">2</p>{" "}
                            <p className="mt-1">
                              Kontaktirajte nas. Enako za oglaševanje izven
                              predvidenih mest.
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <PricingCard
                            label="Vsaka naslednja občina"
                            title="25% popust"
                          />
                          <div className="absolute top-1 right-3 text-[#EB1D1D] text-[20px]">
                            *
                          </div>
                        </div>
                        <div className="relative">
                          <PricingCard
                            number={3}
                            label="tretja stran v isti občini"
                            title="Brezplačno"
                          />
                          <div className="absolute top-1 right-3 text-[#EB1D1D] text-[20px]">
                            *
                          </div>
                        </div>
                        {/* <div className="relative">
                          <PricingCard
                            number={4}
                            label="prvi oglaševalec v občini"
                            title="Naslednje leto brezplačno"
                          />
                          <div className="absolute top-1 right-3 text-[#414141] text-[20px]">
                            *
                          </div>
                        </div>
                        <div className="relative">
                          <PricingCard
                            number={5}
                            label="vpis na strani naši partnerji"
                            title="Za vedno"
                          />
                          <div className="absolute top-1 right-3 text-[#414141] text-[20px]">
                            *
                          </div>
                        </div> */}

                        <div className="w-full text-[16px] text-[#414141] leading-[24px]">
                          <p className="text-[14px]">
                            <span className="text-[#EB1D1D] text-[14px]">
                              *
                            </span>{" "}
                            V primeru letne naročnine
                          </p>
                          <p className="mt-1 text-[14px]">
                            <sup className="text-[12px]">3</sup> Na straneh osmrtnice, pogrebi,
                            cvetličarne. Pomeni oglaševanje na treh straneh za
                            ceno dveh.
                          </p>
                          <button
                            onClick={() => setIsWhatIsIncludedAdvertisersOpen(true)}
                            className="w-[250px] mt-14 h-[53px] shrink-0 rounded-full mobile:mx-auto text-white justify-center items-center self-center shadow-custom-light-dark bg-gradient-to-b from-[#0D94E8] to-[#1860A3] flex"
                            style={{
                              fontSize: "18px",
                              boxShadow:
                                "rgba(0, 0, 0, 0.22) 0px 4px 5px 0px, rgba(0, 0, 0, 0.45) 0px 2px 3px 0px",
                            }}
                          >
                            Kaj je vključeno
                          </button>
                          <p className="w-[756px] mt-14 mobile:w-full tablet:w-full">
                            Poleg naštetih so občasne še druge promocije.
                            Kontaktirajte nas za ponudbo po meri.
                          </p>
                          <p className="w-[456px] text-[16px] leading-[24px] mobile:w-full">
                            Imate vprašanja, predloge{" "}
                            <a
                              href="mailto:info@osmrtnica.com"
                              className="text-[#0A85C2] underline underline-offset-2"
                            >
                              {" "}
                              Pišite nam.{" "}
                            </a>
                          </p>
                        </div>

                        {/* <div className="space-y-1">
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[794px] text-[14px] desktop:text-[16px]">
                            <p className="text-[14px]">3</p>{" "}
                            <p className="mobile:hidden block mt-1">
                              Primer: Oglaševanje na strani pogrebi polna cena,
                              na straneh osmrtnice in cvetličarne se obračuna
                              50% popust.
                            </p>
                            <p className="mobile:block hidden mt-1">
                              Primer: Oglaševanje na strani pogrebi polna cena,
                              na straneh osmrtnice in cvetličarne v isti občini
                              pa se obračuna 50% popust.{" "}
                            </p>
                          </div>
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[794px] text-[14px] desktop:text-[16px]">
                            <p className="text-[14px]">4</p>{" "}
                            <p className="mt-1">
                              Pri podaljšanju v naslednjem letu prejme naročnik
                              brezplačno letno oglaševanje na dodatni izmed treh
                              lokalnih strani ali oglaševanje v drugi občini
                              (enakega ranga). Drugi oglaševalec v občini pa
                              enako polletno oglaševanje.
                            </p>
                          </div>
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[794px] text-[14px] desktop:text-[16px]">
                            <p className="text-[14px]">5</p>{" "}
                            <p className="mobile:hidden block mt-1">
                              Vsako podjetje, ki oglašuje vsaj eno leto bo za
                              vedno prikazano na posebni strani Naši partnerji
                              (še v izdelavi).
                            </p>
                            <p className="mobile:block hidden mt-1">
                              Vsako podjetje, ki oglašuje vsaj eno leto bo za
                              vedno prikazano na posebni strani Naši partnerji.
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </>
                  }
                  text="* 2 meseca brezplačno + promocije spodaj"
                  innerTab={true}
                />
              </div>
              {/* <div
                className="w-full flex justify-end mt-[60px] desktop:w-[794px]"
                style={{ marginTop: "60px" }}
              > */}
              {/* <Link href="/kontakt">
                  <Image
                    src={"/Kontaktirajte_nas_btn.png"}
                    alt="Kontaktirajte nas"
                    width={250}
                    height={60}
                  />
                </Link> */}
              {/* <div
                  className="flex w-[250px] h-[60px] rounded-full bg-transparent"
                  style={{
                    boxShadow: "5px 5px 10px 0px #A6ABBD",
                    border: "0.5px solid #6D778E66",
                  }}
                >
                  <Link
                    href={"/kontakt"}
                    className={`w-[250px] h-[60px] shrink-0 rounded-full text-[#3C3E41] justify-center items-center self-center shadow-custom-light-dark flex font-semibold text-[20px]`}
                    style={{
                      background:
                        "background: linear-gradient(0deg, rgba(231, 235, 240, 0.3), rgba(231, 235, 240, 0.3)), linear-gradient(180deg, rgba(0, 0, 0, 0) 60.83%, rgba(24, 96, 163, 0.1) 100%)",
                      boxShadow: "inset -5px -5px 10px 0px #A6ABBD",
                    }}
                  >
                    Kontaktirajte nas
                  </Link>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        );

      case "pogrebna-podjetja":
        return (
          <div className="p-4 mb-[40px] mobile:max-w-[500px] w-[766px] mx-auto mobile:mx-auto flex flex-col mobile:items-center mobile:justify-center space-y-4">
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <div className="w-full flex items-center gap-4">
                <h2 className="mobile:text-[24px] text-[32px] text-[#000000]">
                Pogrebna podjetja
                </h2>
              </div>
              <p className="text-[#414141] flex gap-1 w-full desktop:w-[744px] mobile:text-[14px] text-[16px]">
                <p className="text-[14px]"></p>{" "}
                <p className="mt-1">
                  Vse je brezplačno. Registrirajte se in vse potrebne
                  informacije vas čakajo v vašem uporabniškem računu.
                </p>
              </p>
              <p className="text-[16px] text-[#0A85C2] leading-[24px] underline underlin-offset-2 mt-7">
                Kontaktirajte nas
              </p>
              {/* <div
                className="w-full flex justify-end mt-[60px] desktop:w-[744px]"
                style={{ marginTop: "60px" }}
              >
                <Link href={"/kontakt"}>
                  <Image
                    src={"/Kontaktirajte_nas_btn.png"}
                    alt="Kontaktirajte nas"
                    width={250}
                    height={60}
                  />
                </Link> */}
              {/* <div
                  className="flex w-[250px] h-[60px] rounded-full bg-transparent"
                  style={{
                    boxShadow: "5px 5px 10px 0px #A6ABBD",
                    border: "0.5px solid #6D778E66",
                  }}
                >
                  <Link
                    href={"/kontakt"}
                    className={`w-[250px] h-[60px] shrink-0 rounded-full text-[#3C3E41] justify-center items-center self-center shadow-custom-light-dark flex font-semibold text-[20px]`}
                    style={{
                      background:
                        "background: linear-gradient(0deg, rgba(231, 235, 240, 0.3), rgba(231, 235, 240, 0.3)), linear-gradient(180deg, rgba(0, 0, 0, 0) 60.83%, rgba(24, 96, 163, 0.1) 100%)",
                      boxShadow: "inset -5px -5px 10px 0px #A6ABBD",
                    }}
                  >
                    Kontaktirajte nas
                  </Link>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  const activeTab = tabs.find(tab => tab.id === active);
  const breadcrumbItems = [
    { label: "Domov", href: "/" },
    { label: "Cenik" },
  ];
  if (activeTab) {
    breadcrumbItems.push({ label: activeTab.label });
  }

  return (
    <>
      <Layout from={"23"} forFooter={"cenikpage"}>
        <div
          className={`cenik-page-wrapper w-full bg-[#ECF0F3] mobile:py-3 py-8 ${(active === "cvetlicarne" && showFullFloristContent && isWhatIsIncludedOpen) ||
            (active === "oglasevalci" && isWhatIsIncludedAdvertisersOpen)
            ? "mb-[-2rem]"
            : "lg:px-8"
            }`}
        >
          <div className="w-full desktop:w-[1200px] mx-auto">
            <Breadcrumbs items={breadcrumbItems} />
            {/* Manage Payments Button for logged in users */}
            {/* Temporarily removed for this week */}
            {/* {user && (active === "spominske" || active === "cvetlicarne") && (
              <div className="flex justify-center mb-6">
                <Button
                  variant="bordered"
                  onClick={handleManagePayments}
                  className="bg-slate-50 rounded-xl right-0 text-slate-600"
                >
                  Upravljaj plačila
                </Button>
              </div>
            )} */}

            <Tabs
              tabs={tabs}
              tabContent={
                (active === "cvetlicarne" && showFullFloristContent && isWhatIsIncludedOpen) ||
                  (active === "oglasevalci" && isWhatIsIncludedAdvertisersOpen)
                  ? null
                  : <TabContent />
              }
              active={active}
              setActive={setActive}
            />

            {/* Payment Modal */}
            <PaymentModal
              isOpen={paymentModal.isOpen}
              onClose={() =>
                setPaymentModal({
                  isOpen: false,
                  packageType: null,
                  customCode: null,
                })
              }
              packageType={paymentModal.packageType}
              customCode={paymentModal.customCode}
              onPaymentCreated={(data) => {
                setPaymentModal({
                  isOpen: false,
                  packageType: null,
                  customCode: null,
                });
                toast.success("Preusmerjamo na plačilo...");
              }}
            />
          </div>

          {active === "cvetlicarne" && showFullFloristContent && isWhatIsIncludedOpen && (
            <WhatIsIncludedPopup
              onClose={() => setIsWhatIsIncludedOpen(false)}
            />
          )}

          {active === "oglasevalci" && isWhatIsIncludedAdvertisersOpen && (
            <WhatIsIncludedPopupAdvertisers
              onClose={() => setIsWhatIsIncludedAdvertisersOpen(false)}
            />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Subscription;
