import { Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { createStyles } from "./RewardsHeader.styles";

type Props = {
  title: string;
  onBack: () => void;
  roundedBottom?: boolean;
};

export function RewardsHeader({ title, onBack, roundedBottom = true }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        roundedBottom ? styles.rounded : null,
        { paddingTop: insets.top + theme.spacing.sm },
      ]}
    >
      <TouchableOpacity style={styles.back} activeOpacity={0.8} onPress={onBack}>
        <Ionicons
          name="chevron-back"
          size={rf(20)}
          color={theme.colors.viaNavy}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
