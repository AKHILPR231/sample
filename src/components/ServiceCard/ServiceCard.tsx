import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import styles from "./ServiceCard.styles";
import { Service } from "../../types/service";
import IconMapper from "../IconMapper";

interface ServiceCardProps {
  service: Service;
  selected?: boolean;
  onPress?: (id: string) => void;
  variant?: "full" | "half";
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  selected = false,
  onPress,
  variant = "half",
}) => {
  const yellowCard = service.isSpecial;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(service.id)}
      style={[
        variant === "full"
          ? styles.fullCard
          : styles.halfCard,

        selected && styles.selectedCard,

        yellowCard && styles.yellowCard,
      ]}
    >
      {variant === "full" ? (
        <>
          <View
            style={[
              styles.iconContainer,
              yellowCard && styles.yellowIconContainer,
            ]}
          >
            <IconMapper
              name={service.iconName}
              color={yellowCard ? "#121212" : "#FFD700"}
              size={28}
            />
          </View>

          <View style={styles.content}>
            <Text
              style={[
                styles.title,
                yellowCard && styles.yellowText,
              ]}
            >
              {service.title}
            </Text>

            <Text
              style={[
                styles.subtitle,
                yellowCard && styles.yellowSubtitle,
              ]}
            >
              {service.subtitle}
            </Text>
          </View>
        </>
      ) : (
        <>
          <IconMapper
            name={service.iconName}
            color={yellowCard ? "#121212" : "#FFD700"}
            size={28}
          />

          <Text
            style={[
              styles.title,
              styles.marginTop,
              yellowCard && styles.yellowText,
            ]}
          >
            {service.title}
          </Text>

          <Text
            style={[
              styles.subtitle,
              yellowCard && styles.yellowSubtitle,
            ]}
          >
            {service.subtitle}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default ServiceCard;