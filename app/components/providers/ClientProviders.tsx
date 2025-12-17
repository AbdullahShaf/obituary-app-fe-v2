"use client";

import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <PlausibleProvider domain="osmrtnica.com">
      <SessionProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              margin: "15px",
              background: "#828282",
              color: "#fff",
              fontSize: "15px",
              width: "340px",
            },
            className: "text-base",
            duration: 3000,
          }}
        />
        {children}
      </SessionProvider>
    </PlausibleProvider>
  );
}
