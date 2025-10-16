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
  title: "Osmrtnica – Naj spomin nanje ne zbledi",
  description:
    "Osmrtnica.com je portal za hitri pregled lokalnih osmrtnic in pogrebov. Prinaša številne sodobne rešitve, spominske strani in celoviti pregled lokalnih cvetličarn.",
  alternates: {
    canonical: "https://www.osmrtnica.com",
  },
  openGraph: {
    url: "https://www.osmrtnica.com",
    title: "Osmrtnica – Naj spomin nanje ne zbledi",
    description: "Platforma, kjer lahko svojci delijo svoje spomine na pokojne",
    site_name: "Osmrtnica",
    images: [
      {
        url: "https://www.osmrtnica.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Osmrtnica",
      },
    ],
  },
};