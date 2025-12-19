import LoadingScreen from "@/src/lib/Loader";
import React, { Suspense } from "react";

const BotComponents = React.lazy(() => import("@/src/components/Coding/Bot"));
const CodingBot = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BotComponents />
    </Suspense>
  );
};

export default CodingBot;
