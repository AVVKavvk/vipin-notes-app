import { useTheme } from "@/src/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const PlacementTabsRootLayout = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Alumni",
          headerTitleAlign: "center",
          tabBarIcon: () => {
            return (
              <FontAwesome
                name="users"
                size={28}
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="resume"
        options={{
          title: "Resume",
          headerTitleAlign: "center",
          tabBarIcon: () => {
            return (
              <FontAwesome
                name="newspaper-o"
                size={28}
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="certificates"
        options={{
          title: "Certificates",
          headerTitleAlign: "center",
          tabBarIcon: () => {
            return (
              <FontAwesome
                name="certificate"
                size={28}
                color={isDark ? "white" : "black"}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default PlacementTabsRootLayout;
