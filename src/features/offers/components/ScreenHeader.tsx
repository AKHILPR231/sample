import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { createStyles } from "./ScreenHeader.styles";

type Props = {
  title: string;
  onBack: () => void;
};

export function ScreenHeader({ title, onBack }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} activeOpacity={0.8} onPress={onBack}>
        <Ionicons
          name="chevron-back"
          size={rf(20)}
          color={theme.colors.onSurface}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
