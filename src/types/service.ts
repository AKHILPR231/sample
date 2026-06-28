/**
 * Service Screen Types
 */

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  isSpecial?: boolean;
}

export interface DayHours {
  day: string;
  hours: string;
  isToday?: boolean;
  isHighlight?: boolean;
}

export interface Booking {
  date: string;
  time: string;
  selectedServices: string[];
  guestName: string;
  passCode: string;
}

export interface Boutique {
  id: string;
  name: string;
  category: "Fashion" | "Design" | "Food" | "Kids";
  logoUrl?: string;
  imageUrl: string;
  discount: string;
  details: string;
  location: string;
}

export interface ParkingReservation {
  licensePlate: string;
  zone: string;
  spotNumber: string;
  entryTime: string;
}

/* -------------------------------------------------------------------------- */
/* Component Props */
/* -------------------------------------------------------------------------- */

export interface HeroBannerProps {
  image: string;
  title: string;
  label?: string;
  overlay?: boolean;
  height?: number;
  children?: React.ReactNode;
}

export interface SectionHeaderProps {
  number: string;
  title: string;
  showUnderline?: boolean;
  titleColor?: string;
  numberColor?: string;
}

export interface ServiceCardProps {
  service: Service;
  selected?: boolean;
  variant?: "full" | "half";
  onPress?: (id: string) => void;
}

export interface ServiceGridProps {
  services: Service[];
  selectedServices: string[];
  onSelect: (id: string) => void;
}

export interface QuoteCardProps {
  quote: string;
}

export interface CalloutCardProps {
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
}

export interface HoursRowProps {
  item: DayHours;
}

export interface HoursTableProps {
  data: DayHours[];
}

export interface BoutiqueCardProps {
  boutique: Boutique;
  onPress?: (boutique: Boutique) => void;
}

export interface BoutiqueListProps {
  boutiques: Boutique[];
  onSelect?: (boutique: Boutique) => void;
}