export type StoreStatus = "Active" | "Inactive";

export type StoreRow = {
  id: string;
  name: string;
  brand: string;
  category: string;
  zone: string;
  status: StoreStatus;
  hours: string;
  updated: string;
};

export type Outlet = {
  id: string;
  name: string;
  stores: StoreRow[];
};

/**
 * STATIC DATA — the store directory per outlet. Swap this for an API call keyed
 * by outlet id when the backend is ready; the table reads whatever this returns.
 */
export const OUTLETS: Outlet[] = [
  {
    id: "batavia",
    name: "Batavia Stad",
    stores: [
      {
        id: "bat_selected",
        name: "SELECTED",
        brand: "Selected",
        category: "Fashion & Apparel",
        zone: "Zone A - Ground Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "1 hour ago",
      },
      {
        id: "bat_tommy",
        name: "TOMMY HILFIGER",
        brand: "Tommy Hilfiger",
        category: "Fashion & Apparel",
        zone: "Zone A - Ground Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "1 day ago",
      },
      {
        id: "bat_kors",
        name: "MICHAEL KORS",
        brand: "Michael Kors",
        category: "Fashion & Accessories",
        zone: "Zone C - 1st Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "2 days ago",
      },
      {
        id: "bat_triumph",
        name: "TRIUMPH",
        brand: "Triumph",
        category: "Fashion & Lingerie",
        zone: "Zone B - Ground Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "5 days ago",
      },
    ],
  },
  {
    id: "zweibrucken",
    name: "Zweibrücken Fashion Outlet",
    stores: [
      {
        id: "zwe_selected",
        name: "SELECTED",
        brand: "Selected",
        category: "Fashion & Apparel",
        zone: "Zone A - Ground Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "1 hour ago",
      },
      {
        id: "zwe_kapeton",
        name: "KAPETON & SON",
        brand: "Kapeton & Son",
        category: "Fashion & Apparel",
        zone: "Zone B - 1st Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "4 hours ago",
      },
      {
        id: "zwe_tommy",
        name: "TOMMY HILFIGER",
        brand: "Tommy Hilfiger",
        category: "Fashion & Apparel",
        zone: "Zone A - Ground Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "1 day ago",
      },
      {
        id: "zwe_kors",
        name: "MICHAEL KORS",
        brand: "Michael Kors",
        category: "Fashion & Accessories",
        zone: "Zone C - 1st Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "2 days ago",
      },
      {
        id: "zwe_bruno",
        name: "BRUNO BANANI",
        brand: "Bruno Banani",
        category: "Fashion & Apparel",
        zone: "Zone D - 1st Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "3 days ago",
      },
      {
        id: "zwe_triumph",
        name: "TRIUMPH",
        brand: "Triumph",
        category: "Fashion & Lingerie",
        zone: "Zone B - Ground Floor",
        status: "Active",
        hours: "10:00 - 20:00",
        updated: "5 days ago",
      },
    ],
  },
  {
    id: "mallorca",
    name: "Mallorca Fashion Outlet",
    stores: [
      {
        id: "mal_desigual",
        name: "DESIGUAL",
        brand: "Desigual",
        category: "Fashion & Apparel",
        zone: "Zone A - Ground Floor",
        status: "Active",
        hours: "10:00 - 21:00",
        updated: "3 hours ago",
      },
      {
        id: "mal_camper",
        name: "CAMPER",
        brand: "Camper",
        category: "Footwear",
        zone: "Zone B - Ground Floor",
        status: "Inactive",
        hours: "Closed for renovation",
        updated: "1 week ago",
      },
      {
        id: "mal_mango",
        name: "MANGO OUTLET",
        brand: "Mango",
        category: "Fashion & Apparel",
        zone: "Zone A - 1st Floor",
        status: "Active",
        hours: "10:00 - 21:00",
        updated: "6 hours ago",
      },
    ],
  },
];
