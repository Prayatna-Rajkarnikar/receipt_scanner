import { Receipt } from "@/types/receipt-type";
import { create } from "zustand";

type ReceiptStore = {
  receipts: Receipt[];
  addReceipt: (receipt: Receipt) => void;
};

const useReceipt = create<ReceiptStore>((set) => ({
  receipts: [],
  addReceipt: (receipt) =>
    set((state) => ({ receipts: [...state.receipts, receipt] })),
}));

export default useReceipt;
