import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";

import styles from "./HeroBanner.styles";

export interface HeroBannerProps {
  image: string | ImageSourcePropType;
  title: string;
  label?: string;
  overlay?: boolean;
  height?: number;
  children?: React.ReactNode;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  image,
  title,
  label,
  overlay = true,
  height = 420,
  children,
}) => {
  return (
    <View style={[styles.container, { height }]}>
      <Image
        source={
          typeof image === "string"
            ? { uri: image }
            : image
        }
        style={styles.image}
      />

      {overlay && (
        <View style={styles.overlay}>
          {label && (
            <Text style={styles.label}>
              {label.toUpperCase()}
            </Text>
          )}

          <Text style={styles.title}>
            {title}
          </Text>

          {children}
        </View>
      )}
    </View>
  );
};

export default HeroBanner;