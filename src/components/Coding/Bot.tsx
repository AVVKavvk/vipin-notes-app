import { useTheme } from "@/src/hooks/useTheme";
import { Bot, ExternalLink } from "lucide-react-native";
import React from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BotComponents = () => {
  const theme = useTheme();
  const isDark = theme === "dark";

  const handlePress = () => {
    Linking.openURL("https://t.me/avvk_bot").catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className={`w-full max-w-[350px] rounded-3xl overflow-hidden border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
        style={styles.shadow}
      >
        <View className="p-6 min-h-[320px] justify-between">
          {/* Header & Icon Section */}
          <View>
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text
                  className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Coding Bot
                </Text>
                <View className="h-1.5 w-10 bg-cyan-500 mt-1 rounded-full" />
              </View>

              {/* Replaced Image with Lucide Bot Icon */}
              <View
                className={`p-3 rounded-2xl ${isDark ? "bg-gray-700" : "bg-cyan-50"}`}
              >
                <Bot size={32} color={isDark ? "#22d3ee" : "#0891b2"} />
              </View>
            </View>

            <Text
              className={`text-[15px] leading-6 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Welcome to the{" "}
              <Text className="font-bold text-cyan-500">
                DSA and C++ Algorithms Bot!
              </Text>{" "}
              This is your gateway to DSA knowledge and essential C++ code for
              key problems. To begin, just type a command starting with{" "}
              <Text className="font-mono">{"/"}</Text>. We've made it easy to
              quickly access a world of algorithms and code snippets.
            </Text>
          </View>

          {/* Footer Section */}
          <View
            className={`flex-row items-center justify-between mt-6 pt-4 border-t ${
              isDark ? "border-gray-700" : "border-gray-50"
            }`}
          >
            <View className="flex-row items-center">
              <Text className="text-cyan-600 font-bold mr-2">Launch Bot</Text>
              <ExternalLink size={18} color="#0891b2" />
            </View>

            <Text className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              Telegram
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default BotComponents;
