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
const Keeperpromo = () => {
  const faqData = {
    faqs: [
      {
        question: "Kako postanem Skrbnik brezplačno?",
        answer: `Spominska stran s Skrbnikom (status administratorja spominske strani) je praviloma plačljiva storitev, vendarle pa želimo ta privilegij ponuditi vsem, zato smo skupaj s cvetličarnami pripravili možnost, po kateri le-te žalujočim same darujejo enomesečnega Skrbnika brezplačno. 

          Mi te možnosti na naši strani ne ponujamo, dosegljiva je zgolj v partnerskih cvetličarnah. Izkoristite jo povsem brez rizika in naročnine, saj po preteku enega meseca status samodejno ugasne brez obveznosti (v kolikor ga ne podaljšate). 

          Seznam cvetličarn je <a href="https://dev111.osmrtnica.com/cvetlicarne" target="_blank" rel="noopener noreferrer">tukaj</a> (šele začeli smo, zato bo nekaj tednov trajalo, preden dodamo vse).`,
      },
      {
        question: "Kako dobim brezplačne digitalne kartice?",
        answer: `Brezplačne digitalne mobi kartice zagotavljajo cvetličarne; mi teh kartic na naši strani ne ponujamo. Seznam cvetličarn je <a href="https://dev111.osmrtnica.com/cvetlicarne" target="_blank" rel="noopener noreferrer">tukaj</a>  (šele začeli smo, zato bo nekaj tednov trajalo, preden dodamo vse). 

Obiščite jih, digitalno kartico vam bodo rade volje brezplačno izdelali in že takoj jo lahko preko mobilnega telefona neomejeno pošiljate naprej svojim sorodnikom in znancem, jih obvestite o pogrebu ali izrazite sožalje. 

Digitalne kartice tako lahko ostanejo v telefonu tudi kot trajni spomin, obenem pa imajo direktno povezavo do spominske strani najdražjega, ki jo lahko kadarkoli obiščejo in na njej tudi sodelujejo.`,
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
        <CommonFooter currentPage="/spominska" />
      </div>
    </Layout>
  );
};

export default Keeperpromo;
