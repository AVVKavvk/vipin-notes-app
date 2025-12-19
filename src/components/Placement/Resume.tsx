import { useTheme } from "@/src/hooks/useTheme";
import { CheckCircle2, ExternalLink, PenTool, Zap } from "lucide-react-native";
import React from "react";
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ResumeComponent = () => {
  const theme = useTheme();
  const isDark = theme === "dark";

  const openLink = (path: string) => {
    const baseUrl = "https://vipinnotes.onrender.com/#";
    Linking.openURL(`${baseUrl}${path}`).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const Feature = ({ text }: { text: string }) => (
    <View className="flex-row items-center mb-1">
      <CheckCircle2 size={14} color="#10b981" />
      <Text
        className={`ml-2 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
      >
        {text}
      </Text>
    </View>
  );

  return (
    <ScrollView
      className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text
        className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Resume Builder
      </Text>

      {/* Option 1: Instant Builder */}
      <TouchableOpacity
        onPress={() => openLink("/resume/in-5-min")}
        activeOpacity={0.8}
        className={`w-full mb-5 rounded-3xl border p-5 ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
        style={styles.shadow}
      >
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <View className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl mr-3">
              <Zap size={24} color="#eab308" />
            </View>
            <Text
              className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Instant Builder
            </Text>
          </View>
          <ExternalLink size={18} color="#9ca3af" />
        </View>

        <Text
          className={`text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          Professional resume in 5 minutes.
        </Text>

        <Feature text="No design skills required" />
        <Feature text="Predefined professional templates" />
        <Feature text="Automatic formatting" />
      </TouchableOpacity>

      {/* Option 2: Build from Scratch */}
      <TouchableOpacity
        onPress={() => openLink("/resume/customize")}
        activeOpacity={0.8}
        className={`w-full rounded-3xl border p-5 ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
        style={styles.shadow}
      >
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <View className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-3">
              <PenTool size={24} color="#3b82f6" />
            </View>
            <Text
              className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Custom Builder
            </Text>
          </View>
          <ExternalLink size={18} color="#9ca3af" />
        </View>

        <Text
          className={`text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          Fully personalized & unique.
        </Text>

        <Feature text="Custom sections & content" />
        <Feature text="Tailored to your specific skills" />
        <Feature text="One-click PDF download" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default ResumeComponent;
