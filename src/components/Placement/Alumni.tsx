import { useTheme } from "@/src/hooks/useTheme";
import { Linkedin, Search, Users } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AlumniData from "@/src/assets/data/alumni.json";

const AlumniComponents = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAlumni, setFilteredAlumni] = useState(AlumniData);

  // Handle Search Logic
  useEffect(() => {
    const filtered = AlumniData.filter(
      (person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAlumni(filtered);
  }, [searchQuery]);

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening link", err)
    );
  };

  const renderAlumniCard = ({ item }: { item: (typeof AlumniData)[0] }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => openLink(item.linkedin_url)}
      className={`flex-row items-center p-4 mb-4 mx-4 rounded-2xl border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}
      style={styles.cardShadow}
    >
      {/* Avatar Image */}
      <View className="relative">
        <Image
          source={{ uri: item.image_url }}
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <View className="absolute bottom-0 right-0 bg-white rounded-full p-1">
          <Linkedin size={16} color="#0077b5" fill="#0077b5" />
        </View>
      </View>

      {/* Info Section */}
      <View className="flex-1 ml-4 justify-center">
        <Text
          className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {item.name}
        </Text>

        <View className="flex-row items-center mt-1">
          <View className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-lg">
            <Text className="text-blue-600 dark:text-blue-300 font-bold text-xs uppercase">
              {item.company}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Search Bar Header */}
      <View className="p-4 pt-6">
        <View
          className={`flex-row items-center px-4 rounded-2xl border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <Search size={20} color={isDark ? "#9ca3af" : "#6b7280"} />
          <TextInput
            placeholder="Search alumni or company..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className={`flex-1 p-4 ${isDark ? "text-white" : "text-gray-900"}`}
          />
        </View>
      </View>

      {/* Alumni List */}
      <FlatList
        data={filteredAlumni}
        keyExtractor={(item) => item.name}
        renderItem={renderAlumniCard}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Users size={48} color="#9ca3af" />
            <Text className="text-gray-500 mt-2">No alumni found</Text>
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

export default AlumniComponents;
