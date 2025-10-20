"use client";
import Head from "next/head";
import obituaryService from "@/services/obituary-service";
import MemoryPageClientComponent from "../../components/appcomponents/MemoryPageClientComponent";
import API_BASE_URL from "@/config/apiConfig";

export async function generateMetadata({ params }) {
  const { slugKey } = params;
  const image = `${API_BASE_URL}/api/og?slugKey=${slugKey}&t=${Date.now()}`;

  return {
    title: "Vpis v žalno knjigo ",
    description: "Vpis v žalno knjigo in informacije o pogrebu so tukaj.",
    openGraph: {
      title: "Vpis v žalno knjigo",
      description: "Vpis v žalno knjigo in informacije o pogrebu so tukaj.",
      url: `${API_BASE_URL}/m/${slugKey}`,
      metadataBase: new URL(`${API_BASE_URL}/`),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Obituary Image",
        },
      ],
      type: "website",
    },
  };
}

export default async function Page({ params }) {
  const { slugKey } = params;

  // Fetch obituary data on the server
  const response = await obituaryService.getMemory({ slugKey });
  const obituary = response?.obituary || {};

  // Pass it to the client component
  return (
    <>
      <Head>
        <title>
          {obituary?.firstName && obituary?.lastName
            ? `${obituary.firstName} ${obituary.lastName} - Spominska stran`
            : "Spominska stran"}{" "}
          | Osmrtnica
        </title>
        <link rel="canonical" href={`https://www.osmrtnica.com/m/${slugKey}`} />
        <meta
          name="description"
          content={
            obituary?.firstName && obituary?.lastName
              ? `Spominska stran za ${obituary.firstName} ${obituary.lastName}. Delite spomine, prižgite svečko in izrazite sožalje.`
              : "Spominska stran za pokojnega. Delite spomine, prižgite svečko in izrazite sožalje."
          }
        />
      </Head>

      <MemoryPageClientComponent
        params={params}
        obituaryDataFromServer={obituary}
      />
    </>
  );
}
