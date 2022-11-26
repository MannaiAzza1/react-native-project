import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Challenge from "./src/compnents/challenge/challenge";
import Program from "./src/compnents/program/program";
export default function App() {
  return (
    <View style={styles.container}>
      <Challenge />
      <Program />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
