"use client";
import React, { useState } from "react";
import CompanyAccountLayout from "../components/appcomponents/CompanyAccountLayout";
import Layout from "../components/appcomponents/Layout";
import Tabs from "../components/appcomponents/Tabs";
import PricingCard from "../components/appcomponents/PricingCard";

const Subscription = () => {
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

  const FormTabsContentCvetlicarne = () => {
    switch (activeFormTabCvetlicarne) {
      case "mesecno":
        return (
          <>
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <PricingCard label="MESEČNO" title="Manjša mesta" price="10 €" />
              <PricingCard
                label="MESEČNO"
                price="20 €"
                title="Večja mesta"
                number={1}
              />
              <PricingCard label="MESEČNO" price="30 €" title="Ljubljana" />
            </div>
          </>
        );
      case "letno":
        return (
          <>
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <PricingCard label="LETNO" title="Manjša mesta" price="100 €" />
              <PricingCard
                label="LETNO"
                price="200 €"
                title="Večja mesta"
                number={1}
              />
              <PricingCard label="LETNO" price="300 €" title="Ljubljana" />
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
            <PricingCard label="MESEČNO" title="Manjša mesta" price="10 €" />
            <PricingCard
              label="MESEČNO"
              price="20 €"
              title="Manjša mesta"
              number={1}
            />
            <PricingCard label="MESEČNO" price="30 €" title="Ljubljana" />
            <PricingCard label="MESEČNO" title="Regijsko" number={2} />
          </div>
        );
      case "letno":
        return (
          <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
            <PricingCard label="LETNO" title="Manjša mesta" price="100 €" />
            <PricingCard
              label="LETNO"
              price="200 €"
              title="Manjša mesta"
              number={1}
            />
            <PricingCard label="LETNO" price="300 €" title="Ljubljana" />
            <PricingCard label="LETNO" title="Regijsko" number={2} />
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
          <div className="mobile:px-1 mobile:max-w-[500px] mobile:mx-auto p-4 flex flex-col mb-[40px] items-center justify-center desktop:justify-start desktop:items-start mobile:gap-y-11 gap-y-9">
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <div className="w-full flex items-center gap-4">
                <h2 className="mobile:text-[24px] text-[32px] text-[#000000]">
                  Spominska stran
                </h2>
              </div>
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
              />
              <PricingCard
                label="spominska STRAN"
                price="20 €"
                title="1 leto"
              />
              <PricingCard
                label="spominska knjiga"
                price="30 €"
                title="6 let"
              />
              <div className="text-[#414141] flex gap-1 w-full desktop:w-[754px] text-[14px] desktop:text-[16px]">
                <p className="text-[14px]">1</p>{" "}
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
                  <p className="text-[#414141] w-full desktop:w-[754px] text-[14px] desktop:text-[16px] mt-3">
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
            </div>
          </div>
        );

      case "cvetlicarne":
        return (
          <div className="mobile:px-1 mobile:max-w-[500px] mobile:mx-auto p-4 mb-[40px] flex flex-col items-center justify-center desktop:justify-start desktop:items-start space-y-4">
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <div className="w-full flex items-center gap-4">
                <h2 className="mobile:text-[24px] text-[32px] text-[#000000]">
                  Cvetličarne
                </h2>
              </div>
              <p className="text-[#414141] flex gap-1 w-full desktop:w-[744px] mobile:text-[14px] text-[16px]">
                <p className="text-[14px]"></p>{" "}
                <p className="mt-1">
                  V ceni je zajeta uvrstitev na seznam lokalnih cvetličarn,
                  prikazovanje lokalnih cvetličarn na lokalnih žalnih straneh /
                  osmrtnicah in vrsta privilegijev, ki so podrobneje
                  predstavljeni na straneh za cvetličarne. Več informacij vas
                  čaka v uporabnikem računu.
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
                      <div className="mobile:w-[99%] mt-4 w-[550px] flex flex-col gap-4">
                        <div className="text-[#414141] flex gap-1 mobile:mb-7 mb-4 w-full desktop:w-[744px] text-[14px] desktop:text-[16px]">
                          <p className="text-[14px]">1</p>{" "}
                          <div className="flex flex-col">
                            <p className="mt-1">
                              Občine nad 25.000 preb: Maribor, Celje, Kranj,
                              Koper, Novo mesto, Domžale, Velenje, Nova Gorica
                            </p>
                            <p className="mt-2">
                              Naročnina s samodejnim podaljšanjem; velja do
                              preklica.
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <PricingCard
                            number={2}
                            label="Izdelava lastne strani"
                            title="Brezplačno"
                          />
                          <div className="absolute top-1 right-3 text-[#414141] text-[20px]">
                            *
                          </div>
                        </div>
                        <div className="relative">
                          <PricingCard
                            number={2}
                            label="možnost vpisovanja lokalnih osmrtnic"
                            mobilelabel="MOŽNOST VPISOVANJA OSMRTNIC"
                            title="Brezplačno"
                          />
                          <div className="absolute top-1 right-3 text-[#414141] text-[20px]">
                            *
                          </div>
                        </div>
                        <div className="relative">
                          <PricingCard
                            number={2}
                            label="darila za vaše stranke; skrbnik, digitalne kartice, qr kode"
                            mobilelabel="ZA STRANKE: SKRBNIK, KARTICE, QR KODE"
                            title="Brezplačno"
                          />
                          <div className="absolute top-1 right-3 text-[#414141] text-[20px]">
                            *
                          </div>
                        </div>
                        <div className="relative">
                          <PricingCard
                            number={3}
                            label="vpis na strani naši partnerji"
                            title="Za vedno"
                          />
                          <div className="absolute top-1 right-3 text-[#414141] text-[20px]">
                            *
                          </div>
                        </div>
                        <div>
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[744px] text-[14px] desktop:text-[16px]">
                            <p className="text-[14px]">2</p>{" "}
                            <p className="mobile:hidden block mt-1">
                              Poleg naštetega so občasno mogoče še druge
                              promocije. Kontaktirajte nas in preverite
                              trenutne.
                            </p>
                            <p className="mobile:block hidden mt-1">
                              Občasno v teku še druge promocije. Kontaktirajte
                              nas in preverite trenutne.{" "}
                            </p>
                          </div>
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[794px] text-[14px] desktop:text-[16px]">
                            <p className="text-[14px]">3</p>{" "}
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
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[794px] text-[14px] desktop:text-[16px]">
                            <p className="text-[14px]">*</p>{" "}
                            <div className="flex flex-col">
                              <p className="mt-1">V primeru letne naročnine</p>
                              <p className="mt-1">
                                Če imate cvetličarne v več občinah ali
                                dostavljate v več občin, nas kontaktirajte, da
                                vam pripravimo posebno ponudbo.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                  text="* 2 meseca brezplačno + promocije spodaj"
                  innerTab={true}
                />
              </div>
            </div>
          </div>
        );

      case "oglasevalci":
        return (
          <div className="mobile:px-1 p-4 mobile:max-w-[500px] mobile:mx-auto mb-[40px] flex flex-col items-center justify-center desktop:justify-start desktop:items-start space-y-4">
            <div className="mobile:w-[99%] w-[550px] flex flex-col gap-4">
              <div className="w-full flex items-center gap-4">
                <h2 className="mobile:text-[24px] text-[32px] text-[#000000]">
                  Oglaševalci
                </h2>
              </div>
              <p className="text-[#414141] flex gap-1 w-full desktop:w-[744px] mobile:text-[14px] text-[16px]">
                <p className="text-[14px]"></p>{" "}
                <p className="mt-1">
                  Oglaševanje je mogoče v za to namenjenih sektorjih na spodnjem
                  delu strani osmrtnice, pogrebi, cvetličarne - prikazan logotip
                  se pojavlja v izbrani občini. V kolikor vas zanima oglaševanje
                  izven predvidenega prostora nas pokličite nas in morda bomo
                  našli še druge opcije.
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
                        <div className=" space-y-1">
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[744px] text-[14px] desktop:text-[16px]">
                            <p className="text-[14px]">1</p>{" "}
                            <p className="mt-1">
                              Občine nad 25.000 preb:
                              <br className="md:block lg:hidden hidden" />{" "}
                              Maribor, Celje, Kranj, Koper, Novo mesto, Domžale,
                              Velenje, Nova Gorica
                            </p>
                          </div>
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[794px] text-[14px] desktop:text-[16px]">
                            <p className="text-[14px]">2</p>{" "}
                            <p className="hidden desktop:block mt-1">
                              Kontaktirajte nas. Enako za oglaševanje izven
                              predvidenih mest ter na strani pogrebna podjetja.
                            </p>
                            <p className="mobile:block hidden mt-1">
                              Kontaktirajte nas. Mogoče je tudi oglaševanje
                              izven predvidenih mest{" "}
                            </p>
                            <p className="tablet:block hidden mt-1">
                              Kontaktirajte nas. Enako za oglaševanje izven
                              predvidenih mest
                            </p>
                          </div>
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[794px] text-[14px] desktop:text-[16px]">
                            <p className="mt-1">
                              Naročnina s samodejnim podaljšanjem; velja do
                              preklica.
                            </p>
                          </div>
                          <div className="text-[#414141] flex gap-1 w-full desktop:w-[794px] text-[14px] desktop:text-[16px]">
                            <p className="mt-1">
                              Spodaj nevedene ugodnosti veljajo za letno
                              oglaševanje
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <PricingCard
                            label="Vsaka naslednja občina"
                            title="25% popust"
                          />
                          <div className="absolute top-1 right-3 text-[#414141] text-[20px]">
                            *
                          </div>
                        </div>
                        <div className="relative">
                          <PricingCard
                            number={3}
                            label="druga in tretja stran v isti občini"
                            title="50% popust"
                          />
                          <div className="absolute top-1 right-3 text-[#414141] text-[20px]">
                            *
                          </div>
                        </div>
                        <div className="relative">
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
                        </div>
                        <div className="space-y-1">
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
                        </div>
                      </div>
                    </>
                  }
                  text="* 2 meseca brezplačno + promocije spodaj"
                  innerTab={true}
                />
              </div>
            </div>
          </div>
        );

      case "pogrebna-podjetja":
        return (
          <div className="p-4 mb-[300px] mobile:max-w-[500px] mobile:mx-auto flex flex-col items-center justify-center desktop:justify-start desktop:items-start space-y-4">
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
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <>
      <Layout from={"23"} forFooter={"cenikpage"}>
        <div
          style={{ fontFamily: "Roboto Flex" }}
          className="w-full bg-[#ECF0F3] lg:px-8 mobile:py-3 py-8"
        >
          <div className="w-full desktop:w-[1200px]  mx-auto">
            <Tabs
              tabs={tabs}
              tabContent={<TabContent />}
              active={active}
              setActive={setActive}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Subscription;
