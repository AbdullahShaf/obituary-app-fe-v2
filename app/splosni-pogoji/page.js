"use client"

import { FAQHeader2 } from "@/app/components/appcomponents/Header";
import Image from "next/image";
import { FrequentlyAskedQuestionView2, FrequentlyAskedQuestionView3 } from "../components/appcomponents/FrequentlyAskedQuestionView";
import { TermsAndCond } from "../components/appcomponents/Footer";
import Link from "next/link";
import Layout from "../components/appcomponents/Layout";

export default function SplosniPogoji() {

    return (
        <Layout from={"18"} megaMenu={""} forFooter={"memorypage"} currentPage="splosni-pogoji" isMegaMenuVisible={false}>
            <div className="flex flex-col mx-auto bg-[#F5F7F9] border-b-[1px] border-[#D4D4D4] w-full">
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <h1>test</h1>
                <TermsAndCond />
            </div>
        </Layout>
    )
}