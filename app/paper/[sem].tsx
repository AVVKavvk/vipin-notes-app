// app/note/[id].tsx
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PaperDetail() {
  // 1. Get the params
  const { sem, title } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Set the header title dynamically */}
      <Stack.Screen options={{ title: "Paper Details " + sem }} />

      <Text className="text-xl font-bold">Paper ID: {sem}</Text>
      <Text>Title passed: {title}</Text>
    </View>
  );
}
