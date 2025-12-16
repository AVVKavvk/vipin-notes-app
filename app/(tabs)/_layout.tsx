import { Tabs } from "expo-router";
import React from "react";

const TabsRootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerTitleAlign: "center" }}
      />
      <Tabs.Screen
        name="notes"
        options={{ title: "Notes", headerTitleAlign: "center" }}
      />
      <Tabs.Screen
        name="papers"
        options={{ title: "Papers", headerTitleAlign: "center" }}
      />
      <Tabs.Screen
        name="labs"
        options={{ title: "Labs", headerTitleAlign: "center" }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings", headerTitleAlign: "center" }}
      />
    </Tabs>
  );
};

export default TabsRootLayout;
