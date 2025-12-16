import features from "@/src/data/features.json";
import { useTheme } from "@/src/hooks/useTheme";
import React, { useEffect, useState } from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Count_User } from "../constant/storage";
import { getItem } from "../utils/storage";

const Home = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const [registeredUsers, setRegisteredUsers] = useState<string>("1305");

  async function openWebsite() {
    const url = "https://vipinnotes.onrender.com";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Cannot open URL",
      });
    }
  }
  async function getUserCount() {
    const users = (await getItem(Count_User)) ?? "1305";
    setRegisteredUsers(users);
  }

  useEffect(() => {
    getUserCount();
  }, []);

  return (
    <ScrollView
      className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gradient-to-b from-purple-50 to-white"}`}
    >
      <View className="px-4 py-8">
        {/* Hero Section */}
        <View className="items-center mb-8">
          <View className="items-center mb-6">
            <Text
              className={`text-4xl md:text-6xl font-bold mb-3 text-center ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <Text className="text-purple-500">Welcome to{"\n"}</Text>
              <Text className={isDark ? "text-white-400" : "text-gray-"}>
                Vipin Notes
              </Text>
            </Text>

            <Text
              className={`text-base md:text-lg text-center px-4 leading-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Ultimate Academic, Career, and Personal Growth Platform for IIIT
              Pune Students
            </Text>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            onPress={openWebsite}
            className={`${
              isDark
                ? "bg-purple-600 active:bg-purple-700"
                : "bg-purple-500 active:bg-purple-600"
            } px-8 py-4 rounded-full shadow-lg`}
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-semibold">
              🌐 Open Website
            </Text>
          </TouchableOpacity>
        </View>

        <View
          className={`w-full rounded-2xl p-4 ${
            isDark ? "bg-gray-900" : "bg-gray-100"
          } shadow-sm justify-center items-center`}
        >
          <Text
            className={`${
              isDark ? "text-gray-300" : "text-gray-600"
            } text-sm mb-1`}
          >
            Registered Users
          </Text>

          <Text
            className={`${
              isDark ? "text-white" : "text-gray-900"
            } text-2xl font-bold`}
          >
            {registeredUsers}
          </Text>
        </View>

        {/* Features Section */}
        <View className="mt-8">
          <Text
            className={`text-2xl font-bold mb-6 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            ✨ Features
          </Text>

          <View className="space-y-4">
            {features &&
              features.map((feature, index) => (
                <View
                  key={index}
                  className={`${
                    isDark
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } p-5 rounded-2xl border shadow-sm mb-4`}
                >
                  <View className="flex-row items-center mb-2">
                    <View
                      className={`${
                        isDark ? "bg-purple-900" : "bg-purple-100"
                      } w-10 h-10 rounded-full items-center justify-center mr-3`}
                    >
                      <Text className="text-xl">{getEmoji(index)}</Text>
                    </View>
                    <Text
                      className={`text-xl font-bold flex-1 ${
                        isDark ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      {feature.tag}
                    </Text>
                  </View>
                  <Text
                    className={`text-base leading-6 ml-13 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {feature.content}
                  </Text>
                </View>
              ))}
          </View>
        </View>

        {/* Footer */}
        <View className="mt-12 mb-8 items-center">
          <Text
            className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            Made with 💜 for IIIT Pune
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Helper function to get emoji based on index
const getEmoji = (index: number): string => {
  const emojis = ["📚", "💼", "🎯", "🚀", "💡", "🌟", "🎓", "📱"];
  return emojis[index % emojis.length];
};

export default Home;
