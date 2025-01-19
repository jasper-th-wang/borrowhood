import { Item } from "@/components/Cards/ItemCard/Item.interface";

const stubGetItemsResponse = [
  {
    id: "i1",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "0.8 km",
    itemName: "Electric Power Drill",
    lender: "David Chen"
  },
  {
    id: "i2",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "1.2 km",
    itemName: "Camping Tent (4-Person)",
    lender: "Sarah Johnson"
  },
  {
    id: "i3",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "0.3 km",
    itemName: "Mountain Bike",
    lender: "Michael Rodriguez"
  },
  {
    id: "i4",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "2.5 km",
    itemName: "Professional Camera",
    lender: "Emma Wilson"
  },
  {
    id: "i5",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "1.7 km",
    itemName: "Pressure Washer",
    lender: "James Taylor"
  },
  {
    id: "i6",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "0.5 km",
    itemName: "Garden Tools Set",
    lender: "Lisa Park"
  },
  {
    id: "i7",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "3.1 km",
    itemName: "BBQ Grill",
    lender: "Alex Thompson"
  },
  {
    id: "i8",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "1.4 km",
    itemName: "Ladder (6m)",
    lender: "Maria Garcia"
  },
  {
    id: "i9",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "0.9 km",
    itemName: "Moving Dolly",
    lender: "Chris Anderson"
  },
  {
    id: "i10",
    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
    distance: "2.8 km",
    itemName: "Table Tennis Set",
    lender: "Nina Patel"
  }
];

export async function getItems(): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stubGetItemsResponse);
    }, 2000);
  })
}