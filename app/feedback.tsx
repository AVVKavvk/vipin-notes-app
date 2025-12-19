import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";

const FeedbackComponents = lazy(() => import("@/src/components/Feedback"));
const Feedback = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <FeedbackComponents />
    </Suspense>
  );
};

export default Feedback;
