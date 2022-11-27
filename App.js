import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Challenge from "./src/components/challenge/challenge";
import Program from "./src/components/program/program";
import Event from "./src/components/event/event";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Place from "./src/screens/Place";

import React from "react";
// 1. import `NativeBaseProvider` component
import Comp from "./src/components/comp/Comp";

export default function App() {
  const Drawer = createDrawerNavigator();
  // 2. Use at the root of your app
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="Competences" component={Comp} />
        <Drawer.Screen name="Challenge" component={Challenge} />
        <Drawer.Screen name="Program" component={Program} />
        <Drawer.Screen name="Event" component={Event} />

        <Drawer.Screen name="Place" component={Place} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
