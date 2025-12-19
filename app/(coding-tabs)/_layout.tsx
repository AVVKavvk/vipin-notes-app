import { useTheme } from "@/src/hooks/useTheme";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const CodingTabsLayout = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Coding Bot",
          headerTitleAlign: "center",
          tabBarIcon: () => {
            return (
              <FontAwesome5
                name="robot"
                size={24}
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="frontend-compiler"
        options={{
          title: "Frontend Compiler",
          headerTitleAlign: "center",
          tabBarIcon: () => {
            return (
              <FontAwesome
                name="code"
                size={24}
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default CodingTabsLayout;
