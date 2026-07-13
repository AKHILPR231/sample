import { useEffect } from "react";
import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";
import { rf } from "@/utils/responsive";

import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { createStyles } from "./GeneratingIndicator.styles";

export function GeneratingIndicator() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.12, { duration: 700, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 700, easing: Easing.in(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.badge, animatedStyle]}>
        <Ionicons name="sparkles" size={rf(34)} color={theme.colors.viaNavy} />
      </Animated.View>
      <Text style={styles.caption}>{t("aiGenerating")}</Text>
    </View>
  );
}
