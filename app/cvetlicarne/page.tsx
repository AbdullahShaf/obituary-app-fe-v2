import React, { Suspense } from "react";
import CveltComp from "../../comps/CveltComp";

export const dynamic = "force-dynamic";

const FloristsListPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CveltComp />
    </Suspense>
  );
};

export default FloristsListPage;
