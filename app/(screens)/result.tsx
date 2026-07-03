import ResultLoading from "@/components/ui/result-loading";
import ResultRetry from "@/components/ui/result-retryUI";
import { scanReceipt } from "@/lib/scan-receipt";
import useReceipt from "@/store/receipt";
import { Receipt } from "@/types/receipt-type";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";

export default function ResultScreen() {
  const router = useRouter();

  const addReceipt = useReceipt((state) => state.addReceipt);
  const [editForm, setEditForm] = useState<Receipt | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const { uri } = useLocalSearchParams<{ uri: string }>();

  const { data, isPending, isError, refetch, isRefetching } = useQuery({
    queryKey: ["scanReceipt", uri],
    queryFn: () => scanReceipt(uri),
    enabled: !!uri,
  });

  useEffect(() => {
    if (data) setEditForm(data);
  }, [data]);

  if (isPending || isRefetching) return <ResultLoading />;
  if (isError) return <ResultRetry onRetry={refetch} />;

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
