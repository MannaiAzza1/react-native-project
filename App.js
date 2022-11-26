import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Challenge from "./src/compnents/challenge/challenge";

export default function App() {
  return (
    <View style={styles.container}>
      <Challenge />
      <Text>Open up .js to start working on your app!</Text>
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
