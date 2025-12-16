import { useTheme } from "@/src/hooks/useTheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import semesters from "@/src/data/semesters.json";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const NotesIndex = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const handleSemesterPress = (semNameForLink: string, title: string) => {
    // Navigate to semester detail page
    router.push({
      pathname: "/note/[sem]", // points to the file structure
      params: { sem: semNameForLink, title: title }, // actual data
    });
    // console.log(`Navigate to ${semNameForLink}`);
  };

  const getGradientColors = (index: number) => {
    const colors = [
      { start: "#8b5cf6", end: "#6366f1" }, // Purple to Indigo
      { start: "#ec4899", end: "#f43f5e" }, // Pink to Rose
      { start: "#10b981", end: "#059669" }, // Green to Emerald
      { start: "#f59e0b", end: "#d97706" }, // Amber to Yellow
      { start: "#3b82f6", end: "#2563eb" }, // Blue
      { start: "#06b6d4", end: "#0891b2" }, // Cyan to Teal
    ];
    return colors[index % colors.length];
  };

  const renderSemesterCard = ({
    item,
    index,
  }: {
    item: (typeof semesters)[0];
    index: number;
  }) => {
    const gradient = getGradientColors(index);

    return (
      <TouchableOpacity
        onPress={() => handleSemesterPress(item.semNameForLink, item.tag)}
        activeOpacity={0.7}
        className={`${isTablet ? "w-[48%]" : "w-full"} mb-4`}
      >
        <View
          className={`rounded-2xl p-6 shadow-lg ${
            isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
          style={{
            elevation: 4,
          }}
        >
          {/* Semester Number Badge */}
          <View
            className="absolute -top-3 -right-3 w-14 h-14 rounded-full items-center justify-center shadow-md"
            style={{
              backgroundColor: gradient.start,
            }}
          >
            <Text className="text-white text-xl font-bold">{item.sem}</Text>
          </View>

          {/* Icon */}
          <View
            className={`w-16 h-16 rounded-2xl items-center justify-center mb-4 ${
              isDark ? "bg-gray-700" : "bg-gray-50"
            }`}
            style={{
              backgroundColor: isDark ? "#374151" : gradient.start + "15",
            }}
          >
            <Text className="text-4xl">📚</Text>
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
            Access lecture notes, handouts, and study materials
          </Text>

          {/* View Button */}
          <View className="flex-row items-center">
            <Text
              className="text-base font-semibold"
              style={{ color: gradient.start }}
            >
              View Notes
            </Text>
            <Text className="ml-2 text-lg" style={{ color: gradient.start }}>
              →
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <View className="mb-6">
      {/* Hero Section */}
      <View
        className={`${isDark ? "bg-purple-900" : "bg-purple-50"} rounded-3xl p-6 mb-6`}
      >
        <View className="flex-row items-center mb-3">
          <Text className="text-5xl mr-3">📖</Text>
          <Text
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-purple-900"
            }`}
          >
            Notes Repository
          </Text>
        </View>
        <Text
          className={`text-base leading-6 ${
            isDark ? "text-purple-200" : "text-purple-800"
          }`}
        >
          Our extensive notes repository is designed to be your ultimate study
          companion. Dive into a wealth of lecture notes, handouts, and study
          materials, meticulously curated to cover every aspect of your courses.
        </Text>
      </View>

      {/* Stats Cards */}
      <View className="flex-row justify-between mb-6">
        <View
          className={`flex-1 mr-2 p-4 rounded-xl ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          style={{ elevation: 2 }}
        >
          <Text className="text-3xl mb-1">📝</Text>
          <Text
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            6
          </Text>
          <Text
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Semesters
          </Text>
        </View>

        <View
          className={`flex-1 ml-2 p-4 rounded-xl ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          style={{ elevation: 2 }}
        >
          <Text className="text-3xl mb-1">✨</Text>
          <Text
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            100+
          </Text>
          <Text
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Study Materials
          </Text>
        </View>
      </View>

      <Text
        className={`text-xl font-bold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Choose Your Semester
      </Text>
    </View>
  );

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <FlatList
        data={semesters}
        renderItem={renderSemesterCard}
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

export default NotesIndex;
