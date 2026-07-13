import { useEffect } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { AiAvatar } from "./AiAvatar";
import { createStyles } from "./ThinkingIndicator.styles";

const DOT_DELAYS = [0, 150, 300];

type DotProps = {
  delay: number;
};

function Dot({ delay }: DotProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const opacity = useSharedValue(0.25);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 350 }),
          withTiming(0.25, { duration: 350 }),
        ),
        -1,
        false,
      ),
    );
  }, [delay, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.Text style={[styles.dot, animatedStyle]}>.</Animated.Text>;
}

export function ThinkingIndicator() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      <AiAvatar />
      <View style={styles.bubble}>
        <Text style={styles.text}>{t("aiAnalyzing")}</Text>
        {DOT_DELAYS.map((delay) => (
          <Dot key={delay} delay={delay} />
        ))}
      </View>
    </View>
  );
}
