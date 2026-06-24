import useReceipt from "@/store/receipt";
import { useRouter } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";

export default function ResultScreen() {
  const router = useRouter();

  const addReceipt = useReceipt((state) => state.addReceipt);
  const draftReceipt = useReceipt((state) => state.draftReceipt);

  if (draftReceipt === null) {
    return <Text>No receipt</Text>;
  }

  return (
    <ScrollView>
      <Text>{draftReceipt.storeName}</Text>
      <Text>{draftReceipt.date}</Text>

      {draftReceipt.items.map((item, index) => (
        <View key={index}>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
      ))}
      <Text>{draftReceipt.category}</Text>
      <Text>{draftReceipt.total}</Text>
      <Button
        title="Save"
        onPress={() => {
          addReceipt(draftReceipt);
          router.push("/(screens)/receipt-list");
        }}
      />
    </ScrollView>
  );
}
