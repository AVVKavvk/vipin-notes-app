import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";

const AlumniComponents = lazy(
  () => import("@/src/components/Placement/Alumni")
);
const Alumni = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AlumniComponents />
    </Suspense>
  );
};

export default Alumni;
