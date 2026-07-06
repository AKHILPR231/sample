import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    container: {
      marginTop: rw(spacing.xl),
    },
    header: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(0.5),
      textTransform: "uppercase",
    },
    row: {
      flexDirection: "row",
      gap: rw(spacing.md),
      marginTop: rw(spacing.md),
    },
    wallet: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.charcoal,
      borderRadius: rw(12),
      paddingHorizontal: rw(spacing.md),
      paddingVertical: rw(spacing.md),
    },
    walletText: {
      marginLeft: rw(spacing.sm),
    },
    walletTop: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.xs),
    },
    walletName: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
    },
  });
};
