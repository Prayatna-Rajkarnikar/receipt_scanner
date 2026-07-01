import { Receipt } from "@/types/receipt-type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ReceiptStore = {
  receipts: Receipt[];
  addReceipt: (receipt: Receipt) => void;
};

const useReceipt = create<ReceiptStore>()(
  persist(
    (set) => ({
      receipts: [],
      addReceipt: (receipt) =>
        set((state) => ({ receipts: [...state.receipts, receipt] })),
    }),
    {
      name: "receopt-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useReceipt;
