import { useTheme } from "@/src/hooks/useTheme";
import { NotesUploadSchema } from "@/src/schema/NotesSchema";
import { useNotesStore } from "@/src/store/notesStore";
import {
  BookOpen,
  ChevronDown,
  FilePlus,
  Link as LinkIcon,
  Mail,
  UploadCloud,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
const InputField = ({
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  label,
  keyboardType = "default",
  isDark,
}: any) => (
  <View className="mb-4">
    <Text
      className={`text-xs font-bold mb-2 ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
    >
      {label}
    </Text>
    <View
      className={`flex-row items-center px-4 rounded-2xl border ${
        isDark ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
      }`}
    >
      <Icon size={18} color="#6b7280" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        className={`flex-1 p-4 ${isDark ? "text-white" : "text-gray-900"}`}
      />
    </View>
  </View>
);
const NotesUploadComponent = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const { uploadNotesBySemester } = useNotesStore();

  // Form State
  const [sem, setSem] = useState("");
  const [email, setEmail] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSemPicker, setShowSemPicker] = useState(false);

  const semesters = ["1", "2", "3", "4", "5", "6"];

  const handleSubmit = async () => {
    if (!sem || !email || !pdfUrl || !subject) {
      Toast.show({
        type: "error",
        text1: "Required Fields",
        text2: "Please fill in all details before submitting.",
      });
      return;
    }

    setLoading(true);
    const body: NotesUploadSchema = { sem, email, pdfUrl, subject };

    try {
      const success = await uploadNotesBySemester(body);
      if (success) {
        setSem("");
        setEmail("");
        setPdfUrl("");
        setSubject("");
        Toast.show({
          type: "success",
          text1: "Data sent successfully",
          text2: "It will be updated on VipinNotes shortly. Thanks!",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Submission Failed",
        text2: "Could not upload notes at this time.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
        contentContainerStyle={{ padding: 20 }}
      >
        <View
          className={`p-6 rounded-3xl border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
          }`}
        >
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <View className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mr-4">
              <FilePlus size={24} color="#3b82f6" />
            </View>
            <View>
              <Text
                className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Upload Notes
              </Text>
              <Text className="text-gray-500 text-xs">
                Share knowledge with your peers
              </Text>
            </View>
          </View>

          {/* Semester Selector */}
          <View className="mb-4">
            <Text
              className={`text-xs font-bold mb-2 ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Semester
            </Text>
            <TouchableOpacity
              onPress={() => setShowSemPicker(!showSemPicker)}
              className={`flex-row items-center justify-between px-4 py-4 rounded-2xl border ${
                isDark
                  ? "bg-gray-900 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <Text
                className={
                  sem
                    ? isDark
                      ? "text-white"
                      : "text-gray-900"
                    : "text-gray-400"
                }
              >
                {sem ? `Semester ${sem}` : "Select Semester"}
              </Text>
              <ChevronDown size={18} color="#6b7280" />
            </TouchableOpacity>

            {showSemPicker && (
              <View className="flex-row flex-wrap mt-2">
                {semesters.map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => {
                      setSem(s);
                      setShowSemPicker(false);
                    }}
                    className={`m-1 px-4 py-2 rounded-xl border ${
                      sem === s
                        ? "bg-blue-500 border-blue-500"
                        : isDark
                          ? "bg-gray-700 border-gray-600"
                          : "bg-white border-gray-200"
                    }`}
                  >
                    <Text
                      className={
                        sem === s
                          ? "text-white font-bold"
                          : isDark
                            ? "text-gray-300"
                            : "text-gray-600"
                      }
                    >
                      Sem {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <InputField
            label="Identity"
            icon={Mail}
            placeholder="Name / MIS / Email"
            value={email}
            onChangeText={setEmail}
            isDark={isDark}
          />

          <InputField
            label="Document Link"
            icon={LinkIcon}
            placeholder="Google Drive PDF URL"
            value={pdfUrl}
            onChangeText={setPdfUrl}
            keyboardType="url"
            isDark={isDark}
          />

          <InputField
            label="Subject"
            icon={BookOpen}
            placeholder="Enter Subject Name"
            value={subject}
            onChangeText={setSubject}
            isDark={isDark}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`mt-4 py-4 rounded-2xl flex-row justify-center items-center ${
              loading ? "bg-gray-500" : "bg-blue-600"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2">
                  Submit Notes
                </Text>
                <UploadCloud size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NotesUploadComponent;
