import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CalloutCardProps {
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
}

const CalloutCard: React.FC<CalloutCardProps> = ({
  title,
  description,
  buttonTitle,
  onPress,
}) => {
  return (
    <View
      style={{
        backgroundColor: "#F6EDDA",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: "#121212",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "#555",
          lineHeight: 24,
          textAlign: "center",
          marginBottom: 22,
        }}
      >
        {description}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          backgroundColor: "#121212",
          borderRadius: 28,
          paddingVertical: 14,
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "700",
            letterSpacing: 1,
            fontSize: 14,
          }}
        >
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CalloutCard;