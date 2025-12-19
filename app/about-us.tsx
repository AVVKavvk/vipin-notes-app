import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";

const AboutUsComponents = lazy(() => import("@/src/components/AboutUs"));
const AboutUs = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AboutUsComponents />
    </Suspense>
  );
};

export default AboutUs;
