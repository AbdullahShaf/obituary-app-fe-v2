import obituaryService from "@/services/obituary-service";
import MemoryPageClientComponent from "../../components/appcomponents/MemoryPageClientComponent";
import API_BASE_URL from "@/config/apiConfig";

export async function generateMetadata({ params }) {
  const { slugKey } = params;
  const image = `${API_BASE_URL}/api/og?slugKey=${slugKey}&t=${Date.now()}`;

  const response = await obituaryService.getMemory({ slugKey });
  const obituary = response?.obituary || {};

  const fullName =
    obituary?.firstName && obituary?.lastName
      ? `${obituary.firstName} ${obituary.lastName}`
      : null;

  return {
    title: fullName
      ? `${fullName} - Spominska stran | Osmrtnica`
      : "Spominska stran | Osmrtnica",
    description: fullName
      ? `Spominska stran za ${fullName}. Delite spomine, prižgite svečko in izrazite sožalje.`
      : "Spominska stran za pokojnega. Delite spomine, prižgite svečko in izrazite sožalje.",
    alternates: {
      canonical: `https://www.osmrtnica.com/m/${slugKey}`,
    },
    openGraph: {
      title: fullName ? `${fullName} - Spominska stran` : "Spominska stran",
      description: fullName
        ? `Spominska stran za ${fullName}. Delite spomine, prižgite svečko in izrazite sožalje.`
        : "Spominska stran za pokojnega. Delite spomine, prižgite svečko in izrazite sožalje.",
      url: `${API_BASE_URL}/m/${slugKey}`,
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
