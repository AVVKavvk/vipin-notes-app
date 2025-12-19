import { useTheme } from "@/src/hooks/useTheme";
import { PapersUploadSchema } from "@/src/schema/PapersSchema";
import { usePaperStore } from "@/src/store/papersStore";
import {
  ChevronDown,
  History,
  Link as LinkIcon,
  Mail,
  Send,
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
      <Icon size={18} color="#ef4444" />
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

const PapersUploadComponent = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const { uploadPapersBySemester } = usePaperStore();

  // Form State
  const [sem, setSem] = useState("");
  const [email, setEmail] = useState("");
  const [linkT1, setLinkT1] = useState("");
  const [linkT2, setLinkT2] = useState("");
  const [linkT3, setLinkT3] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSemPicker, setShowSemPicker] = useState(false);

  const semesters = ["1", "2", "3", "4", "5", "6"];

  const handleSubmit = async () => {
    // Validation: Require at least one link and essential fields
    if (!sem || !email || (!linkT1 && !linkT2 && !linkT3)) {
      Toast.show({
        type: "error",
        text1: "Incomplete Form",
        text2: "Please select semester, email, and at least one paper link.",
      });
      return;
    }

    setLoading(true);
    const body: PapersUploadSchema = {
      sem,
      email,
      linkT1,
      linkT2,
      linkT3,
    };

    try {
      const success = await uploadPapersBySemester(body);
      if (success) {
        setSem("");
        setEmail("");
        setLinkT1("");
        setLinkT2("");
        setLinkT3("");
        Toast.show({
          type: "success",
          text1: "Papers Sent!",
          text2: "Thank you for contributing to the archive.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Submission Failed",
        text2: "Check your connection and try again.",
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
        keyboardShouldPersistTaps="handled"
      >
        <View
          className={`p-6 rounded-3xl border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
          }`}
        >
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <View className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl mr-4">
              <History size={24} color="#ef4444" />
            </View>
            <View>
              <Text
                className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Upload Papers
              </Text>
              <Text className="text-gray-500 text-xs">
                Help others with previous year questions
              </Text>
            </View>
          </View>

          {/* Semester Selector */}
          <View className="mb-4">
            <Text
              className={`text-xs font-bold mb-2 ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Select Semester
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
                {sem ? `Semester ${sem}` : "Choose Semester"}
              </Text>
              <ChevronDown size={18} color="#6b7280" />
            </TouchableOpacity>

            {showSemPicker && (
              <View className="flex-row flex-wrap mt-2 justify-center">
                {semesters.map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => {
                      setSem(s);
                      setShowSemPicker(false);
                    }}
                    className={`m-1 px-4 py-2 rounded-xl border ${
                      sem === s
                        ? "bg-red-500 border-red-500"
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
            label="Your Information"
            icon={Mail}
            placeholder="MIS / Name / Email"
            value={email}
            onChangeText={setEmail}
            isDark={isDark}
          />

          <View className="h-[1px] bg-gray-200 dark:bg-gray-700 my-4" />

          <InputField
            label="T1 Paper Link"
            icon={LinkIcon}
            placeholder="Drive link for T1"
            value={linkT1}
            onChangeText={setLinkT1}
            keyboardType="url"
            isDark={isDark}
          />

          <InputField
            label="T2 Paper Link"
            icon={LinkIcon}
            placeholder="Drive link for T2"
            value={linkT2}
            onChangeText={setLinkT2}
            keyboardType="url"
            isDark={isDark}
          />

          <InputField
            label="Endsem Paper Link"
            icon={LinkIcon}
            placeholder="Drive link for Endsem"
            value={linkT3}
            onChangeText={setLinkT3}
            keyboardType="url"
            isDark={isDark}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`mt-4 py-4 rounded-2xl flex-row justify-center items-center ${
              loading ? "bg-gray-500" : "bg-red-600"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2">
                  Submit Papers
                </Text>
                <Send size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PapersUploadComponent;
