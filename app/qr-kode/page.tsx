

import React from "react";
import type { Metadata } from "next";
import "./qr-kode.css";
import "./qr-kode-responsive.css";
import Image from "next/image";
import bannerImg from "@/public/qr-kode/banner_img.png";
import scanSvg from "@/public/qr-kode/scan_svg.svg";
import mosnterPicIcon from "@/public/qr-kode/mosnter_pic_icon.svg";
import editingIcon from "@/public/qr-kode/editing_icon.svg";
import bnefitsQrImg1 from "@/public/qr-kode/bnefits_qr_img1.png";
import bnefitsQrImg2 from "@/public/qr-kode/qr_osmrtnica.png";
import bnefitsQrImg3 from "@/public/qr-kode/bnefits_qr_img2.png";
import bnefitsQrImg4 from "@/public/qr-kode/bnefits_qr_img3.png";
import qr_screenshoot_img from "@/public/qr-kode/qr_screenshoot_img.png";
import footer_logo from "@/public/qr-kode/footer_logo.svg";
import facebook_icon from "@/public/qr-kode/facebook_icon.svg";
import twitter_icon from "@/public/qr-kode/twitter_icon.svg";
import linnked_in_icons from "@/public/qr-kode/linnked_in_icons.svg";
import instagram_icon from "@/public/qr-kode/instagram_icon.svg";
import logo from "@/public/qr-kode/logo.svg";
import header_back_icon from "@/public/qr-kode/header_back_icon.svg";
import ClientAccordionBehavior from "./ClientAccordionBehavior";
import { FrequentlyAskedQuestionView2 } from "../components/appcomponents/FrequentlyAskedQuestionView";

import CommonFooter from "../components/appcomponents/CommonFooter";
import Layout from "../components/appcomponents/Layout";




export const metadata: Metadata = {
  title: "QR kode za nagrobnike | Spominska stran",
  description:
    "Sodobni in trajni način ohranjanja spomina - QR kode za nagrobnike. Dodajte fotografije, življenjepis, video posnetke in posebne trenutke.",
  openGraph: {
    title: "QR kode za nagrobnike | Spominska stran",
    description:
      "Sodobni in trajni način ohranjanja spomina - QR kode za nagrobnike.",
    type: "website",
    url: "/qr-kode",
  },
  alternates: {
    canonical: "https://www.osmrtnica.com/qr-kode",
  },
};



