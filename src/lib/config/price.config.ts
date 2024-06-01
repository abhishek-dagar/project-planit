import { PriceDetailType } from "../types/price.type";

export const priceDetails:PriceDetailType[] = [
  {
    name: "Free",
    description: "For small projects",
    price: 0,
    features: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
  },
  {
    name: "Standard",
    description: "For medium sized projects",
    price: 100,
    features: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
  },
  {
    name: "Premium",
    description: "For large projects",
    price: 200,
    features: [
      "30 users included",
      "15 GB of storage",
      "Help center access",
      "Phone and email support",
    ],
  },
];
