import { Send, Star, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "../hooks/useTheme";
import { RateSchemaGet, RateSchemaPost } from "../schema/RateSchema";
import { useRateStore } from "../store/rateStore";

// --- HELPERS MOVED OUTSIDE TO PREVENT KEYBOARD DISMISSAL ---

const StarRating = ({
  ratingValue,
  setRatingValue,
}: {
  ratingValue: number;
  setRatingValue: (val: number) => void;
}) => (
  <View className="flex-row space-x-2 my-4 justify-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => setRatingValue(star)}>
        <Star
          size={32}
          color={star <= ratingValue ? "#eab308" : "#9ca3af"}
          fill={star <= ratingValue ? "#eab308" : "transparent"}
        />
      </TouchableOpacity>
    ))}
  </View>
);

const RateUsComponents = () => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const { postRateToBackend, getRateDataFromBackend } = useRateStore();

  // Form State
  const [review, setReview] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [ratingValue, setRatingValue] = useState(5);
  const [loading, setLoading] = useState(false);
  const [allRatings, setAllRatings] = useState<RateSchemaGet[]>([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    const data = await getRateDataFromBackend();
    if (data) setAllRatings(data);
  };

  const handleSubmit = async () => {
    if (!review || !userInfo) {
      Toast.show({ type: "info", text1: "Please fill all fields" });
      return;
    }
    setLoading(true);
    const body: RateSchemaPost = {
      star: ratingValue,
      userInfo,
      review,
    };
    const success = await postRateToBackend(body);
    if (success) {
      setReview("");
      setUserInfo("");
      setRatingValue(5);
      fetchRatings();
      Toast.show({ type: "success", text1: "Review submitted" });
    } else {
      Toast.show({ type: "error", text1: "Failed to submit review" });
    }
    setLoading(false);
  };

  const renderReviewItem = ({ item }: { item: RateSchemaGet }) => (
    <View
      className={`mx-10 my-4 p-4 rounded-2xl ${
        isDark
          ? "bg-gray-800 border border-gray-700"
          : "bg-white shadow-sm border border-gray-100"
      }`}
      style={{
        borderLeftWidth: 5,
        borderLeftColor: Number(item.rating) >= 4 ? "#22c55e" : "#ef4444",
        width: "90%",
        maxWidth: 600,
        alignSelf: "center",
      }}
    >
      <View className="flex-row items-center mb-2">
        <Text className="text-yellow-500 font-bold mr-1">{item.rating}</Text>
        <Star size={14} color="#eab308" fill="#eab308" />
      </View>
      <Text
        numberOfLines={3}
        className={`text-sm mb-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        {item.review}
      </Text>
      <Text className="text-xs font-bold text-cyan-600">- {item.userInfo}</Text>
    </View>
  );

  // Define the Header logic as a function to be called, not a component tag
  const renderHeader = () => (
    <View>
      <View
        className={`p-6 rounded-3xl mb-8 mx-5 ${
          isDark ? "bg-gray-800" : "bg-white shadow-md"
        }`}
      >
        <Text
          className={`text-2xl font-bold mb-2 text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Add a Review
        </Text>

        <StarRating ratingValue={ratingValue} setRatingValue={setRatingValue} />

        <View className="space-y-4">
          <View
            className={`flex-row items-center px-4 mb-3 rounded-xl ${
              isDark ? "bg-gray-900" : "bg-gray-50"
            } border border-gray-200 dark:border-gray-700`}
          >
            <User size={18} color="#6b7280" />
            <TextInput
              placeholder="Name / MIS"
              placeholderTextColor="#9ca3af"
              value={userInfo}
              onChangeText={setUserInfo}
              className={`flex-1 p-3 ${isDark ? "text-white" : "text-gray-900"}`}
              autoCorrect={false}
              autoCapitalize="words"
            />
          </View>

          <View
            className={`flex-row items-start pr-4 mb-3 rounded-xl ${
              isDark ? "bg-gray-900" : "bg-gray-50"
            } border border-gray-200 dark:border-gray-700`}
          >
            <TextInput
              placeholder="Share your experience..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              value={review}
              onChangeText={setReview}
              className={`flex-1 p-3 h-24 ${isDark ? "text-white" : "text-gray-900"}`}
              textAlignVertical="top"
              autoCorrect={true}
              autoCapitalize="sentences"
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`py-4 rounded-2xl flex-row justify-center items-center ${
              loading ? "bg-gray-500" : "bg-green-600"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2">
                  Submit Rating
                </Text>
                <Send size={18} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text
        className={`text-xl font-bold mb-4 mx-5 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Recent Reviews
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ backgroundColor: isDark ? "#111827" : "#f9fafb" }}
    >
      <FlatList
        data={allRatings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderReviewItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={
          <Text className="text-gray-500 italic mx-5">
            No reviews yet. Be the first!
          </Text>
        }
      />
    </KeyboardAvoidingView>
  );
};

export default RateUsComponents;
