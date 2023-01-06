import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import {
  DrawerLayoutAndroid,
  TouchableOpacity,
  ScrollView,
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  View,
  TextInput,
  Modal,
  Button,
} from "react-native";
import Challenge from "../components/challenge/challenge";
import Program from "../components/program/program";
import Event from "../components/event/event";
import Comp from "../components/comp/Comp";
import Place from "./Place";
import React from "react";
import AuthService from "../../services/auth.service";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import InvitePlayer from "../components/player/invitePlayer";
import Stat from "../components/stat/stat";

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => navigation.navigate("Login")} />
    </DrawerContentScrollView>
  );
}

export default function HomePage() {
  const Drawer = createDrawerNavigator();

  // 2. Use at the root of your app
  return (
    // <Drawer.Navigator initialRouteName="Home">
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Competences" component={Comp} />
      <Drawer.Screen name="Statistiques" component={Stat} />
      <Drawer.Screen name="Inviter joueur" component={InvitePlayer} />
      <Drawer.Screen name="Challenge" component={Challenge} />
      <Drawer.Screen name="Program" component={Program} />
      <Drawer.Screen name="Event" component={Event} />
      <Drawer.Screen name="Place" component={Place} />
    </Drawer.Navigator>
  );
}
