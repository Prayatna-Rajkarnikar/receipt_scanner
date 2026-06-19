import useReceipt from "@/store/receipt";
import { ScrollView, Text, View } from "react-native";

export default function ReceiptListScreen() {
  const receipts = useReceipt((state) => state.receipts);

  return (
    <ScrollView>
      {receipts.map((item, index) => (
        <View key={index}>
          <Text>{item.storeName}</Text>
          <Text>{item.date}</Text>
          <Text>{item.category}</Text>
          <View>
            {item.items.map((storeItem, index) => (
              <View key={index}>
                <Text>{storeItem.name}</Text>
                <Text>{storeItem.quantity}</Text>
                <Text>{storeItem.price}</Text>
              </View>
            ))}
          </View>
          <Text>{item.total}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
