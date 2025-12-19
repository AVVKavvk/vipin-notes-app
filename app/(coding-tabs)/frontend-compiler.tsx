import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";

const CompilerComponents = lazy(
  () => import("@/src/components/Coding/Compiler")
);
const FrontendCompiler = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CompilerComponents />
    </Suspense>
  );
};

export default FrontendCompiler;
