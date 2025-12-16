import { Tabs } from "expo-router";
import React from "react";

const TabsRootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="notes" options={{ title: "Notes" }} />
      <Tabs.Screen name="papers" options={{ title: "Papers" }} />
      <Tabs.Screen name="labs" options={{ title: "Labs" }} />
    </Tabs>
  );
};

export default TabsRootLayout;
