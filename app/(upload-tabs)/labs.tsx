import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";

const LabsUploadComponent = lazy(() => import("@/src/components/Upload/Labs"));
const LabsUpload = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LabsUploadComponent />
    </Suspense>
  );
};

export default LabsUpload;
