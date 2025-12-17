import HomeContent from "@/app/components/HomePage"
import { Suspense } from "react";

export default function Home(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent {...props} />
    </Suspense>
  );
}

export const metadata = {
  title: "Osmrtnice in pogrebi v Sloveniji | Osmrtnica.com",
  description:
    "Osmrtnica.com – Celovit pregled osmrtnic in pogrebov po vsej Sloveniji. Žalne strani in spominske ter vse povezane storitve na enem mestu.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Osmrtnice in pogrebi v Sloveniji | Osmrtnica.com",
    description: "Osmrtnica.com – Celovit pregled osmrtnic in pogrebov po vsej Sloveniji. Žalne strani in spominske ter vse povezane storitve na enem mestu.",
    siteName: "Osmrtnica",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Osmrtnica",
      },
    ],
  },
};