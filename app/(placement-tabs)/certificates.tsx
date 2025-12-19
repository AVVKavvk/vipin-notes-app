import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";

const CertificatesComponent = lazy(
  () => import("@/src/components/Placement/Certificates")
);
const Certificates = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CertificatesComponent />
    </Suspense>
  );
};

export default Certificates;