export default function QrKodeZaNagrobnikePage() {



  const faqData = {
    faqs: [
      {
        question: "Podrobna navodila za skeniranje QR kod",
        answer: `Branje QR kod je preprosto in večina sodobnih telefonov ne potrebuje posebne aplikacije, saj je funkcija že vgrajena neposredno v kamero.

Postopek je enostaven: odprite aplikacijo kamere in jo usmerite na kodo QR. Poskrbite, da je koda v celoti znotraj okvirja. Čez sekundo ali dve se bo na zaslonu prikazalo obvestilo in z dotikom nanj boste odprli povezano vsebino ali spletno stran.

Če branje ne deluje, potem je morda potrebno namestiti brezplačno aplikacijo (npr. Google Lens, QR Reader).

Če pa skeniranja sploh ne potrebujete, ampak želite zgolj shraniti QR kodo, da jo odnesete h graverju, kamnoseku, izdelovalcu nalepk, potem pa se lahko obrnete na cvetličarno – in radi vam bodo pomagali in poslali kodo na vaš telefon.`,
      },
      {
        question: "Ali lahko naročim QR kode za davno pokojne, pred leti, desetletji?",
        answer: "Je že v pripravi. To možnost bomo omogočili v oktobru.",
      },
      {
        question: "Je lahko na isti QR kodi več oseb? Kot jih je lahko tudi na spomeniku?",
        answer: "Lahko in to omogočeno predvidoma v novembru.",
      },
      {
        question: "QR koda je lahko tudi darilo",
        answer: `...in prijetno presenečenje, ker gre za popolno novost.

Večina bi bila takšnega darila vesela, ne pa vsi. Zato vendarle poprej ocenite, kako bo na namestitev QR kode na spomenik gledal vaš bližnji, ki skrbi za grob oz. se posvetujte, če bi to koga zelo motilo.`,
      },
      {
        question: "Ali lahko QR kodo na spomeniku zaklenem z geslom?",
        answer: `Seveda lahko! Na ta način imajo dostop do spominske strani zgolj tisti, ki jim sam dostaviš geslo.`,
      },
    ],
  };

  const tabFaqData = {
    faqs: [
      {
        question: "Podrobna navodila za skeniranje QR kod",
        answer: `Branje QR kod je preprosto in večina sodobnih telefonov ne potrebuje posebne aplikacije, saj je funkcija že vgrajena neposredno v kamero.

Postopek je enostaven: odprite aplikacijo kamere in jo usmerite na kodo QR. Poskrbite, da je koda v celoti znotraj okvirja. Čez sekundo ali dve se bo na zaslonu prikazalo obvestilo in z dotikom nanj boste odprli povezano vsebino ali spletno stran.

Če branje ne deluje, potem je morda potrebno namestiti brezplačno aplikacijo (npr. Google Lens, QR Reader).

Če pa skeniranja sploh ne potrebujete, ampak želite zgolj shraniti QR kodo, da jo odnesete h graverju, kamnoseku, izdelovalcu nalepk, potem pa se lahko obrnete na cvetličarno – in radi vam bodo pomagali in poslali kodo na vaš telefon.`,
      },
      {
        question: "Ali lahko naročim QR kode za davno pokojne, pred leti, desetletji?",
        answer: "Je že v pripravi. To možnost bomo omogočili v oktobru.",
      },
      {
        question: "Je lahko na isti QR kodi več oseb? Kot jih je lahko tudi na spomeniku?",
        answer: "Lahko in to omogočeno predvidoma v novembru.",
      },
      {
        question: "QR koda je lahko tudi darilo",
        answer: `...in prijetno presenečenje, ker gre za popolno novost.

        Večina bi bila takšnega darila vesela, ne pa vsi. Zato vendarle poprej ocenite, kako bo na namestitev QR kode na spomenik gledal vaš bližnji, ki skrbi za grob oz. se posvetujte, če bi to koga zelo motilo.`,
      },
      {
        question: "Ali lahko QR kodo na spomeniku zaklenem z geslom?",
        answer: `Seveda lahko! Na ta način imajo dostop do spominske strani zgolj tisti, ki jim sam dostaviš geslo.`,
      },
    ],
  };

  const mobFaqData = {
    faqs: [
      {
        question: "Navodila za skeniranje QR kod",
        answer: `Branje QR kod je preprosto in večina sodobnih telefonov ne potrebuje posebne aplikacije, saj je funkcija že vgrajena neposredno v kamero.

Postopek je enostaven: odprite aplikacijo kamere in jo usmerite na kodo QR. Poskrbite, da je koda v celoti znotraj okvirja. Čez sekundo ali dve se bo na zaslonu prikazalo obvestilo in z dotikom nanj boste odprli povezano vsebino ali spletno stran.

Če branje ne deluje, potem je morda potrebno namestiti brezplačno aplikacijo (npr. Google Lens, QR Reader).

Če pa skeniranja sploh ne potrebujete, ampak želite zgolj shraniti QR kodo, da jo odnesete h graverju, kamnoseku, izdelovalcu nalepk, potem pa se lahko obrnete na cvetličarno – in radi vam bodo pomagali in poslali kodo na vaš telefon.`,
      },
      {
        question: "QR kode za že pred časom pokojne?",
        answer: "Je že v pripravi. To možnost bomo omogočili v oktobru.",
      },
      {
        question: "Ali je lahko na isti QR kodi več oseb?",
        answer: "Lahko in to omogočeno predvidoma v novembru.",
      },
      {
        question: "QR koda je lahko tudi darilo",
        answer: `...in prijetno presenečenje, ker gre za popolno novost.

        Večina bi bila takšnega darila vesela, ne pa vsi. Zato vendarle poprej ocenite, kako bo na namestitev QR kode na spomenik gledal vaš bližnji, ki skrbi za grob oz. se posvetujte, če bi to koga zelo motilo.`,
      },
      {
        question: "Ali lahko QR kodo na spomeniku zaklenem z geslom?",
        answer: `Seveda lahko! Na ta način imajo dostop do spominske strani zgolj tisti, ki jim sam dostaviš geslo.`,
      },
    ],
  };




  return (
    <>
      <Layout from={"18"} forFooter={"memorypage"} currentPage="qr-kode" isMegaMenuVisible={false}
        megaMenu={undefined}>
        <ClientAccordionBehavior />
        <main className="bg-slate-50 qr_page_wrapper flex flex-1 flex-col">

          {/* <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="flex w-full justify-between">
              <div className="flex w-full h-[68px] tablet:w-[744px] mx-auto tablet:h-[80px] px-5 tablet:px-6 desktop:w-[1200px] desktop:h-[92.02px] desktop:px-[12px]">
                <div className="flex justify-between items-center w-full h-full">
                  <a href="/" className="flex">
                    <Image src={logo} alt="Bnefits Qr" className="box-border relative bottom-[2px] h-[22px] w-[182.76px] desktop:w-[255.31px] desktop:h-[32px]" />
                  </a>
                  <div className="flex items-center">
                    <div className="hidden tablet:flex desktop:flex tablet:mr-[30px] desktop:mr-[38px] header_icons">
                      <ul className="flex items-center gap-[32px] tablet:gap-[16px]">
                        <li>
                          <a href="/qr-kode">QR kode</a>
                        </li>
                        <li>
                          <a href="/zalna-stran">Žalna stran</a>
                        </li>
                        <li>
                          <a href="/spominska">Spominska</a>
                        </li>
                      </ul>
                    </div>
                    <a href="/" className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200 ">
                      <Image src={header_back_icon} alt="Header Back Icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header> */}

          <div className="mobile_navbar mobile_navbar_header">
            <ul>
              <li>
                <a href="/qr-kode">
                  QR KODE
                </a>
              </li>
              <li>
                <a href="/zalna-stran">
                  ŽALNA STRAN
                </a>
              </li>
              <li>
                <a href="/spominska">
                  SPOMINSKA
                </a>
              </li>
            </ul>
          </div>
          {/* Banner */}
          <section className="banner_wrapper desktop:mt-[-0.5rem]">
            <div className="autoContent">
              <div className="banner_inner">
                <div className="banner_left">
                  <div className="banner_content">
                    <div className="banner_content_heading">
                      <h2>QR kode za nagrobnike</h2>
                      <span>Sodobni in trajni način ohranjanja spomina na najdražje</span>
                    </div>
                    <div className="banner_content_detail">
                      <p>Nagrobniki se niso bistveno spremenili v zadnjih nekaj tisoč letih.... do zdaj.</p>
                      <p className="text-web">QR kode predstavljajo inovativno rešitev, ki združuje tradicionalne nagrobnike z digitalno tehnologijo, kar omogoča globljo povezavo z življenjsko zgodbo pokojnika preko dodajanja fotografij, življenjepisa, video posnetkov, deljenja zgodb in čarobnih trenutkov s pokojnim. </p>
                    </div>
                  </div>
                </div>
                <div className="banner_right">
                  <div className="banner_img">
                    <Image src={bannerImg} alt="Banner" />
                  </div>
                </div>

                <p className="text-mob">QR kode predstavljajo inovativno rešitev, ki združuje tradicionalne nagrobnike z digitalno tehnologijo, kar omogoča globljo povezavo z življenjsko zgodbo pokojnika preko dodajanja fotografij, življenjepisa, video posnetkov, deljenja zgodb in čarobnih trenutkov s pokojnim. </p>
              </div>
            </div>
          </section>
          {/* how it works */}

          <section className="how_it_works">
            <div className="autoContent"> 
              <div className="how_it_works_inner">
                <div className="how_it_works_heading">
                  <h2>Kako deluje</h2>
                </div>
                <div className="how_it_works_content">
                  <ul>
                    <li className="tab_how_it_works_card_li">
                      <div className="how_it_works_card tab_how_it_works_card">
                        <div className="hiw_card_detail">
                          <h4>Skeniraj QR kodo</h4>
                        </div>
                        <div className="hiw_card_icon">
                          <Image src={bnefitsQrImg2} alt="Bnefits Qr" />
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="how_it_works_card">
                        <div className="hiw_card_icon">
                          <Image src={scanSvg} alt="Scanner Image" />
                        </div>
                        <div className="hiw_card_detail">
                          <h4>Skeniraj QR kodo</h4>
                          <p className="pb-16px">Pametni telefoni imajo skeniranje preko kamere avtomatizirano.</p>
                          <p>Op. bolj podrobna navodila so <a href="javascript:void(0)">tukaj</a></p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="how_it_works_card">
                        <div className="hiw_card_icon">
                          <Image src={mosnterPicIcon} alt="Scanner Image" />
                        </div>
                        <div className="hiw_card_detail">
                          <h4>Odpre se spominska</h4>
                          <p>in s tem možnost popolnoma drugačnega doživljanja in spominjanja na pokojnega. </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="how_it_works_card">
                        <div className="hiw_card_icon">
                          <Image src={editingIcon} alt="Scanner Image" />
                        </div>
                        <div className="hiw_card_detail">
                          <h4>Vsak lahko sodeluje</h4>
                          <p>Skrbnik pa na koncu odloči, kaj bo dejansko objavljeno.    </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits of QR codes on tombstones */}

          <section className="bnefits_qr_tombstones">
            <div className="autoContent">
              <div className="bnefits_qr_tombstones_inner">
                <h2 className="web-text">Prednosti QR kod na nagrobnih spomenikih</h2>
                <h2 className="mobile-text tab-text max-width-230px">Prednosti QR kod na nagrobnikih</h2>
                <div className="bnefits_qr_features web_bnefits_qr_features">
                  <ul>
                    <li>
                      <div className="feature_item">
                        <div className="feature_image feature_image_one">
                          <Image src={bnefitsQrImg1} alt="Bnefits Qr Img1" />
                        </div>
                        <div className="feature_text">
                          <h3 className="web-text">1. Oživljanje spominov; prikliče nazaj že zbledele zgodbe</h3>
                          <p>Namesto zgolj imena in datumov na nagrobniku lahko obiskovalci vidijo pokojnikov nasmeh, slišijo njegov glas ali gledajo trenutke iz njegovega življenja prek videov, zvočnih posnetkov ali albumov slik. Morda že zbledele zgodbe in spomini znova oživijo, zgodbe pa ostanejo dostopne še prihodnjim rodovom.</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item qr_osmrtnica_img_wrapper">
                        <div className="feature_text">
                          <h3>2. Zbližuje ljudi, povezuje generacije</h3>
                          <p>Spominsko spletno stran lahko skupaj ustvarjajo vsi, ki so pokojnega imeli radi - družina, prijatelji in znanci. Mlajši, ki so navajeni digitalnih vsebin, lahko na ta način lažje vzpostavijo povezavo s predniki, oddaljeni sorodniki pa lahko sodelujejo ne glede na geografsko oddaljenost.</p>
                        </div>
                        <div className="feature_image qr_osmrtnica_img">
                          <Image src={bnefitsQrImg2} alt="Bnefits Qr Img2" />
                        </div>

                      </div>
                    </li>
                    <li>
                      <div className="feature_item">
                        <div className="feature_image feature_image_three">
                          <Image src={bnefitsQrImg3} alt="Bnefits Qr Img3" />
                        </div>
                        <div className="feature_text">
                          <h3>3. Visoka obstojnost</h3>
                          <p>Zapisi na digitalnem mediju so večni, zgodbe živijo in slike ne zbledijo, drugače kot tiste v predalu ali albumu. Kovinske, keramične, akrilne, granitne QR kode imajo visoko obstojnost in tudi nalepke so lahko visoko kvalitetne in odporne proti vremenskim vplivom. Pa tudi če se zgodi, jih je mogoče enostavno ponovno izdelati, medtem ko QR koda ostaja vedno ista. </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item">
                        <div className="feature_text">
                          <h3>4. Enostavna uporaba</h3>
                          <p>Skeniranje QR kod je s telefonom / tablico preko kamere povsem avtomatizirano, enako kot je odčitavanje kod v trgovini. Telefoni imajo bralnike običajno že nameščene; so brezplačni in vse bolj uporabljani zaradi svojih številnih prednosti.</p>
                        </div>
                        <div className="feature_image feature_image_forth">
                          <Image src={bnefitsQrImg4} alt="Bnefits Qr Img4" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* tab */}

                <div className="bnefits_qr_features tab_bnefits_qr_features">
                  <ul>
                    <li>
                      <div className="feature_item">
                        <div className="feature_image feature_image_one">
                          <Image src={bnefitsQrImg1} alt="Bnefits Qr Img1" />
                        </div>
                        <div className="feature_text">
                          <h3>1. Oživljanje spominov; prikliče nazaj že zbledele zgodbe</h3>
                          <p>Namesto zgolj imena in datumov na nagrobniku lahko obiskovalci vidijo pokojnikov nasmeh, slišijo njegov glas ali gledajo trenutke iz njegovega življenja prek videov, zvočnih posnetkov ali albumov slik. Morda že zbledele zgodbe in spomini znova oživijo, zgodbe pa ostanejo dostopne še prihodnjim rodovom.</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item feature_item_two_three">
                        <div className="feature_text">
                          <h3>2. Zbližuje ljudi, povezuje generacije</h3>
                          <p>Spominsko spletno stran lahko skupaj ustvarjajo vsi, ki so pokojnega imeli radi - družina, prijatelji in znanci. Mlajši, ki so navajeni digitalnih vsebin, lahko na ta način lažje vzpostavijo povezavo s predniki, oddaljeni sorodniki pa lahko sodelujejo ne glede na geografsko oddaljenost.</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item">
                        <div className="tab_feature_imgs_wrapper">
                          <div className="feature_image feature_image_three">
                            <Image src={bnefitsQrImg3} alt="Bnefits Qr Img3" />
                          </div>
                          <div className="feature_image qr_osmrtnica_img">
                            <Image src={bnefitsQrImg2} alt="Bnefits Qr Img2" />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item feature_item_two_three">
                        <div className="feature_text">
                          <h3>3. Visoka obstojnost</h3>
                          <p>Zapisi na digitalnem mediju so večni, zgodbe živijo in slike ne zbledijo, drugače kot tiste v predalu ali albumu. Kovinske, keramične, akrilne, granitne QR kode imajo visoko obstojnost in tudi nalepke so lahko visoko kvalitetne in odporne proti vremenskim vplivom. Pa tudi če se zgodi, jih je mogoče enostavno ponovno izdelati, medtem ko QR koda ostaja vedno ista. </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item">
                        <div className="feature_text">
                          <h3>4. Enostavna uporaba</h3>
                          <p>Skeniranje QR kod je s telefonom / tablico preko kamere povsem avtomatizirano, enako kot je odčitavanje kod v trgovini. Telefoni imajo bralnike običajno že nameščene; so brezplačni in vse bolj uporabljani zaradi svojih številnih prednosti.</p>
                        </div>
                        <div className="feature_image feature_image_forth">
                          <Image src={bnefitsQrImg4} alt="Bnefits Qr Img4" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* tab */}

                {/* mobile */}
                <div className="bnefits_qr_features mobile_bnefits_qr_features">
                  <ul>
                    <li>
                      <div className="feature_item">
                        <div className="feature_image feature_image_one">
                          <Image src={bnefitsQrImg1} alt="Bnefits Qr Img1" />
                        </div>
                        <div className="feature_text">
                          <h3>1. Že zbledele zgodbe spet oživijo</h3>
                          <p>Namesto zgolj imena in datumov na nagrobniku lahko obiskovalci vidijo pokojnikov nasmeh, slišijo njegov glas ali gledajo trenutke iz njegovega življenja prek videov, zvočnih posnetkov ali albumov slik. Morda že zbledele zgodbe in spomini znova oživijo, zgodbe pa ostanejo dostopne še prihodnjim rodovom.</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item feature_item_two_three">
                        <div className="feature_text">
                          <h3>2. Zbližuje ljudi, povezuje generacije </h3>
                          <p>Spominsko stran lahko skupaj ustvarjajo vsi, ki so pokojnega imeli radi, družina, prijatelji in znanci. Mlajši, ki so navajeni digitalnih vsebin, lahko na ta način lažje vzpostavijo povezavo s predniki, oddaljeni sorodniki pa lahko sodelujejo ne glede na geografsko oddaljenost.</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item">
                        <div className="tab_feature_imgs_wrapper">
                          <div className="feature_image feature_image_three">
                            <Image src={bnefitsQrImg3} alt="Bnefits Qr Img3" />
                          </div>
                          <div className="feature_image qr_osmrtnica_img">
                            <Image src={bnefitsQrImg2} alt="Bnefits Qr Img2" />
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item feature_item_two_three">
                        <div className="feature_text">
                          <h3>3. Visoka obstojnost</h3>
                          <p>Zapisi na digitalnem mediju so večni, zgodbe živijo in slike ne zbledijo, drugače kot tiste v predalu ali albumu. Kovinske, akrilne, granitne QR kode imajo visoko obstojnost in tudi nalepke so lahko visoko kvalitetne in odporne proti vremenskim vplivom. Pa tudi če se zgodi, jih je mogoče enostavno ponovno izdelati, medtem ko QR koda ostaja vedno ista. </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="feature_item">
                        <div className="feature_text">
                          <h3>4. Enostavna uporaba</h3>
                          <p>Skeniranje QR kod je s telefonom preko kamere povsem avtomatizirano, enako kot odčitavanje kod v trgovini. Telefoni imajo bralnike običajno že nameščene; so brezplačni in vse bolj uporabljani zaradi svojih številnih prednosti.</p>
                        </div>
                        <div className="feature_image feature_image_forth">
                          <Image src={bnefitsQrImg4} alt="Bnefits Qr Img4" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* mobile */}
              </div>
            </div>
          </section>

          {/* Frequently asked questions */}

          <section className="faqs_sec p-0">
            <div className="autoContent">
              <div className="faqs_sec_inner">

                <div className="accordion d-none">
                  <div className="accordion_item bordor-top">
                    <div className="accordion_header">
                      <strong>(Q) Can I Book a Ride for Early Morning or Late-Night Flights?</strong>
                      <div className="accordian_icon">
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.54632 7.55469H6.14174V12.1501C6.14174 12.6172 6.52595 13.0089 7.00056 13.0089C7.47517 13.0089 7.85937 12.6172 7.85937 12.1501V7.55469H12.4548C12.9219 7.55469 13.3136 7.17048 13.3136 6.69587C13.3136 6.22126 12.9219 5.83705 12.4548 5.83705H7.85937V1.24163C7.85937 0.774554 7.47517 0.382812 7.00056 0.382812C6.52595 0.382812 6.14174 0.774554 6.14174 1.24163V5.83705H1.54632C1.07924 5.83705 0.6875 6.22126 0.6875 6.69587C0.6875 7.17048 1.07924 7.55469 1.54632 7.55469Z" fill="#3C3E41" />
                        </svg>

                      </div>
                    </div>
                    <div className="accordion_body">
                      <div className="accordion_content">
                        <p>description</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion_item">
                    <div className="accordion_header">
                      <strong>Ali je skeniranje QR kod varno?</strong>
                      <div className="accordian_icon">
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.54632 7.55469H6.14174V12.1501C6.14174 12.6172 6.52595 13.0089 7.00056 13.0089C7.47517 13.0089 7.85937 12.6172 7.85937 12.1501V7.55469H12.4548C12.9219 7.55469 13.3136 7.17048 13.3136 6.69587C13.3136 6.22126 12.9219 5.83705 12.4548 5.83705H7.85937V1.24163C7.85937 0.774554 7.47517 0.382812 7.00056 0.382812C6.52595 0.382812 6.14174 0.774554 6.14174 1.24163V5.83705H1.54632C1.07924 5.83705 0.6875 6.22126 0.6875 6.69587C0.6875 7.17048 1.07924 7.55469 1.54632 7.55469Z" fill="#3C3E41" />
                        </svg>
                      </div>
                    </div>
                    <div className="accordion_body">
                      <div className="accordion_content">
                        <p>description</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion_item">
                    <div className="accordion_header">
                      <strong>QR kodo lahko naroči kdorkoli, ne samo Skrbnik</strong>
                      <div className="accordian_icon">
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.54632 7.55469H6.14174V12.1501C6.14174 12.6172 6.52595 13.0089 7.00056 13.0089C7.47517 13.0089 7.85937 12.6172 7.85937 12.1501V7.55469H12.4548C12.9219 7.55469 13.3136 7.17048 13.3136 6.69587C13.3136 6.22126 12.9219 5.83705 12.4548 5.83705H7.85937V1.24163C7.85937 0.774554 7.47517 0.382812 7.00056 0.382812C6.52595 0.382812 6.14174 0.774554 6.14174 1.24163V5.83705H1.54632C1.07924 5.83705 0.6875 6.22126 0.6875 6.69587C0.6875 7.17048 1.07924 7.55469 1.54632 7.55469Z" fill="#3C3E41" />
                        </svg>
                      </div>
                    </div>
                    <div className="accordion_body">
                      <div className="accordion_content">
                        <p>description</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion_item">
                    <div className="accordion_header">
                      <strong>Ali lahko naročim QR kode za že pred časom umrle?</strong>
                      <div className="accordian_icon">
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.54632 7.55469H6.14174V12.1501C6.14174 12.6172 6.52595 13.0089 7.00056 13.0089C7.47517 13.0089 7.85937 12.6172 7.85937 12.1501V7.55469H12.4548C12.9219 7.55469 13.3136 7.17048 13.3136 6.69587C13.3136 6.22126 12.9219 5.83705 12.4548 5.83705H7.85937V1.24163C7.85937 0.774554 7.47517 0.382812 7.00056 0.382812C6.52595 0.382812 6.14174 0.774554 6.14174 1.24163V5.83705H1.54632C1.07924 5.83705 0.6875 6.22126 0.6875 6.69587C0.6875 7.17048 1.07924 7.55469 1.54632 7.55469Z" fill="#3C3E41" />
                        </svg>
                      </div>
                    </div>
                    <div className="accordion_body">
                      <div className="accordion_content">
                        <p>description</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion_item">
                    <div className="accordion_header">
                      <strong>Kdo mi lahko izdela QR kode?</strong>
                      <div className="accordian_icon">
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.54632 7.55469H6.14174V12.1501C6.14174 12.6172 6.52595 13.0089 7.00056 13.0089C7.47517 13.0089 7.85937 12.6172 7.85937 12.1501V7.55469H12.4548C12.9219 7.55469 13.3136 7.17048 13.3136 6.69587C13.3136 6.22126 12.9219 5.83705 12.4548 5.83705H7.85937V1.24163C7.85937 0.774554 7.47517 0.382812 7.00056 0.382812C6.52595 0.382812 6.14174 0.774554 6.14174 1.24163V5.83705H1.54632C1.07924 5.83705 0.6875 6.22126 0.6875 6.69587C0.6875 7.17048 1.07924 7.55469 1.54632 7.55469Z" fill="#3C3E41" />
                        </svg>
                      </div>
                    </div>
                    <div className="accordion_body">
                      <div className="accordion_content">
                        <p>description</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full web-faqs">
                  <FrequentlyAskedQuestionView2 data={faqData} from={undefined} />
                </div>

                <div className="flex w-full tab-faqs">
                  <FrequentlyAskedQuestionView2 data={tabFaqData} from={undefined} />
                </div>
                <div className="flex w-full mob-faqs">
                  <FrequentlyAskedQuestionView2 data={mobFaqData} from={undefined} />
                </div>

              </div>
            </div>
          </section>

          {/* get a QR code */}

          <section className="getQRcode_sec">
            <div className="autoContent">
              <div className="getQRcode_sec_inner">
                <h2 className="web-text">Kako torej dobim QR kodo za nagrobnik?</h2>
                <h2 className="mobile-text">Kako torej dobim QR kodo?</h2>

                <div className="getQRcode_content">
                  <div className="getQRcode_item_wrapper">
                    <div className="getQRcode_item">
                      <div className="getQRcode_item_top">
                        <div className="getQRcode_item_header">
                          <div>
                            <strong>Če gre za objavljeno osmrtnico </strong>
                            <span>(v primeru, da je prišlo do pretresljivega dogodka te dni). </span>
                          </div>
                        </div>
                        <div className="getQRcode_item_right d-none">
                          <div className="getQRcode_item_right_content">
                            <div className="getQRcode_item_right_img">
                              <Image src={qr_screenshoot_img} alt="qr screenshoot" />
                            </div>
                            <p>Ta okvir ti odpre QR kodo na strani osmrtnice</p>
                          </div>
                        </div>
                      </div>
                      <div className="getQRcode_item_list">
                        <ul>
                          <li>
                            <p>Pogrebno podjetje (ali cvetličarna) brezplačno objavi osmrtnico na seznamu osmrtnic.</p>
                          </li>
                          <li>
                            <p>Istočasno vam brezplačno izdela samostojno Spominsko stran najdražje/ga </p>
                          </li>
                          <li>
                            <p>in na spominski strani je že dodana brezplačna QR koda. </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="getQRcode_item">
                      <div className="getQRcode_item_top">
                        <div className="getQRcode_item_header">
                          <div>
                            <strong>Brez osmrtnice</strong>
                            <span>(in za umrle v preteklosti). </span>
                          </div>
                          <div className="getQRcode_item_right">
                            <div className="getQRcode_item_right_content">
                              <div className="getQRcode_item_right_img">
                                <Image src={qr_screenshoot_img} alt="qr screenshoot" />
                              </div>
                              <p>Ta okvir ti odpre QR kodo na strani osmrtnice</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="getQRcode_item_list">
                        <ul>
                          <li>
                            <p>Potreben bo drug obrazec za izdelavo spominske in drugačna preverjanja, zato bo ves postopek potekal preko naše strani in ne preko naših partnerjev.</p>
                          </li>
                          <li>
                            <p>Izdelali bomo spominsko stran in na spominski bo tudi QR koda. </p>
                          </li>
                          <li>
                            <p>Možnost bo dodana v kratkem; je že v pripravi.  </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="getQRcode_accordian_wrapper">
                  <div className="qr_code_accordion_item bordor-top">
                    <div className="accordion_header">
                      <strong className="web-text">Kdo mi jo lahko dejansko izdela, namesti.</strong>
                      <strong className="mobile-text">Kdo mi jo izdela, namesti?</strong>
                      <div className="accordian_icon">
                        <svg width="34" height="25" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g filter="url(#filter0_d_9053_55410)">
                            <path d="M16.9184 10.9991L26.935 0.578125L29.7969 3.55555L16.9184 16.9539L4.04017 3.55555L6.90201 0.578125L16.9184 10.9991Z" fill="#3C3E41" />
                          </g>
                          <defs>
                            <filter id="filter0_d_9053_55410" x="0.0390625" y="0.578125" width="33.7578" height="24.375" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dy="4" />
                              <feGaussianBlur stdDeviation="2" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9053_55410" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9053_55410" result="shape" />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="accordion_body">
                      <div className="accordion_content">
                        <div className="getQRcode_item_list">
                          <ul>
                            <li>
                              <p>Odvisno od tega na kakšni podlagi jo želite (kovinska ploščica, granit, steklo, nalepka), kje točno bo nameščena, ali naj bo vgravirana ali samo nalepka?</p>
                            </li>
                            <li className="faq-web-text">
                              <p>V kratkem bomo pripravili seznam izvajalcev teh del iz različnih materialov v vašem lokalnem okolju (izdelovalci, kontaktirajte nas)</p>
                            </li>
                            <li className="faq-mobile-text">
                              <p>V kratkem bomo pripravili seznam izvajalcev teh del iz različnih materialov v vašem lokalnem okolju</p>
                            </li>
                            <li className="faq-web-text">
                              <p>Nekaj možnosti bomo ponudili tudi v naši trgovini. </p>
                            </li>
                            <li className="faq-mobile-text">
                              <p>Nekaj možnosti bo tudi v naši trgovini.</p>
                            </li>

                            <li className="pt-20px">
                              <p>QR kodo lahko na nagrobnik nato nalepite  sami ali pa vam pomaga pokopališko podjetje (simbolično plačilo). </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>


                    {/* Do you make QR codes? */}

                    <div className="doYouMakeQRcode_sec">
                      <div className="autoContent">
                        <div className="doYouMakeQRcode_sec_inner">
                          <div className="doYouMakeQRcode_sec_text">
                            <strong>Izdelujete QR kode?</strong>
                            <p>Ponujate morda druge produkte ali storitve, ki bi utegnile zanimati obiskovalce te spletne strani? </p>
                          </div>
                          <a href="/kontakt" className="light_btn">Sodelujmo!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EVERYTHING is free! */}
          <section className="everything_free_sec">
            <div className="autoContent">
              <div className="everything_free_inner">
                <div className="everything_free_heading">
                  <h2>VSE je brezplačno!</h2>
                  <p>In brez odvečnih korakov </p>
                </div>
                <div className="everything_free_content">
                  <div className="e_free_content_list">
                    <div className="e_free_content_list_data">
                      <div className="e_free_c_list_nbr">
                        <strong className="number_1">01.</strong>
                      </div>
                      <div className="e_free_c_list_txt">
                        <p>Pogrebno podjetje vam brezplačno izdela in objavi <span>osmrtnico</span>.</p>
                        <small>(ko urejate dokumente za pokop)</small>
                      </div>
                    </div>
                  </div>
                  <div className="e_free_content_list">
                    <div className="e_free_content_list_data">
                      <div className="e_free_c_list_nbr">
                        <strong className="number_2">02.</strong>
                      </div>
                      <div className="e_free_c_list_txt">
                        <p>Istočasno vam izdela brezplačno <span>žalno spominsko stran</span>.</p>
                        <small>(ko urejate dokumente za pokop) </small>
                      </div>
                    </div>
                  </div>
                  <div className="e_free_content_list">
                    <div className="e_free_content_list_data">
                      <div className="e_free_c_list_nbr">
                        <strong className="number_3">03.</strong>
                      </div>
                      <div className="e_free_c_list_txt">
                        <p>Vaša lokalna cvetličarna vam brezplačno podari <span>status Skrbnika</span> spominske strani.</p>
                        <small>(ko se dogovarjate za cvetlično ureditev vežice; status Skrbnika je za cel prvi mesec) </small>
                      </div>
                    </div>
                  </div>
                  <div className="e_free_content_list">
                    <div className="e_free_content_list_data">
                      <div className="e_free_c_list_nbr">
                        <strong className="number_4">04.</strong>
                      </div>
                      <div className="e_free_c_list_txt">
                        <p>Vaša lokalna cvetličarna vam brezplačno podari <span>mobi kartice</span> za pošiljanje naprej</p>
                        <small>(ko se dogovarjate za cvetlično ureditev vežice) </small>
                      </div>
                    </div>
                  </div>
                  <div className="e_free_content_list">
                    <div className="e_free_content_list_data">
                      <div className="e_free_c_list_nbr">
                        <strong className="number_5">05.</strong>
                      </div>
                      <div className="e_free_c_list_txt">
                        <p>Pogrebno podjetje vam brezplačno podari <span>QR kodo</span> za nagrobnik</p>
                        <small>(digitalna koda je že na žalni / spominski strani; izdelate si jo sami) </small>
                      </div>
                    </div>
                  </div>

                  <div className="everything_free_content_text">
                    <p>Ekskluzivno samo pri naših partnerjih. Poiščite jih! </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mobile_navbar">
            <div className="mobile_navbar_inner">
              <ul>
                <li>
                  <a href="/qr-kode">
                    QR KODE
                  </a>
                </li>
                <li>
                  <a href="/zalna-stran">
                    ŽALNA STRAN
                  </a>
                </li>
                <li>
                  <a href="/spominska">
                    SPOMINSKA
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* footer */}

          {/* <section className="footer d-none">
            <div className="autoContent">
              <div className="footer_inner">
                <div className="footer_top">
                  <div className="footer_top_left">
                    <div className="footer_logo">
                      <a href="javascript:void(0)">
                        <Image src={footer_logo} alt="Footer Logo" />
                      </a>
                    </div>
                  </div>
                  <div className="footer_top_right">
                    <div className="footer_links">
                      <ul>
                        <li>
                          <a href="javascript:void(0)">Osmrtnice</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Pogrebi</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Spominske</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Cvetličarne</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="footer_bottom">
                  <p>© 2025 Vse pravice zadržane.</p>
                  <div className="footer_social_icons">
                    <ul>
                      <li>
                        <a href="javascript:void(0)" className="social_icons">
                          <Image src={facebook_icon} alt="Facebook Icon" />
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)" className="social_icons">
                          <Image src={twitter_icon} alt="Facebook Icon" />
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)" className="social_icons">
                          <Image src={linnked_in_icons} alt="Facebook Icon" />
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)" className="social_icons">
                          <Image src={instagram_icon} alt="Facebook Icon" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/*mobile footer  */}

          {/* <section className="footer mob_footer d-none">
            <div className="autoContent">
              <div className="footer_inner">
                <div className="footer_top">
                  <div className="footer_top_right">
                    <div className="footer_links">
                      <ul>
                        <li>
                          <a href="javascript:void(0)">Osmrtnice</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Pogrebi</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Spominske</a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">Cvetličarne</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="footer_bottom">
                  <div className="footer_bottom_left">
                    <div className="footer_logo">
                      <a href="javascript:void(0)">
                        <Image src={footer_logo} alt="Footer Logo" />
                      </a>
                    </div>
                    <p>© 2025 Vse pravice zadržane.</p>
                  </div>

                  <div className="footer_social_icons">
                    <ul>
                      <li>
                        <a href="javascript:void(0)" className="social_icons">
                          <Image src={facebook_icon} alt="Facebook Icon" />
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)" className="social_icons">
                          <Image src={twitter_icon} alt="Facebook Icon" />
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)" className="social_icons">
                          <Image src={linnked_in_icons} alt="Facebook Icon" />
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)" className="social_icons">
                          <Image src={instagram_icon} alt="Facebook Icon" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          <CommonFooter currentPage="/qr-kode" />
        </main>
      </Layout>
    </>
  );
}

function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

