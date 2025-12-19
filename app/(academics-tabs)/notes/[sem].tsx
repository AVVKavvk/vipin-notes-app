// app/note/[id].tsx
import { useTheme } from "@/src/hooks/useTheme";
import LoadingScreen from "@/src/lib/Loader";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { lazy, Suspense } from "react";
import { Text, View } from "react-native";

const NotesBySem = lazy(() => import("@/src/components/Notes/NotesBySem"));

export default function NoteDetail() {
  const theme = useTheme();
  const isDark = theme === "dark";

  const { sem, title } = useLocalSearchParams();

  return (
    <View className={`flex-1 px-4 ${isDark ? "bg-black" : "bg-white"}`}>
      {/* Header */}
      <Stack.Screen
        options={{
          title: "Notes Details",
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
        <NotesBySem semLinkName={sem as string} />
      </Suspense>
    </View>
  );
}
