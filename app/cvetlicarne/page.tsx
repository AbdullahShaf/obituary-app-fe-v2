import React, { Suspense } from "react";
import type { Metadata } from "next";
import CveltComp from "../../comps/CveltComp";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams?: Promise<{ city?: string | string[]; region?: string | string[] }> }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const city = typeof resolvedSearchParams?.city === 'string' ? resolvedSearchParams.city : Array.isArray(resolvedSearchParams?.city) ? resolvedSearchParams.city[0] : "";
  
  return {
    title: city ? `Cvetličarne v ${city} – Lokalni partnerji` : "Cvetličarne – Lokalni partnerji",
    description: city
      ? `Pregled lokalnih cvetličarn v ${city} z naslovom, telefonsko številko, e-pošto, povezavo do spletne strani in opisom prednosti napram velikim trgovinam.`
      : "Pregled lokalnih cvetličarn z naslovom, telefonsko številko, e-pošto, povezavo do spletne strani in opisom prednosti napram velikim trgovinam.",
    alternates: {
      canonical: city ? `https://www.osmrtnica.com/cvetlicarne?city=${encodeURIComponent(city)}` : "https://www.osmrtnica.com/cvetlicarne",
    },
  };
}

const FloristsListPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CveltComp />
    </Suspense>
  );
};

export default FloristsListPage;
