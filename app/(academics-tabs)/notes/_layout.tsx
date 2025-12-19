import { Stack } from "expo-router";

export default function NotesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Notes",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[sem]"
        options={{
          title: "Note Details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
