import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";
import { ScrollView } from "react-native";

const Profile = lazy(() => import("@/src/components/Settings/Profile"));
const SettingsIndex = () => {
  return (
    <ScrollView>
      <Suspense fallback={<LoadingScreen />}>
        <Profile />
      </Suspense>
    </ScrollView>
  );
};

export default SettingsIndex;
