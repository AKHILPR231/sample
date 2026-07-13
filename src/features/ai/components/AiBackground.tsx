import { ImageBackground } from "react-native";

import { aiBackground } from "@/assets/images";
import { useTheme } from "@/hooks/useTheme";

import type { ReactNode } from "react";

import { createStyles } from "./AiBackground.styles";

type Props = {
  children: ReactNode;
};

/**
 * Full-bleed background for every AI screen.
 *
 * The image is exported from `@/assets/images` — drop your own artwork at
 * `src/assets/images/ai-background.png` to replace the placeholder.
 */
export function AiBackground({ children }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <ImageBackground
      source={aiBackground}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}
