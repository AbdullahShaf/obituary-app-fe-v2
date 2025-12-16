import React, { Suspense } from "react";
import type { Metadata } from "next";
import Layout from "../components/appcomponents/Layout";
import PogrebiListContent from "./PogrebiListContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams?: Promise<{ city?: string | string[] }> }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const city = typeof resolvedSearchParams?.city === 'string' ? resolvedSearchParams.city : Array.isArray(resolvedSearchParams?.city) ? resolvedSearchParams.city[0] : "";
  
  return {
    title: city ? `Pogrebi v ${city} – Pregled pogrebov po dnevih` : "Pogrebi – Pregled pogrebov po dnevih",
    description: city
      ? `Pogrebi v ${city} v naslednjih dneh. Pregled datumov in časov pogrebov po dnevih z možnostjo iskanja po imenu, kraju ali regiji.`
      : "Pogrebi v naslednjih dneh. Pregled datumov in časov pogrebov po dnevih z možnostjo iskanja po imenu, kraju ali regiji.",
    alternates: {
      canonical: city ? `https://www.osmrtnica.com/pogrebi?city=${encodeURIComponent(city)}` : "https://www.osmrtnica.com/pogrebi",
    },
  };
}

export default async function ObituaryList({ searchParams }: { searchParams?: Promise<{ city?: string | string[]; region?: string | string[] }> }) {
  return (
    <Layout
      megaMenu={""}
      isMegaMenuVisible={false}
      from={"18"}
      forFooter={"memorypage"}
      currentPage="pogrebi"
    >
      <div className="flex flex-col mx-auto bg-[#F5F7F9] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <PogrebiListContent />
        </Suspense>
      </div>
    </Layout>
  );
}
