import { Tabs } from "expo-router";
import React from "react";

const UploadTabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{ title: "Notes Upload", headerTitleAlign: "center" }}
      />
      <Tabs.Screen
        name="papers"
        options={{ title: "Papers Upload", headerTitleAlign: "center" }}
      />
      <Tabs.Screen
        name="labs"
        options={{ title: "Labs Upload", headerTitleAlign: "center" }}
      />
    </Tabs>
  );
};

export default UploadTabLayout;
