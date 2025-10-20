import React, { Suspense } from "react";
import CveltComp from "../../comps/CveltComp";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cvetličarne | Osmrtnica",
  description: "Pregled cvetličarn po Sloveniji. Poiščite lokalno cvetličarno.",
  alternates: {
    canonical: "https://www.osmrtnica.com/cvetlicarne",
  },
};

const FloristsListPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CveltComp />
    </Suspense>
  );
};

export default FloristsListPage;
