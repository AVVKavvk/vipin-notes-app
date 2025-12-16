import LoadingScreen from "@/src/lib/Loader";
import React, { Suspense, lazy } from "react";
const SettingsIndex = lazy(() => import("@/src/components/Settings/Index"));
const Settings = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SettingsIndex />
    </Suspense>
  );
};

export default Settings;
