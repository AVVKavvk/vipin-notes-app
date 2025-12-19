import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import StartAppConfig from "@/src/components/Start";
import { useTheme } from "@/src/hooks/useTheme";
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

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="login"
            options={{
              headerShown: true,
              title: "Login",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen name="(tabs)" />
        </Stack>

        <Toast />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
