import { User_Email } from "@/src/constant/storage";
import { useTheme } from "@/src/hooks/useTheme";
import { UserLoginResponseSchema } from "@/src/schema/AuthSchema";
import { useAuthStore } from "@/src/store/authStore";
import { getItem } from "@/src/utils/storage";
import { useRouter } from "expo-router";
import {
  BookOpen,
  Calendar,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Profile = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const { getUserProfile, userLogout } = useAuthStore();

  // 2. Local State
  const [user, setUser] = useState<UserLoginResponseSchema | null>(null);
  const [loading, setLoading] = useState(true);

  // 3. Fetch Data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const email = await getItem(User_Email);
      if (email && email.length <= 0) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Email not found",
        });
        router.replace("/login");
      } else {
        console.log("email:", email);

        const fetchedUser = await getUserProfile(email as string);

        if (fetchedUser) {
          setUser(fetchedUser);
        }
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // 4. Helper for Date Formatting
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  async function handleUserLogout() {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await userLogout();
              router.replace("/login");
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Failed to logout",
              });
            }
          },
        },
      ],
      { cancelable: true }
    );
  }
  // 5. Colors based on Theme
  const bgMain = isDark ? "bg-slate-950" : "bg-gray-50";
  const bgCard = isDark ? "bg-slate-900" : "bg-white";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const borderColor = isDark ? "border-slate-800" : "border-gray-200";
  const iconColor = isDark ? "#94a3b8" : "#64748b"; // slate-400 / slate-500

  if (loading) {
    return (
      <View className={`flex-1 ${bgMain} justify-center items-center`}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* --- HEADER --- */}
        <View className="px-6 py-4 flex-row justify-between items-center">
          <Text className={`text-2xl font-bold ${textPrimary}`}>Profile</Text>
        </View>

        {/* --- HERO SECTION --- */}
        <View className="items-center mt-4 mb-8">
          <View
            className={`p-1 rounded-full border-4 ${isDark ? "border-slate-800" : "border-white"} shadow-lg`}
          >
            {user?.image ? (
              <Image
                source={{ uri: user.image }}
                className="w-28 h-28 rounded-full"
              />
            ) : (
              <View
                className={`w-28 h-28 rounded-full items-center justify-center ${isDark ? "bg-slate-800" : "bg-gray-200"}`}
              >
                <UserIcon size={48} color={iconColor} />
              </View>
            )}
            {/* Online Status Dot */}
            <View className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-950" />
          </View>

          <Text className={`text-2xl font-bold mt-4 ${textPrimary}`}>
            {user?.name || "Unknown User"}
          </Text>

          <Text className={`text-sm ${textSecondary} mt-1`}>
            {user?.email || "No email provided"}
          </Text>

          {/* Admin Badge */}
          {user?.isAdmin && (
            <View className="mt-3 bg-blue-500/10 px-3 py-1 rounded-full flex-row items-center">
              <ShieldCheck size={14} color="#3b82f6" />
              <Text className="text-blue-500 text-xs font-bold ml-1">
                ADMINISTRATOR
              </Text>
            </View>
          )}
        </View>

        {/* --- DETAILS SECTION --- */}
        <View className="px-4 space-y-4">
          <Text
            className={`px-2 text-sm font-bold uppercase tracking-wider ${textSecondary}`}
          >
            Academic Info
          </Text>

          {/* Card: Course Info */}
          <View
            className={`rounded-2xl ${bgCard} p-4 shadow-sm border ${borderColor}`}
          >
            <InfoRow
              icon={<BookOpen size={20} color="#8b5cf6" />} // Violet
              label="Course"
              value={user?.course || "Not Enrolled"}
              isDark={isDark}
            />
            <Divider isDark={isDark} />
            <InfoRow
              icon={<Calendar size={20} color="#ec4899" />} // Pink
              label="Semester"
              value={user?.sem || "N/A"}
              isDark={isDark}
            />
          </View>

          <Text
            className={`px-2 text-sm font-bold uppercase tracking-wider ${textSecondary} mt-2`}
          >
            Personal Details
          </Text>

          {/* Card: Contact Info */}
          <View
            className={`rounded-2xl ${bgCard} p-4 shadow-sm border ${borderColor}`}
          >
            <InfoRow
              icon={<Mail size={20} color="#3b82f6" />} // Blue
              label="Email"
              value={user?.email || "--"}
              isDark={isDark}
            />
            <Divider isDark={isDark} />
            <InfoRow
              icon={<Phone size={20} color="#10b981" />} // Emerald
              label="Phone"
              value={user?.phNumber || "No number"}
              isDark={isDark}
            />
            <Divider isDark={isDark} />
            <InfoRow
              icon={<UserIcon size={20} color="#f59e0b" />} // Amber
              label="Member Since"
              value={formatDate(user?.createdAt)}
              isDark={isDark}
            />
          </View>
        </View>

        {/* --- ACTION BUTTONS --- */}
        <View className="px-4 mt-8 mb-8">
          <TouchableOpacity
            className="flex-row items-center justify-center bg-red-500/10 py-4 rounded-xl border border-red-500/20 active:bg-red-500/20"
            onPress={handleUserLogout}
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-2 text-lg">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

// --- Sub Components for cleaner code ---

const InfoRow = ({ icon, label, value, isDark }: any) => (
  <View className="flex-row items-center justify-between py-2">
    <View className="flex-row items-center">
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? "bg-slate-800" : "bg-gray-100"}`}
      >
        {icon}
      </View>
      <View className="ml-3">
        <Text
          className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          {label}
        </Text>
        <Text
          className={`text-base font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}
        >
          {value}
        </Text>
      </View>
    </View>
  </View>
);

const Divider = ({ isDark }: { isDark: boolean }) => (
  <View
    className={`h-[1px] w-full my-2 ${isDark ? "bg-slate-800" : "bg-gray-100"}`}
  />
);

export default Profile;
