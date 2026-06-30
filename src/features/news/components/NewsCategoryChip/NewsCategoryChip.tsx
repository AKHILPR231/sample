import { memo, useMemo } from "react";
import { Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { getCategoryMeta } from "../../newsMeta";
import { createStyles } from "./NewsCategoryChip.styles";
import type { NewsCategoryChipProps } from "./NewsCategoryChip.types";

function NewsCategoryChipBase({ type, compact }: NewsCategoryChipProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const meta = useMemo(() => getCategoryMeta(type), [type]);

  return (
    <View
      style={[styles.chip, compact && styles.chipCompact]}
      accessibilityRole="text"
      accessibilityLabel={`Category: ${meta.label}`}
    >
      {!compact ? (
        <MaterialCommunityIcons
          name={meta.icon}
          size={13}
          color={theme.colors.primary}
          style={styles.icon}
        />
      ) : null}
      <Text style={styles.label}>{meta.label}</Text>
    </View>
  );
}

export const NewsCategoryChip = memo(NewsCategoryChipBase);
