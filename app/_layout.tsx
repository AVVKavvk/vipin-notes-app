import StartAppConfig from "@/src/components/Start";
import { useTheme } from "@/src/hooks/useTheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

// Prevent the splash screen from auto-hiding until we manually tell it to.
// This is moved outside the component to ensure it's called immediately.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useTheme();
  const [isReady, setIsReady] = useState(false);

  // This handleReady callback will be passed to StartAppConfig
  // so that once Supabase/Version checks are done, we hide the splash.
  const onAppReady = async () => {
    setIsReady(true);
    await SplashScreen.hideAsync();
  };

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {/* We pass a callback to the Start component to signal when data is loaded */}
        <StartAppConfig onReady={onAppReady} />

        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer screenOptions={{ headerTitleAlign: "center" }}>
            {/* Main Home Screen */}
            <Drawer.Screen
              name="index"
              options={{ drawerLabel: "Home", title: "Home" }}
            />

            {/* The Tab Groups as Drawer Items */}
            <Drawer.Screen
              name="(academics-tabs)"
              options={{ drawerLabel: "Academics", title: "Academics" }}
            />
            <Drawer.Screen
              name="(placement-tabs)"
              options={{ drawerLabel: "Placement", title: "Placement" }}
            />
            <Drawer.Screen
              name="(upload-tabs)"
              options={{ drawerLabel: "Upload", title: "Upload" }}
            />
            <Drawer.Screen
              name="(coding-tabs)"
              options={{ drawerLabel: "Coding", title: "Coding" }}
            />
            <Drawer.Screen
              name="feedback"
              options={{ drawerLabel: "Feedback", title: "Feedback" }}
            />
            <Drawer.Screen
              name="rate-us"
              options={{ drawerLabel: "Rate Us", title: "Rate Us" }}
            />
            <Drawer.Screen
              name="about-us"
              options={{ drawerLabel: "About Us", title: "About Us" }}
            />
            <Drawer.Screen
              name="settings"
              options={{ drawerLabel: "Settings", title: "Settings" }}
            />

            {/* Hide internal stack routes from showing in the Drawer menu */}
            <Drawer.Screen
              name="login"
              options={{ drawerItemStyle: { display: "none" }, title: "Login" }}
            />
            <Drawer.Screen
              name="note/[sem]"
              options={{ drawerItemStyle: { display: "none" }, title: "Notes" }}
            />
            <Drawer.Screen
              name="lab/[sem]"
              options={{ drawerItemStyle: { display: "none" }, title: "Labs" }}
            />
            <Drawer.Screen
              name="paper/[sem]"
              options={{
                drawerItemStyle: { display: "none" },
                title: "Papers",
              }}
            />
          </Drawer>
        </GestureHandlerRootView>

        <Toast />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
