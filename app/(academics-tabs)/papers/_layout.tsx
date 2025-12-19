import { Stack } from "expo-router";

export default function PapersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Papers",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[sem]"
        options={{
          title: "Paper Details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
