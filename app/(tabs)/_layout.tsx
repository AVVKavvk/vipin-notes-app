import { useTheme } from "@/src/hooks/useTheme";
import { AntDesign, Entypo, FontAwesome, Foundation } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
const TabsRootLayout = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center",

          tabBarIcon: () => {
            return (
              <FontAwesome
                size={28}
                name="home"
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
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
          title: "Papers",
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
          title: "Labs",
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
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          tabBarIcon: () => {
            return (
              <AntDesign
                size={28}
                name="setting"
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsRootLayout;
