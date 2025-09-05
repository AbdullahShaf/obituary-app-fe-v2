"use client"
import { TermsAndCond } from "../components/appcomponents/Footer";
import Layout from "../components/appcomponents/Layout";
import { Desktop } from "./components/Desktop";
import { Tab } from "./components/Tab";
import { Mobile } from "./components/Mobile";

export default function PolitikaZasebnostiPage() {

    return (
        <Layout from={"18"} megaMenu={""} forFooter={"memorypage"} currentPage="politika-zasebnosti" isMegaMenuVisible={false}>
            <div className="w-full">
                <div className="flex flex-col mx-auto bg-[#F5F7F9] w-full w-[100%] max-w-[700px] mt-[160px] text-[#3C3E41]">
                    <Tab />
                </div>
                <TermsAndCond />
            </div>
        </Layout>
    )
}