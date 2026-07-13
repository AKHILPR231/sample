import { TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { createStyles } from "./AiHeader.styles";

type Props = {
  onMenu?: () => void;
  onClose: () => void;
  /** Shows a back chevron instead of the menu icon. */
  showBack?: boolean;
  onBack?: () => void;
};

export function AiHeader({ onMenu, onClose, showBack, onBack }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.circle}
        activeOpacity={0.8}
        onPress={showBack ? onBack : onMenu}
      >
        <Ionicons
          name={showBack ? "chevron-back" : "menu"}
          size={rf(20)}
          color={theme.colors.viaNavy}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.circle} activeOpacity={0.8} onPress={onClose}>
        <Ionicons name="close" size={rf(20)} color={theme.colors.viaNavy} />
      </TouchableOpacity>
    </View>
  );
}
