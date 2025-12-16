import { useAuthStore } from "@/src/store/authStore";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const LoginComponent = () => {
  const { userLogin } = useAuthStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  async function handleSubmit() {
    try {
      if (!email || !password) {
        Toast.show({
          type: "error",
          text1: "Missing fields",
          text2: "Please enter email and password",
        });
        return;
      }

      setIsLoggingIn(true);
      await userLogin({ email, password });
      Toast.show({
        type: "success",
        text1: "Login successful",
      });
      router.replace("/");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to login",
        text2: error.message,
      });
    } finally {
      setIsLoggingIn(false);
    }
  }

  const openForgotPassword = async () => {
    const url = "https://vipinnotes.onrender.com/#/auth/forpass";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Cannot open URL",
      });
    }
  };

  const openSignup = async () => {
    const url = "https://vipinnotes.onrender.com/#/auth/signup";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Cannot open URL",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-500 text-base">Sign in to continue</Text>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-2">
              Email
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoggingIn}
            />
          </View>

          {/* Password Input */}
          <View className="mb-2">
            <Text className="text-gray-700 text-sm font-medium mb-2">
              Password
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-gray-800"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              editable={!isLoggingIn}
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={openForgotPassword}
            className="self-end mb-6"
            disabled={isLoggingIn}
          >
            <Text className="text-blue-600 text-sm font-medium">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoggingIn}
            className={`rounded-xl py-4 mb-4 ${
              isLoggingIn ? "bg-blue-400" : "bg-blue-600"
            }`}
            activeOpacity={0.8}
          >
            {isLoggingIn ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold text-base">
                Login
              </Text>
            )}
          </TouchableOpacity>

          {/* Signup Link */}
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={openSignup} disabled={isLoggingIn}>
              <Text className="text-blue-600 text-sm font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginComponent;
