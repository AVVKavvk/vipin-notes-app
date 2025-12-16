import LoadingScreen from "@/src/lib/Loader";
import React, { Suspense, lazy } from "react";
const PapersIndex = lazy(() => import("@/src/components/Papers/Index"));
const Papers = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PapersIndex />
    </Suspense>
  );
};

export default Papers;
