import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";
const Home = lazy(() => import("@/src/components/Home"));

const Index = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Home />
    </Suspense>
  );
};

export default Index;
