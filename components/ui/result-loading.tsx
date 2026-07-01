import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

function ResultLoading() {
  // one animated value drives the opacity of every box
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // loop forever: fade up to 1, then back down to 0.3
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    // cleanup: stop the loop when the screen unmounts
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.title} />
      <View style={styles.line} />
      <View style={styles.line} />
      <View style={styles.row} />
      <View style={styles.row} />
      <View style={styles.row} />
      <View style={styles.total} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    height: 28,
    width: "60%",
    backgroundColor: "#d1d5db",
    borderRadius: 8,
  },
  line: {
    height: 16,
    width: "40%",
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
  },
  row: {
    height: 20,
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
  },
  total: {
    height: 24,
    width: "30%",
    backgroundColor: "#d1d5db",
    borderRadius: 8,
  },
});

export default ResultLoading;
