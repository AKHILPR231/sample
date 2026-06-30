import { memo, useMemo, useState } from "react";
import { Image, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

import { createStyles } from "./NewsImage.styles";
import type { NewsImageProps } from "./NewsImage.types";

function NewsImageBase({ uri, height, radius = 0, style }: NewsImageProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [failed, setFailed] = useState(false);

  const showImage = Boolean(uri) && !failed;

  return (
    <View style={[styles.container, { height, borderRadius: radius }, style]}>
      {showImage ? (
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setFailed(true)}
          accessibilityRole="image"
        />
      ) : (
        <View style={styles.placeholder}>
          <MaterialCommunityIcons
            name="image-outline"
            size={Math.min(40, height / 3)}
            color={theme.colors.textSecondary}
          />
        </View>
      )}
    </View>
  );
}

export const NewsImage = memo(NewsImageBase);
