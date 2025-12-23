import React, { Suspense } from "react";
import type { Metadata } from "next";
import CveltComp from "../../comps/CveltComp";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{
    city?: string | string[];
    region?: string | string[];
  }>;
}): Promise<Metadata> {
  return {
    title: "Lokalne cvetličarne | Osmrtnica.com",
    description:
      "Seznam bližnjih cvetličarn z naslovom, telefonsko številko, e-pošto, povezavo do spletne strani in opisom prednosti napram velikim trgovinam.",
    alternates: {
      canonical: "https://www.osmrtnica.com/cvetlicarne",
    },
    openGraph: {
      title:
        "Lokalne cvetličarne – Bližnje cvetličarne za pogrebe in spomine | Osmrtnica.com",
      description:
        "Najdite lokalne cvetličarne v vaši bližini. Bližnje cvetličarne za pogrebne in spominske cvetlične aranžmaje. Seznam cvetličarn z naslovi, telefoni in spletnimi stranmi.",
      url: "https://www.osmrtnica.com/cvetlicarne",
      siteName: "Osmrtnica",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Lokalne cvetličarne za pogrebe in spomine",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Lokalne cvetličarne – Bližnje cvetličarne za pogrebe in spomine | Osmrtnica.com",
      description:
        "Najdite lokalne cvetličarne v vaši bližini. Bližnje cvetličarne za pogrebne in spominske cvetlične aranžmaje. Seznam cvetličarn z naslovi, telefoni in spletnimi stranmi.",
      images: ["/og-image.jpg"],
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
