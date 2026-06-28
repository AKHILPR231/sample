/**
 * Service Screen Mock Data
 */

import { Boutique, DayHours, Service } from "../types/service";

export const EXCLUSIVE_LOUNGE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAOUU7koCqDT9swHhH826XuXJmQK5zB4T-lTjLmgVX_7Uw6l_y1Dm6THoYGjF6dyu8R1A54Vh-mjT-VSCpEZGwl3Ui5UYjLywJWg6sRGstN-y-eRXzun3gEI5r9u15mOHi3S7rTReOtybjL5tCq2HdFO5-axBbBEiAdvY-zQGWMrCmtC1AX6HgGho-GqHQMOFMpOfxyWHe8PR2u6dj92UlXOS_QkKqTVxamNlpmD4JA_KjC0E2zYTG-wg";

export const LOUNGE_SERVICES: Service[] = [
  {
    id: "welcome",
    title: "Personalised welcome",
    subtitle: "With dedicated assistance always at your disposal",
    iconName: "handshake",
  },
  {
    id: "luxury_delivery",
    title: "Luxury delivery",
    subtitle: "Directly at home.",
    iconName: "truck",
  },
  {
    id: "luggage_storage",
    title: "Luggage storage",
    subtitle: "Total freedom.",
    iconName: "luggage",
  },
  {
    id: "dressing_room",
    title: "Dressing room",
    subtitle: "Private fitting.",
    iconName: "checkroom",
  },
  {
    id: "wifi_refresh",
    title: "Wi-Fi & Refresh",
    subtitle: "Dedicated corner.",
    iconName: "wifi",
    isSpecial: true,
  },
];

export const BOUTIQUE_HOURS: DayHours[] = [
  {
    day: "Monday",
    hours: "10:00 - 21:00",
  },
  {
    day: "Tuesday",
    hours: "10:00 - 21:00",
  },
  {
    day: "Wednesday",
    hours: "10:00 - 21:00",
  },
  {
    day: "Thursday",
    hours: "10:00 - 21:00",
  },
  {
    day: "Friday",
    hours: "10:00 - 21:00",
  },
  {
    day: "Saturday",
    hours: "10:00 - 21:00",
    isHighlight: true,
  },
  {
    day: "Sunday",
    hours: "10:00 - 21:00",
  },
];

export const PREMIUM_BOUTIQUES: Boutique[] = [
  {
    id: "poltrona-frau",
    name: "Poltrona Frau",
    category: "Design",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
    discount: "30% Off Outlet",
    details:
      "Elegant, master-crafted Italian leather furniture & decor designed for absolute comfort.",
    location: "Unit 45, Luxury Avenue",
  },
  {
    id: "armani",
    name: "Armani Outlet",
    category: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600",
    discount: "Up to 50% Off",
    details:
      "Timeless luxury silhouettes, structured suits and premium Italian fashion.",
    location: "Unit 12, Main Street",
  },
  {
    id: "prada",
    name: "Prada",
    category: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
    discount: "Exclusive Collection",
    details:
      "Luxury handbags, accessories and iconic Italian footwear.",
    location: "Unit 20, Fashion Galleria",
  },
  {
    id: "ferrari",
    name: "Ferrari Store",
    category: "Kids",
    imageUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    discount: "Secret Sale 20%",
    details:
      "Premium kidswear, Ferrari merchandise and exclusive collectibles.",
    location: "Unit 8, Plaza North",
  },
  {
    id: "milano-bistrot",
    name: "Milano Bistrot",
    category: "Food",
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
    discount: "VIP Complimentary Coffee",
    details:
      "Authentic Italian coffee, fresh pastries and gourmet aperitivo.",
    location: "Food Court, Central Area",
  },
];

/**
 * Static content used on the Service Screen
 */

export const SERVICE_SCREEN_CONTENT = {
  hero: {
    label: "Exclusive Experience",
    title: "The Place.\nHospitality Lounge",
  },

  sectionOne: {
    number: "01",
    title: "WHERE YOUR TIME HAS GREATER VALUE",
    description:
      "The most exclusive location at the heart of Scalo Milano Outlet & More, created for those who wish to enjoy a stylish, comfortable and discreet shopping experience. Accessible only with a personal VIP Pass, The Place Hospitality Lounge offers a tailor-made experience designed to make every visit unforgettable.",
  },

  sectionTwo: {
    number: "02",
    title: "A STYLE ICON BY POLTRONA FRAU",
    descriptionOne:
      "Every detail of The Place Hospitality Lounge tells a story of elegance and artisanal mastery. All furnishings are by Poltrona Frau, the pinnacle of Italian design and craftsmanship.",

    descriptionTwo:
      "A true showroom within the Village where comfort and beauty blend together in timeless harmony.",

    quote: "When hospitality becomes art",
  },

  sectionThree: {
    number: "03",
    title: "AVAILABLE SERVICES",
  },

  callout: {
    title: "THE PLEASURE OF STILLNESS",

    description:
      "Take a break in a space that knows how to listen. Whether you wish to recharge between one boutique and the next or simply enjoy a moment of calm and privacy, The Place welcomes you with elegance.",

    buttonTitle: "ACCESS DETAILS",
  },
};