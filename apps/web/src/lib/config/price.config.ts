import { PriceDetailType } from "../types/price.type";

export const priceDetails:PriceDetailType[] = [
  {
    name: "free",
    description: "For personal use",
    price: 0,
    features: [
      "1 Workspace",
      "Unlimited members",
      "Basic support",
      "2 teams",
      "2 projects per team",
    ],
  },
  {
    name: "standard",
    description: "For small businesses",
    price: 500,
    features: [
      "5 Workspaces",
      "Unlimited members",
      "Premium support",
      "unlimited teams",
      "unlimited projects per team",
    ],
  },
];
