import { memo } from "react";
import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { createStyles } from "./AiAvatar.styles";

type Props = {
  muted?: boolean;
};

function AiAvatarComponent({ muted = false }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.avatar, muted ? styles.muted : styles.active]}>
      <Ionicons
        name="sparkles"
        size={rf(14)}
        color={muted ? theme.colors.textgray : theme.colors.viaWhite}
      />
    </View>
  );
}

export const AiAvatar = memo(AiAvatarComponent);
