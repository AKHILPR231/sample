import { memo, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./ScreenHeader.styles";
import type { ScreenHeaderProps } from "./ScreenHeader.types";

function ScreenHeaderBase({ title, subtitle, onBack }: ScreenHeaderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.spacing.sm }]}>
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
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
        ) : null}

        <View style={styles.titleWrap}>
          <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export const ScreenHeader = memo(ScreenHeaderBase);
