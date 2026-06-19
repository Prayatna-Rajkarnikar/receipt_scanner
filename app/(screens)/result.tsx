import useReceipt from "@/store/receipt";
import { Receipt } from "@/types/receipt-type";
import { useRouter } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";

export default function ResultScreen() {
  const router = useRouter();
  const fakeReceipt: Receipt = {
    id: "1",
    storeName: "Big Mart",
    date: "2026-10-09",
    items: [
      { name: "Coke", quantity: 1, price: 250 },
      { name: "Pasta", quantity: 1, price: 250 },
    ],
    total: 500,
    category: "shopping",
  };

  const addReceipt = useReceipt((state) => state.addReceipt);

  return (
    <ScrollView>
      <Text>{fakeReceipt.storeName}</Text>
      <Text>{fakeReceipt.date}</Text>
      {fakeReceipt.items.map((item, index) => (
        <View key={index}>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
      ))}
      <Text>{fakeReceipt.category}</Text>
      <Text>{fakeReceipt.total}</Text>
      <Button
        title="Save"
        onPress={() => {
          addReceipt(fakeReceipt);
          router.push("/(screens)/receipt-list");
        }}
      />
    </ScrollView>
  );
}
