import React from "react";

import {
  Handshake,
  Truck,
  Briefcase,
  Shirt,
  Wifi,
  LucideProps,
} from "lucide-react-native";

interface Props extends LucideProps {
  name: string;
}

const icons: Record<string, React.ElementType> = {
  handshake: Handshake,
  truck: Truck,
  luggage: Briefcase,
  checkroom: Shirt,
  wifi: Wifi,
};

const IconMapper: React.FC<Props> = ({
  name,
  ...props
}) => {
  const Icon = icons[name];

  if (!Icon) {
    return <Briefcase {...props} />;
  }

  return <Icon {...props} />;
};

export default IconMapper;