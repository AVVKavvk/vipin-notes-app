import { ActivityIndicator, Text, View } from "react-native";

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color="#8b5cf6" />
    <Text style={{ marginTop: 10 }}>Loading...</Text>
  </View>
);
export default LoadingScreen;
