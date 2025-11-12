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
          <title>C-Priložnost | Osmrtnica</title>
          <meta name="robots" content="noindex, follow" />
        </Head>

        <div className="bg-[#F9EBD4] min-h-[100vh] text-[#3C3E41] relative">
          <FAQHeader />
          {/* <div className="tablet:w-[700px] desktop:w-[1200px] absolute top-[108px] left-1/2 -translate-x-1/2 flex items-end justify-end">
            <h1 className="text-[#0A85C2] text-[18px] desktop:text-[20px] mobile:hidden">
              CVETLIČARNE
            </h1>
          </div> */}

          <div className="flex flex-col items-center pt-[200px] w-full px-4 max-w-[720px] mx-auto mobile:px-3 mobile:max-w-[480px]">
            <Image src="/faq_page_icon.png" alt="FAQ" width={94} height={94} />
            <h1 className="text-[40px] font-light mt-4 text-center mobile:text-[26px]">
              Priložnost za prve cvetličarne
            </h1>
            <h2 className="text-[22px] mobile:hidden block mt-2 font-bold text-center">
              Dodatne ugodnosti
            </h2>

            <p className="font-light text-[16px] mt-[50px] leading-[24px]">
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
                  Dodatne ugodnosti za prve naročnike
                </h3>
              </div>
              <div className="w-[636px] ml-8">
                <p className="font-light text-[16px]">
                  Ne skrivamo, zvestobo nagrajujemo in prve partnerje še bolj.{" "}
                  <br />
                  <div className=" mt-3">
                    <span className="font-light text-[16px]">
                      Pridružene cvetličarne, ki poravnajo prvo letno pogodbo
                    </span>{" "}
                    <span className="text-[#EB1D1D] font-bold underline underline-offset-2 text-[16px]">
                      do 18. novembra
                    </span>

                    <span className="" > prejmejo: </span>
                  </div>
                </p>

                <ul className="list-disc list-inside text-[16px] mt-3 space-y-[12px]">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      50% popust
                    </span>{" "}
                    <span>za drugo in vsako naslednjo cvetličarno. </span>
                    <div className="text-[#6D778E] leading-[24px] text-[14px] pl-5">
                      S polno ceno se obračuna cvetličarna v največji občini in za vse naslednje cvetličarne velja 50% popust na siceršnjo ceno. Enako velja za pojavljanje med lokalnimi cvetličarnami v drugih krajih (vnesete naslov svoje cvetličarne in izberete drugo občino, kjer naj se pojavlja). Ta promocija velja izključno za naše FB sledilce.
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Skupna FB promocija - cvetličarna tedna
                    </span>{" "}
                    <span>(predstavitev na našem FB profilu za večje </span>
                    <p className="ml-5"><span>partnerje </span>
                      <span className="text-[#6D778E] leading-[24px] text-[14px] ">(in od januarja naprej vsem, ki bodo oddali naprej največ Skrbnikov, digitalnih kartic, vpisali osmrtnic oz drugače promovirali koristi portala osmrtnica.com.</span>
                    </p>
                  </li>

                  <li>prednost pri uvajanju nekaterih novih produktov</li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    DODATNO, prva pridružena cvetličarna
                  </span>{" "}
                  v posamezni občini:
                </p>

                <ul className="list-disc list-inside text-[16px] mt-4 space-y-[12px]">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      3+3 mesece oglaševanja
                    </span>{" "}
                    brezplačno!
                    <div className="text-[#6D778E] text-[14px] pl-5 leading-[24px]">
                      3 mesece brezplačnega oglaševanja na eni izmed strani: Osmrtnice, Pogrebi ali Cvetličarne, aktivnim sodelujočim na naši Facebook strani pa omogočamo še do 3 dodatne mesece oglaševanja. Druga pridružena cvetličarna v občini prejme 1+1 mesec brezplačno.
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Garantirana enaka cena
                    </span>{" "}
                    <span>letne naročnine </span>
                    <span className="text-[#0A85C2] font-bold">
                      vse do leta 2030
                    </span>{" "}
                    <div className="pl-5">
                      <span className="text-[#6D778E] text-[14px] leading-[24px]">
                        (kot velja po uradnem ceniku letos jeseni. Pomeni, da četudi bi kdaj v naslednjih letih spremenili ceno naročnine, bo vaša cena ostala nespremenjena za isti paket vse do leta 2030). Velja za uradno ceno oglaševanja, ne za popuste, ki se spreminjajo).
                      </span>
                    </div>
                  </li>
                </ul>


              </div>
            </section>

            <div className="w-full mt-12">
              <p className=" mb-5  text-[16px]">Splača se biti med prvimi.</p>
              <p className="text-[#6D778E] font-light  text-[14px] leading-[24px]">
                Op. vse promocije veljajo samo v primeru letne naročnine.
              </p>
            </div>

            {/* set for desktop */}
            <div className="w-full mt-[50px] pb-[60px] mobile:hidden space-y-[12px]">
              <p
                className="text-[16px]"
              >
                <a className="text-[#0A85C2] underline" href="mailto:info@osmrtnica.com">Kontaktirajte nas za izdelavo ponudbe.</a>
              </p>
              <p className="text-[16px] leading-[24px]">
                Pošljite nam svoje podatke s podatki cvetličarne oz cvetličarn z navedbo občine oz občin, za katere se zanimate in čas (mesečno oz letno) in poslali vam bomo ponudbo s povezavo za plačilo po spletu oz predračun za plačilo na TRR.
              </p>
              {/* <div
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
              </div> */}
              {/* <Link href={"/cenik"}>
                <Image
                  src={"/cenik_narocilo_btn.png"}
                  alt="Arrow Right"
                  width={250}
                  height={60}
                />
              </Link> */}
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
          <title>C-Priložnost | Osmrtnica</title>
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
                <Link href="/cenik" className="text-[#fff]">
                  CENIK
                </Link>
                <Link href="/c-priloznost" className="text-[#fff]">
                  PRILOŽNOST
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center pt-[200px] w-full px-4 max-w-[720px] mx-auto mobile:px-3 mobile:max-w-[480px]">
            <Image src="/faq_page_icon.png" alt="FAQ" width={79} height={79} />
            <h1 className="text-[40px] font-light mt-4 text-center mobile:text-[26px]">
              Priložnost
            </h1>
            <h2 className="text-[40px] font-light text-center mobile:text-[26px]">

            </h2>
            <h2 className="text-[22px]  block mt-2 font-bold text-center mobile:hidden">
              Dodatne ugodnosti
            </h2>

            <h2 className="text-[22px] mobile:block hidden mobile:font-[20px] mt-2 font-bold text-center">
              za prve cvetličarne
            </h2>

            <p className="mt-6 leading-[20px]">
              Poleg mesečnih Skrbnikov, digitalnih kartic sožalja, zahval in vabil ter nekaterih novosti v nadaljevanju, pripada prvim cvetličarnam še nekaj dodatnih ugodnosti.
            </p>

            <section className="mt-10 text-[16px] space-y-6 leading-[1.6] mobile:w-full mobile:max-w-[480px] w-[720px]">
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
                  <div className="">
                    <span className="font-light text-[16px]">
                      Pridružene cvetličarne, ki poravnajo prvo letno pogodbo
                    </span>{" "}
                    <span className="text-[#EB1D1D] font-bold underline underline-offset-2 text-[16px]">
                      do 18. novembra
                    </span>

                    <span className="" > prejmejo: </span>
                  </div>
                </p>

                <ul className="list-disc list-inside text-[16px] mt-3 space-y-[12px]">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      50% popust
                    </span>{" "}
                    <span className="">za drugo in vsako naslednjo </span>
                    <span className="">cvetličarno. </span>
                    <div className="text-[#6D778E] leading-[24px] text-[14px]">
                      S polno ceno se obračuna cvetličarna v največji občini in za vse naslednje cvetličarne velja 50% popust na siceršnjo ceno. Enako velja za pojavljanje med lokalnimi cvetličarnami v drugih krajih (vnesete naslov svoje cvetličarne in izberete drugo občino, kjer naj se pojavlja). Ta promocija velja izključno za naše FB sledilce.
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Skupna FB promocija - cvetličarna tedna
                    </span>{" "}
                    <span className="">(predstavitev na našem FB profilu za večje </span>
                    <span>partnerje </span>
                    <span className="text-[#6D778E] leading-[24px] text-[14px] ">(in od januarja naprej vsem, ki bodo oddali naprej največ Skrbnikov, digitalnih kartic, vpisali osmrtnic oz drugače promovirali koristi portala osmrtnica.com.</span>
                  </li>

                  <li className="leading-[24px]">
                    prednost pri uvajanju nekaterih novih produktov
                  </li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    DODATNO, prva pridružena cvetličarna
                  </span>{" "}
                  v posamezni občini:
                </p>

                <ul className="list-disc list-inside text-[16px] mt-4 space-y-[12px]">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      3+3 mesece oglaševanja
                    </span>{" "}
                    brezplačno!
                    <div className="text-[#6D778E] text-[14px] leading-[24px]">
                      3 mesece brezplačnega oglaševanja na eni izmed strani: Osmrtnice, Pogrebi ali Cvetličarne, aktivnim sodelujočim na naši Facebook strani pa omogočamo še do 3 dodatne mesece oglaševanja. Druga pridružena cvetličarna v občini prejme 1+1 mesec brezplačno.
                    </div>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Garantirana enaka cena
                    </span>{" "}
                    <span>letne naročnine </span>
                    <span className="text-[#0A85C2] font-bold">
                      vse do leta 2030
                    </span>
                    <div className="">
                      <span className="text-[#6D778E] text-[14px] leading-[24px]">
                        (kot velja po uradnem ceniku letos jeseni. Pomeni, da četudi bi kdaj v naslednjih letih spremenili ceno naročnine, bo vaša cena ostala nespremenjena za isti paket vse do leta 2030). Velja za uradno ceno oglaševanja, ne za popuste, ki se spreminjajo).
                      </span>
                    </div>
                  </li>
                </ul>

                <p className="mt-6 mb-6">Splača se biti med prvimi.</p>
                <p className="text-[#6D778E] font-light mt-1 text-[14px] mb-10 leading-[24px]">
                  Op. vse promocije veljajo samo v primeru letne naročnine.
                </p>
              </div>
            </section>

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
            </Link>
          </div > */}

            {/* set for mobile */}
            <div className="w-full mt-2 pb-[60px] space-y-[12px]">
              <p
                className="text-[16px]"
              >
                <a className="text-[#0A85C2] underline" href="mailto:info@osmrtnica.com">Kontaktirajte nas za izdelavo ponudbe.</a>
              </p>
              <p className="text-[16px] leading-[24px]">
                Pošljite nam svoje podatke s podatki cvetličarne oz cvetličarn z navedbo občine oz občin, za katere se zanimate in čas (mesečno oz letno) in poslali vam bomo ponudbo s povezavo za plačilo po spletu oz predračun za plačilo na TRR.
              </p>

            </div>
            {/* <Link
              href={"/cenik"}
              className="w-[140px] h-[35px] flex items-center justify-center rounded-[2px] text-[14px] text-[#FFFFFF]"
              style={{
                background:
                  "linear-gradient(180deg, #0D94E8 4.81%, #1860A3 100%)",
                border: "2px solid #6D778E",
              }}
            >
              Cenik / Naročilo
            </Link> */}
          </div >
          <FooterForFaq2 />
        </div >
      </>
    );
  }
}
