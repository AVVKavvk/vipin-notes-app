import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";
const LabsIndex = lazy(() => import("@/src/components/Labs/Index"));
const Labs = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LabsIndex />
    </Suspense>
  );
};

export default Labs;
