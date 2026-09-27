export type Outlet = {
  id: string;
  name: string;
  area: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
};

export const outlets: Outlet[] = [
  {
    id: "banani",
    name: "Loomora Lifestyle — Banani",
    area: "Banani",
    address: "House 42, Road 11, Banani",
    city: "Dhaka 1213",
    phone: "01712-345678",
    hours: "10:00 AM – 9:00 PM",
  },
  {
    id: "dhanmondi",
    name: "Loomora Lifestyle — Dhanmondi",
    area: "Dhanmondi",
    address: "House 15, Road 5, Dhanmondi",
    city: "Dhaka 1205",
    phone: "01713-456789",
    hours: "10:00 AM – 9:00 PM",
  },
  {
    id: "uttara",
    name: "Loomora Lifestyle — Uttara",
    area: "Uttara",
    address: "Plot 7, Sector 7, Main Road, Uttara",
    city: "Dhaka 1230",
    phone: "01714-567890",
    hours: "10:30 AM – 9:00 PM",
  },
  {
    id: "mirpur",
    name: "Loomora Lifestyle — Mirpur",
    area: "Mirpur",
    address: "Road 10, Mirpur-10, Circle",
    city: "Dhaka 1216",
    phone: "01715-678901",
    hours: "10:00 AM – 8:30 PM",
  },
  {
    id: "chattogram",
    name: "Loomora Lifestyle — Chattogram",
    area: "GEC Circle",
    address: "5th Floor, GEC Circle, 184 K. B. Naziruddin Road",
    city: "Chattogram 4000",
    phone: "01716-789012",
    hours: "10:00 AM – 9:00 PM",
  },
  {
    id: "sylhet",
    name: "Loomora Lifestyle — Sylhet",
    area: "Zindabazar",
    address: "Hotel Star House, Zindabazar Main Road",
    city: "Sylhet 3100",
    phone: "01717-890123",
    hours: "10:30 AM – 8:30 PM",
  },
];

export function directionsUrl(outlet: Outlet) {
  const query = `${outlet.address}, ${outlet.city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
