import { useTheme } from "@/src/hooks/useTheme";
import { NotesSchema } from "@/src/schema/NotesSchema";
import { useNotesStore } from "@/src/store/notesStore";
import {
  AlertCircle,
  Calendar,
  ExternalLink,
  FileText,
  ShieldCheck,
  User,
  Video,
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

interface NotesBySemProps {
  semLinkName: string;
}

const NotesBySem = ({ semLinkName }: NotesBySemProps) => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const { getNotesBySemester } = useNotesStore();

  const [notes, setNotes] = useState<NotesSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const data = await getNotesBySemester(semLinkName);
      if (data) {
        setNotes(data);
      }
      setLoading(false);
    };

    fetchNotes();
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
        console.log(`Don't know how to open this URL: ${url}`);
      }
    }
  };

  if (loading) {
    return (
      <View
        className={`flex-1 justify-center items-center ${bgMain} min-h-[300px]`}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className={`mt-4 ${textSecondary}`}>Loading Notes...</Text>
      </View>
    );
  }

  if (!loading && notes.length === 0) {
    return (
      <View
        className={`flex-1 justify-center items-center ${bgMain} min-h-[300px] p-4`}
      >
        <FileText size={48} color={isDark ? "#334155" : "#cbd5e1"} />
        <Text className={`mt-4 text-lg font-semibold ${textSecondary}`}>
          No notes found for this semester.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: NotesSchema }) => (
    <>
      {item.isVerified ? (
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
                <FileText size={24} color="#8b5cf6" />
              </View>

              {/* Text Info */}
              <View className="flex-1">
                <Text
                  className={`text-lg font-bold ${textPrimary}`}
                  numberOfLines={1}
                >
                  {item.subject_name || "Unknown Subject"}
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

          {/* Action Buttons */}
          <View className="flex-row mt-4 space-x-3 gap-3">
            {/* PDF Button */}
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-2.5 px-4 rounded-lg flex-row items-center justify-center active:bg-blue-600"
              onPress={() => handleOpenLink(item.pdfUrl)}
              disabled={!item.pdfUrl}
            >
              <ExternalLink size={18} color="#fff" />
              <Text className="text-white font-semibold ml-2">View PDF</Text>
            </TouchableOpacity>

            {/* Video Button (Only if exists) */}
            {item.video_url && (
              <TouchableOpacity
                className={`flex-1 py-2.5 px-4 rounded-lg flex-row items-center justify-center border ${isDark ? "border-red-500/50 bg-red-500/10" : "border-red-200 bg-red-50"}`}
                onPress={() => handleOpenLink(item.video_url)}
              >
                <Video size={18} color="#ef4444" />
                <Text className="text-red-500 font-semibold ml-2">Watch</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Warning if no PDF */}
          {!item.pdfUrl && (
            <View className="mt-3 flex-row items-center">
              <AlertCircle size={14} color="#f59e0b" />
              <Text className="text-amber-500 text-xs ml-1">
                PDF not available yet
              </Text>
            </View>
          )}
        </View>
      ) : (
        ""
      )}
    </>
  );

  return (
    <View className={`flex-1 ${bgMain}`}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item._id || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotesBySem;
