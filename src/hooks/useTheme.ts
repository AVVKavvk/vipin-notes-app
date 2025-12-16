import { useColorScheme } from "react-native";

export type AppTheme = "light" | "dark";

export const useTheme = (): AppTheme => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? "dark" : "light";
};
