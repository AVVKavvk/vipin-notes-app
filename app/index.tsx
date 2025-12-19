import { isLoggedIn } from "@/src/helper/authHelper";
import LoadingScreen from "@/src/lib/Loader";
import { useRouter } from "expo-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
const Home = lazy(() => import("@/src/components/Home"));
export default function Index() {
  const router = useRouter();
  const [isLoginUser, setIsLoginUser] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const isLogin = await isLoggedIn();
      if (!isLogin) {
        setIsLoginUser(false);
        router.replace("/login");
      } else {
        setIsLoginUser(true);
      }
    }
    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!isLoginUser ? (
        <ActivityIndicator size="large" />
      ) : (
        <Suspense fallback={<LoadingScreen />}>
          <Home />
        </Suspense>
      )}
    </View>
  );
}
