import { useTheme } from "@/src/hooks/useTheme";
import { LabsUploadSchema } from "@/src/schema/LabsSchema";
import { useLabsStore } from "@/src/store/labsStore";
import {
  ChevronDown,
  FlaskConical,
  Library,
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
const LabsUploadComponent = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const { uploadLabsBySemester } = useLabsStore();

  // Form State
  const [sem, setSem] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSemPicker, setShowSemPicker] = useState(false);

  const semesters = ["1", "2", "3", "4", "5", "6"];

  const handleSubmit = async () => {
    if (!sem || !email || !link || !subject) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Please fill all fields to help your classmates!",
      });
      return;
    }

    setLoading(true);
    const body: LabsUploadSchema = { sem, email, link, subject };

    try {
      const success = await uploadLabsBySemester(body);
      if (success) {
        setSem("");
        setEmail("");
        setLink("");
        setSubject("");
        Toast.show({
          type: "success",
          text1: "Lab Uploaded!",
          text2: "Thank you for contributing to VipinNotes.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Upload Failed",
        text2: "Something went wrong. Please try again.",
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
            <View className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mr-4">
              <FlaskConical size={24} color="#a855f7" />
            </View>
            <View>
              <Text
                className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Upload Labs
              </Text>
              <Text className="text-gray-500 text-xs">
                Share lab manuals and solutions
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
                        ? "bg-purple-500 border-purple-500"
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
            label="Contributor"
            icon={Mail}
            placeholder="MIS / Name / Email"
            value={email}
            onChangeText={setEmail}
            isDark={isDark}
          />

          <InputField
            label="Drive Link"
            icon={LinkIcon}
            placeholder="URL to your lab files"
            value={link}
            onChangeText={setLink}
            keyboardType="url"
            isDark={isDark}
          />

          <InputField
            label="Subject"
            icon={Library}
            placeholder="Enter Lab Subject"
            value={subject}
            onChangeText={setSubject}
            isDark={isDark}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`mt-4 py-4 rounded-2xl flex-row justify-center items-center ${
              loading ? "bg-gray-500" : "bg-purple-600"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2">
                  Submit Lab
                </Text>
                <Send size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Informational Footer */}
        <View className="mt-6 px-4">
          <Text className="text-gray-400 text-[10px] text-center uppercase tracking-widest">
            Contribution will take some time to reflect on the platform
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LabsUploadComponent;
