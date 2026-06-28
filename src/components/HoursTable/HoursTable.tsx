import React from "react";
import { FlatList, Text, View } from "react-native";
import { Clock3 } from "lucide-react-native";

import { DayHours } from "../../types/service";
import HoursRow from "./HoursRow";

interface HoursTableProps {
  data: DayHours[];
}

const HoursTable: React.FC<HoursTableProps> = ({ data }) => {
  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Clock3 size={18} color="#FFD700" />

        <Text
          style={{
            marginLeft: 8,
            fontWeight: "700",
            fontSize: 14,
            color: "#444",
          }}
        >
          BOUTIQUE OPENING HOURS
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={(item) => item.day}
          renderItem={({ item }) => <HoursRow item={item} />}
        />
      </View>
    </View>
  );
};

export default HoursTable;