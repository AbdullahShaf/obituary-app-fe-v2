"use client";

import Head from "next/head";
import Image from "next/image";
import { OglasevalciHeader } from "@/app/components/appcomponents/Header";
import { FooterForOglasevalci } from "../components/appcomponents/Footer";
import { useBreakpoint } from "../hooks/useBreakpoint";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cancel from "@/public/xmark.png";

const linksToRender = [{ label: "CENIK", path: "/cenik", active: false }];

function Header() {
  const router = useRouter();

  return (
    <>
      <OglasevalciHeader />
    </>
  );
}

export default function Oglasevalci() {
  const breakpoint = useBreakpoint();

  if (breakpoint === "desktop" || breakpoint === "tablet") {
    return (
      <>
        {/* Allow crawlability but no indexing. */}
        <Head>
          <title>C-Priložnost | Osmrtnica</title>
          <meta name="robots" content="noindex, follow" />
        </Head>

        <div className="bg-[#FBE9E8] min-h-[100vh] text-[#3C3E41] relative">
          <Header />
          {/* <FAQHeader3 /> */}

          {/* <div className="tablet:w-[700px] desktop:w-[1200px] absolute top-[108px] left-1/2 -translate-x-1/2 flex items-end justify-end">
            <h1 className="text-[#0769FD] text-[18px] desktop:text-[20px] mobile:hidden">
              OGLAŠEVALCI
            </h1>
          </div> */}

          <div className="flex flex-col items-center pt-[200px] w-full px-4 max-w-[720px] mx-auto mobile:max-w-[480px]">
            <Image src="/faq_page_icon.png" alt="FAQ" width={94} height={94} />
            <h1 className="text-[40px] font-light mt-4 text-center mobile:text-[26px]">
              Priložnost za prve oglaševalce
            </h1>
            <h2 className="text-[22px] mobile:hidden font-[600] block  mt-2 font-bold text-center">
              Številne ugodnosti
            </h2>

            <h2 className="text-[22px] mobile:block hidden mobile:font-[20px] mt-2 font-bold text-center">
              Dva meseca. Brez obveznosti.
            </h2>

            <section className="mt-10 text-[16px] space-y-6 leading-[1.6] mobile:w-[360px] w-[720px]">
              <div className="w-full bg-[#083545] relative h-12 flex items-center justify-between text-[#D4D4D4] text-[18px] px-6">
                <h3 className="font-medium mb-1">
                  Dodatne ugodnosti za prve pridružene oglaševalce?
                </h3>
                <Image src={Cancel} alt="Cancel" width={12.5} height={12.5} />
              </div>
              <div className="w-[636px] ml-8">
                <p className="font-light text-[16px]">
                  Ne skrivamo, zvestobo nagrajujemo in prve partnerje še bolj.{" "}
                </p>
                <p className="font-light text-[16px] mt-3">
                  Oglaševalce, ki se pridružijo{" "}
                  <span className="font-bold underline text-[#EB1D1D]">
                    do konca leta,{" "}
                  </span>
                  <span>čaka še nekaj dodatnih ugodnosti: </span>
                </p>

                <ul className="list-disc list-outside pl-6 text-[16px] mt-3 space-y-[12px]">
                  <li>
                    Za oglaševanje na vseh treh lokalnih straneh (osmrtnice,
                    pogrebi, cvetličarne), dodamo{" "}
                    <span className="text-[#0769FD] font-bold">
                      brezplačno še četrto - regionalno (!)
                    </span>{" "}
                    <span>
                      oglaševanje na strani pogrebnih podjetij. Pomeni,{" "}
                    </span>
                    <span>plačaš dve, dobiš štiri strani za oglaševanje.</span>
                  </li>

                  <li>
                    <span className="text-[#0769FD] font-bold">
                      Tretja in peta občina sta brezplačni.
                    </span>{" "}
                    <span>
                      Za oglaševanje v dveh občinah, je ena dodatna občina
                      brezplačno, za oglaševanje v treh občinah prejmete dve
                      občini brezplačno.
                    </span>
                  </li>

                  <li>
                    <span className="text-[#0769FD] font-bold">
                      Ljubljana -
                    </span>{" "}
                    <span>
                      brezplačno enako oglaševanje še v eni dodatni občini
                    </span>
                  </li>

                  <li>
                    <span className="text-[#0769FD] font-bold">
                      Skupna FB promocija - partner tedna
                    </span>
                    <span>
                      {" "}
                      (predstavitev na našem FB) za večje oglaševalce{" "}
                    </span>
                  </li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    Dodatno, prvi oglaševalec
                  </span>{" "}
                  v posamezni občini prejme (samo za to občino):
                </p>

                <ul className="list-disc list-outside pl-6 text-[16px] mt-3 space-y-[12px]">
                  <li>
                    <span className="text-[#0769FD] font-bold">
                      Garantirana nespremenjena cena
                    </span>{" "}
                    <span className="">oglaševanja</span>{" "}
                    <span className="text-[#0769FD] font-bold">
                      vse do leta 2030
                    </span>{" "}
                    <br />
                    <span className="text-[#6D778E] text-[14px]">
                      (kot velja po uradnem ceniku letos jeseni. Četudi bi v
                      naslednjih letih spremenili ceno oglaševanja, bo vaša cena
                      ostala nespremenjena do leta 2030. Velja za uradno ceno
                      oglaševanja, ne za popuste, ki so vsako leto različni).
                    </span>
                    <span> Drugi ima garantirano enako ceno do 2028.</span>
                  </li>

                  <li>
                    <span>Vaš logotip bo imel</span>
                    <span className="text-[#0769FD] font-bold">
                      {" "}
                      direktno povezavo do vaše spletne strani{" "}
                    </span>
                    <br />
                    <span className="">
                      ali Facebook profila. Promocija velja izključno za naše
                      Facebook sledilce.
                    </span>
                  </li>
                </ul>

                <div className="pl-2">
                  <p className="mt-12 mb-4">Splača se biti med prvimi.</p>
                  <p className="text-[#6D778E] font-light mt-1 text-[14px]">
                    Op. vse promocije veljajo samo v primeru letne naročnine.
                  </p>
                  <p className="text-[#6D778E] font-light mt-1 text-[14px]">
                    Op. popusti za isto stvar se ne seštevajo. Upošteva se
                    najvišji popust
                  </p>
                  <p className="text-[#6D778E] font-light mt-1 text-[14px]">
                    Op. strani, kjer je mogoče oglaševanje so naslednje:
                  </p>
                  <div className="text-[#6D778E] font-light mt-1 text-[14px]">
                    <ul className="flex flex-row gap-1 text-[#6D778E]">
                      <li className="underline underline-offset-2">
                        <Link href={"/osmrtnice"}>Osmrtnice</Link>
                      </li>
                      <li>
                        <span>*</span>{" "}
                        <Link
                          href={"/pogrebi?city=Celje"}
                          className="underline underline-offset-2"
                        >
                          Pogrebi
                        </Link>{" "}
                      </li>
                      <li>
                        <span>*</span>{" "}
                        <Link
                          href={"/cvetlicarne"}
                          className="underline underline-offset-2"
                        >
                          Cvetličarne
                        </Link>{" "}
                      </li>
                      <li>
                        <span>*</span>{" "}
                        <Link
                          href={"/pogrebna-p"}
                          className="underline underline-offset-2"
                        >
                          Pogrebna podjetja
                        </Link>{" "}
                      </li>
                      <li>
                        <span>
                          (in seveda na strani{" "}
                          <Link
                            href={"/lokalni"}
                            className="underline underline-offset-2"
                          >
                            lokalnih partnerjev
                          </Link>{" "}
                          )
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* set for desktop */}
            <div className="w-[636px] mt-7 pb-[60px] mobile:hidden text-[#3C3E41] ">
              <a
                href={"mailto:info@osmrtnica.com"}
                className="mt-12 mb-4 text-[16px] text-[#0A85C2] font-bold underline underline-offset-2"
              >
                Kontaktirajte nas za izdelavo ponudbe.{" "}
              </a>
              <p className="text-[16px] mt-3 text-[#3C3E41]">
                Pošljite nam svoje podatke z navedbo občin, za katere se
                zanimate in strani, kjer naj bi oglaševali in poslali vam bomo
                ponudbo.
              </p>
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
        {/* Allow crawlability but no indexing. */}
        <Head>
          <title>C-Priložnost | Osmrtnica</title>
          <meta name="robots" content="noindex, follow" />
        </Head>

        <div className="bg-[#FBE9E8] min-h-[100vh] text-[#3C3E41] relative">
          <Header />
          {/* <FAQHeader3 /> */}

          {/* <div className="tablet:w-[700px] desktop:w-[1200px] absolute top-[108px] left-1/2 -translate-x-1/2 flex items-end justify-end">
            <h1 className="text-[#0769FD] text-[18px] desktop:text-[20px] mobile:hidden">
              OGLAŠEVALCI
            </h1>
          </div> */}

          <div className="flex flex-col items-center pt-[200px] w-full px-4 mx-auto max-w-[480px]">
            <Image src="/faq_page_icon.png" alt="FAQ" width={94} height={94} />

            <h2 className="text-[22px] font-[600] block  mt-2 font-bold text-center">
              Številne ugodnosti
            </h2>

            <section className="mt-10 text-[16px] space-y-6 leading-[1.6] w-full">
              <div className="w-full bg-[#083545] relative py-4 h-full max-h-16 flex items-center justify-between text-[#D4D4D4] text-[18px] px-6">
                <h3 className="font-medium">
                  Dodatne ugodnosti za prve pridružene oglaševalce?
                </h3>
                <Image src={Cancel} alt="Cancel" width={12.5} height={12.5} />
              </div>
              <div className="w-full max-w-[636px]">
                <p className="font-light text-[16px]">
                  Ne skrivamo, zvestobo nagrajujemo in prve partnerje še bolj.{" "}
                </p>
                <p className="font-light text-[16px] mt-3">
                  Oglaševalce, ki se pridružijo{" "}
                  <span className="font-bold underline text-[#EB1D1D]">
                    do konca leta,{" "}
                  </span>
                  <span>čaka še nekaj dodatnih ugodnosti: </span>
                </p>

                <ul className="list-disc list-outside pl-6 text-[16px] mt-3 space-y-[12px]">
                  <li>
                    Za oglaševanje na vseh treh lokalnih straneh (osmrtnice,
                    pogrebi, cvetličarne), dodamo{" "}
                    <span className="text-[#0769FD] font-bold">
                      brezplačno še četrto - regionalno (!)
                    </span>{" "}
                    <span>
                      oglaševanje na strani pogrebnih podjetij. Pomeni,{" "}
                    </span>
                    <span>plačaš dve, dobiš štiri strani za oglaševanje.</span>
                  </li>

                  <li>
                    <span className="text-[#0769FD] font-bold">
                      Tretja in peta občina sta brezplačni.
                    </span>{" "}
                    <span>
                      Za oglaševanje v dveh občinah, je ena dodatna občina
                      brezplačno, za oglaševanje v treh občinah prejmete dve
                      občini brezplačno.
                    </span>
                  </li>

                  <li>
                    <span className="text-[#0769FD] font-bold">
                      Ljubljana -
                    </span>{" "}
                    <span>
                      brezplačno enako oglaševanje še v eni dodatni občini
                    </span>
                  </li>

                  <li>
                    <span className="text-[#0769FD] font-bold">
                      Skupna FB promocija - partner tedna
                    </span>
                    <span>
                      {" "}
                      (predstavitev na našem FB) za večje oglaševalce{" "}
                    </span>
                  </li>
                </ul>

                <p className="font-light text-[16px] mt-12">
                  <span className="font-bold underline">
                    Dodatno, prvi oglaševalec
                  </span>{" "}
                  v posamezni občini prejme (samo za to občino):
                </p>

                <ul className="list-disc list-outside pl-6 text-[16px] mt-3 space-y-[12px]">
                  <li>
                    <span className="text-[#0769FD] font-bold">
                      Garantirana nespremenjena cena
                    </span>{" "}
                    <span className="">oglaševanja</span>{" "}
                    <span className="text-[#0769FD] font-bold">
                      vse do leta 2030
                    </span>{" "}
                    <br />
                    <span className="text-[#6D778E] text-[14px]">
                      (kot velja po uradnem ceniku letos jeseni. Četudi bi v
                      naslednjih letih spremenili ceno oglaševanja, bo vaša cena
                      ostala nespremenjena do leta 2030. Velja za uradno ceno
                      oglaševanja, ne za popuste, ki so vsako leto različni).
                    </span>
                    <span> Drugi ima garantirano enako ceno do 2028.</span>
                  </li>

                  <li>
                    <span>Vaš logotip bo imel</span>
                    <span className="text-[#0769FD] font-bold">
                      {" "}
                      direktno povezavo do vaše spletne strani{" "}
                    </span>
                    <br />
                    <span className="">
                      ali Facebook profila. Promocija velja izključno za naše
                      Facebook sledilce.
                    </span>
                  </li>
                </ul>

                <div className="pl-6">
                  <p className="mt-12 mb-4">Splača se biti med prvimi.</p>
                  <p className="text-[#6D778E] font-light mt-1 text-[14px]">
                    Op. vse promocije veljajo samo v primeru letne naročnine.
                  </p>
                  <p className="text-[#6D778E] font-light mt-1 text-[14px]">
                    Op. popusti za isto stvar se ne seštevajo. Upošteva se
                    najvišji popust
                  </p>
                  <p className="text-[#6D778E] font-light mt-1 text-[14px]">
                    Op. strani, kjer je mogoče oglaševanje so naslednje:
                  </p>
                  <div className="text-[#6D778E] font-light mt-1 text-[14px]">
                    <ul className="flex flex-row gap-1 text-[#6D778E] flex-wrap">
                      <li className="underline underline-offset-2">
                        <Link href={"/osmrtnice"}>Osmrtnice</Link>
                      </li>
                      <li>
                        <span>*</span>{" "}
                        <Link
                          href={"/pogrebi?city=Celje"}
                          className="underline underline-offset-2"
                        >
                          Pogrebi
                        </Link>{" "}
                      </li>
                      <li>
                        <span>*</span>{" "}
                        <Link
                          href={"/cvetlicarne"}
                          className="underline underline-offset-2"
                        >
                          Cvetličarne
                        </Link>{" "}
                      </li>
                      <li>
                        <span>*</span>{" "}
                        <Link
                          href={"/pogrebna-p"}
                          className="underline underline-offset-2"
                        >
                          Pogrebna podjetja
                        </Link>{" "}
                      </li>
                      <li>
                        <span>
                          (in seveda na strani{" "}
                          <Link
                            href={"/lokalni"}
                            className="underline underline-offset-2"
                          >
                            lokalnih partnerjev
                          </Link>{" "}
                          )
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* set for desktop */}
            <div className="w-full max-w-[636px] mt-7 pb-[60px]  text-[#3C3E41] px-6">
              <a
                href={"mailto:info@osmrtnica.com"}
                className="mt-12 mb-4 text-[16px] text-[#0A85C2] font-bold underline underline-offset-2"
              >
                Kontaktirajte nas za izdelavo ponudbe.{" "}
              </a>
              <p className="text-[16px] mt-3 text-[#3C3E41]">
                Pošljite nam svoje podatke z navedbo občin, za katere se
                zanimate in strani, kjer naj bi oglaševali in poslali vam bomo
                ponudbo.
              </p>
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
