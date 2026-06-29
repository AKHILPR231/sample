import { useColorScheme } from "react-native";

import { darkColors, lightColors, spacing,typography } from "@/theme";

export function useTheme() {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? darkColors : lightColors;

  return { colors, typography, spacing, scheme };
}

/** Shape returned by `useTheme()`. Use in `*.styles.ts` factories. */
export type AppTheme = ReturnType<typeof useTheme>;
