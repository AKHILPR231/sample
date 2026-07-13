import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { ChipState } from "@/features/ai/types";
import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { createStyles } from "./AiChip.styles";

type Props = {
  label: string;
  state: ChipState;
  showRemove?: boolean;
  onPress?: () => void;
};

function AiChipComponent({ label, state, showRemove, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const chipStyle =
    state === "selected"
      ? styles.selected
      : state === "muted"
        ? styles.muted
        : styles.default;

  const textStyle =
    state === "selected"
      ? styles.selectedText
      : state === "muted"
        ? styles.mutedText
        : styles.defaultText;

  const iconColor =
    state === "selected" ? theme.colors.viaWhite : theme.colors.viaNavy;

  return (
    <TouchableOpacity
      style={[styles.chip, chipStyle]}
      activeOpacity={0.7}
      disabled={!onPress}
      onPress={onPress}
    >
      <Text style={[styles.label, textStyle]}>{label}</Text>
      {showRemove ? (
        <Ionicons
          name="close"
          size={rf(13)}
          color={iconColor}
          style={styles.removeIcon}
        />
      ) : null}
    </TouchableOpacity>
  );
}

export const AiChip = memo(AiChipComponent);
