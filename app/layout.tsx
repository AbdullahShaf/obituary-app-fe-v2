import type { Metadata } from "next";
import Script from "next/script";
import "react-quill-new/dist/quill.snow.css";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import ClientProviders from "./components/providers/ClientProviders";
import { robotoFlex, sourceSerif, greatVibes } from "@/utils/customFonts";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.osmrtnica.com"),
  title: {
    default: "Osmrtnice in pogrebi v Sloveniji | Osmrtnica.com",
    template: "%s | Osmrtnica.com",
  },
  description:
    "Osmrtnica.com – Celovit pregled osmrtnic in pogrebov po vsej Sloveniji. Žalne strani in spominske ter vse povezane storitve na enem mestu.",
  keywords: ["osmrtnice", "pogrebi", "žalne strani", "spominske strani", "Slovenija"],
  authors: [{ name: "Osmrtnica" }],
  creator: "Osmrtnica",
  publisher: "Osmrtnica",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "sl_SI",
    url: "/",
    siteName: "Osmrtnica",
    title: "Osmrtnice in pogrebi v Sloveniji | Osmrtnica.com",
    description:
      "Osmrtnica.com – Celovit pregled osmrtnic in pogrebov po vsej Sloveniji. Žalne strani in spominske ter vse povezane storitve na enem mestu.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Osmrtnica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osmrtnice in pogrebi v Sloveniji | Osmrtnica.com",
    description:
      "Osmrtnica.com – Celovit pregled osmrtnic in pogrebov po vsej Sloveniji. Žalne strani in spominske ter vse povezane storitve na enem mestu.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here if needed
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl">
      <body
        className={`${robotoFlex.className} ${robotoFlex.variable} ${sourceSerif.variable} ${greatVibes.variable}`}
      >
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/4ea35c9889e0f2f54d3cfc92/script.js"
          strategy="afterInteractive"
        />
        <Script
          id="datasag-analytics"
          src="https://www.datasag.com/tracker.js"
          data-datasag-key="tb_pj2od6795ga6tjm5my0aju"
          strategy="afterInteractive"
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
