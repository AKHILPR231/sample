import { memo, useMemo } from "react";
import { Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { getFeatureMeta } from "../../serviceMeta";
import { createStyles } from "./FacilityRow.styles";
import type { FacilityRowProps } from "./FacilityRow.types";

function FacilityRowBase({ feature }: FacilityRowProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const meta = useMemo(() => getFeatureMeta(feature), [feature]);

  return (
    <View style={styles.row} accessibilityRole="text">
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={meta.icon}
          size={16}
          color={theme.colors.primary}
        />
      </View>
      <Text style={styles.label}>{meta.label}</Text>
    </View>
  );
}

export const FacilityRow = memo(FacilityRowBase);
