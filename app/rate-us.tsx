import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";
const RateUsComponents = lazy(() => import("@/src/components/RateUs"));
const RateUs = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RateUsComponents />
    </Suspense>
  );
};

export default RateUs;
