import { useTheme } from "@/src/hooks/useTheme";
import { Code2, ExternalLink } from "lucide-react-native";
import React from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CompilerComponents = () => {
  const theme = useTheme();
  const isDark = theme === "dark";

  const handlePress = () => {
    Linking.openURL("https://vipineditor.netlify.app/").catch((err) =>
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
                  Vipin's Editor
                </Text>
                <View className="h-1.5 w-10 bg-indigo-500 mt-1 rounded-full" />
              </View>

              {/* Lucide Code Icon Container */}
              <View
                className={`p-3 rounded-2xl ${isDark ? "bg-gray-700" : "bg-indigo-50"}`}
              >
                <Code2 size={32} color={isDark ? "#818cf8" : "#4f46e5"} />
              </View>
            </View>

            <Text
              className={`text-[15px] leading-6 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Vipin Editor is a special{" "}
              <Text className="font-bold text-indigo-500">
                online playground
              </Text>{" "}
              for web developers. It's a friendly place where you can try out
              your own creative ideas in{" "}
              <Text className="font-mono text-xs">HTML, CSS, and JS</Text>.
              Perfect for both beginners and pros to build and share code.
            </Text>
          </View>

          {/* Footer Section */}
          <View
            className={`flex-row items-center justify-between mt-6 pt-4 border-t ${
              isDark ? "border-gray-700" : "border-gray-50"
            }`}
          >
            <View className="flex-row items-center">
              <Text className="text-indigo-600 font-bold mr-2">
                Start Coding
              </Text>
              <ExternalLink size={18} color="#4f46e5" />
            </View>

            <Text className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              Web Editor
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

export default CompilerComponents;
