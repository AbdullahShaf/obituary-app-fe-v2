"use client"
import { TermsAndCond } from "../components/appcomponents/Footer";
import Layout from "../components/appcomponents/Layout";
import Desktop from "./components/Desktop";

export default function SplosniPogoji() {

    return (
        <Layout from={"18"} megaMenu={""} forFooter={"memorypage"} currentPage="splosni-pogoji" isMegaMenuVisible={false}>
            <div className="flex flex-col mx-auto bg-[#F5F7F9] border-b-[1px] border-[#D4D4D4] w-full w-[100%] max-w-[700px] mt-[160px] text-[#3C3E41]">
                <Desktop />
                <TermsAndCond />
            </div>
        </Layout>
    )
}