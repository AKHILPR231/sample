import React from "react";
import { Text, View } from "react-native";
import { DayHours } from "../../types/service";

interface HoursRowProps {
  item: DayHours;
}

const HoursRow: React.FC<HoursRowProps> = ({ item }) => {
  const highlight = item.isHighlight || item.isToday;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: highlight ? "#121212" : "#FFFFFF",
        borderBottomWidth: highlight ? 0 : 1,
        borderBottomColor: "#EAE2CF",
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: highlight ? "#FFD700" : "#121212",
          textTransform: "uppercase",
        }}
      >
        {item.day}
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: highlight ? "#FFD700" : "#121212",
        }}
      >
        {item.hours}
      </Text>
    </View>
  );
};

export default HoursRow;