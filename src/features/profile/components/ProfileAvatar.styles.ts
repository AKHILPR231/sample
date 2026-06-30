import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, typography } = theme;

  return StyleSheet.create({
    ring: {
      width: rw(112),
      height: rw(112),
      borderRadius: rw(56),
      borderWidth: rw(3),
      borderColor: colors.viaWhite,
      backgroundColor: colors.charcoal,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    image: {
      width: rw(106),
      height: rw(106),
      borderRadius: rw(53),
    },
    fallback: {
      width: rw(106),
      height: rw(106),
      borderRadius: rw(53),
      backgroundColor: colors.viaNavy,
      alignItems: "center",
      justifyContent: "center",
    },
    initials: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xxl),
    },
  });
};
