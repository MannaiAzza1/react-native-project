import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Challenge from "./src/components/challenge/challenge";
import Program from "./src/components/program/program";
import Event from "./src/components/event/event";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Place from "./src/screens/Place";
import HomePage from "./src/screens/homePage";


import React from "react";
// 1. import `NativeBaseProvider` component
import Comp from "./src/components/comp/Comp";
import VerifyCode from "./src/screens/PlayerVerify";
import UpdatePlayer from "./src/components/player/updatePlayer";

export default function App() {
  const Stack = createStackNavigator();
  // 2. Use at the root of your app
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Confirm" component={VerifyCode} />
        <Stack.Screen name="UpdatePlayer" component={UpdatePlayer} options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
