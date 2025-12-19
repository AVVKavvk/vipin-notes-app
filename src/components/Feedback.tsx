import { Heart, MessageSquareQuote, Send, Star } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

const { width } = Dimensions.get("window");

const FeedbackComponents = () => {
  const theme = useTheme();
  const isDark = theme === "dark";

  // FormSubmit link from your web code
  const customLink = "riheku";
  const feedbackUrl = `https://formsubmit.co/el/${customLink}/?subject=VipinNotes_App_Feedback`;

  const handleEmailPress = () => {
    Linking.openURL(feedbackUrl);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
      }}
      style={{ backgroundColor: isDark ? "#111827" : "#f9fafb" }}
    >
      <View
        className={`rounded-3xl p-8 shadow-2xl ${
          isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
        style={{
          // Recreating that 3D layered shadow from your web code but optimized for mobile
          shadowColor: "#f02eaa",
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 0.2,
          shadowRadius: 15,
          elevation: 10,
        }}
      >
        {/* Header Icon */}
        <View className="items-center mb-6">
          <View className="bg-pink-500/10 p-4 rounded-full">
            <MessageSquareQuote size={48} color="#f02eaa" />
          </View>
        </View>

        <Text
          className={`text-3xl font-bold text-center mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Your Insights Matter
        </Text>

        <View className="flex-row justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={20} color="#f59e0b" fill="#f59e0b" />
          ))}
        </View>

        <Text
          className={`text-base leading-7 text-center mb-8 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Our platform is committed to elevating your college experience by
          providing access to a wealth of resources. Your feedback is
          instrumental in helping us ensure{" "}
          <Text className="font-bold text-pink-500">VipinNotes</Text> remains
          your go-to destination for academic support.
        </Text>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={handleEmailPress}
          activeOpacity={0.8}
          className="bg-green-500 flex-row items-center justify-center py-4 rounded-2xl shadow-lg"
          style={{ shadowColor: "#22c55e", shadowOpacity: 0.4 }}
        >
          <Text className="text-white text-xl font-bold mr-2">Email Us</Text>
          <Send size={20} color="white" />
        </TouchableOpacity>

        <View className="mt-8 flex-row items-center justify-center">
          <Text
            className={`${isDark ? "text-gray-500" : "text-gray-400"} text-sm`}
          >
            Thank you for being part of us
          </Text>
          <View className="ml-2">
            <Heart size={16} color="#ef4444" fill="#ef4444" />
          </View>
        </View>
      </View>

      {/* Subtle Background Decoration */}
      <View
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10 bg-pink-500"
        style={{ zIndex: -1 }}
      />
    </ScrollView>
  );
};

export default FeedbackComponents;
