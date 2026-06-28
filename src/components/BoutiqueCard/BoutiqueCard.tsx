import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Boutique } from "../../types/service";

interface BoutiqueCardProps {
  boutique: Boutique;
  onPress?: (boutique: Boutique) => void;
}

const BoutiqueCard: React.FC<BoutiqueCardProps> = ({
  boutique,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(boutique)}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginBottom: 18,
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: boutique.imageUrl }}
        style={{
          width: "100%",
          height: 180,
        }}
      />

      <View style={{ padding: 16 }}>
        <Text
          style={{
            color: "#999",
            fontSize: 12,
            marginBottom: 6,
          }}
        >
          {boutique.category.toUpperCase()}
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#121212",
          }}
        >
          {boutique.name}
        </Text>

        <Text
          style={{
            marginTop: 8,
            fontSize: 14,
            color: "#555",
            lineHeight: 22,
          }}
        >
          {boutique.details}
        </Text>

        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFD700",
              fontWeight: "700",
            }}
          >
            {boutique.discount}
          </Text>

          <Text
            style={{
              color: "#777",
              fontSize: 13,
            }}
          >
            {boutique.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BoutiqueCard;