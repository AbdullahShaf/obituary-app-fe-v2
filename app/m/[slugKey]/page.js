import obituaryService from "@/services/obituary-service";
import MemoryPageClientComponent from "../../components/appcomponents/MemoryPageClientComponent";
import API_BASE_URL, { APP_BASE_URL } from "@/config/apiConfig";

export async function generateMetadata({ params }) {
  const { slugKey } = params;
  const image = `${APP_BASE_URL}/api/og?slugKey=${slugKey}&t=${Date.now()}`;

  const response = await obituaryService.getMemory({ slugKey });
  const obituary = response?.obituary || {};

  const nameForTitle =
    obituary?.name && obituary?.sirname
      ? `${obituary.name} ${obituary.sirname}`
      : obituary?.name
      ? `${obituary.name}`
      : null;

  return {
    title: nameForTitle
      ? `${nameForTitle} - Spominska stran`
      : "Spominska stran | Osmrtnica",
    description: nameForTitle
      ? `Spominska stran za ${nameForTitle}. Delite spomine, prižgite svečko in izrazite sožalje.`
      : "Spominska stran za pokojnega. Delite spomine, prižgite svečko in izrazite sožalje.",
    alternates: {
      canonical: `https://www.osmrtnica.com/m/${slugKey}`,
    },
    openGraph: {
      title: nameForTitle ? `${nameForTitle} - Spominska stran` : "Spominska stran",
      description: nameForTitle
        ? `Spominska stran za ${nameForTitle}. Delite spomine, prižgite svečko in izrazite sožalje.`
        : "Spominska stran za pokojnega. Delite spomine, prižgite svečko in izrazite sožalje.",
      url: `${APP_BASE_URL}/m/${slugKey}`,
      siteName: "Osmrtnica",
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
  const response = await obituaryService.getMemory({ slugKey });
  const obituary = response?.obituary || {};

  return (
    <MemoryPageClientComponent
      params={params}
      obituaryDataFromServer={obituary}
    />
  );
}
