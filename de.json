import { Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { createStyles } from "./QrButton.styles";

type Props = {
  label: string;
  onPress: () => void;
};

export function QrButton({ label, onPress }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={onPress}>
      <Ionicons
        name="qr-code-outline"
        size={rf(18)}
        color={theme.colors.viaNavy}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
