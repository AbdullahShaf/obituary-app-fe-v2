import React from "react";
import "../qr-kode/qr-kode.css";
import "../qr-kode/qr-kode-responsive.css";
import Layout from "../components/appcomponents/Layout";
import AdministratorCompo from "../components/appcomponents/AdministratorCompo";
import AdditionalOptions from "../components/appcomponents/AdditionalOptions";
import MemorialWithAdmin from "../components/appcomponents/MemorialWithAdmin";
import Difference from "../components/appcomponents/Difference";
import FrequentlyAskedQuestionView, {
  FrequentlyAskedQuestionView2,
} from "../components/appcomponents/FrequentlyAskedQuestionView";
import OpeningPromotion from "../components/appcomponents/OpeningPromotion";
import AdminBenefits from "../components/appcomponents/AdminBenefits";
import EverythingIsFree from "../components/appcomponents/EverythingIsFree";
import CommonFooter from "../components/appcomponents/CommonFooter";
import Image from "next/image";
import footer_logo from "@/public/qr-kode/footer_logo.svg";
import facebook_icon from "@/public/qr-kode/facebook_icon.svg";
import twitter_icon from "@/public/qr-kode/twitter_icon.svg";
import linnked_in_icons from "@/public/qr-kode/linnked_in_icons.svg";
import instagram_icon from "@/public/qr-kode/instagram_icon.svg";

export const metadata = {
  title: "Spominska stran s Skrbnikom – Digitalni trajni spomin",
  description: "Brezplačno ustvarite trajne spominske strani za svoje najdražje. Skrbnik poskrbi, da lahko družina in bližnji dodajajo slike, delijo zgodbe in obujajo spomine.",
  alternates: {
    canonical: "https://www.osmrtnica.com/spominska",
  },
};

const Keeperpromo = () => {
  const faqData = {
    faqs: [
      {
        question: "Kako postanem Skrbnik brezplačno?",
        answer: `Pošljite nam email s svojimi podatki, sorodstvom s pokojnim, ime pokojnega in žalno stran ter smrtovnico (nujno potrebno, da se prepreči smetenje in objava lažnih osmrtnic) na info@osmrtnica.com. Status skrbnika bomo dodelili praviloma še istega dne.

         Če gre za objavljeno osmrtnico, je status skrbnika brezplačno dodeljen za cel mesec. Najbližnji, sorodniki in prijatelji lahko v tem času dodajajo vsebine (katerih objavo Skrbnik odobri ali zavrne), po preteku enega meseca pa vse vsebine ostanejo, le novih ni mogoče več dodajati (v kolikor se status Skrbnika ne podaljša za eno leto ali šest let po simbolični ceni).`,
      },
      {
        question: "Kako lahko uporabim digitalne kartice?",
        answer: `Digitalno kartico si prenesete na telefon in jo lahko kot sliko neomejeno pošiljate naprej svojim sorodnikom in znancem, jih obvestite o pogrebu ali izrazite sožalje. Digitalne kartice tako lahko ostanejo v telefonu tudi kot trajni spomin, obenem pa imajo direktno povezavo do spominske strani najdražjega, ki jo lahko kadarkoli obiščejo in na njej tudi sodelujejo.`,
      },
      {
        question: "Kako sodelujem na spominski strani?",
        answer: `Za sodelovanje je potrebno odpreti uporabniški račun. Brez prijave v svoj račun je mogoče prižgati zgolj dnevno svečko. 

Na žalni strani so možnosti za sodelovanje omejene, medtem ko je možnosti na spominski s Skrbnikom veliko več in takšne strani so lahko res tople, osebne, polne čustev in dogodkov, ki ne smejo v pozabo in slik, morda tudi videov - in na take strani se bližnji kasneje tudi radi vračajo in jih še kasneje radi dopolnjujejo, ker spominska stran živi, ni hladna, brezosebna.`,
      },
      {
        question: "Še več vprašanj",
        answer: "(kmalu)",
      },
    ],
  };
  return (
    <>
      <Layout from={"18"} forFooter={"memorypage"} currentPage="spominska">
        <div className="flex w-full flex-col  bg-gradient-to-br from-[#ECF0F3] to-[#F2F6F9]">
          <div className="h-[72px] tablet:h-[80px] desktop:h-[92.02px] " />
          <div className="mobile_navbar mobile_navbar_header top-[68px] z-[1]">
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
          <MemorialWithAdmin />
          {/* <Difference /> */}
          <AdminBenefits />
          <AdditionalOptions />
          <AdministratorCompo />
          {/* <OpeningPromotion /> */}
          {/* <div className="flex w-full mobile:bg-[#E0E9F3] bg-[#FFFFFF]"> */}
          <FrequentlyAskedQuestionView2 data={faqData} />
          {/* </div> */}
          {/* <EverythingIsFree /> */}
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
                    <p className="!mx-0 !px-0 w-full min-w-full">Ekskluzivno samo pri naših partnerjih. Poiščite jih! </p>
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
          <CommonFooter currentPage="/spominska" />
        </div>
      </Layout>
    </>
  );
};

export default Keeperpromo;
