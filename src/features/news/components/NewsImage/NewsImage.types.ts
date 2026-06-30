import type { StyleProp, ViewStyle } from "react-native";

export type NewsImageProps = {
  uri?: string;
  /** Height of the image block. */
  height: number;
  /** Corner radius (0 for full-bleed heroes). */
  radius?: number;
  style?: StyleProp<ViewStyle>;
};
