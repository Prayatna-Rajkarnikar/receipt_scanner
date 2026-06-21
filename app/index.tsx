import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipt Scanner</Text>
      <Link href="/(screens)/camera">Scan a receipt</Link>
      <Link href="/(screens)/receipt-list">View saved receipts</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
