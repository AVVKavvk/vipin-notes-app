import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";

const ResumeComponent = lazy(() => import("@/src/components/Placement/Resume"));
const Resume = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ResumeComponent />
    </Suspense>
  );
};

export default Resume;
