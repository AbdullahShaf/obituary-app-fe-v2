import React, { Suspense } from "react";
import FuneralsComp from '../../comps/Pograbi';
export const dynamic = "force-dynamic";

const FuneralsList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FuneralsComp />
    </Suspense>
  );
};

export default FuneralsList;
