import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";

const PapersUploadComponent = lazy(
  () => import("@/src/components/Upload/Papers")
);
const PapersUpload = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PapersUploadComponent />
    </Suspense>
  );
};

export default PapersUpload;
