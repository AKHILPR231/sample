import { memo, useMemo } from "react";
import { Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./SectionCard.styles";
import type { SectionCardProps } from "./SectionCard.types";

function SectionCardBase({ title, icon, children }: SectionCardProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {icon ? (
          <MaterialCommunityIcons
            name={icon}
            size={18}
            color={theme.colors.primary}
            style={styles.icon}
          />
        ) : null}
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

export const SectionCard = memo(SectionCardBase);
