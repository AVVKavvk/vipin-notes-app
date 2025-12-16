import { useTheme } from "@/src/hooks/useTheme";
import { PapersSchema } from "@/src/schema/PapersSchema";
import { usePaperStore } from "@/src/store/papersStore";
import {
  Calendar,
  ExternalLink,
  FileQuestion,
  ShieldCheck,
  StickyNote,
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

interface PapersBySemProps {
  semLinkName: string;
}

const PaperBySem = ({ semLinkName }: PapersBySemProps) => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const { getPapersBySemester } = usePaperStore();

  const [papers, setPapers] = useState<PapersSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      const data = await getPapersBySemester(semLinkName);

      if (data) {
        // FILTER: Only keep verified papers
        const verifiedPapers = data.filter((p) => p.isVerified);
        setPapers(verifiedPapers);
      }
      setLoading(false);
    };

    fetchPapers();
  }, [semLinkName]);

  // --- Theme Colors (Orange/Amber Theme) ---
  const bgMain = isDark ? "bg-slate-950" : "bg-gray-50";
  const cardBg = isDark ? "bg-slate-900" : "bg-white";
  const textPrimary = isDark ? "text-slate-100" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const borderColor = isDark ? "border-slate-800" : "border-gray-200";
  const accentColor = "#f97316"; // Orange-500

  // --- Handlers ---
  const handleOpenLink = async (url?: string) => {
    if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
    }
  };

  if (loading) {
    return (
      <View
        className={`flex-1 justify-center items-center ${bgMain} min-h-[300px]`}
      >
        <ActivityIndicator size="large" color={accentColor} />
        <Text className={`mt-4 ${textSecondary}`}>Loading Papers...</Text>
      </View>
    );
  }

  if (!loading && papers.length === 0) {
    return (
      <View
        className={`flex-1 justify-center items-center ${bgMain} min-h-[300px] p-4`}
      >
        <FileQuestion size={48} color={isDark ? "#334155" : "#cbd5e1"} />
        <Text className={`mt-4 text-lg font-semibold ${textSecondary}`}>
          No verified papers found.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: PapersSchema }) => {
    // Check if any link exists to decide layout
    const hasAnyLink = item.T1 || item.T2 || item.T3;

    return (
      <View
        className={`mb-4 p-4 rounded-xl border ${cardBg} ${borderColor} shadow-sm`}
      >
        {/* --- HEADER --- */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-row items-center flex-1">
            {/* Icon */}
            <View
              className={`p-2 rounded-lg ${isDark ? "bg-orange-500/10" : "bg-orange-50"} mr-3`}
            >
              <StickyNote size={24} color={accentColor} />
            </View>

            {/* Info */}
            <View className="flex-1">
              {/* Note: Schema didn't have a 'subject' name field, defaulting to generic if missing */}
              <Text
                className={`text-lg font-bold ${textPrimary}`}
                numberOfLines={1}
              >
                Exam Paper Set
              </Text>

              {/* Date */}
              <View className="flex-row items-center mt-1">
                <Calendar size={12} color={isDark ? "#94a3b8" : "#64748b"} />
                <Text className={`text-xs ${textSecondary} ml-1`}>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "N/A"}
                </Text>
              </View>

              {/* Student Email */}
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

        {/* --- DIVIDER --- */}
        <View
          className={`h-[1px] w-full mb-4 ${isDark ? "bg-slate-800" : "bg-gray-100"}`}
        />

        {/* --- ACTION BUTTONS (T1, T2, T3) --- */}
        <View className="flex-row gap-2">
          <PaperButton
            label="T1"
            url={item.T1}
            isDark={isDark}
            onPress={() => handleOpenLink(item.T1)}
          />
          <PaperButton
            label="T2"
            url={item.T2}
            isDark={isDark}
            onPress={() => handleOpenLink(item.T2)}
          />
          <PaperButton
            label="T3"
            url={item.T3}
            isDark={isDark}
            onPress={() => handleOpenLink(item.T3)}
          />
        </View>

        {!hasAnyLink && (
          <Text className="text-xs text-red-400 mt-2 text-center">
            No PDF links available
          </Text>
        )}
      </View>
    );
  };

  return (
    <View className={`flex-1 ${bgMain}`}>
      <FlatList
        data={papers}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// --- Helper Component for the T1/T2/T3 Buttons ---
const PaperButton = ({
  label,
  url,
  isDark,
  onPress,
}: {
  label: string;
  url?: string;
  isDark: boolean;
  onPress: () => void;
}) => {
  const hasLink = !!url;

  return (
    <TouchableOpacity
      className={`flex-1 flex-row items-center justify-center py-2.5 rounded-lg border
        ${
          hasLink
            ? isDark
              ? "bg-orange-500/20 border-orange-500/50"
              : "bg-orange-50 border-orange-200"
            : isDark
              ? "bg-slate-800 border-slate-700"
              : "bg-gray-100 border-gray-200"
        }
      `}
      onPress={onPress}
      disabled={!hasLink}
      activeOpacity={0.7}
    >
      {hasLink ? (
        <ExternalLink size={16} color={isDark ? "#fb923c" : "#f97316"} />
      ) : (
        // Placeholder space if no link
        <View className="w-4" />
      )}
      <Text
        className={`ml-1 font-bold ${hasLink ? "text-orange-500" : "text-gray-400"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default PaperBySem;
