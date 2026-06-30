import { memo, useEffect, useMemo, useRef } from "react";
import { Animated, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./LoadingSkeleton.styles";
import type { LoadingSkeletonProps } from "./LoadingSkeleton.types";

function LoadingSkeletonBase({ count = 4 }: LoadingSkeletonProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const cards = useMemo(() => Array.from({ length: count }), [count]);

  return (
    <View accessibilityRole="progressbar" accessibilityLabel="Loading news">
      {cards.map((_, idx) => (
        <Animated.View key={idx} style={[styles.card, { opacity: pulse }]}>
          <View style={styles.image} />
          <View style={styles.body}>
            <View style={styles.chip} />
            <View style={styles.lineLg} />
            <View style={styles.line} />
            <View style={styles.lineShort} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

export const LoadingSkeleton = memo(LoadingSkeletonBase);
