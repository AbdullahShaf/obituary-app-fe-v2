"use client";

import Head from "next/head";
import Image from "next/image";
import { FAQHeader } from "@/app/components/appcomponents/Header";
import { FooterForFaq2 } from "../components/appcomponents/Footer";
import { useBreakpoint } from "../hooks/useBreakpoint";
import Link from "next/link";

export default function Faq1() {
  const breakpoint = useBreakpoint();

  if (breakpoint === "desktop" || breakpoint === "tablet") {
    return (
      <>
        {/* Allow crawlability but no indexing. */}
        <Head>
          <title>C-Priložnost | Osrmtnica</title>
          <meta name="robots" content="noindex, follow" />
        </Head>

        <div className="bg-[#F9EBD4] min-h-[100vh] text-[#3C3E41] relative">
          <FAQHeader />
          <div className="tablet:w-[700px] desktop:w-[1200px] absolute top-[108px] left-1/2 -translate-x-1/2 flex items-end justify-end">
            <h1 className="text-[#0A85C2] text-[18px] desktop:text-[20px] mobile:hidden">
              CVETLIČARNE
            </h1>
          </div>

          <div className="flex flex-col items-center pt-[200px] w-full px-4 max-w-[720px] mx-auto">
            <Image src="/faq_page_icon.png" alt="FAQ" width={94} height={94} />
            <h1 className="text-[40px] font-light mt-4 text-center mobile:text-[26px]">
              Priložnost za prve cvetličarne
            </h1>
            <h2 className="text-[22px] mobile:hidden block mt-2 font-bold text-center">
              Dodatne ugodnosti
            </h2>

            <p className="font-light text-[16px] mt-[50px]">
              Poleg mesečnih Skrbnikov, digitalnih kartic sožalja, zahval in
              vabil ter nekaterih novosti v nadaljevanju, pripada prvim
              cvetličarnam še nekaj dodatnih ugodnosti.
            </p>
            <h2 className="text-[22px] mobile:block hidden mobile:font-[20px] mt-2 font-bold text-center">
              Dva meseca. Brez obveznosti.
            </h2>

            <section className="mt-10 text-[16px] space-y-6 leading-[1.6] mobile:w-[360px] w-[720px]">
              <div className="w-full bg-[#083545] relative h-12 flex items-center text-[#D4D4D4] text-[18px] pl-6">
                <h3 className="font-medium mb-1">
                  Dodatne ugodnosti za prve pridružene cvetličarne?
                </h3>
              </div>
              <div>
                <p className="font-light text-[16px]">
                  Ne skrivamo, zvestobo nagrajujemo in prve partnerje še bolj.{" "}
                  <br />
                  <br />
                  <span className="font-bold underline">
                    Prvih 60 cvetličarn
                  </span>{" "}
                  oz pridružene, ki poravnajo prvo letno pogodbo
                  <span className="font-bold underline"> do 12. novembra</span>
                </p>

                <ul className="list-disc list-inside text-[16px] mt-4 space-y-0">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Podvojena doba Skrbnikov
                    </span>{" "}
                    do začetka marca 2026
                    <div className="text-[#6D778E] mt-1 pl-5">
                      (vsak Skrbnik, ki ga uporabniki pri vas naročijo velja
                      dvojno dobo - z uporabo vaše kode. Mesečni Skrbnik traja
                      dva meseca. Letni Skrbnik, če se zanj stranka odloči traja
                      2 leti, torej eno leto je plačljivo, drugo pa jim podarite
                      vi, 6-letni Skrbnik traja 12 let. Predstavlja konkurenčno
                      prednost v primerjavi s cvetličarnami, ki bi se vključile
                      kasneje in zagotavlja zadovoljstvo vaših strank, ki jim
                      podarite prav to, česar si želijo, obenem pa je lahko to
                      darilo zdaj na začetku učinkovito orodje za vašo lastno
                      promocijo, o vas se govori).
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Dodatna občina
                    </span>{" "}
                    brezplačno do začetka marca{" "}
                    <span className="text-[#6D778E] mt-1 ">
                      <br />
                      <span className="pl-5"></span>(vaša cvetličarna se
                      pojavlja med lokalnimi v drugem kraju)
                    </span>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Garantirano enako ceno
                    </span>{" "}
                    letne naročnine{" "}
                    <span className="text-[#0A85C2] font-bold">
                      vse do leta 2030
                    </span>
                    <span className="text-[#6D778E] mt-1 ">
                      <br />
                      <div className="ml-5">
                        <span>
                          (kot velja po uradnem ceniku letos jeseni. Pomeni, da
                          četudi bi kdaj v naslednjih letih spremenili ceno
                          naročnine, bo vaša cena ostala nespremenjena za isti
                          paket vse do leta 2030)
                        </span>
                      </div>
                    </span>
                  </li>

                  <li>prednost pri uvajanju nekaterih novih produktov</li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    DODATNO, prva pridružena cvetličarna
                  </span>{" "}
                  v posamezni občini:
                </p>

                <ul className="list-disc list-inside text-[16px] mt-4 space-y-0">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      3+3 mesece oglaševanja
                    </span>{" "}
                    brezplačno!
                    <div className="text-[#6D778E] mt-1 pl-5">
                      3 mesece brezplačnega oglaševanja na eni izmed strani:
                      Osmrtnice, Pogrebi ali Cvetličarne. Kasneje pa za vsak
                      komentar na naši FB strani prejmete en dodatni mesec
                      oglaševanja (največ 3 dodatni meseci). Druga pridružena
                      cvetličarna v občini prejme 1+1 mesec brezplačno.
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      12x12 - prvih 12 cvetličarn
                    </span>{" "}
                    v novembru prejme vsaka po 12 Skrbnikov za spominske
                    <div className="mt-1 pl-5">
                      <span>
                        strani prednikov, ki jih lahko podari svojim klientom
                        naprej{" "}
                      </span>
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
                    </div>
                  </li>

                  <li>
                    Opcija: vzajemno sodelovanje pri promociji na FB
                    (cvetličarna tedna s predstavitvijo).
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
          <FooterForFaq2 />
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

        <div className="bg-[#F9EBD4] min-h-[100vh] text-[#3C3E41]">
          <FAQHeader />

          <div className="w-full hidden mobile:flex gap-[16px] absolute top-[62px] left-0 right-0">
            <div className="bg-[#36556C] w-full">
              <div className="mobile:flex text-[#FFFFFF] items-center justify-between hidden h-[30px] bg-[#36556C] px-3 mobile:max-w-[348px] mx-auto">
                <Link href="/c-faq" className="text-[#fff]">
                  KAKO ZAČETI
                </Link>
                <Link href="/c-info" className="text-[#fff]">
                  CENIK
                </Link>
                <Link href="/c-priloznost" className="text-[#fff]">
                  PRILOŽNOST
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
              za prve cvetličarne
            </h2>

            <section className="mt-10 text-[16px] space-y-6 leading-[1.6] mobile:w-[354px] w-[720px]">
              <div className="w-full bg-[#083545] relative h-12 flex items-center text-[#D4D4D4] text-[18px] pl-2">
                <h3 className="font-medium mb-1">
                  Dodatne ugodnosti za prve naročnike
                </h3>
              </div>

              <div>
                <p className="font-light text-[16px]">
                  Ne skrivamo, zvestobo nagrajujemo in prve partnerje še bolj.{" "}
                  <br />
                  <br />
                  <span className="font-bold underline">
                    Prvih 60 cvetličarn
                  </span>{" "}
                  oz pridružene, ki poravnajo prvo letno pogodbo
                  <span className="font-bold underline"> do 12. novembra</span>
                </p>

                <ul className="list-disc list-inside text-[16px] mt-4 space-y-0">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Podvojena doba Skrbnikov
                    </span>{" "}
                    do začetka <br />
                    <span className="pl-5"></span> marca 2026
                    <div className="text-[#6D778E] mt-1 pl-5">
                      (vsak Skrbnik, ki ga uporabniki pri vas naročijo velja
                      dvojno dobo - z uporabo vaše kode. Mesečni Skrbnik traja
                      dva meseca. Letni Skrbnik, če se zanj stranka odloči traja
                      2 leti, torej eno leto je plačljivo, drugo pa jim podarite
                      vi, 6-letni Skrbnik traja 12 let. Predstavlja konkurenčno
                      prednost v primerjavi s cvetličarnami, ki bi se vključile
                      kasneje in zagotavlja zadovoljstvo vaših strank, ki jim
                      podarite prav to, česar si želijo, obenem pa je lahko to
                      darilo zdaj na začetku učinkovito orodje za vašo lastno
                      promocijo, o vas se govori).
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Dodatna občina
                    </span>{" "}
                    brezplačno do začetka marca
                    <br />
                    <span className="text-[#6D778E] mt-1 pl-5">
                      (vaša cvetličarna se pojavlja med <br />
                      <span className="pl-5"></span>lokalnimi v drugem kraju)
                    </span>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Garantirano enako ceno
                    </span>{" "}
                    letne naročnine <br />
                    <span className="text-[#0A85C2] font-bold pl-5">
                      vse do leta 2030
                    </span>
                    <br />
                    <div className="mt-1 pl-5">
                      <span className="text-[#6D778E]">
                        (kot velja po uradnem ceniku letos jeseni. Pomeni, da
                        četudi bi kdaj v naslednjih letih spremenili ceno
                        naročnine, bo vaša cena ostala nespremenjena za isti
                        paket vse do leta 2030)
                      </span>
                    </div>
                  </li>

                  <li>
                    prednost pri uvajanju nekaterih novih <br />
                    <span className="pl-5"></span> produktov
                  </li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    DODATNO, prva pridružena cvetličarna
                  </span>{" "}
                  v posamezni občini:
                </p>

                <ul className="list-disc list-inside text-[16px] mt-4 space-y-0">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      3+3 mesece oglaševanja
                    </span>{" "}
                    brezplačno!
                    <div className="text-[#6D778E] mt-1 pl-5">
                      3 mesece brezplačnega oglaševanja na eni izmed strani:
                      Osmrtnice, Pogrebi ali Cvetličarne.Kasneje pa za vsak
                      komentar na naši FB strani prejmete en dodatni mesec
                      oglaševanja (največ 3 dodatni meseci). Druga pridružena
                      cvetličarna v občini prejme 1+1 mesec brezplačno.
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      12x12 - prvih 12 cvetličarn
                    </span>{" "}
                    <br />
                    <div className="pl-5">
                      <span>
                        v novembru prejme vsaka po 12 Skrbnikov za spominske
                        strani prednikov, ki jih lahko podari svojim klientom
                        naprej
                      </span>
                    </div>
                    <div className="pl-5 mt-1">
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
                    </div>
                  </li>

                  <li>
                    Opcija: vzajemno sodelovanje pri promociji na{" "}
                    <span className="pl-5">
                      FB (cvetličarna tedna s predstavitvijo).
                    </span>
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
          <FooterForFaq2 />
        </div>
      </>
    );
  }
}
