import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    banner: {
      backgroundColor: colors.charcoal,
      borderRadius: rw(18),
      padding: rw(spacing.lg),
      marginTop: rw(spacing.lg),
    },
    title: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xl),
      letterSpacing: rw(1),
      textTransform: "uppercase",
    },
    subtitle: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      textTransform: "uppercase",
      letterSpacing: rw(0.5),
      marginTop: rw(spacing.xs),
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: rw(spacing.lg),
    },
    club: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.lg),
      letterSpacing: rw(1),
    },
    joinButton: {
      borderWidth: 1,
      borderColor: colors.viaWhite,
      borderRadius: rw(22),
      paddingHorizontal: rw(spacing.lg),
      paddingVertical: rw(spacing.sm),
    },
    joinLabel: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(1),
    },
  });
};
