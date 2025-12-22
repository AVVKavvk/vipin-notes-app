import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useTheme } from "../hooks/useTheme";

const HardRefreshWrapper = ({ children, onRefreshAction, colors }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const isDark = theme === "dark";

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    // Call the passed in function (e.g., fetchRatings or checkVersion)
    if (onRefreshAction) {
      await onRefreshAction();
    }

    // Small delay to make it feel smooth
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [onRefreshAction]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          // Matching your theme colors
          colors={[colors]} // Android: Cyan
          tintColor={isDark ? "#ffffff" : "#06b6d4"} // iOS
          progressBackgroundColor={isDark ? "#1f2937" : "#ffffff"}
        />
      }
    >
      {children}
    </ScrollView>
  );
};
