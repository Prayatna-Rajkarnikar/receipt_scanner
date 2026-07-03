import React from "react";
import { Button, Text, View } from "react-native";

function ResultRetry({ onRetry }: { onRetry: () => void }) {
  return (
    <View>
      <Text>Result failed to appear</Text>
      <Button title="Try again" onPress={onRetry} />
    </View>
  );
}

export default ResultRetry;
