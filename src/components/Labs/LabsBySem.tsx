import { useTheme } from "@/src/hooks/useTheme";
import { LabsSchema } from "@/src/schema/LabsSchema";
import { useLabsStore } from "@/src/store/labsStore";
import {
  Calendar, // Good icon for Labs
  ExternalLink,
  FlaskConical,
  ShieldCheck,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface LabsBySemProps {
  semLinkName: string;
}

const LabsBySem = ({ semLinkName }: LabsBySemProps) => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const { getLabsBySemester } = useLabsStore();

  const [labs, setLabs] = useState<LabsSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      setLoading(true);
      const data = await getLabsBySemester(semLinkName);

      if (data) {
        // FILTER: Only keep isVerified === true
        const verifiedLabs = data.filter((lab) => lab.isVerified);
        // console.log(verifiedLabs);

        setLabs(verifiedLabs);
      }
      setLoading(false);
    };

    fetchLabs();
  }, [semLinkName]);

  // --- Theme Colors ---
  const bgMain = isDark ? "bg-slate-950" : "bg-gray-50";
  const cardBg = isDark ? "bg-slate-900" : "bg-white";
  const textPrimary = isDark ? "text-slate-100" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const borderColor = isDark ? "border-slate-800" : "border-gray-200";

  // --- Handlers ---
  const handleOpenLink = async (url?: string) => {
    if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Cannot open URL: ${url}`);
      }
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <View
        className={`flex-1 justify-center items-center ${bgMain} min-h-[300px]`}
      >
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text className={`mt-4 ${textSecondary}`}>Loading Labs...</Text>
      </View>
    );
  }

  // --- Empty State ---
  if (!loading && labs.length === 0) {
    return (
      <View
        className={`flex-1 justify-center items-center ${bgMain} min-h-[300px] p-4`}
      >
        <FlaskConical size={48} color={isDark ? "#334155" : "#cbd5e1"} />
        <Text className={`mt-4 text-lg font-semibold ${textSecondary}`}>
          No verified labs available.
        </Text>
      </View>
    );
  }

  // --- Render Item ---
  const renderItem = ({ item }: { item: LabsSchema }) => (
    <View
      className={`mb-4 p-4 rounded-xl border ${cardBg} ${borderColor} shadow-sm`}
    >
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center flex-1">
          {/* Icon Container */}
          <View
            className={`p-2 rounded-lg ${
              isDark ? "bg-violet-500/10" : "bg-violet-50"
            } mr-3`}
          >
            <FlaskConical size={24} color="#8b5cf6" />
          </View>

          {/* Text Info */}
          <View className="flex-1">
            <Text
              className={`text-lg font-bold ${textPrimary}`}
              numberOfLines={1}
            >
              {item.subject || "Unknown Lab"}
            </Text>

            {/* Date Row */}
            <View className="flex-row items-center mt-1">
              <Calendar size={12} color={isDark ? "#94a3b8" : "#64748b"} />
              <Text className={`text-xs ${textSecondary} ml-1`}>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "N/A"}
              </Text>
            </View>

            {/* Student Email Row */}
            {item.studentEmail && (
              <View className="flex-row items-center mt-1">
                <User size={12} color={isDark ? "#94a3b8" : "#64748b"} />
                <Text
                  className={`text-xs ${textSecondary} ml-1`}
                  numberOfLines={1}
                >
                  {item.studentEmail}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Verified Badge */}
        <ShieldCheck size={18} color="#10b981" />
      </View>

      {/* Action Button */}
      <View className="mt-4">
        <TouchableOpacity
          className={`flex-row items-center justify-center py-3 rounded-lg ${
            item.link ? "bg-violet-600 active:bg-violet-700" : "bg-gray-300"
          }`}
          onPress={() => handleOpenLink(item.link)}
          disabled={!item.link}
        >
          <ExternalLink size={18} color="#fff" />
          <Text className="text-white font-bold ml-2">Open Lab Resource</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className={`flex-1 ${bgMain}`}>
      <FlatList
        data={labs}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LabsBySem;
