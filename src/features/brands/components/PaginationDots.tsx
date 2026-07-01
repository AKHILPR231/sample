import { View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { createStyles } from "./PaginationDots.styles";

type DotProps = {
  index: number;
  scrollX: SharedValue<number>;
  slideWidth: number;
};

function Dot({ index, scrollX, slideWidth }: DotProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const animatedStyle = useAnimatedStyle(() => {
    const input = [
      (index - 1) * slideWidth,
      index * slideWidth,
      (index + 1) * slideWidth,
    ];
    return {
      width: interpolate(
        scrollX.value,
        input,
        [rw(8), rw(22), rw(8)],
        Extrapolation.CLAMP,
      ),
      opacity: interpolate(
        scrollX.value,
        input,
        [0.35, 1, 0.35],
        Extrapolation.CLAMP,
      ),
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

type Props = {
  count: number;
  scrollX: SharedValue<number>;
  slideWidth: number;
};

export function PaginationDots({ count, scrollX, slideWidth }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, index) => (
        <Dot
          key={index}
          index={index}
          scrollX={scrollX}
          slideWidth={slideWidth}
        />
      ))}
    </View>
  );
}
