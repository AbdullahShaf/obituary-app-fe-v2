"use client";

import Head from "next/head";
import Image from "next/image";
import { FAQHeader3 } from "@/app/components/appcomponents/Header";
import { FooterForFaq3 } from "../components/appcomponents/Footer";
import { useBreakpoint } from "../hooks/useBreakpoint";
import Link from "next/link";

export default function Oglasevalci() {
  const breakpoint = useBreakpoint();

  if (breakpoint === "desktop" || breakpoint === "tablet") {
    return (
      <>
        {/* Allow crawlability but no indexing. */}
        <Head>
          <title>C-Priložnost | Osrmtnica</title>
          <meta name="robots" content="noindex, follow" />
        </Head>

        <div className="bg-[#FBE9E8] min-h-[100vh] text-[#3C3E41] relative">
          <FAQHeader3 />
          <div className="tablet:w-[700px] desktop:w-[1200px] absolute top-[108px] left-1/2 -translate-x-1/2 flex items-end justify-end">
            <h1 className="text-[#0A85C2] text-[18px] desktop:text-[20px] mobile:hidden">
              OGLAŠEVALCI
            </h1>
          </div>

          <div className="flex flex-col items-center pt-[200px] w-full px-4 max-w-[720px] mx-auto">
            <Image src="/faq_page_icon.png" alt="FAQ" width={94} height={94} />
            <h1 className="text-[40px] font-light mt-4 text-center mobile:text-[26px]">
              Priložnost za prve oglaševalce
            </h1>
            <h2 className="text-[22px] mobile:hidden block mt-2 font-bold text-center">
              Številne ugodnosti
            </h2>

            <p className="font-light text-[16px] mt-[50px]">
              Šele začenjamo, zato ponujamo nekatere posebne ugodnosti, ki jih
              kasneje ne bo več. Standardni popusti za oglaševalce, ki so del
              redne ponudbe:
              <ul className="list-disc list-inside text-[16px] mt-4 space-y-0 px-3">
                <li>25% popust za drugo in vsako naslednjo občino</li>
                <li>
                  50% popust za oglaševanje na drugi in tretji strani v isti
                  občini (izmed treh: osmrtnice, pogrebi, cvetličarne)
                </li>
              </ul>
            </p>
            <h2 className="text-[22px] mobile:block hidden mobile:font-[20px] mt-2 font-bold text-center">
              Dva meseca. Brez obveznosti.
            </h2>

            <section className="mt-10 text-[16px] space-y-6 leading-[1.6] mobile:w-[360px] w-[720px]">
              <div className="w-full bg-[#083545] relative h-12 flex items-center text-[#D4D4D4] text-[18px] pl-6">
                <h3 className="font-medium mb-1">
                  Dodatne ugodnosti za prve pridružene oglaševalce?
                </h3>
              </div>
              <div>
                <p className="font-light text-[16px]">
                  Naše prve oglaševalske partnerje, ki sklenejo letno pogodbo{" "}
                  <span className="font-bold underline"> do 12. novembra,</span>{" "}
                  čaka še nekaj dodatnih ugodnosti:
                </p>

                <ul className="list-disc list-inside text-[16px] mt-4 space-y-0">
                  <li>
                    Za oglaševanje na vseh treh lokalnih straneh (osmrtnice,
                    pogrebi, cvetličarne), dodamo
                    <br />
                    <div className="pl-5">
                      <span className="text-[#0A85C2] font-bold">
                        brezplačno še četrto - regionalno (!)
                      </span>{" "}
                      oglaševanje na strani pogrebnih podjetij.
                    </div>
                    <div className="text-[#6D778E] mt-1 pl-5">
                      (primer: letno oglaševanje{" "}
                      <span className="underline">na vseh štirih straneh</span>{" "}
                      za manjše občine tako znaša 100+50+50+0=200€; V Ljubljani
                      bi znašalo oglaševanje{" "}
                      <span className="underline">na vseh štirih</span> najbolj
                      obiskanih straneh preračunano 50€ na mesec za vse štiri)
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      5x5 promocija - Pet občin
                    </span>{" "}
                    za 5€ na občino mesečno.{" "}
                    <span className="text-[#6D778E] mt-1 ">
                      <br />
                      <span className="pl-5"></span>(oglaševanje v petih manjših
                      občinah na eni izmed strani: osmrtnice, pogrebi,
                      cvetličarne).
                    </span>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">Ljubljana</span>{" "}
                    - brezplačno enako oglaševanje še v eni dodatni občini
                  </li>

                  <li>
                    Za tiste, ki oglašujejo v treh ali več občinah - posebna
                    promocija oglaševalca na našem FB
                    <div className="pl-5">
                      (
                      <span className="text-[#0A85C2] font-bold">
                        partner tedna
                      </span>{" "}
                      s predstavitvijo).
                    </div>
                  </li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    Dodatno, prvi oglaševalec
                  </span>{" "}
                  v posamezni občini prejme (samo za to občino):
                </p>

                <ul
                  className="list-disc list-inside text-[16px] mt-4 space-y-0 pl-5"
                  style={{ listStylePosition: "outside" }}
                >
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      12x12 - prvih 12 oglaševalcev
                    </span>{" "}
                    prejme vsak po 12 Skrbnikov za spominske strani prednikov,
                    ki jih lahko podari svojim klientom naprej{" "}
                    <span className="text-[#6D778E]">
                      (doslej so bile spominske vezane na aktualne osmrtnice,
                      odslej bodo omogočale tudi zapisovanje in hranjenje
                      spominov najdražjih, ki so odšli pred leti, desetletji).
                      To novost bomo omogočili 12.12. in strani bo mogoče
                      aktivirati do 1.2., sicer zapadejo). Podarjeni skrbniki
                      bodo mesečni, če pa na našem FB komentirate, jim bomo ob
                      aktivaciji dodali še dva dodatna meseca - kar je dovolj
                      časa, da družine spomine skupaj uredijo. Ta promocija je
                      spet lahko dobrodošla dodatna priložnost, da svojim
                      klientom pomagate obuditi dragocene spomine preden
                      zbledijo - ponuja priložnost za povezovanje generacij in
                      mnogi vam bodo še leta hvaležni.
                    </span>
                  </li>

                  <li>
                    Garantirano nespremenjeno ceno oglaševanja vse do leta 2030
                    <br />
                    <span className="text-[#6D778E]">
                      (kot velja po uradnem ceniku letos jeseni. Četudi bi v
                      naslednjih letih spremenili ceno oglaševanja, bo vaša cena
                      ostala nespremenjena)
                    </span>
                  </li>

                  <li>
                    Oglaševan logotip ima direktno povezavo do vaših strani
                  </li>
                  <li>
                    Pri podaljšanju v naslednjem letu prejme naročnik brezplačno
                    letno oglaševanje še na dodatni izmed treh lokalnih strani.
                    Drugi oglaševalec v občini pa enako polletno oglaševanje
                  </li>
                </ul>

                <p className="mt-6 mb-5">Splača se biti med prvimi.</p>
                <p className="text-[#6D778E] font-light mt-1 text-[14px]">
                  Op. vse promocije veljajo samo v primeru letne naročnine.
                  Popusti se ne seštevajo, obvelja višji popust. Osnovni paketi
                  so vnešeni v cenik, kjer je možno tudi naročilo, v primeru
                  obsežnejšega oglaševanja pa nas kontaktirajte, da pripravimo
                  posebno ponudbo.
                </p>
              </div>
            </section>

            {/* set for desktop */}
            <div className="flex justify-between items-center w-full mt-[50px] pb-[60px] mobile:hidden">
              <Link
                className="text-[20px] text-[#0A85C2] underline"
                href={"/kontakt"}
              >
                Kontaktirajte nas
              </Link>
              <div
                className="flex w-[250px] h-[60px] rounded-full bg-white"
                style={{
                  boxShadow: "5px 5px 10px 0px #A6ABBD",
                  border: "0.5px solid #6D778E66",
                }}
              >
                <Link
                  href={"/cenik"}
                  className={`w-[250px] h-[60px] shrink-0 rounded-full text-[#3C3E41] justify-center items-center self-center shadow-custom-light-dark flex font-semibold text-[20px]`}
                  style={{
                    background:
                      "background: linear-gradient(0deg, rgba(231, 235, 240, 0.3), rgba(231, 235, 240, 0.3)), linear-gradient(180deg, rgba(0, 0, 0, 0) 60.83%, rgba(24, 96, 163, 0.1) 100%)",
                    boxShadow: "inset -5px -5px 10px 0px #A6ABBD",
                  }}
                >
                  Cenik / Naročilo
                </Link>
              </div>
              {/* <Link href={"/podjetja"}>
                <button>
                  <Image
                    src="/pridruzi-se-button.svg"
                    alt="Arrow Right"
                    width={250}
                    height={60}
                  />
                </button>
              </Link> */}
            </div>
            {/* <Link
              href={"/podjetja"}
              className="flex justify-end w-full mt-[50px] pb-[60px] mobile:hidden"
            >
              <button>
                <Image
                  src="/pridruzi-se-button.svg"
                  alt="Arrow Right"
                  width={250}
                  height={60}
                />
              </button>
            </Link> */}
          </div>
          <FooterForFaq3 />
        </div>
      </>
    );
  }

  if (breakpoint === "mobile") {
    return (
      <>
        <Head>
          <title>C-Priložnost | Osrmtnica</title>
          <meta name="robots" content="noindex, follow" />
        </Head>

        <div className="bg-[#FBE9E8] min-h-[100vh] text-[#3C3E41]">
          <FAQHeader3 />

          <div className="w-full hidden mobile:flex gap-[16px] absolute top-[62px] left-0 right-0">
            <div className="bg-[#36556C] w-full">
              <div className="mobile:flex text-[#FFFFFF] items-center justify-between hidden h-[30px] bg-[#36556C] px-3 mobile:max-w-[348px] mx-auto">
                <div className="text-[#D4D4D4] text-[12px]">
                  POGREBNA PODJETJA
                </div>
                <Link href="/cvetlicarne" className="text-[#fff] text-[12px]">
                  CVETLIČARNE
                </Link>
                <Link href="/oglasevalci" className="text-[#fff] text-[12px]">
                  OGLAŠEVALCI
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center pt-[200px] w-full px-4 max-w-[720px] mx-auto">
            <Image src="/faq_page_icon.png" alt="FAQ" width={79} height={79} />
            <h1 className="text-[40px] font-light mt-4 text-center mobile:text-[26px]">
              Priložnost
            </h1>
            <h2 className="text-[22px] mobile:hidden block mt-2 font-bold text-center">
              Dodatne ugodnosti
            </h2>

            <h2 className="text-[22px] mobile:block hidden mobile:font-[20px] mt-2 font-bold text-center">
              za prve oglaševalce
            </h2>

            <section className="mt-10 text-[16px] space-y-6 leading-[1.6] mobile:w-[354px] w-[720px]">
              <div className="w-full bg-[#083545] relative h-12 flex items-center text-[#D4D4D4] text-[18px] pl-2">
                <h3 className="font-medium mb-1">
                  Dodatne ugodnosti za prve naročnike
                </h3>
              </div>

              <div>
                <p className="font-light text-[16px]">
                  Naše prve oglaševalske partnerje, ki sklenejo letno pogodbo{" "}
                  <span className="font-bold underline">do 12. novembra,</span>{" "}
                  čaka še nekaj dodatnih ugodnosti:
                </p>

                <ul
                  className="list-disc list-inside text-[16px] mt-4 space-y-0 pl-5"
                  style={{ listStylePosition: "outside" }}
                >
                  <li>
                    Za oglaševanje na vseh treh lokalnih straneh (osmrtnice,
                    pogrebi, cvetličarne), dodamo{" "}
                    <span className="text-[#0A85C2] font-bold">
                      brezplačno še četrto - regionalno (!)
                    </span>{" "}
                    oglaševanje na strani pogrebnih podjetij. <br />
                    <div className="text-[#6D778E] mt-1">
                      (primer: letno oglaševanje{" "}
                      <span className="underline">na vseh štirih straneh</span>{" "}
                      za manjše občine tako znaša 100+50+50+0=200€; V Ljubljani
                      bi znašalo oglaševanje{" "}
                      <span className="underline">na vseh štirih</span> najbolj
                      obiskanih straneh preračunano 50€ na mesec za vse štiri)
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      5x5 promocija - Pet občin
                    </span>{" "}
                    za 5€ na občino mesečno.
                    <br />
                    <span className="text-[#6D778E] mt-1">
                      (oglaševanje v petih manjših občinah na eni izmed strani:
                      osmrtnice, pogrebi, cvetličarne).
                    </span>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">Ljubljana</span>{" "}
                    - brezplačno enako oglaševanje še v eni dodatni občini
                  </li>

                  <li>
                    Za tiste, ki oglašujejo v treh ali več občinah - posebna
                    promocija oglaševalca na našem FB (
                    <span className="text-[#0A85C2] font-bold">
                      partner tedna
                    </span>{" "}
                    s predstavitvijo).
                  </li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    Dodatno, prvi oglaševalec
                  </span>{" "}
                  v posamezni občini prejme (samo za to občino):
                </p>

                <ul
                  className="list-disc list-inside text-[16px] mt-4 space-y-0 pl-5"
                  style={{ listStylePosition: "outside" }}
                >
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      12x12 - prvih 12 oglaševalcev
                    </span>{" "}
                    prejme vsak po 12 Skrbnikov za spominske strani prednikov,
                    ki jih lahko podari svojim klientom naprej{" "}
                    <span className="text-[#6D778E] mt-1">
                      (doslej so bile spominske vezane na aktualne osmrtnice,
                      odslej bodo omogočale tudi zapisovanje in hranjenje
                      spominov najdražjih, ki so odšli pred leti, desetletji).
                      To novost bomo omogočili 12.12. in strani bo mogoče
                      aktivirati do 1.2., sicer zapadejo). Podarjeni skrbniki
                      bodo mesečni, če pa na našem FB komentirate, jim bomo ob
                      aktivaciji dodali še dva dodatna meseca - kar je dovolj
                      časa, da družine spomine skupaj uredijo. Ta promocija je
                      spet lahko dobrodošla dodatna priložnost, da svojim
                      klientom pomagate obuditi dragocene spomine preden
                      zbledijo - ponuja priložnost za povezovanje generacij in
                      mnogi vam bodo še leta hvaležni.
                    </span>
                  </li>

                  <li>
                    Garantirano nespremenjeno ceno oglaševanja vse do leta 2030
                    <br />
                    <span className="text-[#6D778E] mt-1">
                      (kot velja po uradnem ceniku letos jeseni. Četudi bi v
                      naslednjih letih spremenili ceno oglaševanja, bo vaša cena
                      ostala nespremenjena)
                    </span>
                  </li>

                  <li>
                    Oglaševan logotip ima direktno povezavo do vaših strani
                  </li>

                  <li>
                    Pri podaljšanju v naslednjem letu prejme naročnik brezplačno
                    letno oglaševanje še na dodatni izmed treh lokalnih strani.
                    Drugi oglaševalec v občini pa enako polletno oglaševanje
                  </li>
                </ul>

                <p className="mt-6 mb-6">Splača se biti med prvimi.</p>
                <p className="text-[#6D778E] font-light mt-1 text-[14px] mb-10">
                  Op. vse promocije veljajo samo v primeru letne naročnine.
                  Popusti se ne seštevajo, obvelja višji popust. Osnovni paketi
                  so vnešeni v cenik, kjer je možno tudi naročilo, v primeru
                  obsežnejšega oglaševanja pa nas kontaktirajte, da pripravimo
                  posebno ponudbo.
                </p>
              </div>
            </section>

            <Link
              href={"/podjetja"}
              className="flex justify-end w-full mt-[50px] pb-[60px] mobile:hidden"
            >
              <button>
                <Image
                  src="/pridruzi-se-button.svg"
                  alt="Arrow Right"
                  width={250}
                  height={60}
                />
              </button>
            </Link>
          </div>

          {/* set for mobile */}
          <div className="w-full hidden mobile:flex px-7 mb-10 mt-3 justify-between items-center">
            <Link
              className="text-[17px] text-[#0A85C2] underline"
              href={"/kontakt"}
            >
              Kontaktirajte nas
            </Link>
            <Link
              href={"/cenik"}
              className="w-[140px] h-[35px] flex items-center justify-center rounded-[2px] text-[14px] text-[#FFFFFF]"
              style={{
                background:
                  "linear-gradient(180deg, #0D94E8 4.81%, #1860A3 100%)",
                border: "2px solid #6D778E",
              }}
            >
              Cenik / Naročilo
            </Link>
          </div>
          <FooterForFaq3 />
        </div>
      </>
    );
  }
}
