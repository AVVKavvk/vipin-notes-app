import { Tabs } from "expo-router";

const PlacementTabsRootLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{ title: "Alumni", headerTitleAlign: "center" }}
      />
      <Tabs.Screen
        name="resume"
        options={{ title: "Resume", headerTitleAlign: "center" }}
      />
      <Tabs.Screen
        name="certificates"
        options={{ title: "Certificates", headerTitleAlign: "center" }}
      />
    </Tabs>
  );
};

export default PlacementTabsRootLayout;
