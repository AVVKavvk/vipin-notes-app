import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import semesters from "@/src/data/semesters.json";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const LabsIndex = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const handleLabPress = (semNameForLink: string, title: string) => {
    // Navigate to lab detail page
    router.push({
      pathname: "/(academics-tabs)/lab/[sem]",
      params: { sem: semNameForLink, title: title },
    });
    // console.log(`Navigate to ${semNameForLink} labs`);
  };

  const getGradientColors = (index: number) => {
    const colors = [
      { start: "#06b6d4", end: "#0891b2" }, // Cyan to Teal
      { start: "#10b981", end: "#059669" }, // Green to Emerald
      { start: "#f59e0b", end: "#d97706" }, // Amber to Yellow
      { start: "#ef4444", end: "#dc2626" }, // Red
      { start: "#8b5cf6", end: "#7c3aed" }, // Purple to Violet
      { start: "#ec4899", end: "#db2777" }, // Pink to Rose
    ];
    return colors[index % colors.length];
  };

  const getLabIcon = (index: number) => {
    const icons = ["🔬", "⚗️", "🧪", "🔭", "⚡", "🧬"];
    return icons[index % icons.length];
  };

  const renderLabCard = ({
    item,
    index,
  }: {
    item: (typeof semesters)[0];
    index: number;
  }) => {
    const gradient = getGradientColors(index);
    const icon = getLabIcon(index);

    return (
      <TouchableOpacity
        onPress={() => handleLabPress(item.semNameForLink, item.tag)}
        activeOpacity={0.7}
        className={`${isTablet ? "w-[48%]" : "w-full"} mb-4`}
      >
        <View
          className={`rounded-2xl p-6 shadow-lg overflow-hidden ${
            isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
          style={{
            elevation: 4,
          }}
        >
          {/* Decorative Background Pattern */}
          <View
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10"
            style={{
              backgroundColor: gradient.start,
            }}
          />
          <View
            className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full opacity-10"
            style={{
              backgroundColor: gradient.end,
            }}
          />

          {/* Semester Badge */}
          <View
            className="absolute -top-3 -right-3 w-14 h-14 rounded-full items-center justify-center shadow-md"
            style={{
              backgroundColor: gradient.start,
            }}
          >
            <Text className="text-white text-xl font-bold">{item.sem}</Text>
          </View>

          {/* Icon Container */}
          <View
            className={`w-20 h-20 rounded-3xl items-center justify-center mb-4 ${
              isDark ? "bg-gray-700" : "bg-gray-50"
            }`}
            style={{
              backgroundColor: isDark ? "#374151" : gradient.start + "15",
            }}
          >
            <Text className="text-5xl">{icon}</Text>
          </View>

          {/* Title */}
          <Text
            className={`text-2xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {item.tag}
          </Text>

          {/* Description */}
          <Text
            className={`text-sm mb-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Hands-on experiments, simulations & practical exercises
          </Text>

          {/* Action Button */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text
                className="text-base font-semibold"
                style={{ color: gradient.start }}
              >
                Start Practicing
              </Text>
              <Text className="ml-2 text-lg" style={{ color: gradient.start }}>
                →
              </Text>
            </View>
            <Text className="text-2xl">💻</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <View className="mb-6">
      {/* Hero Section */}
      <View
        className={`rounded-3xl p-6 mb-6 overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-cyan-900 to-teal-900"
            : "bg-gradient-to-br from-cyan-50 to-teal-50"
        }`}
        style={{
          borderWidth: isDark ? 1 : 0,
          borderColor: isDark ? "#0891b2" : "transparent",
        }}
      >
        {/* Background decoration */}
        <View
          className="absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-20"
          style={{
            backgroundColor: isDark ? "#06b6d4" : "#0891b2",
          }}
        />

        <View className="flex-row items-center mb-4">
          <View className="mr-3">
            <Text className="text-6xl">🧪</Text>
          </View>
          <Text
            className={`text-3xl font-bold flex-1 ${
              isDark ? "text-white" : "text-cyan-900"
            }`}
          >
            Interactive Labs
          </Text>
        </View>

        <Text
          className={`text-base leading-6 mb-4 ${
            isDark ? "text-cyan-200" : "text-cyan-800"
          }`}
        >
          Welcome to our interactive labs section, where learning goes beyond
          textbooks. Here, you can immerse yourself in hands-on learning
          experiences that bridge the gap between theory and practice.
        </Text>

        <View
          className={`flex-row items-center ${isDark ? "bg-cyan-800" : "bg-white"} p-3 rounded-xl`}
        >
          <Text className="text-2xl mr-2">💡</Text>
          <Text
            className={`text-sm flex-1 ${
              isDark ? "text-cyan-100" : "text-cyan-900"
            }`}
          >
            Our labs offer experiments, simulations, and practical exercises
          </Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="flex-row justify-between mb-6">
        <View
          className={`flex-1 mr-2 p-4 rounded-xl ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          style={{ elevation: 2 }}
        >
          <Text className="text-3xl mb-1">🔬</Text>
          <Text
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            45+
          </Text>
          <Text
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Lab Exercises
          </Text>
        </View>

        <View
          className={`flex-1 ml-2 p-4 rounded-xl ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          style={{ elevation: 2 }}
        >
          <Text className="text-3xl mb-1">🎯</Text>
          <Text
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            24/7
          </Text>
          <Text
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Access
          </Text>
        </View>
      </View>

      <Text
        className={`text-xl font-bold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Select Your Semester
      </Text>
    </View>
  );

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <FlatList
        data={semesters}
        renderItem={renderLabCard}
        keyExtractor={(item) => item.semNameForLink}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={
          isTablet ? { justifyContent: "space-between" } : undefined
        }
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LabsIndex;
