import { memo, useCallback, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { getServiceMeta } from "../../serviceMeta";
import { createStyles } from "./ServiceLocationRow.styles";
import type { ServiceLocationRowProps } from "./ServiceLocationRow.types";

function ServiceLocationRowBase({
  service,
  active,
  onPress,
  last,
}: ServiceLocationRowProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const meta = useMemo(() => getServiceMeta(service.type), [service.type]);

  const handlePress = useCallback(() => onPress?.(service), [onPress, service]);

  return (
    <Pressable
      onPress={onPress ? handlePress : undefined}
      disabled={!onPress || active}
      style={({ pressed }) => [
        styles.row,
        last && styles.lastRow,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${service.name}, ${service.location_description}`}
    >
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={meta.icon}
          size={18}
          color={theme.colors.primary}
        />
      </View>
      <View style={styles.body}>
        <Text style={[styles.name, active && styles.activeName]} numberOfLines={1}>
          {service.name}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {service.location_description}
        </Text>
      </View>
      {onPress && !active ? (
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={theme.colors.textSecondary}
        />
      ) : null}
    </Pressable>
  );
}

export const ServiceLocationRow = memo(ServiceLocationRowBase);
