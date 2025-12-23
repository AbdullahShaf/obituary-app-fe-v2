import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cenik za spominske strani in možnosti oglaševanja | Osmrtnica.com",
  description: "Cenik za spominske strani in informacije o možnostih oglaševanja za lokalne partnerje in cvetličarne na portalu Osmrtnica.com. Pridružite se.",
  alternates: {
    canonical: "https://www.osmrtnica.com/cenik",
  },
  openGraph: {
    title: "Cenik za spominske strani in možnosti oglaševanja | Osmrtnica.com",
    description: "Cenik za spominske strani in informacije o možnostih oglaševanja za lokalne partnerje in cvetličarne na portalu Osmrtnica.com. Pridružite se.",
    url: "https://www.osmrtnica.com/cenik",
    siteName: "Osmrtnica",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cenik za spominske strani in možnosti oglaševanja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cenik za spominske strani in možnosti oglaševanja | Osmrtnica.com",
    description: "Cenik za spominske strani in informacije o možnostih oglaševanja za lokalne partnerje in cvetličarne na portalu Osmrtnica.com. Pridružite se.",
    images: ["/og-image.jpg"],
  },
};

export default function CenikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

