export type Receipt = {
  id: string;
  storeName: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  category: "food" | "transport" | "shopping";
};
