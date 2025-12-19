import { Stack } from "expo-router";

export default function LabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Labs",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[sem]"
        options={{
          title: "Lab Details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
