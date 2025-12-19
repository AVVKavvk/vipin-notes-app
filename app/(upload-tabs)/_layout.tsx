import { useTheme } from "@/src/hooks/useTheme";
import { Entypo, FontAwesome, Foundation } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const UploadTabLayout = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Notes Upload",
          headerTitleAlign: "center",
          tabBarIcon: () => {
            return (
              <Foundation
                size={28}
                name="clipboard-notes"
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="papers"
        options={{
          title: "Papers Upload",
          headerTitleAlign: "center",
          tabBarIcon: () => {
            return (
              <FontAwesome
                size={28}
                name="book"
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="labs"
        options={{
          title: "Labs Upload",
          headerTitleAlign: "center",
          tabBarIcon: () => {
            return (
              <Entypo
                size={28}
                name="lab-flask"
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default UploadTabLayout;
