import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rf, rw } from "@/utils/responsive";

type Theme = ReturnType<typeof useTheme>;

export const createStyles = (theme: Theme) => {
  const { colors, spacing, typography } = theme;

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.webBg1,
    },
    centered: {
      flex: 1,
      backgroundColor: colors.webBg1,
      alignItems: "center",
      justifyContent: "center",
    },
    notFound: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.md),
    },
    sheet: {
      backgroundColor: colors.webBg1,
      borderTopLeftRadius: rw(28),
      borderTopRightRadius: rw(28),
      marginTop: -rw(28),
      paddingHorizontal: rw(spacing.lg),
      paddingTop: rw(spacing.md),
    },
    handle: {
      alignSelf: "center",
      width: rw(48),
      height: rw(4),
      borderRadius: rw(2),
      backgroundColor: colors.textgray,
      marginBottom: rw(spacing.lg),
    },
    brand: {
      color: colors.onSurface,
      fontFamily: typography.fonts.lexendGigaMedium,
      fontSize: rf(typography.size.sm),
      letterSpacing: rw(1),
    },
    title: {
      color: colors.viaNavy,
      fontFamily: typography.fonts.lexendTeraSemiBold,
      fontSize: rf(typography.size.xxl),
      letterSpacing: rw(0.5),
      marginTop: rw(spacing.sm),
    },
    validity: {
      color: colors.textgray,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.sm),
      marginTop: rw(spacing.sm),
    },
    description: {
      color: colors.onSurfaceVariant,
      fontFamily: typography.fonts.interRegular,
      fontSize: rf(typography.size.md),
      lineHeight: rf(typography.size.md) * 1.4,
      marginTop: rw(spacing.md),
    },
    similarRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    discover: {
      backgroundColor: colors.viaNavy,
      borderRadius: rw(28),
      paddingVertical: rw(spacing.md),
      alignItems: "center",
      marginTop: rw(spacing.xl),
    },
    discoverLabel: {
      color: colors.viaWhite,
      fontFamily: typography.fonts.interSemiBold,
      fontSize: rf(typography.size.md),
      letterSpacing: rw(1),
      textTransform: "uppercase",
    },
  });
};
