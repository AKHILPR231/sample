import { memo, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { getServiceMeta } from "../../serviceMeta";
import { createStyles } from "./ServiceCard.styles";
import type { ServiceCardProps } from "./ServiceCard.types";

function ServiceCardBase({ group, onPress }: ServiceCardProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const meta = useMemo(() => getServiceMeta(group.type), [group.type]);

  const handlePress = useCallback(() => onPress(group), [group, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${group.label}, ${group.subtitle}`}
    >
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={meta.icon}
          size={26}
          color={theme.colors.primary}
        />
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {group.label}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {group.subtitle}
      </Text>
    </Pressable>
  );
}

export const ServiceCard = memo(ServiceCardBase);
