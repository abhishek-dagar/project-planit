import axios from "axios";
export async function getPricing() {
  try {
    const pricingData = await axios.get("/api/pricing");
    return pricingData;
  } catch (error) {
    return error;
  }
}
export async function fetchPlan(price: string|null) {
  try {
    const { data } = await axios.get("/api/pricing/" + price);
    return data.pricingData;
  } catch (error) {
    return error;
  }
}
