import React from "react";
import "../qr-kode/qr-kode.css";
import "../qr-kode/qr-kode-responsive.css";
import Layout from "../components/appcomponents/Layout";
import ColdObituary from "../components/appcomponents/ColdObituary";
import AnniversaryReminder from "../components/appcomponents/AnniversaryReminder";
import WayToPost from "../components/appcomponents/WayToPost";
import MemorialPage from "../components/appcomponents/MemorialPage";
import SimpleComp from "../components/appcomponents/SimpleComp";
import FrequentlyAskedQuestionView, {
  FrequentlyAskedQuestionView2,
} from "../components/appcomponents/FrequentlyAskedQuestionView";
import imgUp from "@/public/ico_up.png";
import Image from "next/image";
import CommonFooter from "../components/appcomponents/CommonFooter";

const MemoryPromo = () => {
  const faqData = {
    faqs: [
      {
        question: "Kako objavim osmrtnico?",
        answer: `Trije načini so, dva sta brezplačna in osmrtnica je objavljena takoj.

        (1) Najlažji način je, da osmrtnico objavi pogrebno podjetje. To uredijo brezplačno in za to ne rabijo nobenih dokumentov. Priporočljivo je, da imate s seboj sliko pokojnika/ce. Osmrtnica je objavljena takoj.

        (2) Ponekod možnost objave brezplačne osmrtnice dodelimo tudi izbranim cvetličarnam. Objavo osmrtnice lahko naročijo samo najbližji, ker je potrebno priložiti Mrliški list / Smrtovnico. Osmrtnica je objavljena takoj.

        (3) Osmrtnico seveda lahko objavi tudi žalujoči sam, vendar pa se v tem primeru objava osmrtnice zaračunava po ceniku. Nujno je potrebno priložiti Mrliški list, osmrtnica pa bo objavljena z zamikom nekaj ur, ker mora naša ekipa preveriti podatke, da se preprečijo nepravilnosti in poskusi objav lažnih osmrtnic.

        Načeloma naj bi bilo samostojno objavljanje osmrtnic bolj izjema kot pravilo. Osmrtnice lahko pri nas objavljajo samo najbližji sorodniki pokojnih in ne kdorkoli.

        Skupaj z osmrtnico po krajevnih seznamih je hkrati brezplačno objavljena tudi samostojna žalna stran, kjer lahko žalujoči izrazijo sožalje, prižgejo digitalno svečko ipd.`,
      },
      {
        question: "Kako objavim žalno stran?",
        answer: `Žalna stran je objavljena takoj, ko podjetje objavi osmrtnico in je brezplačna.
      
      Žalujoči lahko začnejo sodelovati na strani takoj, torej prižgejo lahko digitalno svečko, se vpišejo v žalno knjigo ali izrazijo sožalje. Ko dobi Žalna stran skrbnika, postane Spominska in s tem pridobijo vsi obiskovalci še nekaj dodatnih možnosti.`,
      },
      {
        question: "Kako objavim spominsko stran s skrbnikom?",
        answer: `Skrbnik = administrator spominske strani lahko postane izključno nekdo izmed najbližnjih pokojni/ku. Ker je pokojnega zelo dobro poznal, bo sam določal, katere vsebine, ki jih pošiljajo drugi uporabniki naj bodo objavljene na strani in katere ne, hkrati pa bo imel kopico možnosti narediti pravo spominsko stran, ki bo izžarevala kar največ topline. 

        Spominska stran s Skrbnikom je plačljiva. Skrbnika je mogoče naročiti za eno leto ali šest let po simbolični ceni. 

        Ker pa vendarle želimo ta privilegij ponuditi prav vsem, smo skupaj s cvetličarnami pripravili možnost, po kateri cvetličarne žalujočim nudijo enomesečnega Skrbnika brezplačno. Mi te možnosti na naši strani ne ponujamo, dosegljiva je zgolj v partnerskih cvetličarnah. Izkoristite jo povsem brez rizika in naročnine, saj po preteku enega meseca status samodejno ugasne brez obveznosti (v kolikor ga ne podaljšate).`,
      },
      {
        question: "Še več vprašanj",
        answer: "(kmalu)",
      },
    ],
  };
  return (
    <Layout from={"18"} forFooter={"memorypage"} currentPage="zalna-stran">
      <div className="flex flex-1 flex-col mx-auto bg-gradient-to-br from-[#ECF0F3] to-[#F2F6F9]">
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
        <WayToPost />
        <ColdObituary />
        <SimpleComp />
        <AnniversaryReminder />
        <div className="mobile:hidden flex w-full">
          <MemorialPage />
        </div>
        <div className="flex w-full">
          <FrequentlyAskedQuestionView2 data={faqData} />
        </div>
        <div className="hidden mobile:flex w-full">
          <MemorialPage />
        </div>

        <div
          className="bottom-10 right-10 fixed w-[48px] h-[48px] mt-[26px] 
                shadow-custom-light-dark bg-gradient-to-br from-[#E3E8EC] to-[#FFFFFF]
                flex justify-center items-center rounded-lg"
        >
          <Image src={imgUp} alt="imgPrevious" className=" w-[24px] h-[24px]" />
        </div>
        <CommonFooter currentPage="/zalna-stran" />
      </div>
    </Layout>
  );
};

export default MemoryPromo;
