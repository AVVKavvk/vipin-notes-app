import { useTheme } from "@/src/hooks/useTheme";
import { NotesSchema } from "@/src/schema/NotesSchema";
import { useNotesStore } from "@/src/store/notesStore";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Link2,
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
          {/* Header: Icon & Subject Name */}
          <View className="flex-row items-start justify-between">
            <View className="flex-row items-center flex-1 pr-2">
              <View
                className={`p-2 rounded-lg ${isDark ? "bg-blue-500/10" : "bg-blue-50"} mr-3`}
              >
                <FileText size={24} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text
                  className={`text-lg font-bold ${textPrimary}`}
                  numberOfLines={1}
                >
                  {item.subject_name || "Unknown Subject"}
                </Text>
                <Text className={`text-xs ${textSecondary}`}>
                  {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                </Text>
              </View>
            </View>

            {/* Verification Badge */}
            {item.isVerified ? (
              <CheckCircle2 size={18} color="#10b981" />
            ) : (
              <Clock size={18} color="#f59e0b" />
            )}
          </View>

          {/* Action Buttons */}
          <View className="flex-row mt-4 space-x-3 gap-3">
            {/* PDF Button */}
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-2.5 px-4 rounded-lg flex-row items-center justify-center active:bg-blue-600"
              onPress={() => handleOpenLink(item.pdfUrl)}
              disabled={!item.pdfUrl}
            >
              <Link2 size={18} color="#fff" />
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
