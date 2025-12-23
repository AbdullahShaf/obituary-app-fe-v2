import { Suspense } from "react";
import type { Metadata } from "next";

import API_BASE_URL from "@/config/apiConfig";
import Layout from "../components/appcomponents/Layout";
import ObituaryListContent from "./ObituaryListContent";

export const dynamic = "force-dynamic";

async function fetchObituaries(city?: string, region?: string) {
  try {
    const queryParams = new URLSearchParams();
    if (city) queryParams.append("city", city);
    if (region) queryParams.append("region", region);

    const url = `${API_BASE_URL}/obituary${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { obituaries: [] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching obituaries:", error);
    return { obituaries: [] };
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{
    city?: string | string[];
    region?: string | string[];
  }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const city =
    typeof resolvedSearchParams?.city === "string"
      ? resolvedSearchParams.city
      : Array.isArray(resolvedSearchParams?.city)
      ? resolvedSearchParams.city[0]
      : "";

  const cityRoutes: { [key: string]: string } = {
    Ljubljana: "/osmrtnice/ljubljana",
    Maribor: "/osmrtnice/maribor",
    Celje: "/osmrtnice/celje",
    Kranj: "/osmrtnice/kranj",
    Koper: "/osmrtnice/koper",
    "Novo Mesto": "/osmrtnice/novo-mesto",
    Domžale: "/osmrtnice/domzale",
    Velenje: "/osmrtnice/velenje",
    "Nova Gorica": "/osmrtnice/nova-gorica",
  };

  const canonicalUrl =
    city && cityRoutes[city]
      ? `https://www.osmrtnica.com${cityRoutes[city]}`
      : city
      ? `https://www.osmrtnica.com/osmrtnice?city=${encodeURIComponent(city)}`
      : "https://www.osmrtnica.com/osmrtnice";

  const keywords = city
    ? `osmrtnice, ${city}, žalne strani, spominske strani, pogrebi, ${city} osmrtnice, zadnje osmrtnice ${city}`
    : "osmrtnice, žalne strani, spominske strani, pogrebi, osmrtnice Slovenija, zadnje osmrtnice, Gorenjsko, Dolenjsko, Pomurje, Goriško, Zasavje, Primorsko, Notranjsko";

  return {
    title: city
      ? `Osmrtnice v ${city} – Žalne strani in spominske | Osmrtnica.com`
      : "Zadnje osmrtnice po Sloveniji | Osmrtnica.com",
    description: city
      ? `Osmrtnice v ${city}. Celovit pregled osmrtnic z datumi pogrebov, pokopališči ter možnostjo iskanja po imenu, kraju ali regiji.`
      : "Pregled vseh osmrtnic s povezavo do njihove žalne/spominske strani. Osmrtnice na Gorenjskem, Dolenjskem, Pomurju, Goriškem, Zasavju, Primorskem, Notranjskem",
    keywords: keywords,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ObituaryList({
  searchParams,
}: {
  searchParams?: Promise<{
    city?: string | string[];
    region?: string | string[];
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const city =
    typeof resolvedSearchParams?.city === "string"
      ? resolvedSearchParams.city
      : Array.isArray(resolvedSearchParams?.city)
      ? resolvedSearchParams.city[0]
      : undefined;
  const region =
    typeof resolvedSearchParams?.region === "string"
      ? resolvedSearchParams.region
      : Array.isArray(resolvedSearchParams?.region)
      ? resolvedSearchParams.region[0]
      : undefined;

  const initialData = await fetchObituaries(city, region);

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
          <ObituaryListContent
            h1Text="Zadnje osmrtnice"
            initialObituaries={initialData.obituaries || []}
          />
        </Suspense>
      </div>
    </Layout>
  );
}
