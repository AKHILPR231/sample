import React from "react";
import { FlatList } from "react-native";

import BoutiqueCard from "../BoutiqueCard/BoutiqueCard";
import { Boutique } from "../../types/service";

interface BoutiqueListProps {
  boutiques: Boutique[];
  onSelect?: (boutique: Boutique) => void;
}

const BoutiqueList: React.FC<BoutiqueListProps> = ({
  boutiques,
  onSelect,
}) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={boutiques}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BoutiqueCard
          boutique={item}
          onPress={onSelect}
        />
      )}
    />
  );
};

export default BoutiqueList;