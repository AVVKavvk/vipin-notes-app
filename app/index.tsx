import { isLoggedIn } from "@/src/helper/authHelper";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    async function checkLogin() {
      const isLogin = await isLoggedIn();
      if (!isLogin) {
        router.replace("/login");
      } else {
        router.replace("/(tabs)");
      }
    }
    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
