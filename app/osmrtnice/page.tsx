import React, { Suspense } from "react";
import type { Metadata } from "next";
import Layout from "../components/appcomponents/Layout";
import ObituaryListContent from "./ObituaryListContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams?: Promise<{ city?: string | string[]; region?: string | string[] }> }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const city = typeof resolvedSearchParams?.city === 'string' ? resolvedSearchParams.city : Array.isArray(resolvedSearchParams?.city) ? resolvedSearchParams.city[0] : "";
  
  return {
    title: city ? `Osmrtnice v ${city} – Žalne strani in spominske | Osmrtnica.com` : "Osmrtnice – Žalne strani in spominske | Osmrtnica.com",
    description: city 
      ? `Osmrtnice v ${city}. Celovit pregled osmrtnic z datumi pogrebov, pokopališči ter možnostjo iskanja po imenu, kraju ali regiji.`
      : "Osmrtnice. Celovit pregled osmrtnic z datumi pogrebov, pokopališči ter možnostjo iskanja po imenu, kraju ali regiji.",
    alternates: {
      canonical: city ? `https://www.osmrtnica.com/osmrtnice?city=${encodeURIComponent(city)}` : "https://www.osmrtnica.com/osmrtnice",
    },
  };
}

export default async function ObituaryList({ searchParams }: { searchParams?: Promise<{ city?: string | string[]; region?: string | string[] }> }) {
  return (
    <Layout
      megaMenu={""}
      isMegaMenuVisible={false}
      from={"18"}
      currentPage="osmrtnice"
      forFooter={"memorypage"}
    >
      <div className="flex flex-col mx-auto bg-[#F5F7F9] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <ObituaryListContent />
        </Suspense>
      </div>
    </Layout>
  );
}
