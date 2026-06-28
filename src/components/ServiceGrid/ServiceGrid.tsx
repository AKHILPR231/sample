import React from "react";
import { View } from "react-native";

import ServiceCard from "../ServiceCard/ServiceCard";
import { Service } from "../../types/service";

interface ServiceGridProps {
  services: Service[];
  selectedServices: string[];
  onSelect: (id: string) => void;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  selectedServices,
  onSelect,
}) => {
  if (services.length === 0) return null;

  return (
    <View>
      {/* First Full Width Card */}
      <ServiceCard
        service={services[0]}
        variant="full"
        selected={selectedServices.includes(services[0].id)}
        onPress={onSelect}
      />

      {/* Remaining Cards */}
      {Array.from({ length: Math.ceil((services.length - 1) / 2) }).map(
        (_, index) => {
          const first = services[index * 2 + 1];
          const second = services[index * 2 + 2];

          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              {first && (
                <ServiceCard
                  service={first}
                  variant="half"
                  selected={selectedServices.includes(first.id)}
                  onPress={onSelect}
                />
              )}

              {second ? (
                <ServiceCard
                  service={second}
                  variant="half"
                  selected={selectedServices.includes(second.id)}
                  onPress={onSelect}
                />
              ) : (
                <View style={{ width: "48.5%" }} />
              )}
            </View>
          );
        }
      )}
    </View>
  );
};

export default ServiceGrid;