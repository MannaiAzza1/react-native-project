import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
// 1. import `NativeBaseProvider` component
import Comp from "./src/components/comp/Comp";



export default function App() {
  const Drawer = createDrawerNavigator();
  // 2. Use at the root of your app
  return (
    <NavigationContainer>
      
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Competences" component={Comp} />
        
        
      </Drawer.Navigator>
  
    
  </NavigationContainer>
      
  );
}
