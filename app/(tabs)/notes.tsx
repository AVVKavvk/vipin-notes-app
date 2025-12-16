// app/(tabs)/notes.tsx
import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Notes() {
  const router = useRouter();

  const openNote = () => {
    router.push({
      pathname: "/note/[sem]", // points to the file structure
      params: { sem: "42", title: "My Secret Note" }, // actual data
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Open Note 42" onPress={openNote} />
    </View>
  );
}
