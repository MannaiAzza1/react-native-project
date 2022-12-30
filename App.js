import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
// 1. import `NativeBaseProvider` component
import Comp from "./src/components/comp/Comp";
import Stat from './src/components/stat/stat';
import InvitePlayer from './src/components/player/invitePlayer';




export default function App() {
  const Drawer = createDrawerNavigator();
  // 2. Use at the root of your app
  return (
    <NavigationContainer>
      
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Competences" component={Comp} />
        <Drawer.Screen name="Statistiques" component={Stat} />
        <Drawer.Screen name="Inviter joueur" component={InvitePlayer} />
        
      </Drawer.Navigator>
  
    
  </NavigationContainer>
      
  );
}
