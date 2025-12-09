"use client";

import Head from "next/head";
import Image from "next/image";
import { FooterForOglasevalci } from "../components/appcomponents/Footer";
import { useBreakpoint } from "../hooks/useBreakpoint";
import Cancel from "@/public/xmark.png";
import { useRouter } from "next/navigation";
import { OglasevalciHeader } from "../components/appcomponents/Header";

function Header() {
  const router = useRouter();
  return (
    <>
      <OglasevalciHeader />
    </>
  );
}

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
          <Header />
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
              Številne ugodnosti
            </h2>

            <section className="mt-10 text-[16px] space-y-6 leading-[1.6] mobile:w-[360px] w-[720px]">
              <div className="w-full bg-[#083545] relative h-12 flex items-center justify-between text-[#D4D4D4] text-[18px] px-6">
                <h3 className="font-medium">
                  Dodatne ugodnosti za prve pridružene cvetličarne?
                </h3>
                <Image src={Cancel} alt="Cancel" width={12.5} height={12.5} />
              </div>
              <div className="w-[636px] ml-8">
                <p className="font-light text-[16px]">
                  Ne skrivamo, zvestobo nagrajujemo in prve partnerje še bolj.{" "}
                  <br />
                  <div className="mt-3">
                    <span className="font-light text-[16px]">
                      Cvetličarne, ki se pridružijo
                    </span>{" "}
                    <span className="text-[#EB1D1D] font-bold underline underline-offset-2 text-[16px]">
                      do konca leta
                    </span>
                    <span className=""> čaka še nekaj dodatnih ugodnosti:</span>
                  </div>
                </p>

                <ul className="list-disc list-outside pl-6 text-[16px] mt-3 space-y-[12px]">
                  <li>
                    <span className="text-[#0A85C2] font-bold mr-1">
                      Tretja in peta občina sta brezplačni.
                    </span>
                    <span>
                      Za oglaševanje v dveh občinah, je ena dodatna manjša
                      občina brezplačno, za oglaševanje v treh prejmete dve
                      občini brezplačno.
                    </span>
                    {/* <div className="text-[#6D778E] leading-[24px] text-[14px] pl-5">
                      S polno ceno se obračuna cvetličarna v največji občini in
                      za vse naslednje cvetličarne velja 50% popust na siceršnjo
                      ceno. Enako velja za pojavljanje med lokalnimi
                      cvetličarnami v drugih krajih (vnesete naslov svoje
                      cvetličarne in izberete drugo občino, kjer naj se
                      pojavlja). Ta promocija velja izključno za naše FB
                      sledilce.
                    </div> */}
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold mr-1">
                      Skupna FB promocija - cvetličarna tedna
                    </span>
                    <span>(predstavitev na našem FB za večje partnerje)</span>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold mr-1">
                      Ljubljana
                    </span>
                    <span>
                      - brezplačno oglaševanje še v eni dodatni občini
                    </span>
                  </li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    DODATNO, prva pridružena cvetličarna
                  </span>{" "}
                  v posamezni občini:
                </p>

                <ul className="list-disc list-outside pl-6 text-[16px] mt-4 space-y-[12px]">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Garantirana enaka cena
                    </span>{" "}
                    <span>letne naročnine </span>
                    <span className="text-[#0A85C2] font-bold">
                      vse do leta 2030
                    </span>{" "}
                    <div className="">
                      <span className="text-[#6D778E] text-[14px] leading-[24px]">
                        (kot velja po uradnem ceniku letos jeseni. Pomeni, da
                        četudi bi kdaj v naslednjih letih spremenili ceno
                        naročnine, bo vaša cena ostala nespremenjena za isti
                        paket vse do leta 2030). Velja za uradno ceno
                        oglaševanja, ne za popuste, ki se spreminjajo.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <div className="w-full mt-12 ml-10">
              <p className=" mb-5  text-[16px]">Splača se biti med prvimi.</p>
              <p className="text-[#6D778E] font-light  text-[14px] leading-[24px]">
                Op. vse promocije veljajo samo v primeru letne naročnine.
              </p>
              <p className="text-[#6D778E] font-light  text-[14px] leading-[24px]">
                Op. popusti za isto stvar se ne seštevajo. Upošteva se najvišji
                popust.
              </p>
            </div>

            {/* set for desktop */}
            <div className="w-full mt-[50px] pb-[60px] mobile:hidden space-y-[12px] px-6">
              <p className="text-[16px]">
                <a
                  className="text-[#0A85C2] underline"
                  href="mailto:info@osmrtnica.com"
                >
                  Kontaktirajte nas za izdelavo ponudbe.
                </a>
              </p>
              <p className="text-[16px] leading-[24px]">
                Pošljite nam svoje podatke s podatki cvetličarne oz cvetličarn z
                navedbo občine oz občin, za katere se zanimate in poslali vam
                bomo ponudbo.
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
          <FooterForOglasevalci />
        </div>
      </>
    );
  }

  if (breakpoint === "mobile") {
    return (
      <>
        {" "}
        {/* Allow crawlability but no indexing. */}
        <Head>
          <title>C-Priložnost | Osmrtnica</title>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <div className="bg-[#F9EBD4] min-h-[100vh] text-[#3C3E41] relative">
          <Header />
          {/* <div className="tablet:w-[700px] desktop:w-[1200px] absolute top-[108px] left-1/2 -translate-x-1/2 flex items-end justify-end">
            <h1 className="text-[#0A85C2] text-[18px] desktop:text-[20px] mobile:hidden">
              CVETLIČARNE
            </h1>
          </div> */}

          <div className="flex flex-col items-center pt-[200px] w-full mx-auto px-3 max-w-[480px]">
            <Image src="/faq_page_icon.png" alt="FAQ" width={94} height={94} />
            <h1 className="text-[40px] font-light mt-4 text-center mobile:text-[26px]">
              Priložnost za prve cvetličarne
            </h1>
            <h2 className="text-[22px] block mt-2 font-bold text-center">
              Številne ugodnosti
            </h2>

            <section className="mt-10 text-[16px] space-y-6 leading-[1.6] w-full">
              <div className="w-full bg-[#083545] relative py-4 h-full max-h-16 flex items-center justify-between text-[#D4D4D4] text-[18px] px-6">
                <h3 className="font-medium">
                  Dodatne ugodnosti za prve pridružene cvetličarne?
                </h3>
                <Image src={Cancel} alt="Cancel" width={12.5} height={12.5} />
              </div>
              <div className="max-w-[636px] w-full">
                <p className="font-light text-[16px]">
                  Ne skrivamo, zvestobo nagrajujemo in prve partnerje še bolj.{" "}
                  <br />
                  <div className=" mt-3">
                    <span className="font-light text-[16px]">
                      Cvetličarne, ki se pridružijo
                    </span>{" "}
                    <span className="text-[#EB1D1D] font-bold underline underline-offset-2 text-[16px]">
                      do konca leta
                    </span>
                    <span className=""> čaka še nekaj dodatnih ugodnosti:</span>
                  </div>
                </p>

                <ul className="list-disc list-outside pl-6 text-[16px] mt-3 space-y-[12px]">
                  <li>
                    <span className="text-[#0A85C2] font-bold mr-1">
                      Tretja in peta občina sta brezplačni.
                    </span>
                    <span>
                      Za oglaševanje v dveh občinah, je ena dodatna manjša
                      občina brezplačno, za oglaševanje v treh prejmete dve
                      občini brezplačno.
                    </span>
                    {/* <div className="text-[#6D778E] leading-[24px] text-[14px] pl-5">
                      S polno ceno se obračuna cvetličarna v največji občini in
                      za vse naslednje cvetličarne velja 50% popust na siceršnjo
                      ceno. Enako velja za pojavljanje med lokalnimi
                      cvetličarnami v drugih krajih (vnesete naslov svoje
                      cvetličarne in izberete drugo občino, kjer naj se
                      pojavlja). Ta promocija velja izključno za naše FB
                      sledilce.
                    </div> */}
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold mr-1">
                      Skupna FB promocija - cvetličarna tedna
                    </span>
                    <span>(predstavitev na našem FB za večje partnerje)</span>
                  </li>

                  <li>
                    <span className="text-[#0A85C2] font-bold mr-1">
                      Ljubljana
                    </span>
                    <span>
                      - brezplačno oglaševanje še v eni dodatni občini
                    </span>
                  </li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    DODATNO, prva pridružena cvetličarna
                  </span>{" "}
                  v posamezni občini:
                </p>

                <ul className="list-disc list-outside pl-6 text-[16px] mt-4 space-y-[12px]">
                  <li>
                    <span className="text-[#0A85C2] font-bold">
                      Garantirana enaka cena
                    </span>{" "}
                    <span>letne naročnine </span>
                    <span className="text-[#0A85C2] font-bold">
                      vse do leta 2030
                    </span>{" "}
                    <div className="">
                      <span className="text-[#6D778E] text-[14px] leading-[24px]">
                        (kot velja po uradnem ceniku letos jeseni. Pomeni, da
                        četudi bi kdaj v naslednjih letih spremenili ceno
                        naročnine, bo vaša cena ostala nespremenjena za isti
                        paket vse do leta 2030). Velja za uradno ceno
                        oglaševanja, ne za popuste, ki se spreminjajo.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <div className="w-full mt-12 ml-10">
              <p className=" mb-5  text-[16px]">Splača se biti med prvimi.</p>
              <p className="text-[#6D778E] font-light  text-[14px] leading-[24px]">
                Op. vse promocije veljajo samo v primeru letne naročnine.
              </p>
              <p className="text-[#6D778E] font-light  text-[14px] leading-[24px]">
                Op. popusti za isto stvar se ne seštevajo. Upošteva se najvišji
                popust.
              </p>
            </div>

            {/* set for desktop */}
            <div className="w-full mt-[50px] pb-[60px] space-y-[12px] px-6">
              <p className="text-[16px]">
                <a
                  className="text-[#0A85C2] underline"
                  href="mailto:info@osmrtnica.com"
                >
                  Kontaktirajte nas za izdelavo ponudbe.
                </a>
              </p>
              <p className="text-[16px] leading-[24px]">
                Pošljite nam svoje podatke s podatki cvetličarne oz cvetličarn z
                navedbo občine oz občin, za katere se zanimate in poslali vam
                bomo ponudbo.
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
          <FooterForOglasevalci />
        </div>
      </>
    );
  }
}
