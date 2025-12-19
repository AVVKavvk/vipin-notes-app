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

const PapersIndex = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const handlePaperPress = (semNameForLink: string, title: string) => {
    // Navigate to paper detail page
    router.push({
      pathname: "/(academics-tabs)/papers/[sem]",
      params: { sem: semNameForLink, title: title },
    });
    // console.log(`Navigate to ${semNameForLink} papers`);
  };

  const getGradientColors = (index: number) => {
    const colors = [
      { start: "#f59e0b", end: "#d97706" }, // Amber to Orange
      { start: "#ef4444", end: "#dc2626" }, // Red to Dark Red
      { start: "#8b5cf6", end: "#7c3aed" }, // Purple to Violet
      { start: "#3b82f6", end: "#2563eb" }, // Blue to Dark Blue
      { start: "#ec4899", end: "#db2777" }, // Pink to Rose
      { start: "#10b981", end: "#059669" }, // Green to Emerald
    ];
    return colors[index % colors.length];
  };

  const renderPaperCard = ({
    item,
    index,
  }: {
    item: (typeof semesters)[0];
    index: number;
  }) => {
    const gradient = getGradientColors(index);

    return (
      <TouchableOpacity
        onPress={() => handlePaperPress(item.semNameForLink, item.tag)}
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
          {/* Decorative Background Elements */}
          <View
            className="absolute -right-10 -top-10 w-36 h-36 rounded-full opacity-10"
            style={{
              backgroundColor: gradient.start,
            }}
          />
          <View
            className="absolute left-0 bottom-0 w-20 h-20 rounded-full opacity-10"
            style={{
              backgroundColor: gradient.end,
            }}
          />

          {/* Semester Number Badge */}
          <View
            className="absolute -top-3 -right-3 w-14 h-14 rounded-full items-center justify-center shadow-md"
            style={{
              backgroundColor: gradient.start,
            }}
          >
            <Text className="text-white text-xl font-bold">{item.sem}</Text>
          </View>

          {/* Icon Container with Trophy */}
          <View
            className={`w-20 h-20 rounded-3xl items-center justify-center mb-4 ${
              isDark ? "bg-gray-700" : "bg-gray-50"
            }`}
            style={{
              backgroundColor: isDark ? "#374151" : gradient.start + "15",
            }}
          >
            <Text className="text-5xl">📝</Text>
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
            Previous year papers & practice questions
          </Text>

          {/* Key Features */}
          <View
            className={`mb-4 p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
          >
            <View className="flex-row items-center mb-1">
              <Text className="mr-2">✓</Text>
              <Text
                className={`text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Real exam questions
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="mr-2">✓</Text>
              <Text
                className={`text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Key topics & trends
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text
                className="text-base font-semibold"
                style={{ color: gradient.start }}
              >
                View Papers
              </Text>
              <Text className="ml-2 text-lg" style={{ color: gradient.start }}>
                →
              </Text>
            </View>
            <Text className="text-2xl">🎯</Text>
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
            ? "bg-gradient-to-br from-amber-900 to-orange-900"
            : "bg-gradient-to-br from-amber-50 to-orange-50"
        }`}
        style={{
          borderWidth: isDark ? 1 : 0,
          borderColor: isDark ? "#f59e0b" : "transparent",
        }}
      >
        {/* Background decoration */}
        <View
          className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-20"
          style={{
            backgroundColor: isDark ? "#f59e0b" : "#d97706",
          }}
        />
        <View
          className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full opacity-20"
          style={{
            backgroundColor: isDark ? "#d97706" : "#f59e0b",
          }}
        />

        <View className="flex-row items-center mb-4">
          <View className="mr-3">
            <Text className="text-6xl">📄</Text>
          </View>
          <Text
            className={`text-3xl font-bold flex-1 ${
              isDark ? "text-white" : "text-amber-900"
            }`}
          >
            Exam Papers
          </Text>
        </View>

        <Text
          className={`text-base leading-6 mb-4 ${
            isDark ? "text-amber-200" : "text-amber-800"
          }`}
        >
          Preparing for exams has never been more effective. Gain a competitive
          edge with access to previous year's exam papers, a valuable resource
          for every student.
        </Text>

        <View
          className={`flex-row items-center ${isDark ? "bg-amber-800" : "bg-white"} p-3 rounded-xl`}
        >
          <Text className="text-2xl mr-2">💪</Text>
          <Text
            className={`text-sm flex-1 ${
              isDark ? "text-amber-100" : "text-amber-900"
            }`}
          >
            Practice with real exam questions & identify key trends
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
          <Text className="text-3xl mb-1">📚</Text>
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
            Total Papers
          </Text>
        </View>

        <View
          className={`flex-1 mx-1 p-4 rounded-xl ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          style={{ elevation: 2 }}
        >
          <Text className="text-3xl mb-1">📅</Text>
          <Text
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            4 Yrs+
          </Text>
          <Text
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Archive
          </Text>
        </View>

        <View
          className={`flex-1 ml-2 p-4 rounded-xl ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          style={{ elevation: 2 }}
        >
          <Text className="text-3xl mb-1">⭐</Text>
          <Text
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            HD
          </Text>
          <Text
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Quality Scans
          </Text>
        </View>
      </View>

      <Text
        className={`text-xl font-bold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Browse by Semester
      </Text>
    </View>
  );

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <FlatList
        data={semesters}
        renderItem={renderPaperCard}
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

export default PapersIndex;
