import { useTheme } from "@/src/hooks/useTheme";
import { Award, ExternalLink } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import your JSON data
import CertificateData from "@/src/assets/data/certificates.json";

const CertificatesComponent = () => {
  const theme = useTheme();
  const isDark = theme === "dark";

  const openCertificate = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open certificate link", err)
    );
  };

  const renderItem = ({ item }: { item: (typeof CertificateData)[0] }) => (
    <View
      className={`flex-row items-center p-4 mb-4 mx-4 rounded-2xl border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}
      style={styles.cardShadow}
    >
      {/* Left Section: Company Info */}
      <View className="w-[35%] items-center justify-center pr-2">
        <Image
          source={{ uri: item.img_url }}
          className="w-12 h-12 mb-2"
          resizeMode="contain"
        />
        <Text
          numberOfLines={1}
          className={`text-xs font-bold text-center ${isDark ? "text-gray-300" : "text-gray-500"}`}
        >
          {item.company_name}
        </Text>
      </View>

      {/* Vertical Divider */}
      <View
        className={`w-[1px] h-16 ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
      />

      {/* Right Section: Course Info & Link */}
      <View className="flex-1 pl-4 justify-center">
        <Text
          className={`text-[14px] font-semibold mb-3 leading-5 ${isDark ? "text-white" : "text-gray-900"}`}
          numberOfLines={2}
        >
          {item.course_name}
        </Text>

        <TouchableOpacity
          onPress={() => openCertificate(item.link)}
          activeOpacity={0.7}
          className="bg-green-500 self-start px-4 py-1.5 rounded-lg flex-row items-center"
        >
          <Text className="text-white font-bold text-xs mr-1">
            View Certificate
          </Text>
          <ExternalLink size={12} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <FlatList
        data={CertificateData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 20 }}
        ListHeaderComponent={
          <View className="items-center mb-6 px-4">
            <View className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
              <Award size={32} color={isDark ? "#60a5fa" : "#2563eb"} />
            </View>
            <Text
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Certificates & Courses
            </Text>
            <Text className="text-gray-500 text-sm text-center mt-1">
              Verified professional achievements
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default CertificatesComponent;
