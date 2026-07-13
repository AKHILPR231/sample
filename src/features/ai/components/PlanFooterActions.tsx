import { Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "./PlanFooterActions.styles";

type Props = {
  secondaryLabel: string;
  primaryLabel: string;
  onSecondary: () => void;
  onPrimary: () => void;
};

export function PlanFooterActions({
  secondaryLabel,
  primaryLabel,
  onSecondary,
  onPrimary,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom + theme.spacing.sm }]}>
      <TouchableOpacity
        style={[styles.button, styles.secondary]}
        activeOpacity={0.8}
        onPress={onSecondary}
      >
        <Text style={styles.secondaryLabel}>{secondaryLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.primary]}
        activeOpacity={0.8}
        onPress={onPrimary}
      >
        <Text style={styles.primaryLabel}>{primaryLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
