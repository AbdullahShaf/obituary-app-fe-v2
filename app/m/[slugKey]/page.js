import obituaryService from "@/services/obituary-service";
import MemoryPageClientComponent from "../../components/appcomponents/MemoryPageClientComponent";
import API_BASE_URL, { APP_BASE_URL } from "@/config/apiConfig";

export async function generateMetadata({ params }) {
  const { slugKey } = params;
  const image = `${APP_BASE_URL}/api/og?slugKey=${slugKey}&t=${Date.now()}`;

  const response = await obituaryService.getMemory({ slugKey });
  const obituary = response?.obituary || {};

  const lastName = obituary?.sirName || "";
  const fullName = obituary?.name && lastName ? `${obituary.name} ${lastName}` : obituary?.name || "";
  const titleText = fullName ? `${fullName} – žalna stran` : "Žalna stran";
  const descriptionText = fullName 
    ? `${fullName} – žalna stran, kjer uporabnik lahko prižge svečko, izrazi sožalje, deli spomine in slike ter prevzame digitalne kartice in QR kode.`
    : "Žalna stran, kjer uporabnik lahko prižge svečko, izrazi sožalje, deli spomine in slike ter prevzame digitalne kartice in QR kode.";

  return {
    title: titleText,
    description: descriptionText,
    alternates: {
      canonical: `https://www.osmrtnica.com/m/${slugKey}`,
    },
    openGraph: {
      title: titleText,
      description: descriptionText,
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