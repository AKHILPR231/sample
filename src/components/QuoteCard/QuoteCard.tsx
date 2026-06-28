import React from "react";
import { Text, View } from "react-native";

interface QuoteCardProps {
  quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
}) => {
  return (
    <View
      style={{
        borderLeftWidth: 3,
        borderLeftColor: "#FFD700",
        paddingLeft: 14,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 15,
          fontStyle: "italic",
          lineHeight: 22,
          opacity: 0.9,
        }}
      >
        "{quote}"
      </Text>
    </View>
  );
};

export default QuoteCard;