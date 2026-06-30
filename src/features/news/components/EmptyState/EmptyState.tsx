import { memo, useMemo } from "react";
import { Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./EmptyState.styles";
import type { EmptyStateProps } from "./EmptyState.types";

function EmptyStateBase({ icon, title, body }: EmptyStateProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={icon}
          size={30}
          color={theme.colors.textSecondary}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      {body ? <Text style={styles.body}>{body}</Text> : null}
    </View>
  );
}

export const EmptyState = memo(EmptyStateBase);
