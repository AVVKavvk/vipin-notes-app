import { Tabs } from "expo-router";
import React from "react";

const CodingTabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Coding Bot",
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="frontend-compiler"
        options={{
          title: "Frontend Compiler",
          headerTitleAlign: "center",
        }}
      />
    </Tabs>
  );
};

export default CodingTabsLayout;
