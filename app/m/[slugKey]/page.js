import obituaryService from "@/services/obituary-service";
import MemoryPageClientComponent from "../../components/appcomponents/MemoryPageClientComponent";
import APP_BASE_URL from "@/config/appConfig";

export async function generateMetadata({ params }) {
  const { slugKey } = params;

  const response = await obituaryService.getMemory({ slugKey });
  const image = response?.obituary?.fbImage;

  return {
    title: "Vpis v žalno knjigo",
    description: "Vpis v žalno knjigo in informacije o pogrebu so tukaj.",
    openGraph: {
      title: "Vpis v žalno knjigo",
      description: "Vpis v žalno knjigo in informacije o pogrebu so tukaj.",
      url: `${APP_BASE_URL}/m/${slugKey}`,
      metadataBase: new URL(`${APP_BASE_URL}/`),
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

  // ✅ Fetch obituary data on the server
  const response = await obituaryService.getMemory({ slugKey });
  const obituary = response?.obituary || {};

  // ✅ Pass it to the client component
  return (
    <MemoryPageClientComponent
      params={params}
      obituaryDataFromServer={obituary}
    />
  );
}
