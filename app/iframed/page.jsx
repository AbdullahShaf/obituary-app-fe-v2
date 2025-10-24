import React, { Suspense } from "react";
import FramedContentComp from "../../comps/FramedContentComp";

export const dynamic = "force-dynamic";

const FloristsListPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FramedContentComp />
    </Suspense>
  );
};

export default FloristsListPage;
