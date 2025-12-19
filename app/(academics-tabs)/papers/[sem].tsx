// app/note/[id].tsx
import { useTheme } from "@/src/hooks/useTheme";
import LoadingScreen from "@/src/lib/Loader";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { lazy, Suspense } from "react";
import { Text, View } from "react-native";
const PapersBySem = lazy(() => import("@/src/components/Papers/PaperBySem"));

export default function PaperDetail() {
  const theme = useTheme();
  const isDark = theme === "dark";

  const { sem, title } = useLocalSearchParams();

  return (
    <View className={`flex-1 px-4 ${isDark ? "bg-black" : "bg-white"}`}>
      {/* Header */}
      <Stack.Screen
        options={{
          title: "Papers Details",
          headerStyle: {
            backgroundColor: isDark ? "#000" : "#fff",
          },
          headerTintColor: isDark ? "#fff" : "#000",
        }}
      />

      {/* Info */}
      <View className="mb-4 flex  items-center">
        {title && (
          <Text
            className={`mt-1 ${isDark ? "text-gray-300" : "text-gray-600"} text-xl`}
          >
            {title}
          </Text>
        )}
      </View>

      {/* Notes */}
      <Suspense fallback={<LoadingScreen />}>
        <PapersBySem semLinkName={sem as string} />
      </Suspense>
    </View>
  );
}
