"use client"

import Head from "next/head";
import { FAQHeader } from "@/app/components/appcomponents/Header";
import Image from "next/image";
import { FrequentlyAskedQuestionView2, FrequentlyAskedQuestionView3 } from "../components/appcomponents/FrequentlyAskedQuestionView";
import { FooterForFaq } from "../components/appcomponents/Footer";
import Layout from "../components/appcomponents/Layout";
import FuneralTable from "../components/appcomponents/FuneralTable"

export default function Faq1() {

    return (
    <>
      <Head>
        <title>Primerjava | Osmrtnica</title>
        <link rel="canonical" href="https://www.osmrtnica.com/primerjava" />
        <meta name="description" content="Primerjava možnosti brez skrbnika in s skrbnikom." />
      </Head>

      <Layout megaMenu={""} isMegaMenuVisible={false} from={"18"} forFooter={"memorypage"}  >
           <FuneralTable />
            
      </Layout>
    </>
    )
}
