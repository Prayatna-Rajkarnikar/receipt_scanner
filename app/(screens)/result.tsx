import useReceipt from "@/store/receipt";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";

export default function ResultScreen() {
  const router = useRouter();

  const addReceipt = useReceipt((state) => state.addReceipt);
  const draftReceipt = useReceipt((state) => state.draftReceipt);
  const [editForm, setEditForm] = useState(draftReceipt);
  const [showPicker, setShowPicker] = useState(false);

  if (draftReceipt === null) {
    return <Text>No receipt</Text>;
  }

  return (
    <ScrollView>
      <TextInput
        value={editForm?.storeName}
        onChangeText={(text) =>
          setEditForm((prev) => (prev ? { ...prev, storeName: text } : prev))
        }
      />
      <Text>{editForm?.date}</Text>

      {showPicker && (
        <DateTimePicker
          value={editForm?.date ? new Date(editForm.date) : new Date()}
          mode="date"
          maximumDate={new Date(2030, 12, 30)}
          minimumDate={new Date(2000, 12, 30)}
          onValueChange={(event, selectedDate) => {
            setEditForm((prev) =>
              prev
                ? { ...prev, date: selectedDate.toISOString().split("T")[0] }
                : prev,
            );
            setShowPicker(false);
          }}
        />
      )}

      <Button title="Edit Date" onPress={() => setShowPicker(true)}></Button>

      {editForm?.items.map((item, index) => (
        <View key={index}>
          <TextInput
            value={item.name}
            onChangeText={(text) =>
              setEditForm((prev) =>
                prev
                  ? {
                      ...prev,
                      items: prev.items.map((it, i) =>
                        i === index ? { ...it, name: text } : it,
                      ),
                    }
                  : prev,
              )
            }
          />
          <TextInput
            value={String(item.price)}
            keyboardType="numeric"
            onChangeText={(text) =>
              setEditForm((prev) =>
                prev
                  ? {
                      ...prev,
                      items: prev.items.map((it, i) =>
                        i === index ? { ...it, price: Number(text) } : it,
                      ),
                    }
                  : prev,
              )
            }
          />
        </View>
      ))}
      <TextInput
        value={String(editForm?.total)}
        onChangeText={(text) =>
          setEditForm((prev) =>
            prev ? { ...prev, total: Number(text) } : prev,
          )
        }
      />
      <Button
        title="Save"
        onPress={() => {
          if (!editForm) return;
          const newReceipt = { ...editForm, id: Date.now().toString() };

          addReceipt(newReceipt);

          router.push("/(screens)/receipt-list");
        }}
      />
    </ScrollView>
  );
}
