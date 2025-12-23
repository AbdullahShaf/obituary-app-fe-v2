import obituaryService from "@/services/obituary-service";
import MemoryPageClientComponent from "../../components/appcomponents/MemoryPageClientComponent";
import API_BASE_URL, { APP_BASE_URL } from "@/config/apiConfig";

export async function generateMetadata({ params }) {
  const { slugKey } = params;
  const image = `${APP_BASE_URL}/api/og?slugKey=${slugKey}&t=${Date.now()}`;

  const response = await obituaryService.getMemory({ slugKey });
  const obituary = response?.obituary || {};

  const lastName = obituary?.sirName || "";
  const firstName = obituary?.name || "";
  const city = obituary?.city || "";
  
  const titleText = firstName && lastName && city 
    ? `${firstName} ${lastName} ${city} - Osmrtnica`
    : firstName && lastName
    ? `${firstName} ${lastName} - Osmrtnica`
    : firstName
    ? `${firstName} - Osmrtnica`
    : "Osmrtnica";
    
  const descriptionText = firstName && lastName && city
    ? `Osmrtnica za ${firstName} ${lastName} ${city} – tu lahko prižgete svečko, delite spomine in najdete informacije o pogrebu. Enostavno in brezplačno.`
    : firstName && lastName
    ? `Osmrtnica za ${firstName} ${lastName} – tu lahko prižgete svečko, delite spomine in najdete informacije o pogrebu. Enostavno in brezplačno.`
    : firstName
    ? `Osmrtnica za ${firstName} – tu lahko prižgete svečko, delite spomine in najdete informacije o pogrebu. Enostavno in brezplačno.`
    : "Osmrtnica – tu lahko prižgete svečko, delite spomine in najdete informacije o pogrebu. Enostavno in brezplačno.";


    const twitterTitle = titleText;
    const twitterDescription = descriptionText;

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
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: [image],
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