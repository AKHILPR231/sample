import { memo, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./NewsHeader.styles";
import type { NewsHeaderProps } from "./NewsHeader.types";

function NewsHeaderBase({ title, onBack, onShare }: NewsHeaderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.spacing.sm }]}>
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}

        <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
          {title}
        </Text>

        {onShare ? (
          <TouchableOpacity
            onPress={onShare}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Share"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialCommunityIcons
              name="share-variant"
              size={22}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>
    </View>
  );
}

export const NewsHeader = memo(NewsHeaderBase);
