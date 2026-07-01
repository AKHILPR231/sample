import { useWindowDimensions, View } from "react-native";

import type { BrandSlide } from "@/features/brands/types";
import { useTheme } from "@/hooks/useTheme";
import { rw } from "@/utils/responsive";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { BrandHeroSlide } from "./BrandHeroSlide";
import { PaginationDots } from "./PaginationDots";

type Props = {
  slides: BrandSlide[];
  onPressBrand: (id: string) => void;
};

export function BrandHeroCarousel({ slides, onPressBrand }: Props) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const slideWidth = width - rw(theme.spacing.md) * 2;

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        {slides.map((slide) => (
          <BrandHeroSlide
            key={slide.id}
            slide={slide}
            width={slideWidth}
            onPress={onPressBrand}
          />
        ))}
      </Animated.ScrollView>

      {slides.length > 1 ? (
        <PaginationDots
          count={slides.length}
          scrollX={scrollX}
          slideWidth={slideWidth}
        />
      ) : null}
    </View>
  );
}
