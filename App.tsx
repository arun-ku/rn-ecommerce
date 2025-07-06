import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppRoot from "./AppRoot";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <AppRoot />
        </NavigationContainer>
        <StatusBar style="dark" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
});
