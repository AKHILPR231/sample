import React from "react";
import { Text, View } from "react-native";

import styles from "./SectionHeader.styles";

export interface SectionHeaderProps {
  number: string;
  title: string;
  showUnderline?: boolean;
  titleColor?: string;
  numberColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  showUnderline = true,
  titleColor = "#1F1B10",
  numberColor = "#FFD700",
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.number, { color: numberColor }]}>
        {number}
      </Text>

      {showUnderline ? (
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              { color: titleColor },
            ]}
          >
            {title}
          </Text>
        </View>
      ) : (
        <Text
          style={[
            styles.title,
            styles.titleWithoutUnderline,
            { color: titleColor },
          ]}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default SectionHeader;