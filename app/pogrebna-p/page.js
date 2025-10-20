import React, { Suspense } from "react";
import FuneralsComp from '../../comps/Pograbi';
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pogrebna podjetja | Osmrtnica",
  description: "Pogrebna podjetja v Sloveniji.",
  alternates: {
    canonical: "https://www.osmrtnica.com/pogrebna-p",
  },
};

const FuneralsList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FuneralsComp />
    </Suspense>
  );
};

export default FuneralsList;
